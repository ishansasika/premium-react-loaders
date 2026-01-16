import { BaseLoaderProps } from './common';

/**
 * Base props for bounce loader components
 */
export interface BounceBaseProps extends BaseLoaderProps {
  /** Primary color */
  color?: string;

  /** Secondary color for alternating elements */
  secondaryColor?: string;

  /** Bounce height multiplier */
  bounceHeight?: number;
}

/**
 * Props for BouncingDots component
 */
export interface BouncingDotsProps extends BounceBaseProps {
  /** Number of dots */
  dotCount?: number;

  /** Size of each dot */
  dotSize?: number;

  /** Gap between dots */
  gap?: number;

  /** Stagger delay between dots */
  staggerDelay?: number;
}

/**
 * Props for BouncingBalls component
 */
export interface BouncingBallsProps extends BounceBaseProps {
  /** Number of balls */
  ballCount?: number;

  /** Size of each ball */
  ballSize?: number;

  /** Gap between balls */
  gap?: number;

  /** Enable 3D shadow effect */
  shadow?: boolean;

  /** Enable squash and stretch effect */
  squash?: boolean;
}
