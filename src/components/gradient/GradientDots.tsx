import { forwardRef } from 'react';
import { GradientDotsProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * GradientDots - Bouncing dots, each filled with a shared animated gradient
 *
 * @example
 * ```tsx
 * <GradientDots color="#3b82f6" secondaryColor="#8b5cf6" />
 * <GradientDots dotCount={5} dotSize={14} speed="fast" />
 * ```
 */
export const GradientDots = forwardRef<HTMLDivElement, GradientDotsProps>(
  (
    {
      dotCount = 3,
      dotSize = 12,
      color = '#3b82f6',
      secondaryColor = '#ec4899',
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'gradient-dots',
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

    const gradient = `linear-gradient(135deg, ${color}, ${secondaryColor})`;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center gap-2', className)}
        style={{ opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: dotCount }).map((_, index) => (
          <div
            key={index}
            className="rounded-full"
            style={{
              width: normalizeSize(dotSize),
              height: normalizeSize(dotSize),
              backgroundImage: gradient,
              animation: `pulse-bounce ${effectiveDuration} ease-in-out infinite`,
              animationDelay: reverse ? `${(dotCount - index - 1) * 0.15}s` : `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

GradientDots.displayName = 'GradientDots';
