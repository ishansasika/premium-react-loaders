import { SkeletonBaseProps } from './common';

/**
 * Skeleton variant types
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

/**
 * Skeleton component props
 */
export interface SkeletonProps extends SkeletonBaseProps {
  /** Shape variant */
  variant?: SkeletonVariant;
}

/**
 * SkeletonText component props
 */
export interface SkeletonTextProps extends SkeletonBaseProps {
  /** Number of text lines */
  lines?: number;
  /** Gap between lines */
  gap?: number | string;
  /** Width of the last line (defaults to '80%') */
  lastLineWidth?: number | string;
}

/**
 * SkeletonAvatar component props
 */
export interface SkeletonAvatarProps extends SkeletonBaseProps {
  /** Avatar shape */
  shape?: 'circle' | 'square';
}

/**
 * SkeletonImage component props
 */
export interface SkeletonImageProps extends SkeletonBaseProps {
  /** Aspect ratio (e.g., '16/9', '4/3', '1/1') */
  aspectRatio?: string;
}

/**
 * SkeletonCard component props
 */
export interface SkeletonCardProps extends SkeletonBaseProps {
  /** Show avatar */
  hasAvatar?: boolean;
  /** Title width */
  titleWidth?: number | string;
  /** Number of description lines */
  lines?: number;
  /** Avatar size */
  avatarSize?: number;
}

/**
 * SkeletonList component props
 */
export interface SkeletonListProps extends SkeletonBaseProps {
  /** Number of list items */
  items?: number;
  /** Item height */
  itemHeight?: number | string;
  /** Gap between items */
  gap?: number | string;
}

/**
 * SkeletonTable component props
 */
export interface SkeletonTableProps extends SkeletonBaseProps {
  /** Number of rows */
  rows?: number;
  /** Number of columns */
  columns?: number;
  /** Show table header */
  showHeader?: boolean;
}

/**
 * SkeletonPage component props
 */
export interface SkeletonPageProps extends SkeletonBaseProps {
  /** Page layout variant */
  variant?: 'default' | 'dashboard' | 'article' | 'profile';
}

/**
 * SkeletonForm component props
 */
export interface SkeletonFormProps extends SkeletonBaseProps {
  /** Number of form fields */
  fields?: number;
  /** Show field labels */
  showLabels?: boolean;
  /** Show submit button */
  showButton?: boolean;
  /** Spacing between fields */
  gap?: number | string;
  /** Button width */
  buttonWidth?: number | string;
  /** Button alignment */
  buttonPosition?: 'left' | 'right' | 'center';
}
