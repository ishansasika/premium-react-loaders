import { forwardRef, useMemo } from 'react';
import { ProgressRingProps } from '../../types';
import { cn, normalizeSize, parseSizeToNumber, getAnimationDuration } from '../../utils';

/**
 * ProgressRing - Ring-style progress with gradient option
 *
 * A circular progress ring with optional gradient colors.
 *
 * @example
 * ```tsx
 * <ProgressRing value={75} showValue />
 * <ProgressRing value={60} gradient secondaryColor="#8b5cf6" />
 * <ProgressRing indeterminate speed="fast" />
 * <ProgressRing value={50} buffer={75} />
 * ```
 */
export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      value = 0,
      indeterminate = false,
      showValue = false,
      size = 60,
      thickness = 4,
      color = '#3b82f6',
      secondaryColor = '#e0e0e0',
      gradient = false,
      buffer,
      speed = 'normal',
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
    const clampedBuffer = buffer !== undefined ? Math.min(100, Math.max(0, buffer)) : undefined;
    const sizeValue = parseSizeToNumber(size, 60);
    const thicknessValue = parseSizeToNumber(thickness, 4);
    const radius = (sizeValue - thicknessValue * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;
    const bufferDashoffset = clampedBuffer !== undefined ? circumference - (clampedBuffer / 100) * circumference : undefined;
    const progressLabel = ariaLabel || `Loading ${clampedValue}%`;
    const animationDuration = getAnimationDuration(speed);
    const gradientId = useMemo(() => `progress-gradient-${Math.random().toString(36).substr(2, 9)}`, []);

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
          style={indeterminate ? { animation: `spinner-rotate ${animationDuration} linear infinite` } : undefined}
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
          {/* Buffer circle (behind progress) */}
          {bufferDashoffset !== undefined && !indeterminate && (
            <circle
              cx={sizeValue / 2}
              cy={sizeValue / 2}
              r={radius}
              fill="none"
              stroke={gradient ? `url(#${gradientId})` : color}
              strokeWidth={thicknessValue}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={bufferDashoffset}
              transform={`rotate(-90 ${sizeValue / 2} ${sizeValue / 2})`}
              opacity={0.3}
            />
          )}
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
