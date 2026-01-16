import { forwardRef } from 'react';
import { ShimmerTextProps } from '../../types';
import {
  cn,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * ShimmerText - Text placeholder with shimmer animation
 *
 * Multiple lines of shimmer placeholders to represent text content.
 *
 * @example
 * ```tsx
 * <ShimmerText lines={3} />
 * <ShimmerText lines={4} lastLineWidth="60%" />
 * <ShimmerText width="100%" height={16} lineGap={8} />
 * ```
 */
export const ShimmerText = forwardRef<HTMLDivElement, ShimmerTextProps>(
  (
    {
      width = '100%',
      height = 16,
      borderRadius = 4,
      baseColor = '#e5e7eb',
      highlightColor = '#f3f4f6',
      direction = 'left-to-right',
      lines = 3,
      lineGap = 12,
      lastLineWidth = '75%',
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'shimmer-text',
      visible = true,
      ariaLabel = 'Loading text...',
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

    const normalizedGap = typeof lineGap === 'number' ? `${lineGap}px` : lineGap;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('flex flex-col', className)}
        style={{
          gap: normalizedGap,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: lines }, (_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine && lines > 1 ? lastLineWidth : width;

          return (
            <div
              key={index}
              className="relative overflow-hidden"
              style={{
                width: typeof lineWidth === 'number' ? `${lineWidth}px` : lineWidth,
                height: typeof height === 'number' ? `${height}px` : height,
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
                backgroundColor: baseColor,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${getGradientDirection()}, transparent 0%, ${highlightColor} 50%, transparent 100%)`,
                  animation: `${getAnimationName()} ${effectiveDuration} infinite`,
                  animationDelay: `${index * 100}ms`,
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

ShimmerText.displayName = 'ShimmerText';
