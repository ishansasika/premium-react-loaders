import { forwardRef } from 'react';
import { WaveCircleProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility, parseDurationMs } from '../../utils';

/**
 * WaveCircle - Concentric ripples expanding outward like a sonar pulse
 *
 * @example
 * ```tsx
 * <WaveCircle color="#3b82f6" />
 * <WaveCircle size={100} ringCount={4} />
 * ```
 */
export const WaveCircle = forwardRef<HTMLDivElement, WaveCircleProps>(
  (
    {
      size = 80,
      color = '#3b82f6',
      ringCount = 3,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'wave-circle',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(visible, delay, minDuration, transition);

    if (!shouldRender) return null;

    const clampedCount = Math.min(5, Math.max(2, ringCount));
    const durationMs = parseDurationMs(effectiveDuration);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size, opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {/* Central dot */}
        <div
          className="absolute rounded-full z-10"
          style={{ width: size * 0.15, height: size * 0.15, backgroundColor: color }}
        />
        {/* Rings */}
        {Array.from({ length: clampedCount }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2"
            style={{
              width: size,
              height: size,
              borderColor: color,
              animation: `wave-circle-expand ${effectiveDuration} ease-out infinite`,
              animationDelay: `${(i / clampedCount) * durationMs}ms`,
            }}
          />
        ))}
      </div>
    );
  }
);

WaveCircle.displayName = 'WaveCircle';
