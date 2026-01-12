import { BaseLoaderProps } from './common';

/**
 * Position of the spinner relative to button content
 */
export type SpinnerPosition = 'left' | 'right' | 'center';

/**
 * Variant of the button spinner
 */
export type ButtonSpinnerVariant = 'circle' | 'dots' | 'bars';

/**
 * ButtonSpinner component props
 */
export interface ButtonSpinnerProps extends BaseLoaderProps {
  /** Position of spinner relative to content (left, right, center) */
  position?: SpinnerPosition;

  /** Visual variant of the spinner */
  variant?: ButtonSpinnerVariant;

  /** Thickness of the spinner (for circle variant) */
  thickness?: number;

  /** Number of dots (for dots variant) */
  dotCount?: number;

  /** Number of bars (for bars variant) */
  barCount?: number;

  /** Content to display alongside the spinner (usually button text) */
  children?: React.ReactNode;

  /** Whether to show content when loading (if false, only spinner shows) */
  showContent?: boolean;

  /** Gap between spinner and content */
  gap?: number | string;
}
