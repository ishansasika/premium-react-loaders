import React, { forwardRef } from 'react';
import { ProgressCircleProps } from '../../types';
import { cn, normalizeSize } from '../../utils';

/**
 * ProgressCircle - SVG-based circular progress indicator
 *
 * A circular progress indicator that shows progress as a partial circle.
 *
 * @example
 * ```tsx
 * <ProgressCircle value={75} showValue />
 * <ProgressCircle value={50} size={80} thickness={6} />
 * <ProgressCircle indeterminate />
 * ```
 */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      value = 0,
      indeterminate = false,
      showValue = false,
      size = 60,
      thickness = 4,
      color = '#3b82f6',
      secondaryColor = '#e0e0e0',
      className,
      style,
      testId = 'progress-circle',
      visible = true,
      ariaLabel,
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const clampedValue = Math.min(100, Math.max(0, value));
    const sizeValue = typeof size === 'number' ? size : parseInt(String(size), 10);
    const radius = (sizeValue - thickness * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;
    const progressLabel = ariaLabel || `Loading ${clampedValue}%`;

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
          {/* Background circle */}
          <circle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={thickness}
          />
          {/* Progress circle */}
          <circle
            cx={sizeValue / 2}
            cy={sizeValue / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
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
            className="absolute text-sm font-medium"
            style={{ color }}
          >
            {clampedValue}%
          </span>
        )}
      </div>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';
