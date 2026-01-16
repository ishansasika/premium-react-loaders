import { forwardRef } from 'react';
import { AtomLoaderProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * AtomLoader - Electron-like orbital animation
 *
 * Electrons orbiting around a nucleus, reminiscent of an atom.
 *
 * @example
 * ```tsx
 * <AtomLoader size={60} color="#3b82f6" />
 * <AtomLoader orbits={4} showNucleus />
 * <AtomLoader nucleusSize={12} electronSize={6} />
 * ```
 */
export const AtomLoader = forwardRef<HTMLDivElement, AtomLoaderProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      orbits = 3,
      nucleusSize = 8,
      electronSize = 5,
      showNucleus = true,
      thickness = 1,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'atom-loader',
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

    const normalizedSize = normalizeSize(size);
    const durationNum = parseInt(effectiveDuration, 10);

    // Generate orbital angles - distribute evenly
    const orbitAngles = Array.from({ length: orbits }, (_, i) => (180 / orbits) * i);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          width: normalizedSize,
          height: normalizedSize,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div className="relative w-full h-full">
          {/* Nucleus */}
          {showNucleus && (
            <div
              className="absolute rounded-full"
              style={{
                width: nucleusSize,
                height: nucleusSize,
                backgroundColor: secondaryColor || color,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}

          {/* Orbital paths and electrons */}
          {orbitAngles.map((angle, index) => {
            const orbitDuration = durationNum + (index * 150);
            const shouldReverse = index % 2 === 1 ? !reverse : reverse;
            const electronColor = secondaryColor && index % 2 === 1 ? secondaryColor : color;

            return (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                {/* Orbital path (ellipse) */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '100%',
                    height: '60%',
                    left: '0',
                    top: '20%',
                    border: `${thickness}px solid ${color}20`,
                  }}
                />

                {/* Electron */}
                <div
                  className="absolute"
                  style={{
                    width: '100%',
                    height: '60%',
                    left: '0',
                    top: '20%',
                    animation: `atom-orbit ${orbitDuration}ms linear infinite`,
                    animationDirection: shouldReverse ? 'reverse' : 'normal',
                  }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: electronSize,
                      height: electronSize,
                      backgroundColor: electronColor,
                      left: '50%',
                      top: 0,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

AtomLoader.displayName = 'AtomLoader';
