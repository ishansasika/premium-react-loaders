import React, { forwardRef } from 'react';
import { SkeletonProps } from '../../types';
import { cn, normalizeSize } from '../../utils';

/**
 * Skeleton - Base skeleton loader component
 *
 * A versatile skeleton loader that can be used standalone or as a building block for more complex loaders.
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={20} />
 * <Skeleton variant="circular" width={40} height={40} />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = '1rem',
      borderRadius,
      variant = 'text',
      animate = true,
      baseColor = '#e0e0e0',
      highlightColor = '#f5f5f5',
      className,
      style,
      testId = 'skeleton',
      visible = true,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const getBorderRadius = () => {
      if (borderRadius !== undefined) return normalizeSize(borderRadius);

      switch (variant) {
        case 'circular':
          return '50%';
        case 'rounded':
          return '0.5rem';
        case 'text':
          return '0.25rem';
        case 'rectangular':
        default:
          return '0';
      }
    };

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn(
          'skeleton',
          animate && 'skeleton-animate',
          className
        )}
        style={{
          width: normalizeSize(width),
          height: normalizeSize(height),
          borderRadius: getBorderRadius(),
          backgroundColor: baseColor,
          '--skeleton-highlight-color': highlightColor,
          ...style,
        } as React.CSSProperties}
        role="status"
        aria-label="Loading..."
        aria-busy="true"
        {...rest}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
