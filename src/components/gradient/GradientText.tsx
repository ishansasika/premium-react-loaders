import { forwardRef } from 'react';
import { GradientTextProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * GradientText - Loading text filled with a flowing animated gradient
 *
 * @example
 * ```tsx
 * <GradientText text="LOADING" color="#3b82f6" secondaryColor="#8b5cf6" />
 * <GradientText text="PLEASE WAIT" fontSize={24} speed="fast" />
 * ```
 */
export const GradientText = forwardRef<HTMLDivElement, GradientTextProps>(
  (
    {
      text = 'LOADING',
      color = '#3b82f6',
      secondaryColor = '#ec4899',
      fontSize = 18,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'gradient-text',
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
          style={{
            fontSize,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            backgroundImage: `linear-gradient(90deg, ${color}, ${secondaryColor}, ${color})`,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: `gradient-flow ${effectiveDuration} linear infinite`,
          }}
        >
          {text}
        </span>
      </div>
    );
  }
);

GradientText.displayName = 'GradientText';
