import { ReactNode } from 'react';
import { BaseLoaderProps } from './common';

/**
 * Props for LoaderOverlay component
 */
export interface LoaderOverlayProps extends Omit<BaseLoaderProps, 'size' | 'color' | 'speed'> {
  /** Whether the overlay is active/loading */
  loading?: boolean;

  /** The loader component to display */
  loader: ReactNode;

  /** Content to display behind the overlay */
  children?: ReactNode;

  /** Position style of the overlay */
  position?: 'fixed' | 'absolute';

  /** Backdrop opacity (0-1) */
  backdropOpacity?: number;

  /** Backdrop color */
  backdropColor?: string;

  /** Apply blur effect to backdrop */
  blur?: boolean;

  /** Z-index of the overlay */
  zIndex?: number;
}
