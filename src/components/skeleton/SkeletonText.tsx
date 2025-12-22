import React, { forwardRef } from 'react';
import { SkeletonTextProps } from '../../types';
import { cn, normalizeSize } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonText - Multi-line text skeleton loader
 *
 * Renders multiple skeleton lines to mimic text content while loading.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * <SkeletonText lines={5} gap={8} />
 * ```
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      width = '100%',
      height = '1rem',
      gap = '0.5rem',
      animate = true,
      baseColor,
      highlightColor,
      className,
      style,
      testId = 'skeleton-text',
      visible = true,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('flex flex-col', className)}
        style={{
          gap: normalizeSize(gap),
          ...style,
        }}
        role="status"
        aria-label="Loading text..."
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: lines }).map((_, index) => {
          // Last line is typically shorter (80% width)
          const lineWidth = index === lines - 1 ? '80%' : width;

          return (
            <Skeleton
              key={index}
              width={lineWidth}
              height={height}
              animate={animate}
              baseColor={baseColor}
              highlightColor={highlightColor}
              variant="text"
            />
          );
        })}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';
