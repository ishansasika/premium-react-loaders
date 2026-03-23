import { BaseLoaderProps } from './common';

export interface MorphBlobProps extends BaseLoaderProps {
  /** Diameter in px */
  size?: number;
  /** Fill color */
  color?: string;
}

// Note: `complexity` prop was descoped — CSS-only animations use a fixed @keyframes morph-blob.

export interface LiquidFillProps extends BaseLoaderProps {
  /** Fill percentage 0–100; omit for indeterminate */
  value?: number;
  /** Diameter in px */
  size?: number;
  /** Liquid color */
  color?: string;
  /** Wave height in px */
  waveAmplitude?: number;
  /** Fires when value reaches 100 */
  onComplete?: () => void;
}

export interface WaveCircleProps extends BaseLoaderProps {
  /** Max diameter in px */
  size?: number;
  /** Ring color */
  color?: string;
  /** Number of concentric rings (2–5) */
  ringCount?: number;
}
