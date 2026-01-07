import { forwardRef } from 'react';
import { SpinnerDotsProps } from '../../types';
import {
  cn,
  normalizeSize,
  parseSizeToNumber,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * SpinnerDots - Multiple dots rotating around center
 *
 * A spinner with multiple dots arranged in a circle that rotates continuously.
 *
 * @example
 * ```tsx
 * <SpinnerDots size="lg" color="#3b82f6" />
 * <SpinnerDots size="md" dotCount={8} dotSize={6} reverse />
 * ```
 */
export const SpinnerDots = forwardRef<HTMLDivElement, SpinnerDotsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      dotCount = 8,
      dotSize = 4,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'spinner-dots',
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
    const dotSizeValue = parseSizeToNumber(dotSize, 4);
    const radius = (sizeValue - dotSizeValue) / 2;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
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
            animation: `spinner-rotate ${effectiveDuration} linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
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
