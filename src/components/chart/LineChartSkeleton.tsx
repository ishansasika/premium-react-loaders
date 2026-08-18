import { forwardRef } from 'react';
import { LineChartSkeletonProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';

/**
 * LineChartSkeleton - Placeholder for a line/trend chart while data loads
 *
 * @example
 * ```tsx
 * <LineChartSkeleton width={280} height={120} points={7} />
 * <LineChartSkeleton showGrid={false} />
 * ```
 */
export const LineChartSkeleton = forwardRef<HTMLDivElement, LineChartSkeletonProps>(
  (
    {
      width = 240,
      height = 120,
      points = 6,
      showGrid = true,
      strokeWidth = 3,
      animate = true,
      baseColor = '#d1d5db',
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'line-chart-skeleton',
      visible = true,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const padding = 8;
    const usableWidth = width - padding * 2;
    const usableHeight = height - padding * 2;

    // Deterministic wave so the placeholder reads as a trend line, not random noise
    const coords = Array.from({ length: points }).map((_, i) => {
      const x = padding + (usableWidth * i) / (points - 1);
      const y = padding + usableHeight * (0.5 - 0.35 * Math.sin(i * 1.1 + 0.5));
      return [x, y];
    });
    const pathD = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-block', className)}
        style={{ width, height, opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel ?? 'Loading chart...'}
        aria-busy="true"
        {...rest}
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {showGrid && (
            <g stroke={baseColor} strokeOpacity={0.25} strokeWidth={1}>
              {[0.25, 0.5, 0.75].map((frac) => (
                <line key={frac} x1={padding} x2={width - padding} y1={height * frac} y2={height * frac} />
              ))}
            </g>
          )}
          <path
            d={pathD}
            fill="none"
            stroke={baseColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
            className={animate ? 'animate-chart-line' : undefined}
          />
          {coords.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={strokeWidth} fill={baseColor} />
          ))}
        </svg>
      </div>
    );
  }
);

LineChartSkeleton.displayName = 'LineChartSkeleton';
