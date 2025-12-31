import { ProgressLoaderProps } from './common';

/**
 * ProgressBar component props
 */
export interface ProgressBarProps extends ProgressLoaderProps {
  /** Height of the progress bar */
  height?: number | string;
  /** Enable gradient */
  gradient?: boolean;
  /** Buffer value (0-100) for showing partial loading */
  buffer?: number;
}

/**
 * ProgressCircle component props
 */
export interface ProgressCircleProps extends ProgressLoaderProps {
  /** Size of the circle */
  size?: number | string;
  /** Buffer value (0-100) for showing partial loading */
  buffer?: number;
}

/**
 * ProgressRing component props
 */
export interface ProgressRingProps extends ProgressLoaderProps {
  /** Size of the ring */
  size?: number | string;
  /** Enable gradient */
  gradient?: boolean;
  /** Buffer value (0-100) for showing partial loading */
  buffer?: number;
}
