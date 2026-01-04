import { forwardRef } from 'react';
import { PulseDotsProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration } from '../../utils';

/**
 * PulseDots - Bouncing dots loader
 *
 * A loader with bouncing dots that scale and fade in a sequence.
 *
 * @example
 * ```tsx
 * <PulseDots size="lg" color="#3b82f6" />
 * <PulseDots size="sm" dotCount={5} speed="fast" reverse />
 * ```
 */
export const PulseDots = forwardRef<HTMLDivElement, PulseDotsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      dotCount = 3,
      dotSize = 10,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      className,
      style,
      testId = 'pulse-dots',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center gap-2', className)}
        style={{
          height: normalizeSize(size),
          ...style,
        }}
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
              animation: `pulse-bounce ${effectiveDuration} ease-in-out infinite`,
              animationDelay: reverse ? `${(dotCount - index - 1) * 0.15}s` : `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

PulseDots.displayName = 'PulseDots';
