import { forwardRef } from 'react';
import { PlaneRotateProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * PlaneRotate - Multiple rotating planes in 3D space
 *
 * Creates a mesmerizing effect with multiple semi-transparent planes
 * rotating in 3D space with different timing patterns.
 *
 * @example
 * ```tsx
 * <PlaneRotate size={60} />
 * <PlaneRotate
 *   size={80}
 *   planeCount={4}
 *   rotationType="staggered"
 *   spacing={8}
 *   opacity={0.7}
 * />
 * ```
 */
export const PlaneRotate = forwardRef<HTMLDivElement, PlaneRotateProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      planeCount = 3,
      spacing = 6,
      rotationType = 'staggered',
      opacity: planeOpacity = 0.6,
      showAxis = false,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'plane-rotate',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity: containerOpacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const planeSize = normalizeSize(size);
    const count = Math.min(Math.max(planeCount, 2), 6);

    const animationClass = {
      synchronized: 'animate-plane-rotate-sync',
      staggered: 'animate-plane-rotate-stagger',
      opposite: 'animate-plane-rotate-opposite',
    }[rotationType];

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity: containerOpacity,
          transition: transitionStyle,
          perspective: '600px',
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="relative"
          style={{
            width: planeSize,
            height: planeSize,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Central axis indicator (optional) */}
          {showAxis && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: '2px',
                height: planeSize,
                backgroundColor: color,
                opacity: 0.3,
              }}
            />
          )}

          {/* Rotating planes */}
          {Array.from({ length: count }).map((_, index) => {
            const delay = rotationType === 'staggered' ? `${index * 0.15}s` : '0s';
            const direction =
              rotationType === 'opposite' && index % 2 === 1
                ? reverse
                  ? 'normal'
                  : 'reverse'
                : reverse
                ? 'reverse'
                : 'normal';

            return (
              <div
                key={index}
                className={cn('absolute inset-0', animationClass)}
                style={{
                  backgroundColor: color,
                  opacity: planeOpacity,
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${(index - count / 2) * spacing}px)`,
                  animationDuration: effectiveDuration,
                  animationDelay: delay,
                  animationDirection: direction,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

PlaneRotate.displayName = 'PlaneRotate';
