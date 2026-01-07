import { CSSProperties, HTMLAttributes } from 'react';

/**
 * Size preset options
 */
export type SizePreset = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Size preset to pixel mapping
 */
export const SIZE_PRESET_MAP: Record<SizePreset, number> = {
  xs: 16,
  sm: 24,
  md: 40,
  lg: 56,
  xl: 72,
};

/**
 * Base props for all loader components
 */
export interface BaseLoaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Size of the loader (preset, numeric for px, or CSS string like '2rem') */
  size?: SizePreset | number | string;

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

  /** Reverse animation direction */
  reverse?: boolean;

  /** Respect user's reduced motion preference (default: true) */
  respectMotionPreference?: boolean;

  /** Delay in milliseconds before showing the loader (prevents flash on fast loads, default: 0) */
  delay?: number;

  /** Minimum duration in milliseconds to show loader once visible (prevents jarring quick disappear, default: 0) */
  minDuration?: number;

  /** Enable fade transition (true for 150ms default, or specify duration in milliseconds) */
  transition?: boolean | number;

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
