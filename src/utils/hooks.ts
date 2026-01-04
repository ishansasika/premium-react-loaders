import { useEffect, useState } from 'react';

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
