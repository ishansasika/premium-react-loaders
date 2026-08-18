import { forwardRef } from 'react';
import { NeonDotsProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * NeonDots - Bouncing dots with a glowing neon box-shadow
 *
 * @example
 * ```tsx
 * <NeonDots color="#22d3ee" />
 * <NeonDots dotCount={4} dotSize={14} speed="fast" />
 * ```
 */
export const NeonDots = forwardRef<HTMLDivElement, NeonDotsProps>(
  (
    {
      dotCount = 3,
      dotSize = 12,
      color = '#3b82f6',
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'neon-dots',
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

    const glowSize = normalizeSize(dotSize);

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
              backgroundColor: color,
              boxShadow: `0 0 ${glowSize} ${color}`,
              animation: `pulse-bounce ${effectiveDuration} ease-in-out infinite`,
              animationDelay: reverse ? `${(dotCount - index - 1) * 0.15}s` : `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

NeonDots.displayName = 'NeonDots';
