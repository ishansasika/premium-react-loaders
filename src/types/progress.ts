import { ProgressLoaderProps } from './common';

/**
 * ProgressBar component props
 */
export interface ProgressBarProps extends ProgressLoaderProps {
  /** Height of the progress bar */
  height?: number | string;
}

/**
 * ProgressCircle component props
 */
export interface ProgressCircleProps extends ProgressLoaderProps {
  /** Size of the circle */
  size?: number | string;
}

/**
 * ProgressRing component props
 */
export interface ProgressRingProps extends ProgressLoaderProps {
  /** Size of the ring */
  size?: number | string;
  /** Enable gradient */
  gradient?: boolean;
}
