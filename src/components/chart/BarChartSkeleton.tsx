import { forwardRef } from 'react';
import { BarChartSkeletonProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';
import { Skeleton } from '../skeleton/Skeleton';

/**
 * BarChartSkeleton - Placeholder for a bar chart while data loads
 *
 * @example
 * ```tsx
 * <BarChartSkeleton bars={6} height={120} />
 * <BarChartSkeleton bars={4} showAxis={false} />
 * ```
 */
export const BarChartSkeleton = forwardRef<HTMLDivElement, BarChartSkeletonProps>(
  (
    {
      bars = 6,
      width = '100%',
      height = 120,
      gap = 8,
      showAxis = true,
      animate = true,
      baseColor,
      highlightColor,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'bar-chart-skeleton',
      visible = true,
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

    // Deterministic wave pattern so bar heights look chart-like, not random noise
    const barHeights = Array.from({ length: bars }).map(
      (_, i) => 35 + Math.abs(Math.sin(i * 1.3 + 1)) * 65
    );

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('flex items-end', showAxis && 'border-b border-gray-200', className)}
        style={{
          width: normalizeSize(width),
          height,
          gap,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label="Loading chart..."
        aria-busy="true"
        {...rest}
      >
        {barHeights.map((pct, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            width="100%"
            height={`${pct}%`}
            animate={animate}
            baseColor={baseColor}
            highlightColor={highlightColor}
            style={{ flex: 1 }}
          />
        ))}
      </div>
    );
  }
);

BarChartSkeleton.displayName = 'BarChartSkeleton';
