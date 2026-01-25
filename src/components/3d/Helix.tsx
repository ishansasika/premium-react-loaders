import { forwardRef } from 'react';
import { HelixProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
  parseSizeToNumber,
} from '../../utils';

/**
 * Helix - DNA-like spiral loader with 3D depth
 *
 * Creates a mesmerizing helix/spiral animation with particles rotating
 * in a 3D spiral pattern, reminiscent of DNA structure.
 *
 * @example
 * ```tsx
 * <Helix size={80} />
 * <Helix
 *   size={100}
 *   particleCount={16}
 *   radius={30}
 *   height={120}
 *   turns={2}
 *   direction="down"
 *   showLines
 * />
 * ```
 */
export const Helix = forwardRef<HTMLDivElement, HelixProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor = '#8b5cf6',
      particleCount = 12,
      radius = 20,
      height,
      turns = 1.5,
      direction = 'up',
      particleSize = 6,
      showLines = false,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'helix',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const containerSize = normalizeSize(size);
    const helixHeight = height ? parseSizeToNumber(normalizeSize(height), 80) : parseSizeToNumber(containerSize, 40) * 1.5;

    const particles = Array.from({ length: particleCount }, (_, index) => {
      const angle = (index / particleCount) * Math.PI * 2 * turns;
      const y = (index / particleCount) * helixHeight;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const isSecondStrand = index % 2 === 1;

      return {
        x,
        y,
        z,
        angle,
        color: isSecondStrand ? secondaryColor : color,
      };
    });

    const animationClass = direction === 'up' ? 'animate-helix-rotate-up' : 'animate-helix-rotate-down';

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
          perspective: '600px',
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className={cn('relative', animationClass)}
          style={{
            width: `${radius * 2 + particleSize * 2}px`,
            height: `${helixHeight}px`,
            transformStyle: 'preserve-3d',
            animationDuration: effectiveDuration,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {/* Connecting lines (optional) */}
          {showLines &&
            particles.map((particle, index) => {
              if (index === 0) return null;
              const prevParticle = particles[index - 1];

              return (
                <svg
                  key={`line-${index}`}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '0',
                    transform: 'translateX(-50%)',
                    width: `${radius * 2 + particleSize * 2}px`,
                    height: `${helixHeight}px`,
                    pointerEvents: 'none',
                  }}
                >
                  <line
                    x1={prevParticle.x + radius + particleSize}
                    y1={prevParticle.y}
                    x2={particle.x + radius + particleSize}
                    y2={particle.y}
                    stroke={particle.color}
                    strokeWidth="1"
                    opacity="0.3"
                  />
                </svg>
              );
            })}

          {/* Particles */}
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute animate-helix-particle-pulse"
              style={{
                left: '50%',
                top: `${particle.y}px`,
                width: `${particleSize}px`,
                height: `${particleSize}px`,
                backgroundColor: particle.color,
                borderRadius: '50%',
                transform: `translate3d(${particle.x}px, 0, ${particle.z}px)`,
                animationDuration: '1s',
                animationDelay: `${index * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

Helix.displayName = 'Helix';
