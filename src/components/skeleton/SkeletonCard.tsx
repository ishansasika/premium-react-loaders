import { forwardRef } from 'react';
import { SkeletonCardProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';
import { SkeletonAvatar } from './SkeletonAvatar';

/**
 * SkeletonCard - Card skeleton loader
 *
 * A composite skeleton loader for card layouts with optional avatar, title, and description lines.
 *
 * @example
 * ```tsx
 * <SkeletonCard />
 * <SkeletonCard hasAvatar={true} lines={3} />
 * <SkeletonCard hasAvatar={false} titleWidth="60%" />
 * ```
 */
export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      hasAvatar = true,
      titleWidth = '60%',
      lines = 2,
      avatarSize = 40,
      animate = true,
      baseColor,
      highlightColor,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'skeleton-card',
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
        className={cn('flex gap-3', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label="Loading card..."
        aria-busy="true"
        {...rest}
      >
        {hasAvatar && (
          <SkeletonAvatar
            size={avatarSize}
            animate={animate}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        )}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <Skeleton
            width={titleWidth}
            height="1.25rem"
            variant="text"
            animate={animate}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
          {/* Description lines */}
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              width={index === lines - 1 ? '70%' : '100%'}
              height="1rem"
              variant="text"
              animate={animate}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          ))}
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';
