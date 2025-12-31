import { forwardRef } from 'react';
import { SpinnerWaveProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * SpinnerWave - Ripple wave spinner
 *
 * A spinner with expanding ripple circles creating a wave effect.
 *
 * @example
 * ```tsx
 * <SpinnerWave size={60} color="#3b82f6" />
 * <SpinnerWave size={80} ripples={5} />
 * <SpinnerWave size={50} maxScale={2.5} speed="fast" />
 * ```
 */
export const SpinnerWave = forwardRef<HTMLDivElement, SpinnerWaveProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      ripples = 3,
      maxScale = 2,
      speed = 'normal',
      className,
      style,
      testId = 'spinner-wave',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const animationDuration = getAnimationDuration(speed);
    const sizeValue = normalizeSize(size);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={style}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="relative"
          style={{
            width: sizeValue,
            height: sizeValue,
          }}
        >
          {/* Expanding ripples */}
          {Array.from({ length: ripples }).map((_, index) => (
            <div
              key={index}
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: color,
                animation: `ripple-expand ${animationDuration} ease-out infinite`,
                animationDelay: `${index * 0.4}s`,
                // @ts-ignore - CSS variable for animation
                '--max-scale': maxScale,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

SpinnerWave.displayName = 'SpinnerWave';
