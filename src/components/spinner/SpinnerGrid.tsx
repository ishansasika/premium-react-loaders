import { forwardRef } from 'react';
import { SpinnerGridProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * SpinnerGrid - Grid of fading squares
 *
 * A spinner with a grid of squares that fade in and out in a pattern.
 *
 * @example
 * ```tsx
 * <SpinnerGrid size={40} color="#3b82f6" />
 * <SpinnerGrid size={48} gridSize={4} />
 * ```
 */
export const SpinnerGrid = forwardRef<HTMLDivElement, SpinnerGridProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      gridSize = 3,
      speed = 'normal',
      className,
      style,
      testId = 'spinner-grid',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const cellSize = Math.floor(sizeValue / gridSize) - 2;
    const animationDuration = getAnimationDuration(speed);

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
            const delay = (row + col) * 0.1;

            return (
              <div
                key={index}
                className="rounded-sm"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: color,
                  animation: `fade-pulse ${animationDuration} ease-in-out infinite`,
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
