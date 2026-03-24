import { ProgressLoaderProps, BaseLoaderProps } from './common';

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
  /** Fires when value reaches 100 (determinate mode only, fires once per completion cycle) */
  onComplete?: () => void;
}

/**
 * ProgressCircle component props
 */
export interface ProgressCircleProps extends ProgressLoaderProps {
  /** Size of the circle */
  size?: number | string;
  /** Buffer value (0-100) for showing partial loading */
  buffer?: number;
  /** Fires when value reaches 100 (determinate mode only, fires once per completion cycle) */
  onComplete?: () => void;
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
  /** Fires when value reaches 100 (determinate mode only, fires once per completion cycle) */
  onComplete?: () => void;
}

/**
 * ProgressSteps component props
 */
export interface ProgressStepsProps extends BaseLoaderProps {
  /** Total number of steps (required) */
  steps: number;
  /** Current active step (0-indexed, required) */
  currentStep: number;
  /** Optional step labels */
  labels?: string[];
  /** Show step numbers */
  showNumbers?: boolean;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Connector style between steps */
  connector?: 'line' | 'none';
  /** Color for completed steps */
  completedColor?: string;
  /** Color for active step */
  activeColor?: string;
  /** Color for inactive steps */
  inactiveColor?: string;
}
