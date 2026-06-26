import { forwardRef } from 'react';
import { NeonPulseProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

const GLOW_SPREAD: Record<'low' | 'medium' | 'high', number> = {
  low: 4,
  medium: 8,
  high: 16,
};

/**
 * NeonPulse - A glowing pulsing ring with neon effect
 *
 * @example
 * ```tsx
 * <NeonPulse color="#3b82f6" />
 * <NeonPulse size={80} glowIntensity="high" speed="fast" />
 * ```
 */
export const NeonPulse = forwardRef<HTMLDivElement, NeonPulseProps>(
  (
    {
      size = 60,
      color = '#3b82f6',
      glowIntensity = 'medium',
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'neon-pulse',
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

    const spread = GLOW_SPREAD[glowIntensity];

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
          className="rounded-full animate-neon-pulse"
          style={{
            width: size * 0.8,
            height: size * 0.8,
            border: `2px solid ${color}`,
            animationDuration: effectiveDuration,
            ['--neon-color' as string]: color,
            ['--neon-glow-spread' as string]: `${spread}px`,
          }}
        />
      </div>
    );
  }
);

NeonPulse.displayName = 'NeonPulse';
