import { forwardRef } from 'react';
import { DataTableSkeletonProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * DataTableSkeleton - Advanced table skeleton with features
 *
 * Comprehensive table loading placeholder with support for headers, sorting,
 * filtering, pagination, row selection, and action columns.
 *
 * @example
 * ```tsx
 * <DataTableSkeleton rows={5} columns={4} />
 * <DataTableSkeleton
 *   rows={10}
 *   columns={6}
 *   showHeader
 *   showSortIndicators
 *   showFilters
 *   showPagination
 *   showSelection
 *   showActions
 *   striped
 * />
 * ```
 */
export const DataTableSkeleton = forwardRef<HTMLDivElement, DataTableSkeletonProps>(
  (
    {
      rows = 5,
      columns = 4,
      showHeader = true,
      showSortIndicators = false,
      showFilters = false,
      showPagination = false,
      showSelection = false,
      showActions = false,
      columnWidths,
      rowHeight = 48,
      striped = false,
      width = '100%',
      animate = true,
      baseColor,
      highlightColor,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'data-table-skeleton',
      visible = true,
      ariaLabel = 'Loading table...',
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

    // Calculate column widths
    const getColumnWidth = (index: number): string => {
      if (columnWidths && columnWidths[index]) {
        const width = columnWidths[index];
        return typeof width === 'number' ? `${width}px` : width === 'auto' ? 'auto' : width;
      }
      return 'auto';
    };

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('w-full', className)}
        style={{
          ...style,
          width,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Header */}
          {showHeader && (
            <div
              className="border-b border-gray-200"
              style={{
                backgroundColor: baseColor || 'var(--skeleton-base, #f3f4f6)',
                padding: '12px',
              }}
            >
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: [
                    showSelection && '40px',
                    ...Array.from({ length: columns }, (_, i) => getColumnWidth(i)),
                    showActions && '80px',
                  ]
                    .filter(Boolean)
                    .join(' '),
                }}
              >
                {/* Selection header */}
                {showSelection && (
                  <div className="flex items-center justify-center">
                    <Skeleton
                      width={18}
                      height={18}
                      borderRadius={3}
                      animate={animate}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </div>
                )}

                {/* Column headers */}
                {Array.from({ length: columns }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Skeleton
                      width="70%"
                      height={16}
                      borderRadius={4}
                      animate={animate}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                    {showSortIndicators && (
                      <Skeleton
                        width={12}
                        height={12}
                        borderRadius={2}
                        animate={animate}
                        baseColor={baseColor}
                        highlightColor={highlightColor}
                      />
                    )}
                  </div>
                ))}

                {/* Actions header */}
                {showActions && (
                  <div className="flex items-center justify-center">
                    <Skeleton
                      width={60}
                      height={16}
                      borderRadius={4}
                      animate={animate}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div
              className="border-b border-gray-200"
              style={{ padding: '8px 12px' }}
            >
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: [
                    showSelection && '40px',
                    ...Array.from({ length: columns }, (_, i) => getColumnWidth(i)),
                    showActions && '80px',
                  ]
                    .filter(Boolean)
                    .join(' '),
                }}
              >
                {showSelection && <div />}
                {Array.from({ length: columns }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width="90%"
                    height={28}
                    borderRadius={4}
                    animate={animate}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                ))}
                {showActions && <div />}
              </div>
            </div>
          )}

          {/* Rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className={cn(
                'border-b border-gray-200 last:border-b-0',
                striped && rowIndex % 2 === 1 && 'bg-gray-50'
              )}
              style={{ padding: '12px' }}
            >
              <div
                className="grid gap-4 items-center"
                style={{
                  gridTemplateColumns: [
                    showSelection && '40px',
                    ...Array.from({ length: columns }, (_, i) => getColumnWidth(i)),
                    showActions && '80px',
                  ]
                    .filter(Boolean)
                    .join(' '),
                  height: `${rowHeight - 24}px`,
                }}
              >
                {/* Selection checkbox */}
                {showSelection && (
                  <div className="flex items-center justify-center">
                    <Skeleton
                      width={18}
                      height={18}
                      borderRadius={3}
                      animate={animate}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </div>
                )}

                {/* Data cells */}
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <Skeleton
                    key={colIndex}
                    width={colIndex === 0 ? '80%' : '60%'}
                    height={14}
                    borderRadius={4}
                    animate={animate}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                ))}

                {/* Actions */}
                {showActions && (
                  <div className="flex items-center justify-center gap-2">
                    <Skeleton
                      width={24}
                      height={24}
                      variant="circular"
                      animate={animate}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                    <Skeleton
                      width={24}
                      height={24}
                      variant="circular"
                      animate={animate}
                      baseColor={baseColor}
                      highlightColor={highlightColor}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {showPagination && (
            <div
              className="border-t border-gray-200 flex items-center justify-between"
              style={{ padding: '12px' }}
            >
              <Skeleton
                width={100}
                height={14}
                borderRadius={4}
                animate={animate}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
              <div className="flex items-center gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width={32}
                    height={32}
                    borderRadius={4}
                    animate={animate}
                    baseColor={baseColor}
                    highlightColor={highlightColor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

DataTableSkeleton.displayName = 'DataTableSkeleton';
