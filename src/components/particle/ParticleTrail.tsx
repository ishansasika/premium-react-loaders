import { forwardRef } from 'react';
import { ParticleTrailProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility, parseDurationMs } from '../../utils';

/**
 * ParticleTrail - Particles in trailing circular orbit with decreasing opacity and size
 *
 * @example
 * ```tsx
 * <ParticleTrail color="#3b82f6" />
 * <ParticleTrail count={8} size={80} />
 * ```
 */
export const ParticleTrail = forwardRef<HTMLDivElement, ParticleTrailProps>(
  (
    {
      size = 60,
      count = 6,
      color = '#3b82f6',
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'particle-trail',
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

    const clampedCount = Math.min(10, Math.max(3, count));
    const orbitRadius = size * 0.35;
    const particleSize = Math.max(3, size * 0.08);
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
          const trailOpacity = 1 - (i / clampedCount) * 0.85;
          const trailScale = 1 - (i / clampedCount) * 0.6;
          const startAngle = `${(i / clampedCount) * 360}deg`;
          const staggerDelay = `-${(i / clampedCount) * durationMs}ms`;

          return (
            <div
              key={i}
              className="absolute rounded-full animate-particle-trail"
              style={{
                width: particleSize * trailScale,
                height: particleSize * trailScale,
                backgroundColor: color,
                top: '50%',
                left: '50%',
                marginTop: -(particleSize * trailScale) / 2,
                marginLeft: -(particleSize * trailScale) / 2,
                opacity: trailOpacity,
                animationDuration: effectiveDuration,
                animationDelay: staggerDelay,
                ['--start-angle' as string]: startAngle,
                ['--orbit-radius' as string]: `${orbitRadius}px`,
              }}
            />
          );
        })}
      </div>
    );
  }
);

ParticleTrail.displayName = 'ParticleTrail';
