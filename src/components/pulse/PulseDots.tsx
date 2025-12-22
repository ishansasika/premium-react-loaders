import { forwardRef } from 'react';
import { PulseDotsProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * PulseDots - Bouncing dots loader
 *
 * A loader with bouncing dots that scale and fade in a sequence.
 *
 * @example
 * ```tsx
 * <PulseDots size={40} color="#3b82f6" />
 * <PulseDots size={32} dotCount={5} speed="fast" />
 * ```
 */
export const PulseDots = forwardRef<HTMLDivElement, PulseDotsProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      dotCount = 3,
      dotSize = 10,
      speed = 'normal',
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

    const animationDuration = getAnimationDuration(speed);

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
              animation: `pulse-bounce ${animationDuration} ease-in-out infinite`,
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

PulseDots.displayName = 'PulseDots';
