import { forwardRef } from 'react';
import { SpinnerCircleProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration } from '../../utils';

/**
 * SpinnerCircle - Basic rotating circle spinner
 *
 * A simple, elegant circular spinner with a partial arc that rotates continuously.
 *
 * @example
 * ```tsx
 * <SpinnerCircle size={40} color="#3b82f6" />
 * <SpinnerCircle size="lg" thickness={3} speed="fast" />
 * <SpinnerCircle size="md" reverse />
 * ```
 */
export const SpinnerCircle = forwardRef<HTMLDivElement, SpinnerCircleProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      thickness = 4,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      className,
      style,
      testId = 'spinner-circle',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={style}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <svg
          className="animate-spinner-rotate"
          style={{
            width: normalizeSize(size),
            height: normalizeSize(size),
            animationDuration: effectiveDuration,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
          viewBox="0 0 50 50"
        >
          <circle
            cx="25"
            cy="25"
            r={25 - thickness * 2}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray="80, 200"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
);

SpinnerCircle.displayName = 'SpinnerCircle';
