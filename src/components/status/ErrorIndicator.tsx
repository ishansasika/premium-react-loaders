import { forwardRef } from 'react';
import { ErrorIndicatorProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';

/**
 * ErrorIndicator - Animated error indicator with X mark
 *
 * Displays an animated X mark that draws itself, perfect for showing
 * failed operations, validation errors, or error states.
 *
 * @example
 * ```tsx
 * // Simple error indicator
 * <ErrorIndicator visible={hasError} />
 *
 * // With circle background and shake animation
 * <ErrorIndicator
 *   visible={hasError}
 *   showCircle
 *   circleColor="#ef4444"
 *   fillCircle
 *   shake
 * />
 *
 * // Custom size and color
 * <ErrorIndicator
 *   visible={hasError}
 *   size={64}
 *   color="#dc2626"
 *   duration={600}
 * />
 * ```
 */
export const ErrorIndicator = forwardRef<HTMLDivElement, ErrorIndicatorProps>(
  (
    {
      size = 'md',
      color = '#ef4444',
      strokeWidth = 3,
      duration = 500,
      showCircle = false,
      circleColor,
      fillCircle = false,
      shake = true,
      delay = 0,
      minDuration = 0,
      transition = true,
      className,
      style,
      testId = 'error-indicator',
      visible = true,
      ariaLabel = 'Error',
      ...rest
    },
    ref
  ) => {
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const effectiveCircleColor = circleColor || color;
    const sizeValue = normalizeSize(size);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        {...rest}
      >
        <svg
          className={shake ? 'animate-error-shake' : 'animate-error-scale'}
          style={{
            width: sizeValue,
            height: sizeValue,
            animationDuration: `${duration}ms`,
          }}
          viewBox="0 0 52 52"
        >
          {showCircle && (
            <circle
              className="animate-error-circle"
              cx="26"
              cy="26"
              r="23"
              fill={fillCircle ? effectiveCircleColor : 'none'}
              stroke={effectiveCircleColor}
              strokeWidth={strokeWidth}
              style={{
                animationDuration: `${duration}ms`,
              }}
            />
          )}
          <g
            className="animate-error-x"
            style={{
              animationDuration: `${duration}ms`,
              animationDelay: showCircle ? `${duration * 0.3}ms` : '0ms',
            }}
          >
            <path
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              d="M16 16 36 36"
            />
            <path
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              d="M36 16 16 36"
            />
          </g>
        </svg>
      </div>
    );
  }
);

ErrorIndicator.displayName = 'ErrorIndicator';
