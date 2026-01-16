import { BaseLoaderProps } from './common';

/**
 * Base props for infinity loader components
 */
export interface InfinityBaseProps extends BaseLoaderProps {
  /** Primary color */
  color?: string;

  /** Secondary color for gradient effect */
  secondaryColor?: string;

  /** Stroke thickness */
  thickness?: number;
}

/**
 * Props for InfinityLoader component
 */
export interface InfinityLoaderProps extends InfinityBaseProps {
  /** Enable gradient coloring */
  gradient?: boolean;

  /** Show a dot traveling along the path */
  showDot?: boolean;

  /** Size of the traveling dot */
  dotSize?: number;
}

/**
 * Props for MobiusLoader component
 */
export interface MobiusLoaderProps extends InfinityBaseProps {
  /** Number of segments in the ribbon */
  segments?: number;

  /** Enable 3D twist effect */
  twist?: boolean;

  /** Ribbon width */
  ribbonWidth?: number;
}
