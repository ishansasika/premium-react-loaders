import { forwardRef } from 'react';
import { PerspectiveRingProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * PerspectiveRing - 3D ring with perspective and shadow
 *
 * A ring that appears to rotate in 3D space with adjustable tilt,
 * creating depth perception with optional shadow effects.
 *
 * @example
 * ```tsx
 * <PerspectiveRing size={80} />
 * <PerspectiveRing
 *   size={100}
 *   tilt={60}
 *   thickness={8}
 *   showShadow
 *   segments={12}
 * />
 * ```
 */
export const PerspectiveRing = forwardRef<HTMLDivElement, PerspectiveRingProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      tilt = 45,
      thickness = 4,
      showShadow = true,
      shadowBlur = 10,
      segments = 8,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'perspective-ring',
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

    const ringSize = normalizeSize(size);
    const tiltAngle = Math.min(Math.max(tilt, 0), 90);
    const segmentCount = Math.min(Math.max(segments, 4), 24);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
          perspective: '800px',
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div className="relative" style={{ width: ringSize, height: ringSize }}>
          {/* Shadow */}
          {showShadow && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `calc(${ringSize} * 0.8)`,
                height: `calc(${ringSize} * 0.2)`,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                filter: `blur(${shadowBlur}px)`,
                transform: `translate(-50%, calc(${ringSize} * 0.3))`,
              }}
            />
          )}

          {/* Ring container */}
          <div
            className="absolute inset-0 animate-spinner-rotate"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tiltAngle}deg)`,
              animationDuration: effectiveDuration,
              animationDirection: reverse ? 'reverse' : 'normal',
            }}
          >
            {/* Ring segments */}
            {Array.from({ length: segmentCount }).map((_, index) => {
              const angle = (index / segmentCount) * 360;
              const segmentOpacity = 0.3 + (Math.cos((angle * Math.PI) / 180) + 1) / 2 * 0.7;

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: ringSize,
                    height: ringSize,
                    borderRadius: '50%',
                    border: `${thickness}px solid ${color}`,
                    borderColor: 'transparent',
                    borderTopColor: color,
                    transform: `rotateZ(${angle}deg)`,
                    opacity: segmentOpacity,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);

PerspectiveRing.displayName = 'PerspectiveRing';
