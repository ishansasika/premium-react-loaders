import React, { forwardRef } from 'react';
import { SpinnerBarsProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * SpinnerBars - Vertical bars with wave animation
 *
 * A spinner with vertical bars that animate in a wave pattern.
 *
 * @example
 * ```tsx
 * <SpinnerBars size={40} color="#3b82f6" />
 * <SpinnerBars size={32} barCount={5} speed="fast" />
 * ```
 */
export const SpinnerBars = forwardRef<HTMLDivElement, SpinnerBarsProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      barCount = 5,
      speed = 'normal',
      className,
      style,
      testId = 'spinner-bars',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const barWidth = Math.floor(sizeValue / (barCount * 2));
    const animationDuration = getAnimationDuration(speed);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center gap-1', className)}
        style={{
          height: normalizeSize(size),
          ...style,
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
              animation: `pulse-wave ${animationDuration} ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

SpinnerBars.displayName = 'SpinnerBars';
