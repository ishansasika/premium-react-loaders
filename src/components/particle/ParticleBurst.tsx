import { forwardRef } from 'react';
import { ParticleBurstProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility, parseDurationMs } from '../../utils';

/**
 * ParticleBurst - Particles that burst outward from center and loop
 *
 * @example
 * ```tsx
 * <ParticleBurst color="#3b82f6" />
 * <ParticleBurst count={12} size={80} particleSize={8} />
 * ```
 */
export const ParticleBurst = forwardRef<HTMLDivElement, ParticleBurstProps>(
  (
    {
      size = 60,
      count = 8,
      color = '#3b82f6',
      particleSize = 6,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'particle-burst',
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

    const clampedCount = Math.min(20, Math.max(4, count));
    const radius = size / 2;
    const durationMs = parseDurationMs(effectiveDuration);

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
        {Array.from({ length: clampedCount }, (_, i) => {
          const angle = (i / clampedCount) * 2 * Math.PI;
          const tx = Math.cos(angle) * radius;
          const ty = Math.sin(angle) * radius;
          const animationDelay = `${(i / clampedCount) * durationMs}ms`;

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: particleSize,
                height: particleSize,
                backgroundColor: color,
                top: '50%',
                left: '50%',
                marginTop: -particleSize / 2,
                marginLeft: -particleSize / 2,
                animation: `particle-burst ${effectiveDuration} ease-out infinite`,
                animationDelay,
                ['--tx' as string]: `${tx}px`,
                ['--ty' as string]: `${ty}px`,
              }}
            />
          );
        })}
      </div>
    );
  }
);

ParticleBurst.displayName = 'ParticleBurst';
