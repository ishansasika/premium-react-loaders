import { forwardRef } from 'react';
import { ProgressRingProps } from '../../types';
import { cn, normalizeSize } from '../../utils';

/**
 * ProgressRing - Ring-style progress with gradient option
 *
 * A circular progress ring with optional gradient colors.
 *
 * @example
 * ```tsx
 * <ProgressRing value={75} showValue />
 * <ProgressRing value={60} gradient secondaryColor="#8b5cf6" />
 * <ProgressRing indeterminate />
 * ```
 */
export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      value = 0,
      indeterminate = false,
      showValue = false,
      size = 60,
      thickness = 6,
      color = '#3b82f6',
      secondaryColor = '#e0e0e0',
      gradient = false,
      className,
      style,
      testId = 'progress-ring',
      visible = true,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const clampedValue = Math.min(100, Math.max(0, value));
    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const thicknessValue = typeof thickness === 'number' ? thickness : parseInt(String(thickness), 10);
    const radius = (sizeValue - thicknessValue * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;
    const progressLabel = ariaLabel || `Loading ${clampedValue}%`;
    const gradientId = `progress-gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center relative', className)}
        style={{
          width: normalizeSize(size),
          height: normalizeSize(size),
          ...style,
        }}
        role="progressbar"
        aria-label={progressLabel}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...rest}
      >
        <svg
          className={cn(indeterminate && 'animate-spinner-rotate')}
          width={sizeValue}
          height={sizeValue}
          viewBox={`0 0 ${sizeValue} ${sizeValue}`}
        >
          {gradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={secondaryColor === '#e0e0e0' ? '#8b5cf6' : secondaryColor} />
              </linearGradient>
            </defs>
          )}
          {/* Background circle */}
          <circle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            stroke={gradient ? '#e0e0e0' : secondaryColor}
            strokeWidth={thicknessValue}
          />
          {/* Progress circle */}
          <circle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            stroke={gradient ? `url(#${gradientId})` : color}
            strokeWidth={thicknessValue}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
            transform={`rotate(-90 ${sizeValue / 2} ${sizeValue / 2})`}
            style={{
              transition: indeterminate ? 'none' : 'stroke-dashoffset 0.3s ease-in-out',
            }}
          />
        </svg>
        {showValue && !indeterminate && (
          <span
            className="absolute text-sm font-semibold"
            style={{ color }}
          >
            {clampedValue}%
          </span>
        )}
      </div>
    );
  }
);

ProgressRing.displayName = 'ProgressRing';
