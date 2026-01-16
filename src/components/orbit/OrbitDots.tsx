import { forwardRef } from 'react';
import { OrbitDotsProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * OrbitDots - Dots orbiting around a center point
 *
 * Multiple dots rotating in a circular path.
 *
 * @example
 * ```tsx
 * <OrbitDots size={60} color="#3b82f6" />
 * <OrbitDots dotCount={6} dotSize={6} speed="fast" />
 * <OrbitDots stagger color="#10b981" />
 * ```
 */
export const OrbitDots = forwardRef<HTMLDivElement, OrbitDotsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      dotCount = 4,
      dotSize = 8,
      orbitRadius = 0.4,
      stagger = true,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'orbit-dots',
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

    const normalizedSize = normalizeSize(size);
    const sizeNum = parseInt(normalizedSize, 10);
    const radius = sizeNum * orbitRadius;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          width: normalizedSize,
          height: normalizedSize,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="relative w-full h-full"
          style={{
            animation: `orbit-rotate ${effectiveDuration} linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {Array.from({ length: dotCount }, (_, index) => {
            const angle = (360 / dotCount) * index;
            const dotColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
            const staggerDelay = stagger ? `${(index / dotCount) * 300}ms` : '0ms';

            return (
              <div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px)`,
                  opacity: stagger ? undefined : 1,
                  animation: stagger ? `orbit-dot-pulse 1s ease-in-out infinite` : undefined,
                  animationDelay: staggerDelay,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

OrbitDots.displayName = 'OrbitDots';
