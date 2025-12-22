import { CSSProperties, HTMLAttributes } from 'react';

/**
 * Base props for all loader components
 */
export interface BaseLoaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Size of the loader (numeric for px, or CSS string like '2rem') */
  size?: number | string;

  /** Primary color of the loader */
  color?: string;

  /** Secondary color (for multi-color loaders) */
  secondaryColor?: string;

  /** Custom CSS class name */
  className?: string;

  /** Inline styles */
  style?: CSSProperties;

  /** Accessibility label */
  ariaLabel?: string;

  /** Whether the loader is visible */
  visible?: boolean;

  /** Animation speed: 'slow' | 'normal' | 'fast' or milliseconds */
  speed?: 'slow' | 'normal' | 'fast' | number;

  /** Test ID for testing */
  testId?: string;
}

/**
 * Base props for skeleton loader components
 */
export interface SkeletonBaseProps extends BaseLoaderProps {
  /** Width of skeleton */
  width?: number | string;

  /** Height of skeleton */
  height?: number | string;

  /** Border radius */
  borderRadius?: number | string;

  /** Enable animation */
  animate?: boolean;

  /** Number of skeleton lines/items */
  count?: number;

  /** Base color (background) */
  baseColor?: string;

  /** Highlight color (shimmer) */
  highlightColor?: string;
}

/**
 * Base props for progress loader components
 */
export interface ProgressLoaderProps extends BaseLoaderProps {
  /** Progress value (0-100) */
  value?: number;

  /** Whether progress is indeterminate */
  indeterminate?: boolean;

  /** Show percentage text */
  showValue?: boolean;

  /** Thickness of progress indicator */
  thickness?: number | string;
}

/**
 * Animation speed type
 */
export type AnimationSpeed = 'slow' | 'normal' | 'fast';

/**
 * Speed to duration mapping (in milliseconds)
 */
export const SPEED_MAP: Record<AnimationSpeed, number> = {
  slow: 2000,
  normal: 1000,
  fast: 500,
};
