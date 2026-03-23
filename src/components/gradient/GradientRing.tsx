import { forwardRef } from 'react';
import { GradientRingProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * GradientRing - Ring with a flowing multi-color gradient that travels around it
 *
 * @example
 * ```tsx
 * <GradientRing />
 * <GradientRing colors={['#f59e0b', '#ef4444', '#8b5cf6']} thickness={8} />
 * ```
 */
export const GradientRing = forwardRef<HTMLDivElement, GradientRingProps>(
  (
    {
      size = 48,
      colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
      thickness = 6,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'gradient-ring',
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

    const stops = colors.join(', ');
    const gradientStyle = `linear-gradient(135deg, ${stops}, ${colors[0]})`;
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
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: gradientStyle,
            backgroundSize: '200% 200%',
            animation: `gradient-flow ${effectiveDuration} ease infinite, gradient-spin ${effectiveDuration} linear infinite`,
          }}
        />
        <div
          className="absolute rounded-full bg-white"
          style={{ width: inner, height: inner }}
        />
      </div>
    );
  }
);

GradientRing.displayName = 'GradientRing';
