import { forwardRef } from 'react';
import { MobiusLoaderProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * MobiusLoader - Möbius strip-style continuous loop
 *
 * A ribbon-like loader that creates a continuous looping effect.
 *
 * @example
 * ```tsx
 * <MobiusLoader color="#3b82f6" />
 * <MobiusLoader segments={8} twist />
 * <MobiusLoader ribbonWidth={6} thickness={2} />
 * ```
 */
export const MobiusLoader = forwardRef<HTMLDivElement, MobiusLoaderProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      thickness = 2,
      segments = 6,
      twist = true,
      ribbonWidth = 8,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'mobius-loader',
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
    const durationNum = parseInt(effectiveDuration, 10);

    // Calculate segment positions around an oval
    const centerX = sizeNum / 2;
    const centerY = sizeNum / 2;
    const radiusX = (sizeNum - ribbonWidth) / 2;
    const radiusY = (sizeNum - ribbonWidth) / 3;

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
            animation: `mobius-rotate ${durationNum}ms linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {Array.from({ length: segments }, (_, index) => {
            const angle = (360 / segments) * index;
            const radians = (angle * Math.PI) / 180;
            const x = centerX + radiusX * Math.cos(radians);
            const y = centerY + radiusY * Math.sin(radians);

            // Twist effect - rotate each segment based on position
            const twistAngle = twist ? angle + 90 : 90;
            const segmentOpacity = 0.3 + (0.7 * (index / segments));
            const segmentColor = secondaryColor && index % 2 === 0 ? secondaryColor : color;

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  width: ribbonWidth,
                  height: thickness,
                  backgroundColor: segmentColor,
                  borderRadius: thickness / 2,
                  left: x - ribbonWidth / 2,
                  top: y - thickness / 2,
                  transform: `rotate(${twistAngle}deg)`,
                  opacity: segmentOpacity,
                  animation: `mobius-segment ${durationNum}ms ease-in-out infinite`,
                  animationDelay: `${(index / segments) * durationNum}ms`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

MobiusLoader.displayName = 'MobiusLoader';
