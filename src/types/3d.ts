import { BaseLoaderProps } from './common';

/**
 * CubeSpinner component props
 */
export interface CubeSpinnerProps extends BaseLoaderProps {
  /** Colors for cube faces (6 colors for 6 faces) */
  faceColors?: string[];
  /** Rotation axis */
  rotationAxis?: 'x' | 'y' | 'z' | 'diagonal';
  /** Perspective distance in pixels */
  perspective?: number;
  /** Show cube edges/wireframe */
  showEdges?: boolean;
  /** Edge color */
  edgeColor?: string;
}

/**
 * FlipCard component props
 */
export interface FlipCardProps extends BaseLoaderProps {
  /** Flip direction */
  direction?: 'horizontal' | 'vertical';
  /** Front face color */
  frontColor?: string;
  /** Back face color */
  backColor?: string;
  /** Card width */
  width?: number | string;
  /** Card height */
  height?: number | string;
  /** Flip interval in milliseconds */
  interval?: number;
  /** Perspective distance in pixels */
  perspective?: number;
}

/**
 * PlaneRotate component props
 */
export interface PlaneRotateProps extends BaseLoaderProps {
  /** Number of planes (2-6) */
  planeCount?: number;
  /** Plane spacing in pixels */
  spacing?: number;
  /** Rotation type */
  rotationType?: 'synchronized' | 'staggered' | 'opposite';
  /** Plane opacity (0-1) */
  opacity?: number;
  /** Show center axis */
  showAxis?: boolean;
}

/**
 * Helix component props
 */
export interface HelixProps extends BaseLoaderProps {
  /** Number of particles/dots in helix */
  particleCount?: number;
  /** Helix radius in pixels */
  radius?: number;
  /** Helix height/length in pixels */
  height?: number;
  /** Number of complete rotations */
  turns?: number;
  /** Rotation direction */
  direction?: 'up' | 'down';
  /** Particle size in pixels */
  particleSize?: number;
  /** Show connecting lines */
  showLines?: boolean;
}

/**
 * PerspectiveRing component props
 */
export interface PerspectiveRingProps extends BaseLoaderProps {
  /** Ring tilt angle (0-90 degrees) */
  tilt?: number;
  /** Ring thickness */
  thickness?: number;
  /** Show shadow underneath */
  showShadow?: boolean;
  /** Shadow blur amount in pixels */
  shadowBlur?: number;
  /** Number of segments in ring */
  segments?: number;
}
