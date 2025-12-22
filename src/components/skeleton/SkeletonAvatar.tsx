import React, { forwardRef } from 'react';
import { SkeletonAvatarProps } from '../../types';
import { normalizeSize } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonAvatar - Avatar skeleton loader
 *
 * A skeleton loader for avatar placeholders with circle or square shapes.
 *
 * @example
 * ```tsx
 * <SkeletonAvatar size={40} />
 * <SkeletonAvatar size={64} shape="square" />
 * ```
 */
export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  (
    {
      size = 40,
      shape = 'circle',
      animate = true,
      baseColor,
      highlightColor,
      className,
      style,
      testId = 'skeleton-avatar',
      visible = true,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const sizeValue = normalizeSize(size);

    return (
      <Skeleton
        ref={ref}
        data-testid={testId}
        width={sizeValue}
        height={sizeValue}
        variant={shape === 'circle' ? 'circular' : 'rounded'}
        animate={animate}
        baseColor={baseColor}
        highlightColor={highlightColor}
        className={className}
        style={style}
        aria-label="Loading avatar..."
        {...rest}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';
