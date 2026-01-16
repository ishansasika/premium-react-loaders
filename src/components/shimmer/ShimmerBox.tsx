import { forwardRef } from 'react';
import { ShimmerBoxProps } from '../../types';
import {
  cn,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * ShimmerBox - A versatile shimmer effect container
 *
 * A box with a continuous shimmer animation, perfect for placeholder content.
 *
 * @example
 * ```tsx
 * <ShimmerBox width={200} height={150} />
 * <ShimmerBox width="100%" aspectRatio="16/9" />
 * <ShimmerBox width={100} height={100} borderRadius="50%" />
 * ```
 */
export const ShimmerBox = forwardRef<HTMLDivElement, ShimmerBoxProps>(
  (
    {
      width = 200,
      height,
      borderRadius = 8,
      baseColor = '#e5e7eb',
      highlightColor = '#f3f4f6',
      direction = 'left-to-right',
      aspectRatio,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'shimmer-box',
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

    if (!shouldRender) return null;

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

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative overflow-hidden', className)}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: aspectRatio ? undefined : (typeof height === 'number' ? `${height}px` : height || '100px'),
          aspectRatio: aspectRatio,
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
          backgroundColor: baseColor,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${getGradientDirection()}, transparent 0%, ${highlightColor} 50%, transparent 100%)`,
            animation: `${getAnimationName()} ${effectiveDuration} infinite`,
          }}
        />
      </div>
    );
  }
);

ShimmerBox.displayName = 'ShimmerBox';
