import { forwardRef } from 'react';
import { PulseBarsProps } from '../../types';
import { cn, normalizeSize, parseSizeToNumber, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * PulseBars - Equalizer-style bars loader
 *
 * A loader with bars that pulse like an audio equalizer.
 *
 * @example
 * ```tsx
 * <PulseBars size="lg" color="#3b82f6" />
 * <PulseBars size="md" barCount={6} speed="fast" reverse />
 * ```
 */
export const PulseBars = forwardRef<HTMLDivElement, PulseBarsProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      barCount = 4,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'pulse-bars',
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

    const sizeValue = parseSizeToNumber(size, 40);
    const barWidth = Math.floor(sizeValue / (barCount * 2));

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center gap-1', className)}
        style={{
          height: normalizeSize(size),
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: barCount }).map((_, index) => {
          // Random-looking delays for equalizer effect
          const delays = [0, 0.2, 0.4, 0.1, 0.3, 0.5];
          const reversedDelays = [...delays].reverse();
          const delay = reverse ? reversedDelays[index % reversedDelays.length] : delays[index % delays.length];

          return (
            <div
              key={index}
              className="rounded-sm"
              style={{
                width: `${barWidth}px`,
                minHeight: '30%',
                height: '100%',
                backgroundColor: color,
                animation: `pulse-wave ${effectiveDuration} ease-in-out infinite`,
                animationDelay: `${delay}s`,
                transformOrigin: 'center',
              }}
            />
          );
        })}
      </div>
    );
  }
);

PulseBars.displayName = 'PulseBars';
