import { forwardRef } from 'react';
import { NeonTextProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * NeonText - Glowing neon text with animation
 *
 * @example
 * ```tsx
 * <NeonText text="LOADING" color="#22d3ee" />
 * <NeonText text="READY" color="#ec4899" fontSize={24} speed="fast" />
 * ```
 */
export const NeonText = forwardRef<HTMLDivElement, NeonTextProps>(
  (
    {
      text = 'LOADING',
      color = '#22d3ee',
      fontSize = 18,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'neon-text',
      visible = true,
      ariaLabel,
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
        aria-label={ariaLabel ?? text}
        aria-busy="true"
        {...rest}
      >
        <span
          className="animate-neon-text-glow font-bold tracking-widest uppercase"
          style={{
            color,
            fontSize,
            animationDuration: effectiveDuration,
            ['--neon-color' as string]: color,
          }}
        >
          {text}
        </span>
      </div>
    );
  }
);

NeonText.displayName = 'NeonText';
