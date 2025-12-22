import React, { forwardRef } from 'react';
import { SkeletonTableProps } from '../../types';
import { cn } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonTable - Table skeleton loader
 *
 * A skeleton loader for table layouts with rows and columns.
 *
 * @example
 * ```tsx
 * <SkeletonTable rows={5} columns={4} />
 * <SkeletonTable rows={3} columns={3} showHeader={true} />
 * ```
 */
export const SkeletonTable = forwardRef<HTMLDivElement, SkeletonTableProps>(
  (
    {
      rows = 5,
      columns = 3,
      showHeader = true,
      animate = true,
      baseColor,
      highlightColor,
      className,
      style,
      testId = 'skeleton-table',
      visible = true,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const renderRow = (isHeader: boolean = false) => (
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            width="100%"
            height={isHeader ? '1.5rem' : '1.25rem'}
            variant="text"
            animate={animate}
            baseColor={baseColor}
            highlightColor={highlightColor}
          />
        ))}
      </div>
    );

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('flex flex-col gap-3', className)}
        style={style}
        role="status"
        aria-label="Loading table..."
        aria-busy="true"
        {...rest}
      >
        {/* Header */}
        {showHeader && (
          <div className="border-b border-gray-200 pb-2">
            {renderRow(true)}
          </div>
        )}

        {/* Rows */}
        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex}>
              {renderRow(false)}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

SkeletonTable.displayName = 'SkeletonTable';
