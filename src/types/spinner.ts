import { BaseLoaderProps } from './common';

/**
 * SpinnerCircle component props
 */
export interface SpinnerCircleProps extends BaseLoaderProps {
  /** Thickness of the spinner */
  thickness?: number;
}

/**
 * SpinnerRing component props
 */
export interface SpinnerRingProps extends BaseLoaderProps {
  /** Thickness of the ring */
  thickness?: number;
}

/**
 * SpinnerDots component props
 */
export interface SpinnerDotsProps extends BaseLoaderProps {
  /** Number of dots */
  dotCount?: number;
  /** Size of each dot */
  dotSize?: number;
}

/**
 * SpinnerBars component props
 */
export interface SpinnerBarsProps extends BaseLoaderProps {
  /** Number of bars */
  barCount?: number;
}

/**
 * SpinnerGrid component props
 */
export interface SpinnerGridProps extends BaseLoaderProps {
  /** Grid size (e.g., 3 for 3x3) */
  gridSize?: number;
}

/**
 * SpinnerWave component props
 */
export interface SpinnerWaveProps extends BaseLoaderProps {
  /** Number of expanding ripples */
  ripples?: number;
  /** Maximum scale before fade */
  maxScale?: number;
}

/**
 * SpinnerPulse component props
 */
export interface SpinnerPulseProps extends BaseLoaderProps {
  /** Number of pulse circles (1-3) */
  pulses?: number;
  /** Maximum scale at expansion */
  maxScale?: number;
}
