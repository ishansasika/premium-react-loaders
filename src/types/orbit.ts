import { BaseLoaderProps } from './common';

/**
 * Base props for orbit loader components
 */
export interface OrbitBaseProps extends BaseLoaderProps {
  /** Primary color */
  color?: string;

  /** Secondary color for alternating elements */
  secondaryColor?: string;

  /** Thickness of orbit path or elements */
  thickness?: number;
}

/**
 * Props for OrbitDots component
 */
export interface OrbitDotsProps extends OrbitBaseProps {
  /** Number of orbiting dots */
  dotCount?: number;

  /** Size of each dot */
  dotSize?: number;

  /** Orbit radius (relative to size) */
  orbitRadius?: number;

  /** Stagger animation between dots */
  stagger?: boolean;
}

/**
 * Props for OrbitRings component
 */
export interface OrbitRingsProps extends OrbitBaseProps {
  /** Number of concentric rings */
  ringCount?: number;

  /** Gap between rings */
  ringGap?: number;

  /** Whether rings should rotate in alternating directions */
  alternate?: boolean;
}

/**
 * Props for AtomLoader component
 */
export interface AtomLoaderProps extends OrbitBaseProps {
  /** Number of orbital paths */
  orbits?: number;

  /** Size of nucleus (center dot) */
  nucleusSize?: number;

  /** Size of electrons (orbiting dots) */
  electronSize?: number;

  /** Show the nucleus */
  showNucleus?: boolean;
}
