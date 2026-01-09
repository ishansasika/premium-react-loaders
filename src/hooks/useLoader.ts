import { useState, useCallback, useEffect, useRef } from 'react';

export interface UseLoaderOptions {
  /** Initial loading state */
  initialLoading?: boolean;
  /** Delay before showing loader (ms) */
  delay?: number;
  /** Minimum duration to show loader (ms) */
  minDuration?: number;
  /** Auto-hide loader after duration (ms) */
  autoHide?: number;
}

export interface UseLoaderReturn {
  /** Current loading state */
  loading: boolean;
  /** Start loading */
  startLoading: () => void;
  /** Stop loading */
  stopLoading: () => void;
  /** Toggle loading state */
  toggleLoading: () => void;
  /** Set loading state directly */
  setLoading: (loading: boolean) => void;
  /** Whether loader should be visible (accounts for delay/minDuration) */
  isVisible: boolean;
}

/**
 * useLoader - Manage loading states with smart UX features
 *
 * A hook for managing loader visibility with built-in delay, minimum duration,
 * and auto-hide capabilities for optimal user experience.
 *
 * @param options - Configuration options
 * @returns Loading state and control functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { loading, startLoading, stopLoading, isVisible } = useLoader({
 *     delay: 200,
 *     minDuration: 600,
 *   });
 *
 *   const fetchData = async () => {
 *     startLoading();
 *     try {
 *       await api.fetchData();
 *     } finally {
 *       stopLoading();
 *     }
 *   };
 *
 *   return <SpinnerCircle visible={isVisible} />;
 * }
 * ```
 */
export function useLoader(options: UseLoaderOptions = {}): UseLoaderReturn {
  const {
    initialLoading = false,
    delay = 0,
    minDuration = 0,
    autoHide,
  } = options;

  const [loading, setLoadingState] = useState(initialLoading);
  const [isVisible, setIsVisible] = useState(initialLoading && delay === 0);

  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAtRef = useRef<number | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (minDurationTimerRef.current) clearTimeout(minDurationTimerRef.current);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    };
  }, []);

  const setLoading = useCallback(
    (value: boolean) => {
      setLoadingState(value);

      // Clear existing timers
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      if (minDurationTimerRef.current) {
        clearTimeout(minDurationTimerRef.current);
        minDurationTimerRef.current = null;
      }
      if (autoHideTimerRef.current) {
        clearTimeout(autoHideTimerRef.current);
        autoHideTimerRef.current = null;
      }

      if (value) {
        // Starting loading
        if (delay > 0) {
          // Show loader after delay
          delayTimerRef.current = setTimeout(() => {
            setIsVisible(true);
            shownAtRef.current = Date.now();
          }, delay);
        } else {
          // Show immediately
          setIsVisible(true);
          shownAtRef.current = Date.now();
        }

        // Auto-hide if configured
        if (autoHide) {
          autoHideTimerRef.current = setTimeout(() => {
            setLoadingState(false);
            setIsVisible(false);
            shownAtRef.current = null;
          }, autoHide);
        }
      } else {
        // Stopping loading
        if (shownAtRef.current !== null && minDuration > 0) {
          // Ensure minimum duration
          const elapsed = Date.now() - shownAtRef.current;
          const remaining = minDuration - elapsed;

          if (remaining > 0) {
            minDurationTimerRef.current = setTimeout(() => {
              setIsVisible(false);
              shownAtRef.current = null;
            }, remaining);
          } else {
            setIsVisible(false);
            shownAtRef.current = null;
          }
        } else {
          setIsVisible(false);
          shownAtRef.current = null;
        }
      }
    },
    [delay, minDuration, autoHide]
  );

  const startLoading = useCallback(() => setLoading(true), [setLoading]);
  const stopLoading = useCallback(() => setLoading(false), [setLoading]);
  const toggleLoading = useCallback(
    () => setLoading(!loading),
    [loading, setLoading]
  );

  return {
    loading,
    startLoading,
    stopLoading,
    toggleLoading,
    setLoading,
    isVisible,
  };
}
