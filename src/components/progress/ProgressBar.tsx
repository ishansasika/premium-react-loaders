import React, { forwardRef } from 'react';
import { ProgressBarProps } from '../../types';
import { cn, normalizeSize } from '../../utils';

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

    const clampedValue = Math.min(100, Math.max(0, value));
    const progressLabel = ariaLabel || `Loading ${clampedValue}%`;

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
        {indeterminate ? (
          <div
            className="absolute h-full rounded-full"
            style={{
              backgroundColor: color,
              animation: 'progress-indeterminate 1.5s ease-in-out infinite',
              width: '40%',
            }}
          />
        ) : (
          <div
            className="h-full rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: `${clampedValue}%`,
              backgroundColor: color,
            }}
          />
        )}
        {showValue && !indeterminate && (
          <span
            className="absolute inset-0 flex items-center justify-center text-xs font-medium"
            style={{ color: clampedValue > 50 ? 'white' : color }}
          >
            {clampedValue}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
