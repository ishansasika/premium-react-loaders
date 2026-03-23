import { BaseLoaderProps } from './common';

export interface ParticleBurstProps extends BaseLoaderProps {
  /** Burst radius in px */
  size?: number;
  /** Number of particles (4–20) */
  count?: number;
  /** Particle color */
  color?: string;
  /** Dot diameter in px */
  particleSize?: number;
}

export interface ParticleOrbitProps extends BaseLoaderProps {
  /** Orbital diameter in px */
  size?: number;
  /** Number of orbiting particles (3–8) */
  count?: number;
  /** Particle color */
  color?: string;
  /** Central dot color */
  centerColor?: string;
}

// Note: `showTrails` descoped — trails require canvas or JS-driven DOM, not compatible with CSS-only approach.
