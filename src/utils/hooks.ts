import { useEffect, useState, useRef } from 'react';

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if matchMedia is available (SSR safety)
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Use addEventListener if available (modern browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Get effective animation duration based on speed and reduced motion preference
 */
export function getEffectiveDuration(
  speed: 'slow' | 'normal' | 'fast' | number,
  respectMotionPreference: boolean,
  prefersReducedMotion: boolean
): string {
  // If user prefers reduced motion and we should respect it, use a very short duration
  if (respectMotionPreference && prefersReducedMotion) {
    return '0.01ms';
  }

  if (typeof speed === 'number') {
    const validSpeed = !isNaN(speed) && speed > 0 ? Math.max(50, Math.min(10000, speed)) : 1000;
    return `${validSpeed}ms`;
  }

  const speedMap = {
    slow: '2s',
    normal: '1s',
    fast: '0.5s',
  };

  return speedMap[speed] || speedMap.normal;
}

/**
 * Hook to manage loader visibility with delay, minimum duration, and transitions
 * Prevents flashing on fast loads and jarring quick disappears
 */
export function useLoaderVisibility(
  visible: boolean = true,
  delay: number = 0,
  minDuration: number = 0,
  transition?: boolean | number
): {
  shouldRender: boolean;
  opacity: number;
  transitionStyle: string;
} {
  // Calculate transition duration
  const transitionDuration =
    transition === true ? 150 : typeof transition === 'number' ? transition : 0;
  const hasTransition = transitionDuration > 0;

  // Initialize shouldRender based on visible state and delay
  // If visible and no delay, render immediately; otherwise start hidden
  const [shouldRender, setShouldRender] = useState(visible && delay === 0);
  const [isTransitioning, setIsTransitioning] = useState(visible && delay === 0 && hasTransition);
  const showTimeRef = useRef<number | null>(visible && delay === 0 ? Date.now() : null);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minDurationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any existing timers
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
    if (minDurationTimerRef.current) {
      clearTimeout(minDurationTimerRef.current);
      minDurationTimerRef.current = null;
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (visible) {
      // Show loader after delay
      if (delay > 0) {
        delayTimerRef.current = setTimeout(() => {
          setShouldRender(true);
          showTimeRef.current = Date.now();
          // Trigger transition
          if (hasTransition) {
            setIsTransitioning(true);
          }
        }, delay);
      } else {
        setShouldRender(true);
        showTimeRef.current = Date.now();
        // Trigger transition
        if (hasTransition) {
          setIsTransitioning(true);
        }
      }
    } else {
      // Hide loader, but respect minimum duration if it was shown
      const hideLoader = () => {
        if (hasTransition) {
          setIsTransitioning(false);
          // Wait for transition to complete before unmounting
          transitionTimerRef.current = setTimeout(() => {
            setShouldRender(false);
            showTimeRef.current = null;
          }, transitionDuration);
        } else {
          setShouldRender(false);
          showTimeRef.current = null;
        }
      };

      if (showTimeRef.current !== null && minDuration > 0) {
        const elapsedTime = Date.now() - showTimeRef.current;
        const remainingTime = minDuration - elapsedTime;

        if (remainingTime > 0) {
          minDurationTimerRef.current = setTimeout(hideLoader, remainingTime);
        } else {
          hideLoader();
        }
      } else {
        hideLoader();
      }
    }

    // Cleanup timers on unmount or when dependencies change
    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }
      if (minDurationTimerRef.current) {
        clearTimeout(minDurationTimerRef.current);
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [visible, delay, minDuration, hasTransition, transitionDuration]);

  // Calculate opacity based on transition state
  const opacity = hasTransition ? (isTransitioning ? 1 : 0) : 1;

  // Build transition style
  const transitionStyle = hasTransition
    ? `opacity ${transitionDuration}ms ease-in-out`
    : 'none';

  return {
    shouldRender,
    opacity,
    transitionStyle,
  };
}
