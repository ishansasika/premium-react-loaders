import { forwardRef } from 'react';
import { SkeletonTextProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonText - Multi-line text skeleton loader
 *
 * Renders multiple skeleton lines to mimic text content while loading.
 *
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * <SkeletonText lines={5} gap={8} lastLineWidth="60%" />
 * ```
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      width = '100%',
      height = '1rem',
      gap = '0.5rem',
      lastLineWidth = '80%',
      animate = true,
      baseColor,
      highlightColor,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'skeleton-text',
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
        aria-label="Loading text..."
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: lines }).map((_, index) => {
          // Last line uses custom width or default (80%)
          const lineWidth = index === lines - 1 ? lastLineWidth : width;

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
