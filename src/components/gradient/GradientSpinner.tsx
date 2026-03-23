import { forwardRef } from 'react';
import { GradientSpinnerProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * GradientSpinner - Circular spinner with an animated conic gradient sweep
 *
 * @example
 * ```tsx
 * <GradientSpinner />
 * <GradientSpinner size={64} color="#f59e0b" secondaryColor="#ef4444" />
 * ```
 */
export const GradientSpinner = forwardRef<HTMLDivElement, GradientSpinnerProps>(
  (
    {
      size = 48,
      color = '#3b82f6',
      secondaryColor = '#8b5cf6',
      thickness = 4,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'gradient-spinner',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(visible, delay, minDuration, transition);

    if (!shouldRender) return null;

    const inner = size - thickness * 2;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: size, height: size, opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {/* Outer spinning gradient ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${color}, ${secondaryColor}, transparent)`,
            animation: `gradient-spin ${effectiveDuration} linear infinite`,
          }}
        />
        {/* Inner cutout to form ring shape */}
        <div
          className="absolute rounded-full bg-white"
          style={{ width: inner, height: inner }}
        />
      </div>
    );
  }
);

GradientSpinner.displayName = 'GradientSpinner';
