import { forwardRef } from 'react';
import { PulseBarsProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * PulseBars - Equalizer-style bars loader
 *
 * A loader with bars that pulse like an audio equalizer.
 *
 * @example
 * ```tsx
 * <PulseBars size={40} color="#3b82f6" />
 * <PulseBars size={48} barCount={6} speed="fast" />
 * ```
 */
export const PulseBars = forwardRef<HTMLDivElement, PulseBarsProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      barCount = 4,
      speed = 'normal',
      className,
      style,
      testId = 'pulse-bars',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const barWidth = Math.floor(sizeValue / (barCount * 2));
    const animationDuration = getAnimationDuration(speed);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center gap-1', className)}
        style={{
          height: normalizeSize(size),
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: barCount }).map((_, index) => {
          // Random-looking delays for equalizer effect
          const delays = [0, 0.2, 0.4, 0.1, 0.3, 0.5];
          const delay = delays[index % delays.length];

          return (
            <div
              key={index}
              className="rounded-sm"
              style={{
                width: `${barWidth}px`,
                minHeight: '30%',
                height: '100%',
                backgroundColor: color,
                animation: `pulse-wave ${animationDuration} ease-in-out infinite`,
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
