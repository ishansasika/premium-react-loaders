import { useState, useCallback, useEffect, useRef } from 'react';

export interface LoadingSession {
  /** Session start timestamp */
  startTime: number;
  /** Session end timestamp */
  endTime?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** Whether the loading was successful */
  success?: boolean;
  /** Whether the user abandoned (navigated away) */
  abandoned?: boolean;
}

export interface LoadingMetrics {
  /** Total number of loading sessions */
  totalSessions: number;
  /** Average loading duration in milliseconds */
  averageDuration: number;
  /** Longest loading time in milliseconds */
  maxDuration: number;
  /** Shortest loading time in milliseconds */
  minDuration: number;
  /** Success rate (0-1) */
  successRate: number;
  /** User abandonment rate (0-1) */
  abandonmentRate: number;
  /** All sessions data */
  sessions: LoadingSession[];
}

export interface AnalyticsOptions {
  /** Track user interactions during loading */
  trackInteractions?: boolean;
  /** Callback when metrics are updated */
  onMetricsUpdate?: (metrics: LoadingMetrics) => void;
  /** Local storage key for persisting metrics */
  storageKey?: string;
  /** Maximum number of sessions to store */
  maxSessions?: number;
}

export interface UseLoadingAnalyticsReturn {
  /** Current metrics */
  metrics: LoadingMetrics;
  /** Start tracking a loading session */
  startTracking: () => void;
  /** Stop tracking and mark as success or failure */
  stopTracking: (success: boolean) => void;
  /** Record user abandonment */
  recordAbandonment: () => void;
  /** Clear all metrics */
  clearMetrics: () => void;
  /** Export metrics as JSON */
  exportMetrics: () => LoadingMetrics;
  /** Whether currently tracking */
  isTracking: boolean;
}

/**
 * useLoadingAnalytics - Track loading performance and user experience
 *
 * Monitors loading sessions, calculates performance metrics, and tracks user behavior
 * like abandonment. Useful for optimizing loading UX and identifying bottlenecks.
 *
 * @param options - Configuration options
 * @returns Metrics and tracking control functions
 *
 * @example
 * ```tsx
 * function AnalyticsDemo() {
 *   const {
 *     metrics,
 *     startTracking,
 *     stopTracking,
 *     isTracking,
 *   } = useLoadingAnalytics({
 *     storageKey: 'my-app-loading-metrics',
 *     onMetricsUpdate: (metrics) => {
 *       console.log('Average load time:', metrics.averageDuration, 'ms');
 *       console.log('Success rate:', (metrics.successRate * 100).toFixed(1), '%');
 *     },
 *   });
 *
 *   const loadData = async () => {
 *     startTracking();
 *     try {
 *       await fetchData();
 *       stopTracking(true);
 *     } catch (error) {
 *       stopTracking(false);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <p>Total sessions: {metrics.totalSessions}</p>
 *       <p>Avg duration: {metrics.averageDuration.toFixed(0)}ms</p>
 *       <p>Success rate: {(metrics.successRate * 100).toFixed(1)}%</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLoadingAnalytics(
  options: AnalyticsOptions = {}
): UseLoadingAnalyticsReturn {
  const {
    trackInteractions = false,
    onMetricsUpdate,
    storageKey,
    maxSessions = 100,
  } = options;

  const [sessions, setSessions] = useState<LoadingSession[]>(() => {
    // Load from localStorage if storageKey provided
    if (storageKey && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to load analytics from localStorage:', error);
      }
    }
    return [];
  });

  const [currentSession, setCurrentSession] = useState<LoadingSession | null>(null);
  const interactionCountRef = useRef(0);

  // Calculate metrics
  const metrics: LoadingMetrics = {
    totalSessions: sessions.length,
    averageDuration:
      sessions.length > 0
        ? sessions.reduce((sum, s) => sum + (s.duration || 0), 0) / sessions.length
        : 0,
    maxDuration:
      sessions.length > 0 ? Math.max(...sessions.map((s) => s.duration || 0)) : 0,
    minDuration:
      sessions.length > 0
        ? Math.min(...sessions.filter((s) => s.duration).map((s) => s.duration || 0))
        : 0,
    successRate:
      sessions.length > 0
        ? sessions.filter((s) => s.success === true).length / sessions.length
        : 0,
    abandonmentRate:
      sessions.length > 0
        ? sessions.filter((s) => s.abandoned === true).length / sessions.length
        : 0,
    sessions,
  };

  // Save to localStorage when sessions change
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify(sessions));
      } catch (error) {
        console.warn('Failed to save analytics to localStorage:', error);
      }
    }
  }, [sessions, storageKey]);

  // Call onMetricsUpdate when metrics change
  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics.totalSessions, metrics.averageDuration, metrics.successRate, onMetricsUpdate]);

  // Track user interactions (clicks, keypresses)
  useEffect(() => {
    if (!trackInteractions || !currentSession) return;

    const handleInteraction = () => {
      interactionCountRef.current += 1;
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keypress', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keypress', handleInteraction);
    };
  }, [trackInteractions, currentSession]);

  // Track page visibility (abandonment detection)
  useEffect(() => {
    if (!currentSession) return;

    const handleVisibilityChange = () => {
      if (document.hidden && currentSession) {
        recordAbandonment();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentSession]);

  const startTracking = useCallback(() => {
    const session: LoadingSession = {
      startTime: Date.now(),
    };
    setCurrentSession(session);
    interactionCountRef.current = 0;
  }, []);

  const stopTracking = useCallback(
    (success: boolean) => {
      if (!currentSession) {
        console.warn('No active tracking session to stop');
        return;
      }

      const endTime = Date.now();
      const duration = endTime - currentSession.startTime;

      const completedSession: LoadingSession = {
        ...currentSession,
        endTime,
        duration,
        success,
        abandoned: false,
      };

      setSessions((prev) => {
        const updated = [...prev, completedSession];
        // Limit to maxSessions
        if (updated.length > maxSessions) {
          return updated.slice(updated.length - maxSessions);
        }
        return updated;
      });

      setCurrentSession(null);
    },
    [currentSession, maxSessions]
  );

  const recordAbandonment = useCallback(() => {
    if (!currentSession) return;

    const endTime = Date.now();
    const duration = endTime - currentSession.startTime;

    const abandonedSession: LoadingSession = {
      ...currentSession,
      endTime,
      duration,
      success: false,
      abandoned: true,
    };

    setSessions((prev) => {
      const updated = [...prev, abandonedSession];
      if (updated.length > maxSessions) {
        return updated.slice(updated.length - maxSessions);
      }
      return updated;
    });

    setCurrentSession(null);
  }, [currentSession, maxSessions]);

  const clearMetrics = useCallback(() => {
    setSessions([]);
    setCurrentSession(null);
    if (storageKey && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const exportMetrics = useCallback(() => metrics, [metrics]);

  return {
    metrics,
    startTracking,
    stopTracking,
    recordAbandonment,
    clearMetrics,
    exportMetrics,
    isTracking: currentSession !== null,
  };
}
