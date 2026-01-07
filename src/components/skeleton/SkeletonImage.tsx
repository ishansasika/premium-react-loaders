import { forwardRef } from 'react';
import { SkeletonImageProps } from '../../types';
import { useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonImage - Image skeleton loader
 *
 * A skeleton loader for image placeholders with optional aspect ratio.
 *
 * @example
 * ```tsx
 * <SkeletonImage width={300} height={200} />
 * <SkeletonImage aspectRatio="16/9" width="100%" />
 * ```
 */
export const SkeletonImage = forwardRef<HTMLDivElement, SkeletonImageProps>(
  (
    {
      width = '100%',
      height = '200px',
      aspectRatio,
      animate = true,
      baseColor,
      highlightColor,
      borderRadius = '0.5rem',
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'skeleton-image',
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
      <Skeleton
        ref={ref}
        data-testid={testId}
        width={width}
        height={aspectRatio ? 'auto' : height}
        variant="rounded"
        borderRadius={borderRadius}
        animate={animate}
        baseColor={baseColor}
        highlightColor={highlightColor}
        className={className}
        style={{
          aspectRatio: aspectRatio || undefined,
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        aria-label="Loading image..."
        {...rest}
      />
    );
  }
);

SkeletonImage.displayName = 'SkeletonImage';
