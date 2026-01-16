import { forwardRef } from 'react';
import { BouncingBallsProps } from '../../types';
import {
  cn,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * BouncingBalls - 3D-style bouncing balls with physics
 *
 * Balls bouncing with squash, stretch, and shadow effects for a realistic feel.
 *
 * @example
 * ```tsx
 * <BouncingBalls color="#3b82f6" />
 * <BouncingBalls ballCount={4} shadow squash />
 * <BouncingBalls ballSize={16} bounceHeight={2} />
 * ```
 */
export const BouncingBalls = forwardRef<HTMLDivElement, BouncingBallsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      ballCount = 3,
      ballSize = 14,
      gap = 10,
      bounceHeight = 1.5,
      shadow = true,
      squash = true,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'bouncing-balls',
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

    const totalWidth = ballCount * ballSize + (ballCount - 1) * gap;
    const bounceDistance = ballSize * bounceHeight;
    const shadowSize = ballSize * 0.8;
    const staggerDelay = 200;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-end justify-center', className)}
        style={{
          width: totalWidth,
          height: ballSize + bounceDistance + (shadow ? 8 : 0),
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: ballCount }, (_, index) => {
          const ballColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;
          const animationDelay = `${index * staggerDelay}ms`;

          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              style={{
                marginRight: index < ballCount - 1 ? gap : 0,
              }}
            >
              {/* Ball */}
              <div
                className="rounded-full"
                style={{
                  width: ballSize,
                  height: ballSize,
                  backgroundColor: ballColor,
                  animation: squash
                    ? `bounce-ball-squash ${effectiveDuration} ease-in-out infinite`
                    : `bounce-ball ${effectiveDuration} ease-in-out infinite`,
                  animationDelay,
                  ['--bounce-height' as string]: `${bounceDistance}px`,
                  transformOrigin: 'center bottom',
                }}
              />

              {/* Shadow */}
              {shadow && (
                <div
                  className="absolute bottom-0 rounded-full"
                  style={{
                    width: shadowSize,
                    height: shadowSize * 0.3,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    animation: `bounce-shadow ${effectiveDuration} ease-in-out infinite`,
                    animationDelay,
                    filter: 'blur(2px)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

BouncingBalls.displayName = 'BouncingBalls';
