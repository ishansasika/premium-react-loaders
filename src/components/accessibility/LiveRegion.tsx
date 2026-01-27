import { forwardRef, useEffect, useRef, useState } from 'react';
import { LiveRegionProps } from '../../types';
import { cn } from '../../utils';

/**
 * LiveRegion - Accessible announcements for screen readers
 *
 * An ARIA live region that announces messages to screen readers without
 * disrupting the visual interface. Useful for loading state updates,
 * progress announcements, and status changes.
 *
 * @example
 * ```tsx
 * // Polite announcement (waits for user to finish current task)
 * <LiveRegion
 *   message="Loading data..."
 *   politeness="polite"
 *   clearAfter={3000}
 * />
 *
 * // Assertive announcement (interrupts immediately)
 * <LiveRegion
 *   message="Error: Failed to load data"
 *   politeness="assertive"
 *   atomic
 * />
 *
 * // Progress updates
 * <LiveRegion
 *   message={`Loading ${progress}% complete`}
 *   politeness="polite"
 *   clearAfter={1000}
 * />
 * ```
 */
export const LiveRegion = forwardRef<HTMLDivElement, LiveRegionProps>(
  (
    {
      message,
      politeness = 'polite',
      clearAfter,
      atomic = true,
      relevant = 'additions',
      className,
    },
    ref
  ) => {
    const [displayMessage, setDisplayMessage] = useState(message);
    const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Update message and handle auto-clear
    useEffect(() => {
      setDisplayMessage(message);

      // Clear previous timer
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
        clearTimerRef.current = null;
      }

      // Set auto-clear timer if configured
      if (clearAfter && message) {
        clearTimerRef.current = setTimeout(() => {
          setDisplayMessage('');
        }, clearAfter);
      }

      return () => {
        if (clearTimerRef.current) {
          clearTimeout(clearTimerRef.current);
        }
      };
    }, [message, clearAfter]);

    return (
      <div
        ref={ref}
        className={cn(
          // Visually hidden but accessible to screen readers
          'sr-only absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0',
          className
        )}
        role={politeness === 'assertive' ? 'alert' : 'status'}
        aria-live={politeness}
        aria-atomic={atomic}
        aria-relevant={relevant}
      >
        {displayMessage}
      </div>
    );
  }
);

LiveRegion.displayName = 'LiveRegion';
