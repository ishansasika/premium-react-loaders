import { forwardRef } from 'react';
import { SpinnerGridProps } from '../../types';
import { cn, normalizeSize, parseSizeToNumber, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * SpinnerGrid - Grid of fading squares
 *
 * A spinner with a grid of squares that fade in and out in a pattern.
 *
 * @example
 * ```tsx
 * <SpinnerGrid size="lg" color="#3b82f6" />
 * <SpinnerGrid size="md" gridSize={4} reverse />
 * ```
 */
export const SpinnerGrid = forwardRef<HTMLDivElement, SpinnerGridProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      gridSize = 3,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'spinner-grid',
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
    const cellSize = Math.floor(sizeValue / gridSize) - 2;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="grid gap-0.5"
          style={{
            width: normalizeSize(size),
            height: normalizeSize(size),
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            const maxDelay = (gridSize - 1) * 2;
            const delay = reverse ? (maxDelay - (row + col)) * 0.1 : (row + col) * 0.1;

            return (
              <div
                key={index}
                className="rounded-sm"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: color,
                  animation: `fade-pulse ${effectiveDuration} ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

SpinnerGrid.displayName = 'SpinnerGrid';
