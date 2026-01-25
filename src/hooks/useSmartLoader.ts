import { useState, useCallback, useEffect, useRef } from 'react';

export type ConnectionSpeed = 'slow' | 'medium' | 'fast';

export interface SmartLoaderOptions {
  /** Auto-detect slow connections and adjust behavior */
  adaptToConnection?: boolean;
  /** Show estimated progress based on historical data */
  estimateProgress?: boolean;
  /** Automatically retry on failure */
  autoRetry?: boolean;
  /** Maximum retry attempts */
  maxRetries?: number;
  /** Use intelligent delay based on connection speed */
  intelligentDelay?: boolean;
  /** Callback when loading starts */
  onLoadingStart?: () => void;
  /** Callback when loading completes */
  onLoadingComplete?: () => void;
  /** Callback on retry */
  onRetry?: (attempt: number) => void;
}

export interface UseSmartLoaderReturn {
  /** Current loading state */
  loading: boolean;
  /** Progress percentage (0-100) */
  progress: number;
  /** Estimated time remaining in seconds */
  estimatedTimeRemaining: number;
  /** Detected connection speed */
  connectionSpeed: ConnectionSpeed;
  /** Whether loader should be shown (accounts for intelligent delay) */
  shouldShowLoader: boolean;
  /** Current retry attempt */
  retryAttempt: number;
  /** Start loading */
  startLoading: () => void;
  /** Stop loading */
  stopLoading: (success?: boolean) => void;
  /** Update progress manually */
  updateProgress: (value: number) => void;
  /** Retry the operation */
  retry: () => void;
}

/**
 * useSmartLoader - Intelligent loader with adaptive UX
 *
 * Combines multiple smart loading features: connection detection, progress estimation,
 * intelligent delays, and automatic retry logic for optimal user experience.
 *
 * @param options - Configuration options
 * @returns Smart loading state and controls
 *
 * @example
 * ```tsx
 * function SmartDataLoader() {
 *   const {
 *     loading,
 *     progress,
 *     estimatedTimeRemaining,
 *     connectionSpeed,
 *     shouldShowLoader,
 *     startLoading,
 *     stopLoading,
 *     updateProgress,
 *   } = useSmartLoader({
 *     adaptToConnection: true,
 *     estimateProgress: true,
 *     autoRetry: true,
 *     maxRetries: 3,
 *     intelligentDelay: true,
 *   });
 *
 *   const loadData = async () => {
 *     startLoading();
 *     try {
 *       const data = await fetchData((progress) => {
 *         updateProgress(progress);
 *       });
 *       stopLoading(true);
 *     } catch (error) {
 *       stopLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <>
 *       {shouldShowLoader && (
 *         <div>
 *           <ProgressBar value={progress} />
 *           <p>Connection: {connectionSpeed}</p>
 *           <p>ETA: {estimatedTimeRemaining}s</p>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useSmartLoader(
  options: SmartLoaderOptions = {}
): UseSmartLoaderReturn {
  const {
    adaptToConnection = true,
    estimateProgress = true,
    autoRetry = false,
    maxRetries = 3,
    intelligentDelay = true,
    onLoadingStart,
    onLoadingComplete,
    onRetry,
  } = options;

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(0);
  const [connectionSpeed, setConnectionSpeed] = useState<ConnectionSpeed>('medium');
  const [shouldShowLoader, setShouldShowLoader] = useState(false);
  const [retryAttempt, setRetryAttempt] = useState(0);

  const startTimeRef = useRef<number | null>(null);
  const historyRef = useRef<number[]>([]);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Detect connection speed using Navigator API
  useEffect(() => {
    if (!adaptToConnection || typeof navigator === 'undefined') return;

    const updateConnectionSpeed = () => {
      // @ts-ignore - connection API not in all TypeScript defs
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

      if (connection) {
        const effectiveType = connection.effectiveType;

        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          setConnectionSpeed('slow');
        } else if (effectiveType === '3g') {
          setConnectionSpeed('medium');
        } else {
          // 4g, 5g, etc.
          setConnectionSpeed('fast');
        }
      }
    };

    updateConnectionSpeed();

    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateConnectionSpeed);
      return () => {
        connection.removeEventListener('change', updateConnectionSpeed);
      };
    }
  }, [adaptToConnection]);

  // Calculate intelligent delay based on connection speed
  const getIntelligentDelay = useCallback(() => {
    if (!intelligentDelay) return 0;

    // Faster connections = longer delay (fast operations don't need loader)
    // Slower connections = shorter delay (show loader sooner)
    return connectionSpeed === 'fast' ? 500 : connectionSpeed === 'medium' ? 300 : 100;
  }, [intelligentDelay, connectionSpeed]);

  // Estimate progress based on historical data
  const estimateProgressValue = useCallback(() => {
    if (!estimateProgress || !startTimeRef.current || historyRef.current.length === 0) {
      return 0;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const avgDuration =
      historyRef.current.reduce((sum, d) => sum + d, 0) / historyRef.current.length;

    if (avgDuration === 0) return 0;

    // Progress estimation with logarithmic curve (fast at start, slows near end)
    const estimatedProgress = Math.min(
      95,
      (Math.log(elapsed + 1) / Math.log(avgDuration + 1)) * 100
    );

    return estimatedProgress;
  }, [estimateProgress]);

  // Calculate estimated time remaining
  const calculateETA = useCallback(() => {
    if (!startTimeRef.current || historyRef.current.length === 0 || progress === 0) {
      return 0;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const avgDuration =
      historyRef.current.reduce((sum, d) => sum + d, 0) / historyRef.current.length;

    // Estimate based on current progress
    const estimatedTotal = (elapsed / progress) * 100;
    const remaining = Math.max(0, estimatedTotal - elapsed);

    return Math.round(remaining / 1000); // Convert to seconds
  }, [progress]);

  const startLoading = useCallback(() => {
    setLoading(true);
    setProgress(0);
    setRetryAttempt(0);
    startTimeRef.current = Date.now();

    if (onLoadingStart) {
      onLoadingStart();
    }

    // Apply intelligent delay
    const delay = getIntelligentDelay();
    if (delay > 0) {
      delayTimerRef.current = setTimeout(() => {
        setShouldShowLoader(true);
      }, delay);
    } else {
      setShouldShowLoader(true);
    }

    // Start progress estimation
    if (estimateProgress) {
      progressIntervalRef.current = setInterval(() => {
        const estimated = estimateProgressValue();
        setProgress(estimated);

        const eta = calculateETA();
        setEstimatedTimeRemaining(eta);
      }, 200);
    }
  }, [
    getIntelligentDelay,
    estimateProgress,
    estimateProgressValue,
    calculateETA,
    onLoadingStart,
  ]);

  const stopLoading = useCallback(
    (success = true) => {
      setLoading(false);
      setShouldShowLoader(false);

      // Clear timers
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      // Record duration for future estimations
      if (success && startTimeRef.current) {
        const duration = Date.now() - startTimeRef.current;
        historyRef.current = [...historyRef.current.slice(-9), duration]; // Keep last 10
      }

      startTimeRef.current = null;
      setProgress(0);
      setEstimatedTimeRemaining(0);

      if (onLoadingComplete) {
        onLoadingComplete();
      }

      // Auto-retry on failure
      if (!success && autoRetry && retryAttempt < maxRetries) {
        const nextAttempt = retryAttempt + 1;
        setRetryAttempt(nextAttempt);

        if (onRetry) {
          onRetry(nextAttempt);
        }

        // Exponential backoff
        const retryDelay = Math.min(1000 * Math.pow(2, nextAttempt - 1), 10000);
        setTimeout(() => {
          startLoading();
        }, retryDelay);
      }
    },
    [
      autoRetry,
      maxRetries,
      retryAttempt,
      startLoading,
      onLoadingComplete,
      onRetry,
    ]
  );

  const updateProgress = useCallback((value: number) => {
    const clampedProgress = Math.min(Math.max(value, 0), 100);
    setProgress(clampedProgress);

    // Update ETA based on manual progress
    if (startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      if (clampedProgress > 0) {
        const estimatedTotal = (elapsed / clampedProgress) * 100;
        const remaining = Math.max(0, estimatedTotal - elapsed);
        setEstimatedTimeRemaining(Math.round(remaining / 1000));
      }
    }
  }, []);

  const retry = useCallback(() => {
    stopLoading(false);
    setRetryAttempt(0);
    startLoading();
  }, [startLoading, stopLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  return {
    loading,
    progress,
    estimatedTimeRemaining,
    connectionSpeed,
    shouldShowLoader,
    retryAttempt,
    startLoading,
    stopLoading,
    updateProgress,
    retry,
  };
}
