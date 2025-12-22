import React, { forwardRef } from 'react';
import { PulseWaveProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * PulseWave - Wave pattern loader
 *
 * A loader with bars that animate in a wave pattern.
 *
 * @example
 * ```tsx
 * <PulseWave size={40} color="#3b82f6" />
 * <PulseWave size={32} barCount={7} speed="slow" />
 * ```
 */
export const PulseWave = forwardRef<HTMLDivElement, PulseWaveProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      barCount = 5,
      speed = 'normal',
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

    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const barWidth = Math.floor(sizeValue / (barCount * 2.5));
    const animationDuration = getAnimationDuration(speed);

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
          const delay = (index / barCount) * 0.5;

          return (
            <div
              key={index}
              className="rounded-sm"
              style={{
                width: `${barWidth}px`,
                height: '100%',
                backgroundColor: color,
                animation: `pulse-wave ${animationDuration} ease-in-out infinite`,
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
