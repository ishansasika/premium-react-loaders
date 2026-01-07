import { forwardRef } from 'react';
import { SpinnerRingProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * SpinnerRing - Border-only rotating spinner
 *
 * A ring-style spinner with a transparent center and colored border.
 *
 * @example
 * ```tsx
 * <SpinnerRing size="lg" color="#8b5cf6" />
 * <SpinnerRing size="sm" thickness={3} speed="slow" />
 * <SpinnerRing size="md" color="#3b82f6" secondaryColor="#e0e0e0" reverse />
 * ```
 */
export const SpinnerRing = forwardRef<HTMLDivElement, SpinnerRingProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor = 'rgba(0, 0, 0, 0.1)',
      thickness = 4,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'spinner-ring',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="rounded-full"
          style={{
            width: normalizeSize(size),
            height: normalizeSize(size),
            border: `${thickness}px solid ${secondaryColor}`,
            borderTopColor: color,
            animation: `spinner-rotate ${effectiveDuration} linear infinite`,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        />
      </div>
    );
  }
);

SpinnerRing.displayName = 'SpinnerRing';
