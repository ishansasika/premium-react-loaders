import { forwardRef } from 'react';
import { DonutChartSkeletonProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';
import { Skeleton } from '../skeleton/Skeleton';

/**
 * DonutChartSkeleton - Placeholder for a donut/pie chart while data loads
 *
 * @example
 * ```tsx
 * <DonutChartSkeleton size={120} segments={4} />
 * <DonutChartSkeleton segments={3} showLabel={false} />
 * ```
 */
export const DonutChartSkeleton = forwardRef<HTMLDivElement, DonutChartSkeletonProps>(
  (
    {
      size = 120,
      thickness = 20,
      segments = 4,
      showLabel = true,
      animate = true,
      baseColor = '#e5e7eb',
      highlightColor = '#d1d5db',
      backgroundColor = 'white',
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'donut-chart-skeleton',
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

    const clampedSegments = Math.max(2, Math.min(6, segments));
    const step = 360 / clampedSegments;
    const gapDeg = 4;
    const stops: string[] = [];
    for (let i = 0; i < clampedSegments; i++) {
      const color = i % 2 === 0 ? baseColor : highlightColor;
      const start = i * step;
      const end = (i + 1) * step - gapDeg;
      stops.push(`${color} ${start}deg ${end}deg`, `transparent ${end}deg ${(i + 1) * step}deg`);
    }

    const hole = size - thickness * 2;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size, opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel ?? 'Loading chart...'}
        aria-busy="true"
        {...rest}
      >
        <div
          className={cn('absolute inset-0 rounded-full', animate && 'skeleton-animate')}
          style={{ background: `conic-gradient(${stops.join(', ')})` }}
        />
        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{ width: hole, height: hole, backgroundColor }}
        >
          {showLabel && hole >= 24 && (
            <Skeleton
              variant="text"
              width="60%"
              height="0.6rem"
              animate={animate}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          )}
        </div>
      </div>
    );
  }
);

DonutChartSkeleton.displayName = 'DonutChartSkeleton';
