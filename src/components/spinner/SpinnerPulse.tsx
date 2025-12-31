import { forwardRef } from 'react';
import { SpinnerPulseProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * SpinnerPulse - Heartbeat pulse spinner
 *
 * A spinner with pulsing circles that scale and fade, creating a heartbeat effect.
 *
 * @example
 * ```tsx
 * <SpinnerPulse size={60} color="#3b82f6" />
 * <SpinnerPulse size={80} pulses={3} />
 * <SpinnerPulse size={50} maxScale={2.5} speed="slow" />
 * ```
 */
export const SpinnerPulse = forwardRef<HTMLDivElement, SpinnerPulseProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      pulses = 2,
      maxScale = 1.8,
      speed = 'normal',
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

    const animationDuration = getAnimationDuration(speed);
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
                animation: `heartbeat-pulse ${animationDuration} ease-out infinite`,
                animationDelay: `${index * 0.3}s`,
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
