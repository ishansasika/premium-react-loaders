import { BaseLoaderProps } from './common';

/**
 * PulseDots component props
 */
export interface PulseDotsProps extends BaseLoaderProps {
  /** Number of dots */
  dotCount?: number;
  /** Size of each dot */
  dotSize?: number;
}

/**
 * PulseWave component props
 */
export interface PulseWaveProps extends BaseLoaderProps {
  /** Number of bars in wave */
  barCount?: number;
}

/**
 * PulseBars component props
 */
export interface PulseBarsProps extends BaseLoaderProps {
  /** Number of bars */
  barCount?: number;
}

/**
 * TypingIndicator component props
 */
export interface TypingIndicatorProps extends BaseLoaderProps {
  /** Number of dots */
  dotCount?: number;
  /** Size of each dot */
  dotSize?: number | string;
  /** Space between dots */
  gap?: number | string;
  /** Animation style */
  variant?: 'bounce' | 'fade';
}
