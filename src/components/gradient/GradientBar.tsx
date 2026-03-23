import { forwardRef, useEffect, useRef } from 'react';
import { GradientBarProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * GradientBar - Progress bar with flowing animated gradient
 *
 * @example
 * ```tsx
 * <GradientBar value={75} />
 * <GradientBar /> // indeterminate
 * <GradientBar value={100} onComplete={() => console.log('done')} />
 * ```
 */
export const GradientBar = forwardRef<HTMLDivElement, GradientBarProps>(
  (
    {
      value,
      width = '100%',
      height = 8,
      color = '#3b82f6',
      secondaryColor = '#8b5cf6',
      onComplete,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'gradient-bar',
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

    const isIndeterminate = value === undefined;
    const clampedValue = isIndeterminate ? 0 : Math.min(100, Math.max(0, value));

    useEffect(() => {
      if (!isIndeterminate && clampedValue === 100 && onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, [clampedValue, isIndeterminate]);

    if (!shouldRender) return null;

    const gradient = `linear-gradient(90deg, ${color}, ${secondaryColor}, ${color})`;
    const progressLabel = ariaLabel || (isIndeterminate ? 'Loading...' : `Loading ${clampedValue}%`);

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
        {...rest}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: isIndeterminate ? '40%' : `${clampedValue}%`,
            background: gradient,
            backgroundSize: '200% 100%',
            animation: `gradient-flow ${effectiveDuration} linear infinite${isIndeterminate ? `, progress-indeterminate ${effectiveDuration} ease-in-out infinite` : ''}`,
            transition: isIndeterminate ? undefined : 'width 0.3s ease-in-out',
          }}
        />
      </div>
    );
  }
);

GradientBar.displayName = 'GradientBar';
