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

/**
 * WarningIndicator component props
 */
export interface WarningIndicatorProps extends Omit<BaseLoaderProps, 'speed' | 'reverse' | 'respectMotionPreference'> {
  /** Icon size in px (default: 48) */
  size?: number;
  /** Triangle color (default: '#f59e0b') */
  color?: string;
  /** Run draw-in animation on mount (default: true) */
  animate?: boolean;
  /** Shake on appearance (default: false) */
  shake?: boolean;
  /** Animation duration in ms (default: 500) */
  duration?: number;
}

/**
 * InfoIndicator component props
 */
export interface InfoIndicatorProps extends Omit<BaseLoaderProps, 'speed' | 'reverse' | 'respectMotionPreference'> {
  /** Icon size in px (default: 48) */
  size?: number;
  /** Icon color (default: '#3b82f6') */
  color?: string;
  /** Run draw-in animation on mount (default: true) */
  animate?: boolean;
  /** Ongoing pulse glow (default: false) */
  pulse?: boolean;
  /** Animation duration in ms (default: 500) */
  duration?: number;
}
