import { ReactNode } from 'react';
import { BaseLoaderProps } from './common';

/**
 * Transition animation type
 */
export type TransitionType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';

/**
 * Transition timing function
 */
export type TransitionTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'spring';

/**
 * LoaderTransition component props
 */
export interface LoaderTransitionProps extends Omit<BaseLoaderProps, 'size' | 'color' | 'secondaryColor' | 'speed' | 'reverse'> {
  /** Whether currently in loading state */
  loading: boolean;

  /** Loading content to show (skeleton, spinner, etc.) */
  loadingContent: ReactNode;

  /** Actual content to show when loaded */
  children: ReactNode;

  /** Type of transition animation */
  transitionType?: TransitionType;

  /** Duration of transition in milliseconds */
  duration?: number;

  /** Timing function for the transition */
  timing?: TransitionTiming;

  /** Whether to keep the loading content mounted (improves performance for repeated loads) */
  keepMounted?: boolean;

  /** Delay before starting the transition out (prevents flash on quick loads) */
  exitDelay?: number;

  /** Whether to show loading content on first render */
  appearOnMount?: boolean;
}
