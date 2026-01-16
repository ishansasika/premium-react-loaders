import { forwardRef } from 'react';
import { BouncingDotsProps } from '../../types';
import {
  cn,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * BouncingDots - Dots bouncing with physics-based easing
 *
 * Multiple dots bouncing up and down with a natural elastic feel.
 *
 * @example
 * ```tsx
 * <BouncingDots color="#3b82f6" />
 * <BouncingDots dotCount={5} dotSize={12} />
 * <BouncingDots bounceHeight={1.5} staggerDelay={100} />
 * ```
 */
export const BouncingDots = forwardRef<HTMLDivElement, BouncingDotsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      dotCount = 3,
      dotSize = 10,
      gap = 8,
      bounceHeight = 1,
      staggerDelay = 150,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'bouncing-dots',
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

    const totalWidth = dotCount * dotSize + (dotCount - 1) * gap;
    const bounceDistance = dotSize * bounceHeight;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-end justify-center', className)}
        style={{
          width: totalWidth,
          height: dotSize + bounceDistance,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: dotCount }, (_, index) => {
          const dotColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
          const animationDelay = `${index * staggerDelay}ms`;

          return (
            <div
              key={index}
              className="rounded-full"
              style={{
                width: dotSize,
                height: dotSize,
                backgroundColor: dotColor,
                marginRight: index < dotCount - 1 ? gap : 0,
                animation: `bounce-dot ${effectiveDuration} ease-in-out infinite`,
                animationDelay,
                ['--bounce-height' as string]: `${bounceDistance}px`,
              }}
            />
          );
        })}
      </div>
    );
  }
);

BouncingDots.displayName = 'BouncingDots';
