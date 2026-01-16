import { BaseLoaderProps } from './common';

/**
 * Shimmer direction options
 */
export type ShimmerDirection = 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';

/**
 * Base props for shimmer components
 */
export interface ShimmerBaseProps extends BaseLoaderProps {
  /** Width of the shimmer element */
  width?: number | string;

  /** Height of the shimmer element */
  height?: number | string;

  /** Border radius */
  borderRadius?: number | string;

  /** Base color (background) */
  baseColor?: string;

  /** Highlight/shimmer color */
  highlightColor?: string;

  /** Direction of shimmer animation */
  direction?: ShimmerDirection;
}

/**
 * Props for ShimmerBox component
 */
export interface ShimmerBoxProps extends ShimmerBaseProps {
  /** Aspect ratio (e.g., '16/9', '1/1') */
  aspectRatio?: string;
}

/**
 * Props for ShimmerText component
 */
export interface ShimmerTextProps extends ShimmerBaseProps {
  /** Number of text lines */
  lines?: number;

  /** Gap between lines */
  lineGap?: number | string;

  /** Make the last line shorter */
  lastLineWidth?: number | string;
}

/**
 * Props for ShimmerButton component
 */
export interface ShimmerButtonProps extends ShimmerBaseProps {
  /** Button variant style */
  variant?: 'solid' | 'outline';

  /** Whether to show an icon placeholder */
  showIcon?: boolean;

  /** Icon position */
  iconPosition?: 'left' | 'right';
}
