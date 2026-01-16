import { forwardRef } from 'react';
import { OrbitRingsProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * OrbitRings - Concentric rings with rotation animation
 *
 * Multiple rings rotating at different speeds, creating a hypnotic effect.
 *
 * @example
 * ```tsx
 * <OrbitRings size={60} color="#3b82f6" />
 * <OrbitRings ringCount={4} alternate />
 * <OrbitRings thickness={3} ringGap={8} />
 * ```
 */
export const OrbitRings = forwardRef<HTMLDivElement, OrbitRingsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      thickness = 2,
      ringCount = 3,
      ringGap = 6,
      alternate = true,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'orbit-rings',
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
        <div className="relative w-full h-full">
          {Array.from({ length: ringCount }, (_, index) => {
            const ringSize = sizeNum - (index * (ringGap + thickness) * 2);
            if (ringSize <= 0) return null;

            const ringColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
            const shouldReverse = alternate ? (index % 2 === 1) !== reverse : reverse;
            const ringDuration = durationNum + (index * 200);

            return (
              <div
                key={index}
                className="absolute rounded-full"
                style={{
                  width: ringSize,
                  height: ringSize,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: `${thickness}px solid transparent`,
                  borderTopColor: ringColor,
                  borderRightColor: ringColor,
                  animation: `orbit-rotate ${ringDuration}ms linear infinite`,
                  animationDirection: shouldReverse ? 'reverse' : 'normal',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

OrbitRings.displayName = 'OrbitRings';
