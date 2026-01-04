import { forwardRef, useMemo } from 'react';
import { ProgressBarProps } from '../../types';
import { cn, normalizeSize, getContrastColor, useReducedMotion, getEffectiveDuration } from '../../utils';

/**
 * ProgressBar - Linear progress bar
 *
 * A horizontal progress bar that can be determinate (showing specific progress) or indeterminate (loading animation).
 *
 * @example
 * ```tsx
 * <ProgressBar value={75} showValue />
 * <ProgressBar indeterminate />
 * <ProgressBar value={50} height={8} color="#8b5cf6" />
 * <ProgressBar value={50} buffer={75} /> // YouTube-style buffering
 * <ProgressBar value={60} gradient /> // Gradient progress
 * ```
 */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      indeterminate = false,
      showValue = false,
      height = '0.5rem',
      color = '#3b82f6',
      secondaryColor = '#e0e0e0',
      gradient = false,
      buffer,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      className,
      style,
      testId = 'progress-bar',
      visible = true,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);

    const clampedValue = Math.min(100, Math.max(0, value));
    const clampedBuffer = buffer !== undefined ? Math.min(100, Math.max(0, buffer)) : undefined;
    const progressLabel = ariaLabel || `Loading ${clampedValue}%`;

    // Generate gradient ID for SVG-based gradient
    const gradientId = useMemo(() => `progress-bar-gradient-${Math.random().toString(36).substr(2, 9)}`, []);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative w-full overflow-hidden rounded-full', className)}
        style={{
          height: normalizeSize(height),
          backgroundColor: secondaryColor,
          ...style,
        }}
        role="progressbar"
        aria-label={progressLabel}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...rest}
      >
        {/* Gradient SVG definition */}
        {gradient && !indeterminate && (
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={secondaryColor || '#8b5cf6'} />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Buffer indicator (shows behind main progress) */}
        {clampedBuffer !== undefined && !indeterminate && (
          <div
            className="absolute h-full rounded-full opacity-30"
            style={{
              width: `${clampedBuffer}%`,
              backgroundColor: color,
            }}
          />
        )}

        {indeterminate ? (
          <div
            className="absolute h-full rounded-full"
            style={{
              backgroundColor: gradient ? `url(#${gradientId})` : color,
              animation: `progress-indeterminate ${effectiveDuration} ease-in-out infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
              width: '40%',
            }}
          />
        ) : (
          <div
            className="h-full rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${clampedValue}%`,
              background: gradient ? `url(#${gradientId})` : color,
            }}
          />
        )}

        {showValue && !indeterminate && (
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{
              color: clampedValue > 50 ? getContrastColor(color) : secondaryColor === '#e0e0e0' ? '#000000' : getContrastColor(secondaryColor)
            }}
          >
            {clampedValue}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
