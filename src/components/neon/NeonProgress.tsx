import { forwardRef, useEffect, useRef } from 'react';
import { NeonProgressProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * NeonProgress - Progress bar with a glowing neon fill
 *
 * @example
 * ```tsx
 * <NeonProgress value={75} color="#22d3ee" />
 * <NeonProgress /> // indeterminate
 * <NeonProgress value={100} onComplete={() => console.log('done')} />
 * ```
 */
export const NeonProgress = forwardRef<HTMLDivElement, NeonProgressProps>(
  (
    {
      value,
      width = '100%',
      height = 8,
      color = '#3b82f6',
      onComplete,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'neon-progress',
      visible = true,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(visible, delay, minDuration, transition);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;
    const hasCompletedRef = useRef(false);

    const isIndeterminate = value === undefined;
    const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value));

    useEffect(() => {
      if (clampedValue < 100) {
        hasCompletedRef.current = false;
      }
    }, [clampedValue]);

    useEffect(() => {
      if (!isIndeterminate && clampedValue === 100 && !hasCompletedRef.current && onCompleteRef.current) {
        hasCompletedRef.current = true;
        onCompleteRef.current();
      }
    }, [clampedValue, isIndeterminate]);

    if (!shouldRender) return null;

    const progressLabel = ariaLabel || (isIndeterminate ? 'Loading...' : `Loading ${clampedValue}%`);
    const glow = `0 0 8px ${color}, 0 0 16px ${color}`;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative overflow-hidden rounded-full', className)}
        style={{
          width: normalizeSize(width),
          height,
          backgroundColor: `${color}20`,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="progressbar"
        aria-label={progressLabel}
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-busy="true"
        {...rest}
      >
        {isIndeterminate ? (
          <div
            className="absolute h-full rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: glow,
              animation: `progress-indeterminate ${effectiveDuration} ease-in-out infinite`,
            }}
          />
        ) : (
          <div
            className="h-full rounded-full"
            style={{
              width: `${clampedValue}%`,
              backgroundColor: color,
              boxShadow: glow,
              transition: 'width 0.3s ease-in-out',
            }}
          />
        )}
      </div>
    );
  }
);

NeonProgress.displayName = 'NeonProgress';
