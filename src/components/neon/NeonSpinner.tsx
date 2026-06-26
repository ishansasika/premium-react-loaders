import { forwardRef } from 'react';
import { NeonSpinnerProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * NeonSpinner - A rotating spinner with neon glow effect
 *
 * @example
 * ```tsx
 * <NeonSpinner color="#a855f7" />
 * <NeonSpinner size={80} thickness={6} speed="fast" />
 * ```
 */
export const NeonSpinner = forwardRef<HTMLDivElement, NeonSpinnerProps>(
  (
    {
      size = 60,
      color = '#a855f7',
      thickness = 4,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'neon-spinner',
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

    const glowSize = thickness * 3;

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
          className="rounded-full animate-neon-spinner"
          style={{
            width: size,
            height: size,
            border: `${thickness}px solid transparent`,
            borderTopColor: color,
            borderRightColor: color,
            boxShadow: `0 0 ${glowSize}px ${color}, inset 0 0 ${glowSize}px transparent`,
            animationDuration: effectiveDuration,
          }}
        />
      </div>
    );
  }
);

NeonSpinner.displayName = 'NeonSpinner';
