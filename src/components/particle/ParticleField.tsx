import { forwardRef } from 'react';
import { ParticleFieldProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

export const ParticleField = forwardRef<HTMLDivElement, ParticleFieldProps>(
  (
    {
      width = 120,
      height = 120,
      count = 12,
      color = '#3b82f6',
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'particle-field',
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

    const clampedCount = Math.min(30, Math.max(5, count));

    const particles = Array.from({ length: clampedCount }, (_, i) => {
      const seed = i * 137.508;
      const x = (seed * 7.3) % width;
      const drift = ((seed * 3.1) % 20) - 10;
      const size = 2 + (seed % 4);
      const particleOpacity = 0.4 + (seed % 0.6);
      const durationMultiplier = 0.6 + (i / clampedCount) * 0.8;
      const delayMs = -((i / clampedCount) * 3000);

      return { x, drift, size, particleOpacity, durationMultiplier, delayMs };
    });

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative inline-block overflow-hidden', className)}
        style={{ width, height, opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {particles.map(({ x, drift, size: pSize, particleOpacity, durationMultiplier, delayMs }, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-field-float"
            style={{
              width: pSize,
              height: pSize,
              backgroundColor: color,
              left: x,
              bottom: 0,
              animationDuration: `calc(${effectiveDuration} * ${durationMultiplier})`,
              animationDelay: `${delayMs}ms`,
              ['--tx-start' as string]: `${drift}px`,
              ['--tx-end' as string]: `${drift * 1.5}px`,
              ['--field-height' as string]: `${height}px`,
              ['--particle-opacity' as string]: `${particleOpacity}`,
            }}
          />
        ))}
      </div>
    );
  }
);

ParticleField.displayName = 'ParticleField';
