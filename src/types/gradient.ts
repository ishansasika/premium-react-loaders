import { BaseLoaderProps } from './common';

// Note: uses color/secondaryColor instead of colors:[string,string] to align with BaseLoaderProps convention.
export interface GradientSpinnerProps extends BaseLoaderProps {
  /** Diameter in px */
  size?: number;
  /** Gradient start color */
  color?: string;
  /** Gradient end color */
  secondaryColor?: string;
  /** Ring stroke width in px */
  thickness?: number;
  /** Background color for the inner cutout (defaults to 'white' — set to match your page background for dark mode) */
  backgroundColor?: string;
}

export interface GradientRingProps extends BaseLoaderProps {
  /** Diameter in px */
  size?: number;
  /** Array of 2–4 gradient stop colors */
  colors?: string[];
  /** Ring width in px */
  thickness?: number;
  /** Background color for the inner cutout (defaults to 'white' — set to match your page background for dark mode) */
  backgroundColor?: string;
}

export interface GradientBarProps extends BaseLoaderProps {
  /** Progress 0–100; omit for indeterminate */
  value?: number;
  /** Bar width (CSS value or number for px) */
  width?: number | string;
  /** Bar height in px */
  height?: number;
  /** Gradient start color */
  color?: string;
  /** Gradient end color */
  secondaryColor?: string;
  /** Fires when value reaches 100 */
  onComplete?: () => void;
}

export interface GradientTextProps extends BaseLoaderProps {
  /** Display text (default: 'LOADING') */
  text?: string;
  /** Gradient start color */
  color?: string;
  /** Gradient end color */
  secondaryColor?: string;
  /** Font size in px (default: 18) */
  fontSize?: number;
}

export interface GradientDotsProps extends BaseLoaderProps {
  /** Number of dots (default: 3) */
  dotCount?: number;
  /** Dot diameter in px (default: 12) */
  dotSize?: number;
  /** Gradient start color */
  color?: string;
  /** Gradient end color */
  secondaryColor?: string;
}
