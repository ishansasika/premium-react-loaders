import { forwardRef, useEffect, useRef } from 'react';
import { LiquidFillProps } from '../../types';
import { cn, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * LiquidFill - Container that fills with animated liquid
 *
 * @example
 * ```tsx
 * <LiquidFill value={60} />
 * <LiquidFill value={100} onComplete={() => console.log('done')} />
 * <LiquidFill /> // indeterminate
 * ```
 */
export const LiquidFill = forwardRef<HTMLDivElement, LiquidFillProps>(
  (
    {
      value,
      size = 80,
      color = '#3b82f6',
      waveAmplitude = 4,
      onComplete,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'liquid-fill',
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
    const clampedValue = isIndeterminate ? 50 : Math.min(100, Math.max(0, value));

    useEffect(() => {
      if (!isIndeterminate && clampedValue === 100 && onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, [clampedValue, isIndeterminate]);

    if (!shouldRender) return null;

    const progressLabel = ariaLabel || (isIndeterminate ? 'Loading...' : `Loading ${clampedValue}%`);
    const fillBottom = `${clampedValue}%`;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{ opacity, transition: transitionStyle, ...style }}
        role="status"
        aria-label={progressLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="relative overflow-hidden rounded-full"
          style={{ width: size, height: size }}
        >
          {/* Background track */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: `${color}20` }}
          />
          {/* Liquid fill */}
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{
              height: fillBottom,
              transition: isIndeterminate ? undefined : 'height 0.4s ease-in-out',
              overflow: 'hidden',
            }}
          >
            {/* Wave overlay */}
            <div
              style={{
                position: 'absolute',
                top: -waveAmplitude * 2,
                left: 0,
                width: '200%',
                height: waveAmplitude * 4,
                backgroundColor: color,
                borderRadius: '40%',
                animation: `liquid-wave ${effectiveDuration} linear infinite`,
              }}
            />
            {/* Solid fill beneath wave */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ backgroundColor: color, top: waveAmplitude * 2 }}
            />
          </div>
          {/* Percentage label */}
          {!isIndeterminate && (
            <span
              className="absolute inset-0 flex items-center justify-center text-xs font-bold"
              style={{ color: clampedValue > 50 ? '#fff' : color }}
            >
              {clampedValue}%
            </span>
          )}
        </div>
      </div>
    );
  }
);

LiquidFill.displayName = 'LiquidFill';
