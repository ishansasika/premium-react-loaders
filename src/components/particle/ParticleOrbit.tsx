import { forwardRef } from 'react';
import { ParticleOrbitProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility, parseDurationMs } from '../../utils';

/**
 * ParticleOrbit - Particles orbiting a central point with staggered animation offsets
 *
 * @example
 * ```tsx
 * <ParticleOrbit color="#3b82f6" />
 * <ParticleOrbit count={6} size={80} centerColor="#ef4444" />
 * ```
 */
export const ParticleOrbit = forwardRef<HTMLDivElement, ParticleOrbitProps>(
  (
    {
      size = 80,
      count = 5,
      color = '#3b82f6',
      centerColor,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'particle-orbit',
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

    const clampedCount = Math.min(8, Math.max(3, count));
    const orbitRadius = size * 0.35;
    const particleSize = size * 0.1;
    const centerSize = size * 0.15;
    const dotColor = centerColor || color;
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
        {/* Central dot */}
        <div
          className="absolute rounded-full z-10"
          style={{
            width: centerSize,
            height: centerSize,
            backgroundColor: dotColor,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        {/* Orbiting particles */}
        {Array.from({ length: clampedCount }, (_, i) => {
          const startAngle = `${(i / clampedCount) * 360}deg`;
          const staggerDelay = `-${(i / clampedCount) * durationMs}ms`;

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
                animation: `particle-orbit ${effectiveDuration} linear infinite`,
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

ParticleOrbit.displayName = 'ParticleOrbit';
