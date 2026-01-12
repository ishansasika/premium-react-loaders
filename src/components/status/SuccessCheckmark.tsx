import { forwardRef } from 'react';
import { SuccessCheckmarkProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';

/**
 * SuccessCheckmark - Animated checkmark for successful operations
 *
 * Displays an animated checkmark that draws itself, perfect for showing
 * successful completion of actions like form submissions, file uploads, etc.
 *
 * @example
 * ```tsx
 * // Simple checkmark
 * <SuccessCheckmark visible={isSuccess} />
 *
 * // With circle background
 * <SuccessCheckmark
 *   visible={isSuccess}
 *   showCircle
 *   circleColor="#10b981"
 *   fillCircle
 * />
 *
 * // Custom size and color
 * <SuccessCheckmark
 *   visible={isSuccess}
 *   size={64}
 *   color="#22c55e"
 *   duration={600}
 * />
 * ```
 */
export const SuccessCheckmark = forwardRef<HTMLDivElement, SuccessCheckmarkProps>(
  (
    {
      size = 'md',
      color = '#10b981',
      strokeWidth = 3,
      duration = 500,
      showCircle = false,
      circleColor,
      fillCircle = false,
      delay = 0,
      minDuration = 0,
      transition = true,
      className,
      style,
      testId = 'success-checkmark',
      visible = true,
      ariaLabel = 'Success',
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
          className="animate-success-scale"
          style={{
            width: sizeValue,
            height: sizeValue,
            animationDuration: `${duration}ms`,
          }}
          viewBox="0 0 52 52"
        >
          {showCircle && (
            <circle
              className="animate-success-circle"
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
          <path
            className="animate-success-check"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
            style={{
              animationDuration: `${duration}ms`,
              animationDelay: showCircle ? `${duration * 0.3}ms` : '0ms',
            }}
          />
        </svg>
      </div>
    );
  }
);

SuccessCheckmark.displayName = 'SuccessCheckmark';
