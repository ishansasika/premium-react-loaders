import { BaseLoaderProps } from './common';

/**
 * Animation style for loading text
 */
export type LoadingTextAnimation = 'dots' | 'fade' | 'bounce' | 'wave';

/**
 * Props for LoadingText component
 */
export interface LoadingTextProps extends Omit<BaseLoaderProps, 'size'> {
  /** The text to display (default: "Loading") */
  text?: string;

  /** Animation style for the ellipsis/text */
  animation?: LoadingTextAnimation;

  /** Font size */
  fontSize?: number | string;

  /** Font weight */
  fontWeight?: number | string;

  /** Text color */
  color?: string;

  /** Number of dots in ellipsis (for dots animation) */
  dotCount?: number;

  /** Show ellipsis after text */
  showEllipsis?: boolean;

  /** Custom CSS class for the text */
  textClassName?: string;
}
