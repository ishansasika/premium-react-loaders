import { forwardRef } from 'react';
import { ButtonSpinnerProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * ButtonSpinner - Spinner designed for button loading states
 *
 * A compact spinner component optimized for use inside buttons, with options for
 * positioning relative to button content and different visual variants.
 *
 * @example
 * ```tsx
 * // Simple button with spinner
 * <ButtonSpinner visible={isLoading}>Submit</ButtonSpinner>
 *
 * // Spinner on the left
 * <ButtonSpinner visible={isLoading} position="left" variant="dots">
 *   Loading...
 * </ButtonSpinner>
 *
 * // Hide content when loading
 * <ButtonSpinner visible={isLoading} showContent={false}>
 *   Click Me
 * </ButtonSpinner>
 * ```
 */
export const ButtonSpinner = forwardRef<HTMLDivElement, ButtonSpinnerProps>(
  (
    {
      size = 16,
      color = 'currentColor',
      variant = 'circle',
      position = 'left',
      thickness = 2,
      dotCount = 3,
      barCount = 3,
      speed = 'normal',
      gap = 8,
      showContent = true,
      children,
      delay = 0,
      minDuration = 0,
      transition,
      respectMotionPreference = true,
      className,
      style,
      testId = 'button-spinner',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(speed, respectMotionPreference, prefersReducedMotion);
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) {
      return children ? <div className={className} style={style}>{children}</div> : null;
    }

    const spinnerSize = normalizeSize(size);
    const gapSize = typeof gap === 'number' ? `${gap}px` : gap;

    const renderSpinner = () => {
      switch (variant) {
        case 'dots':
          return (
            <div
              className="inline-flex items-center justify-center"
              style={{ gap: `${parseInt(spinnerSize) / 8}px` }}
            >
              {Array.from({ length: dotCount }).map((_, i) => (
                <div
                  key={i}
                  className="animate-button-dot-pulse"
                  style={{
                    width: `${parseInt(spinnerSize) / 3}px`,
                    height: `${parseInt(spinnerSize) / 3}px`,
                    backgroundColor: color,
                    borderRadius: '50%',
                    animationDuration: effectiveDuration,
                    animationDelay: `${(i * parseInt(effectiveDuration)) / (dotCount * 3)}ms`,
                  }}
                />
              ))}
            </div>
          );

        case 'bars':
          return (
            <div
              className="inline-flex items-center justify-center"
              style={{ gap: `${parseInt(spinnerSize) / 8}px`, height: spinnerSize }}
            >
              {Array.from({ length: barCount }).map((_, i) => (
                <div
                  key={i}
                  className="animate-button-bar-pulse"
                  style={{
                    width: `${parseInt(spinnerSize) / 6}px`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: '2px',
                    animationDuration: effectiveDuration,
                    animationDelay: `${(i * parseInt(effectiveDuration)) / (barCount * 3)}ms`,
                  }}
                />
              ))}
            </div>
          );

        case 'circle':
        default:
          return (
            <svg
              className="animate-spinner-rotate"
              style={{
                width: spinnerSize,
                height: spinnerSize,
                animationDuration: effectiveDuration,
              }}
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r={25 - thickness * 4}
                fill="none"
                stroke={color}
                strokeWidth={thickness * 2}
                strokeDasharray="80, 200"
                strokeLinecap="round"
              />
            </svg>
          );
      }
    };

    const flexDirection = position === 'right' ? 'row-reverse' : 'row';

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          flexDirection: position === 'center' ? 'column' : flexDirection,
          gap: showContent && children ? gapSize : 0,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {renderSpinner()}
        {showContent && children && <span>{children}</span>}
      </div>
    );
  }
);

ButtonSpinner.displayName = 'ButtonSpinner';
