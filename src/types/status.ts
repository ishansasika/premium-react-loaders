import { BaseLoaderProps } from './common';

/**
 * SuccessCheckmark component props
 */
export interface SuccessCheckmarkProps extends Omit<BaseLoaderProps, 'speed' | 'reverse' | 'respectMotionPreference'> {
  /** Stroke width of the checkmark */
  strokeWidth?: number;

  /** Duration of the checkmark animation in milliseconds */
  duration?: number;

  /** Whether to show a circle background */
  showCircle?: boolean;

  /** Circle background color */
  circleColor?: string;

  /** Whether to fill the circle */
  fillCircle?: boolean;
}

/**
 * ErrorIndicator component props
 */
export interface ErrorIndicatorProps extends Omit<BaseLoaderProps, 'speed' | 'reverse' | 'respectMotionPreference'> {
  /** Stroke width of the X mark */
  strokeWidth?: number;

  /** Duration of the X mark animation in milliseconds */
  duration?: number;

  /** Whether to show a circle background */
  showCircle?: boolean;

  /** Circle background color */
  circleColor?: string;

  /** Whether to fill the circle */
  fillCircle?: boolean;

  /** Whether to shake/bounce on appearance */
  shake?: boolean;
}
