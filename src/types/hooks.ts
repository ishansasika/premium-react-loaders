/**
 * Loading state status
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Retry strategy configuration
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxRetries?: number;

  /** Initial delay in milliseconds before first retry */
  initialDelay?: number;

  /** Maximum delay in milliseconds between retries */
  maxDelay?: number;

  /** Exponential backoff multiplier (default: 2) */
  backoffMultiplier?: number;

  /** Function to determine if error should trigger a retry */
  shouldRetry?: (error: Error, attemptNumber: number) => boolean;
}

/**
 * Enhanced useLoader hook options
 */
export interface UseLoaderOptions {
  /** Delay in milliseconds before showing loader */
  delay?: number;

  /** Minimum duration in milliseconds to show loader once visible */
  minDuration?: number;

  /** Auto-hide loader after specified milliseconds */
  autoHide?: number;

  /** Enable fade transition */
  transition?: boolean | number;

  /** Retry configuration */
  retry?: RetryConfig;

  /** Debounce delay in milliseconds for startLoading calls */
  debounce?: number;

  /** Throttle delay in milliseconds for startLoading calls */
  throttle?: number;

  /** Callback when loading starts */
  onLoadingStart?: () => void;

  /** Callback when loading completes successfully */
  onSuccess?: () => void;

  /** Callback when loading fails */
  onError?: (error: Error) => void;

  /** Success display duration in milliseconds before resetting */
  successDuration?: number;

  /** Error display duration in milliseconds before resetting */
  errorDuration?: number;
}

/**
 * Loading state history entry
 */
export interface LoadingHistoryEntry {
  /** Timestamp when loading started */
  startTime: number;

  /** Timestamp when loading ended */
  endTime?: number;

  /** Duration in milliseconds (if ended) */
  duration?: number;

  /** Final status of this loading session */
  status: LoadingStatus;

  /** Error if status is 'error' */
  error?: Error;

  /** Number of retry attempts made */
  retryCount?: number;
}

/**
 * Enhanced useLoader hook return value
 */
export interface UseLoaderReturn {
  /** Current loading state */
  loading: boolean;

  /** Whether loader should be visible (respects delay and minDuration) */
  isVisible: boolean;

  /** Current status (idle, loading, success, error) */
  status: LoadingStatus;

  /** Current error if any */
  error: Error | null;

  /** Number of current retry attempt (0 if not retrying) */
  retryAttempt: number;

  /** Loading history */
  history: LoadingHistoryEntry[];

  /** Start loading */
  startLoading: () => void;

  /** Stop loading with success */
  stopLoading: () => void;

  /** Toggle loading state */
  toggleLoading: () => void;

  /** Set loading state directly */
  setLoading: (loading: boolean) => void;

  /** Stop loading with error */
  setError: (error: Error) => void;

  /** Manually retry the last failed operation */
  retry: () => void;

  /** Reset to idle state */
  reset: () => void;

  /** Clear history */
  clearHistory: () => void;
}
