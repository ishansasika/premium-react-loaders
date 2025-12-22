import { forwardRef } from 'react';
import { SpinnerRingProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

/**
 * SpinnerRing - Border-only rotating spinner
 *
 * A ring-style spinner with a transparent center and colored border.
 *
 * @example
 * ```tsx
 * <SpinnerRing size={40} color="#8b5cf6" />
 * <SpinnerRing size={32} thickness={3} speed="slow" />
 * ```
 */
export const SpinnerRing = forwardRef<HTMLDivElement, SpinnerRingProps>(
  (
    {
      size = 40,
      color = '#3b82f6',
      thickness = 4,
      speed = 'normal',
      className,
      style,
      testId = 'spinner-ring',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

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
        <div
          className="rounded-full"
          style={{
            width: normalizeSize(size),
            height: normalizeSize(size),
            border: `${thickness}px solid rgba(0, 0, 0, 0.1)`,
            borderTopColor: color,
            animation: `spinner-rotate ${getAnimationDuration(speed)} linear infinite`,
          }}
        />
      </div>
    );
  }
);

SpinnerRing.displayName = 'SpinnerRing';
