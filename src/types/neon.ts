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

export interface NeonProgressProps extends BaseLoaderProps {
  /** Progress 0–100; omit for indeterminate */
  value?: number;
  /** Bar width (CSS value or number for px) */
  width?: number | string;
  /** Bar height in px (default: 8) */
  height?: number;
  /** Neon glow color (default: '#3b82f6') */
  color?: string;
  /** Fires when value reaches 100 */
  onComplete?: () => void;
}

export interface NeonDotsProps extends BaseLoaderProps {
  /** Number of dots (default: 3) */
  dotCount?: number;
  /** Dot diameter in px (default: 12) */
  dotSize?: number;
  /** Neon glow color (default: '#3b82f6') */
  color?: string;
}
