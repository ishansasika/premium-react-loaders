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

export interface ParticleTrailProps extends BaseLoaderProps {
  /** Orbit diameter in px (default: 60) */
  size?: number;
  /** Number of trailing particles (3–10, default: 6) */
  count?: number;
  /** Particle color (default: '#3b82f6') */
  color?: string;
}

export interface ParticleFieldProps extends BaseLoaderProps {
  /** Field width in px (default: 120) */
  width?: number;
  /** Field height in px (default: 120) */
  height?: number;
  /** Number of particles (5–30, default: 12) */
  count?: number;
  /** Particle color (default: '#3b82f6') */
  color?: string;
}

// Note: `showTrails` descoped — trails require canvas or JS-driven DOM, not compatible with CSS-only approach.
