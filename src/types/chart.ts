import { BaseLoaderProps } from './common';

export interface BarChartSkeletonProps extends BaseLoaderProps {
  /** Number of bars (default: 6) */
  bars?: number;
  /** Chart width (CSS value or number for px, default: '100%') */
  width?: number | string;
  /** Chart height in px (default: 120) */
  height?: number;
  /** Gap between bars in px (default: 8) */
  gap?: number;
  /** Show baseline axis under the bars (default: true) */
  showAxis?: boolean;
  /** Enable shimmer animation (default: true) */
  animate?: boolean;
  /** Bar base color */
  baseColor?: string;
  /** Shimmer highlight color */
  highlightColor?: string;
}

export interface LineChartSkeletonProps extends BaseLoaderProps {
  /** Chart width in px (default: 240) */
  width?: number;
  /** Chart height in px (default: 120) */
  height?: number;
  /** Number of data points along the line (default: 6) */
  points?: number;
  /** Show background grid lines (default: true) */
  showGrid?: boolean;
  /** Line stroke width in px (default: 3) */
  strokeWidth?: number;
  /** Enable flowing dash animation (default: true) */
  animate?: boolean;
  /** Line and point color */
  baseColor?: string;
}

export interface DonutChartSkeletonProps extends BaseLoaderProps {
  /** Diameter in px (default: 120) */
  size?: number;
  /** Ring thickness in px (default: 20) */
  thickness?: number;
  /** Number of pie slices (2-6, default: 4) */
  segments?: number;
  /** Show a placeholder label bar in the donut hole (default: true) */
  showLabel?: boolean;
  /** Enable shimmer animation (default: true) */
  animate?: boolean;
  /** Base slice color */
  baseColor?: string;
  /** Alternate slice color */
  highlightColor?: string;
  /** Background color for the donut hole (defaults to 'white' — set to match your page background for dark mode) */
  backgroundColor?: string;
}
