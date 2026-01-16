import { forwardRef } from 'react';
import { ShimmerButtonProps } from '../../types';
import {
  cn,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * ShimmerButton - Button placeholder with shimmer animation
 *
 * A button-shaped shimmer placeholder, perfect for loading states in button areas.
 *
 * @example
 * ```tsx
 * <ShimmerButton width={120} />
 * <ShimmerButton width={150} showIcon iconPosition="left" />
 * <ShimmerButton variant="outline" width="100%" />
 * ```
 */
export const ShimmerButton = forwardRef<HTMLDivElement, ShimmerButtonProps>(
  (
    {
      width = 120,
      height = 40,
      borderRadius = 8,
      baseColor = '#e5e7eb',
      highlightColor = '#f3f4f6',
      direction = 'left-to-right',
      variant = 'solid',
      showIcon = false,
      iconPosition = 'left',
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'shimmer-button',
      visible = true,
      ariaLabel = 'Loading button...',
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

    if (!shouldRender) return null;

    const getAnimationName = () => {
      switch (direction) {
        case 'right-to-left':
          return 'shimmer-rtl';
        case 'top-to-bottom':
          return 'shimmer-ttb';
        case 'bottom-to-top':
          return 'shimmer-btt';
        default:
          return 'shimmer-ltr';
      }
    };

    const getGradientDirection = () => {
      switch (direction) {
        case 'right-to-left':
          return 'to left';
        case 'top-to-bottom':
          return 'to bottom';
        case 'bottom-to-top':
          return 'to top';
        default:
          return 'to right';
      }
    };

    const normalizedHeight = typeof height === 'number' ? height : 40;
    const iconSize = Math.floor(normalizedHeight * 0.5);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn(
          'relative overflow-hidden inline-flex items-center justify-center gap-2',
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
          backgroundColor: variant === 'solid' ? baseColor : 'transparent',
          border: variant === 'outline' ? `2px solid ${baseColor}` : 'none',
          padding: '0 16px',
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {/* Icon placeholder */}
        {showIcon && iconPosition === 'left' && (
          <div
            className="relative overflow-hidden rounded-full flex-shrink-0"
            style={{
              width: iconSize,
              height: iconSize,
              backgroundColor: variant === 'solid' ? highlightColor : baseColor,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${getGradientDirection()}, transparent 0%, ${variant === 'solid' ? baseColor : highlightColor} 50%, transparent 100%)`,
                animation: `${getAnimationName()} ${effectiveDuration} infinite`,
              }}
            />
          </div>
        )}

        {/* Text placeholder */}
        <div
          className="relative overflow-hidden flex-1"
          style={{
            height: Math.floor(normalizedHeight * 0.35),
            borderRadius: 4,
            backgroundColor: variant === 'solid' ? highlightColor : baseColor,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${getGradientDirection()}, transparent 0%, ${variant === 'solid' ? baseColor : highlightColor} 50%, transparent 100%)`,
              animation: `${getAnimationName()} ${effectiveDuration} infinite`,
            }}
          />
        </div>

        {/* Icon placeholder (right) */}
        {showIcon && iconPosition === 'right' && (
          <div
            className="relative overflow-hidden rounded-full flex-shrink-0"
            style={{
              width: iconSize,
              height: iconSize,
              backgroundColor: variant === 'solid' ? highlightColor : baseColor,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(${getGradientDirection()}, transparent 0%, ${variant === 'solid' ? baseColor : highlightColor} 50%, transparent 100%)`,
                animation: `${getAnimationName()} ${effectiveDuration} infinite`,
              }}
            />
          </div>
        )}

        {/* Overall shimmer overlay for solid variant */}
        {variant === 'solid' && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(${getGradientDirection()}, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)`,
              animation: `${getAnimationName()} ${effectiveDuration} infinite`,
            }}
          />
        )}
      </div>
    );
  }
);

ShimmerButton.displayName = 'ShimmerButton';
