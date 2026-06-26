import { forwardRef } from 'react';
import { WarningIndicatorProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';

/**
 * WarningIndicator - Animated warning indicator with triangle and exclamation mark
 *
 * Displays an animated warning triangle with an exclamation mark, perfect for showing
 * warnings, alerts, or caution states.
 *
 * @example
 * ```tsx
 * // Simple warning indicator
 * <WarningIndicator visible={hasWarning} />
 *
 * // With shake animation
 * <WarningIndicator
 *   visible={hasWarning}
 *   shake
 * />
 *
 * // Custom size, color and duration
 * <WarningIndicator
 *   visible={hasWarning}
 *   size={64}
 *   color="#f97316"
 *   duration={600}
 * />
 * ```
 */
export const WarningIndicator = forwardRef<HTMLDivElement, WarningIndicatorProps>(
  (
    {
      size = 48,
      color = '#f59e0b',
      animate = true,
      shake = false,
      duration = 500,
      delay = 0,
      minDuration = 0,
      transition = true,
      className,
      style,
      testId = 'warning-indicator',
      visible = true,
      ariaLabel = 'Warning',
      ...rest
    },
    ref
  ) => {
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const animClass = !animate ? '' : shake ? 'animate-warning-shake' : 'animate-warning-scale';

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{ opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel}
        {...rest}
      >
        <svg
          className={animClass}
          style={{ width: size, height: size, animationDuration: `${duration}ms` }}
          viewBox="0 0 52 52"
          fill="none"
        >
          <path
            d="M26 4 L49 46 L3 46 Z"
            fill={color}
            stroke={color}
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <line
            x1="26" y1="19" x2="26" y2="33"
            stroke="white"
            strokeWidth={3.5}
            strokeLinecap="round"
          />
          <circle cx="26" cy="39" r="2" fill="white" />
        </svg>
      </div>
    );
  }
);

WarningIndicator.displayName = 'WarningIndicator';
