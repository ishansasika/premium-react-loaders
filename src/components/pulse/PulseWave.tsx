import { forwardRef } from 'react';
import { PulseWaveProps } from '../../types';
import { cn, normalizeSize, parseSizeToNumber, useReducedMotion, getEffectiveDuration } from '../../utils';

/**
 * PulseWave - Wave pattern loader
 *
 * A loader with bars that animate in a wave pattern.
 *
 * @example
 * ```tsx
 * <PulseWave size="lg" color="#3b82f6" />
 * <PulseWave size="sm" barCount={7} speed="slow" reverse />
 * ```
 */
export const PulseWave = forwardRef<HTMLDivElement, PulseWaveProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      barCount = 5,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      className,
      style,
      testId = 'pulse-wave',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);

    const sizeValue = parseSizeToNumber(size, 40);
    const barWidth = Math.floor(sizeValue / (barCount * 2.5));

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-end justify-center gap-1', className)}
        style={{
          height: normalizeSize(size),
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: barCount }).map((_, index) => {
          const delay = reverse ? ((barCount - index - 1) / barCount) * 0.5 : (index / barCount) * 0.5;

          return (
            <div
              key={index}
              className="rounded-sm"
              style={{
                width: `${barWidth}px`,
                height: '100%',
                backgroundColor: color,
                animation: `pulse-wave ${effectiveDuration} ease-in-out infinite`,
                animationDelay: `${delay}s`,
                transformOrigin: 'bottom',
              }}
            />
          );
        })}
      </div>
    );
  }
);

PulseWave.displayName = 'PulseWave';
