import { forwardRef } from 'react';
import { SpinnerWaveProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration } from '../../utils';

/**
 * SpinnerWave - Ripple wave spinner
 *
 * A spinner with expanding ripple circles creating a wave effect.
 *
 * @example
 * ```tsx
 * <SpinnerWave size="lg" color="#3b82f6" />
 * <SpinnerWave size="xl" ripples={5} reverse />
 * <SpinnerWave size="md" maxScale={2.5} speed="fast" />
 * ```
 */
export const SpinnerWave = forwardRef<HTMLDivElement, SpinnerWaveProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      ripples = 3,
      maxScale = 2,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      className,
      style,
      testId = 'spinner-wave',
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
          {/* Expanding ripples */}
          {Array.from({ length: ripples }).map((_, index) => (
            <div
              key={index}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: color,
                animation: `ripple-expand ${effectiveDuration} ease-out infinite`,
                animationDelay: reverse ? `${(ripples - index - 1) * 0.4}s` : `${index * 0.4}s`,
                animationDirection: reverse ? 'reverse' : 'normal',
                // @ts-ignore - CSS variable for animation
                '--max-scale': maxScale,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

SpinnerWave.displayName = 'SpinnerWave';
