import { forwardRef } from 'react';
import { InfoIndicatorProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';

/**
 * InfoIndicator - Animated info indicator with circle and information mark
 *
 * Displays an animated info icon with a circle and "i" mark, perfect for showing
 * information, hints, or notice states.
 *
 * @example
 * ```tsx
 * // Simple info indicator
 * <InfoIndicator visible={hasInfo} />
 *
 * // With pulse glow effect
 * <InfoIndicator
 *   visible={hasInfo}
 *   pulse
 * />
 *
 * // Custom size, color and duration
 * <InfoIndicator
 *   visible={hasInfo}
 *   size={64}
 *   color="#3b82f6"
 *   duration={600}
 * />
 * ```
 */
export const InfoIndicator = forwardRef<HTMLDivElement, InfoIndicatorProps>(
  (
    {
      size = 48,
      color = '#3b82f6',
      animate = true,
      pulse = false,
      duration = 500,
      delay = 0,
      minDuration = 0,
      transition = true,
      className,
      style,
      testId = 'info-indicator',
      visible = true,
      ariaLabel = 'Info',
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

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', animate && 'animate-info-scale', className)}
        style={{
          opacity,
          transition: transitionStyle,
          animationDuration: animate ? `${duration}ms` : undefined,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        {...rest}
      >
        <div
          className={cn('rounded-full inline-flex items-center justify-center', pulse && 'animate-info-pulse-glow')}
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            ['--info-color' as string]: color,
          }}
        >
          <svg
            style={{ width: size * 0.5, height: size * 0.5 }}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="8" r="1.5" fill="white" />
            <line x1="12" y1="12" x2="12" y2="18" stroke="white" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
        </div>
      </div>
    );
  }
);

InfoIndicator.displayName = 'InfoIndicator';
