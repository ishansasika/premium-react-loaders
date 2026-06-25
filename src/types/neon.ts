import { BaseLoaderProps } from './common';

export interface NeonPulseProps extends BaseLoaderProps {
  /** Ring diameter in px (default: 60) */
  size?: number;
  /** Neon glow color (default: '#3b82f6') */
  color?: string;
  /** Controls box-shadow spread (default: 'medium') */
  glowIntensity?: 'low' | 'medium' | 'high';
}

export interface NeonSpinnerProps extends BaseLoaderProps {
  /** Spinner diameter in px (default: 60) */
  size?: number;
  /** Neon arc color (default: '#a855f7') */
  color?: string;
  /** Arc stroke width in px (default: 4) */
  thickness?: number;
}

export interface NeonTextProps extends BaseLoaderProps {
  /** Display text (default: 'LOADING') */
  text?: string;
  /** Neon glow color (default: '#22d3ee') */
  color?: string;
  /** Font size in px (default: 18) */
  fontSize?: number;
}
