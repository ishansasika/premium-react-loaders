import { forwardRef } from 'react';
import { SkeletonListProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonList - List skeleton loader
 *
 * A skeleton loader for list items with customizable count, item height, and spacing.
 *
 * @example
 * ```tsx
 * <SkeletonList items={5} />
 * <SkeletonList items={3} itemHeight={60} gap={12} />
 * ```
 */
export const SkeletonList = forwardRef<HTMLDivElement, SkeletonListProps>(
  (
    {
      items = 3,
      itemHeight = '3rem',
      gap = '0.75rem',
      width = '100%',
      animate = true,
      baseColor,
      highlightColor,
      borderRadius = '0.5rem',
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'skeleton-list',
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

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('flex flex-col', className)}
        style={{
          gap: normalizeSize(gap),
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label="Loading list..."
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: items }).map((_, index) => (
          <Skeleton
            key={index}
            width={width}
            height={itemHeight}
            variant="rounded"
            borderRadius={borderRadius}
            animate={animate}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        ))}
      </div>
    );
  }
);

SkeletonList.displayName = 'SkeletonList';
