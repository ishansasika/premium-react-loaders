import { forwardRef } from 'react';
import { SpinnerBarsProps } from '../../types';
import {
  cn,
  normalizeSize,
  parseSizeToNumber,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * SpinnerBars - Vertical bars with wave animation
 *
 * A spinner with vertical bars that animate in a wave pattern.
 *
 * @example
 * ```tsx
 * <SpinnerBars size="lg" color="#3b82f6" />
 * <SpinnerBars size="sm" barCount={5} speed="fast" reverse />
 * ```
 */
export const SpinnerBars = forwardRef<HTMLDivElement, SpinnerBarsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      barCount = 5,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'spinner-bars',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const sizeValue = parseSizeToNumber(size, 40);
    const barWidth = Math.floor(sizeValue / (barCount * 2));

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center gap-1', className)}
        style={{
          height: normalizeSize(size),
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: barCount }).map((_, index) => (
          <div
            key={index}
            className="rounded-sm"
            style={{
              width: `${barWidth}px`,
              height: '100%',
              backgroundColor: color,
              animation: `pulse-wave ${effectiveDuration} ease-in-out infinite`,
              animationDelay: reverse ? `${(barCount - index - 1) * 0.1}s` : `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

SpinnerBars.displayName = 'SpinnerBars';
