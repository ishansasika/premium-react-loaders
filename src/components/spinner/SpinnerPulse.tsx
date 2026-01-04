import { forwardRef } from 'react';
import { SpinnerPulseProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration } from '../../utils';

/**
 * SpinnerPulse - Heartbeat pulse spinner
 *
 * A spinner with pulsing circles that scale and fade, creating a heartbeat effect.
 *
 * @example
 * ```tsx
 * <SpinnerPulse size="lg" color="#3b82f6" />
 * <SpinnerPulse size="xl" pulses={3} reverse />
 * <SpinnerPulse size="md" maxScale={2.5} speed="slow" />
 * ```
 */
export const SpinnerPulse = forwardRef<HTMLDivElement, SpinnerPulseProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      pulses = 2,
      maxScale = 1.8,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      className,
      style,
      testId = 'spinner-pulse',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const sizeValue = normalizeSize(size);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={style}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="relative"
          style={{
            width: sizeValue,
            height: sizeValue,
          }}
        >
          {/* Pulsing circles */}
          {Array.from({ length: pulses }).map((_, index) => (
            <div
              key={index}
              className="absolute inset-0 rounded-full"
              style={{
                backgroundColor: color,
                animation: `heartbeat-pulse ${effectiveDuration} ease-out infinite`,
                animationDelay: reverse ? `${(pulses - index - 1) * 0.3}s` : `${index * 0.3}s`,
                animationDirection: reverse ? 'reverse' : 'normal',
                // @ts-ignore - CSS variable for animation
                '--max-scale': maxScale,
              }}
            />
          ))}

          {/* Static center circle */}
          <div
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: '50%',
              height: '50%',
              top: '25%',
              left: '25%',
            }}
          />
        </div>
      </div>
    );
  }
);

SpinnerPulse.displayName = 'SpinnerPulse';
