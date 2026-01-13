import { useState, useCallback, useEffect, useRef } from 'react';
import type { UseLoaderOptions, UseLoaderReturn, LoadingStatus, LoadingHistoryEntry } from '../types/hooks';

/**
 * useEnhancedLoader - Advanced loading state management with retry, success/error states, and history
 *
 * An enhanced version of useLoader with additional features:
 * - Retry logic with exponential backoff
 * - Success and error state management
 * - Loading history tracking
 * - Debounce and throttle support
 * - Lifecycle callbacks
 *
 * @param options - Configuration options
 * @returns Enhanced loading state and control functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const {
 *     loading,
 *     status,
 *     error,
 *     startLoading,
 *     stopLoading,
 *     setError,
 *     retry,
 *     history
 *   } = useEnhancedLoader({
 *     delay: 200,
 *     minDuration: 600,
 *     retry: {
 *       maxRetries: 3,
 *       initialDelay: 1000,
 *       backoffMultiplier: 2,
 *     },
 *     successDuration: 2000,
 *     onSuccess: () => console.log('Success!'),
 *     onError: (err) => console.error('Error:', err),
 *   });
 *
 *   const fetchData = async () => {
 *     startLoading();
 *     try {
 *       await api.fetchData();
 *       stopLoading();
 *     } catch (err) {
 *       setError(err as Error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       {status === 'loading' && <SpinnerCircle visible={true} />}
 *       {status === 'success' && <SuccessCheckmark visible={true} />}
 *       {status === 'error' && <ErrorIndicator visible={true} />}
 *       {error && <button onClick={retry}>Retry</button>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useEnhancedLoader(options: UseLoaderOptions = {}): UseLoaderReturn {
  const {
    delay = 0,
    minDuration = 0,
    autoHide,
    retry: retryConfig,
    debounce: debounceDelay,
    throttle: throttleDelay,
    onLoadingStart,
    onSuccess,
    onError,
    successDuration = 2000,
    errorDuration = 3000,
  } = options;

  const [loading, setLoadingState] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<LoadingStatus>('idle');
  const [error, setErrorState] = useState<Error | null>(null);
  const [retryAttempt, setRetryAttempt] = useState(0);
  const [history, setHistory] = useState<LoadingHistoryEntry[]>([]);

  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const throttleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const shownAtRef = useRef<number | null>(null);
  const currentSessionRef = useRef<LoadingHistoryEntry | null>(null);
  const lastErrorRef = useRef<Error | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (minDurationTimerRef.current) clearTimeout(minDurationTimerRef.current);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (throttleTimerRef.current) clearTimeout(throttleTimerRef.current);
    };
  }, []);

  const clearTimers = useCallback(() => {
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
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
      statusTimerRef.current = null;
    }
  }, []);

  const startLoadingInternal = useCallback(() => {
    clearTimers();
    setLoadingState(true);
    setStatus('loading');
    setErrorState(null);

    // Create history entry
    const entry: LoadingHistoryEntry = {
      startTime: Date.now(),
      status: 'loading',
      retryCount: retryAttempt,
    };
    currentSessionRef.current = entry;

    // Call lifecycle callback
    if (onLoadingStart) {
      onLoadingStart();
    }

    // Handle delay
    if (delay > 0) {
      delayTimerRef.current = setTimeout(() => {
        setIsVisible(true);
        shownAtRef.current = Date.now();
      }, delay);
    } else {
      setIsVisible(true);
      shownAtRef.current = Date.now();
    }

    // Auto-hide if configured
    if (autoHide) {
      autoHideTimerRef.current = setTimeout(() => {
        stopLoading();
      }, autoHide);
    }
  }, [delay, autoHide, onLoadingStart, retryAttempt, clearTimers]);

  const startLoading = useCallback(() => {
    // Handle debounce
    if (debounceDelay) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        startLoadingInternal();
      }, debounceDelay);
      return;
    }

    // Handle throttle
    if (throttleDelay) {
      const now = Date.now();
      const timeSinceLastCall = now - lastCallTimeRef.current;

      if (timeSinceLastCall >= throttleDelay) {
        lastCallTimeRef.current = now;
        startLoadingInternal();
      } else if (!throttleTimerRef.current) {
        const remaining = throttleDelay - timeSinceLastCall;
        throttleTimerRef.current = setTimeout(() => {
          lastCallTimeRef.current = Date.now();
          startLoadingInternal();
          throttleTimerRef.current = null;
        }, remaining);
      }
      return;
    }

    startLoadingInternal();
  }, [debounceDelay, throttleDelay, startLoadingInternal]);

  const stopLoading = useCallback(() => {
    clearTimers();
    setLoadingState(false);
    setStatus('success');
    setRetryAttempt(0);

    // Update history
    if (currentSessionRef.current) {
      const endTime = Date.now();
      const entry: LoadingHistoryEntry = {
        ...currentSessionRef.current,
        endTime,
        duration: endTime - currentSessionRef.current.startTime,
        status: 'success',
      };
      setHistory((prev) => [...prev, entry]);
      currentSessionRef.current = null;
    }

    // Handle minDuration
    if (shownAtRef.current !== null && minDuration > 0) {
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

    // Call lifecycle callback
    if (onSuccess) {
      onSuccess();
    }

    // Auto-reset to idle after successDuration
    if (successDuration > 0) {
      statusTimerRef.current = setTimeout(() => {
        setStatus('idle');
      }, successDuration);
    }
  }, [minDuration, onSuccess, successDuration, clearTimers]);

  const setError = useCallback(
    (err: Error) => {
      clearTimers();
      setLoadingState(false);
      setStatus('error');
      setErrorState(err);
      lastErrorRef.current = err;

      // Update history
      if (currentSessionRef.current) {
        const endTime = Date.now();
        const entry: LoadingHistoryEntry = {
          ...currentSessionRef.current,
          endTime,
          duration: endTime - currentSessionRef.current.startTime,
          status: 'error',
          error: err,
        };
        setHistory((prev) => [...prev, entry]);
        currentSessionRef.current = null;
      }

      // Handle minDuration for visibility
      if (shownAtRef.current !== null && minDuration > 0) {
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

      // Call lifecycle callback
      if (onError) {
        onError(err);
      }

      // Check if should retry
      if (retryConfig) {
        const {
          maxRetries = 3,
          initialDelay = 1000,
          maxDelay = 30000,
          backoffMultiplier = 2,
          shouldRetry,
        } = retryConfig;

        const canRetry = retryAttempt < maxRetries;
        const shouldDoRetry = shouldRetry ? shouldRetry(err, retryAttempt + 1) : true;

        if (canRetry && shouldDoRetry) {
          const retryDelay = Math.min(
            initialDelay * Math.pow(backoffMultiplier, retryAttempt),
            maxDelay
          );

          statusTimerRef.current = setTimeout(() => {
            setRetryAttempt((prev) => prev + 1);
            startLoading();
          }, retryDelay);
        } else {
          // Auto-reset to idle after errorDuration if no more retries
          if (errorDuration > 0) {
            statusTimerRef.current = setTimeout(() => {
              setStatus('idle');
              setRetryAttempt(0);
            }, errorDuration);
          }
        }
      } else {
        // Auto-reset to idle after errorDuration
        if (errorDuration > 0) {
          statusTimerRef.current = setTimeout(() => {
            setStatus('idle');
          }, errorDuration);
        }
      }
    },
    [
      minDuration,
      onError,
      errorDuration,
      retryConfig,
      retryAttempt,
      startLoading,
      clearTimers,
    ]
  );

  const retry = useCallback(() => {
    if (lastErrorRef.current) {
      setRetryAttempt((prev) => prev + 1);
      startLoading();
    }
  }, [startLoading]);

  const reset = useCallback(() => {
    clearTimers();
    setLoadingState(false);
    setIsVisible(false);
    setStatus('idle');
    setErrorState(null);
    setRetryAttempt(0);
    shownAtRef.current = null;
    currentSessionRef.current = null;
    lastErrorRef.current = null;
  }, [clearTimers]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    loading,
    isVisible,
    status,
    error,
    retryAttempt,
    history,
    startLoading,
    stopLoading,
    setError,
    retry,
    reset,
    clearHistory,
  };
}
