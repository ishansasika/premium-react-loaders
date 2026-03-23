import { forwardRef } from 'react';
import { MorphBlobProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * MorphBlob - Organic blob that continuously morphs shape
 *
 * @example
 * ```tsx
 * <MorphBlob color="#3b82f6" />
 * <MorphBlob size={100} speed="slow" />
 * ```
 */
export const MorphBlob = forwardRef<HTMLDivElement, MorphBlobProps>(
  (
    {
      size = 80,
      color = '#3b82f6',
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'morph-blob',
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

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{ opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            animation: `morph-blob ${effectiveDuration} ease-in-out infinite`,
          }}
        />
      </div>
    );
  }
);

MorphBlob.displayName = 'MorphBlob';
