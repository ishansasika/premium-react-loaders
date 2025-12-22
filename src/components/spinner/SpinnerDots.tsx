import { forwardRef } from 'react';
import { SpinnerDotsProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * SpinnerDots - Multiple dots rotating around center
 *
 * A spinner with multiple dots arranged in a circle that rotates continuously.
 *
 * @example
 * ```tsx
 * <SpinnerDots size={40} color="#3b82f6" />
 * <SpinnerDots size={48} dotCount={8} dotSize={6} />
 * ```
 */
export const SpinnerDots = forwardRef<HTMLDivElement, SpinnerDotsProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      dotCount = 8,
      dotSize = 4,
      speed = 'normal',
      className,
      style,
      testId = 'spinner-dots',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const radius = (sizeValue - dotSize) / 2;

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
            width: normalizeSize(size),
            height: normalizeSize(size),
            animation: `spinner-rotate ${getAnimationDuration(speed)} linear infinite`,
          }}
        >
          {Array.from({ length: dotCount }).map((_, index) => {
            const angle = (360 / dotCount) * index;
            const radian = (angle * Math.PI) / 180;
            const x = radius * Math.cos(radian) + radius;
            const y = radius * Math.sin(radian) + radius;

            return (
              <div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: normalizeSize(dotSize),
                  height: normalizeSize(dotSize),
                  backgroundColor: color,
                  left: `${x}px`,
                  top: `${y}px`,
                  opacity: 1 - (index / dotCount) * 0.7, // Fade effect
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

SpinnerDots.displayName = 'SpinnerDots';
