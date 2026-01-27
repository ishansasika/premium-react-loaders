import { BaseLoaderProps, SkeletonBaseProps } from './common';

/**
 * SmartSkeleton component props
 */
export interface SmartSkeletonProps extends SkeletonBaseProps {
  /** Content type to mimic */
  contentType?: 'auto' | 'text' | 'image' | 'card' | 'list' | 'table' | 'form';
  /** Reference element to analyze for auto-detection */
  referenceElement?: HTMLElement | null;
  /** Number of items (for lists/tables) */
  itemCount?: number;
  /** Layout detection strategy */
  detectionStrategy?: 'dom' | 'dimensions' | 'mixed';
}

/**
 * FormFieldLoader component props
 */
export interface FormFieldLoaderProps extends BaseLoaderProps {
  /** Field type */
  fieldType?: 'text' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file';
  /** Show label skeleton */
  showLabel?: boolean;
  /** Label width */
  labelWidth?: number | string;
  /** Field width */
  fieldWidth?: number | string;
  /** Field height (for textarea) */
  fieldHeight?: number | string;
  /** Show validation message skeleton */
  showValidation?: boolean;
  /** Show required indicator */
  showRequired?: boolean;
  /** Show helper text skeleton */
  showHelperText?: boolean;
}

/**
 * DataTableSkeleton component props
 */
export interface DataTableSkeletonProps extends SkeletonBaseProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Show header row */
  showHeader?: boolean;
  /** Show sorting indicators in header */
  showSortIndicators?: boolean;
  /** Show filter row */
  showFilters?: boolean;
  /** Show pagination controls */
  showPagination?: boolean;
  /** Show row selection checkboxes */
  showSelection?: boolean;
  /** Show action column */
  showActions?: boolean;
  /** Column widths (array of numbers/strings or 'auto') */
  columnWidths?: (number | string | 'auto')[];
  /** Row height */
  rowHeight?: number;
  /** Enable striped rows */
  striped?: boolean;
}
