import { forwardRef } from 'react';
import { InfinityLoaderProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * InfinityLoader - Classic infinity symbol animation
 *
 * A smooth infinity (figure-8) path animation with optional traveling dot.
 *
 * @example
 * ```tsx
 * <InfinityLoader color="#3b82f6" />
 * <InfinityLoader showDot gradient />
 * <InfinityLoader thickness={4} size="lg" />
 * ```
 */
export const InfinityLoader = forwardRef<HTMLDivElement, InfinityLoaderProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor,
      thickness = 3,
      gradient = false,
      showDot = false,
      dotSize = 6,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'infinity-loader',
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

    const normalizedSize = normalizeSize(size);
    const sizeNum = parseInt(normalizedSize, 10);
    const width = sizeNum;
    const height = sizeNum * 0.5;

    // Infinity path - figure 8 shape
    const infinityPath = `M ${width * 0.15} ${height * 0.5}
      C ${width * 0.15} ${height * 0.1}, ${width * 0.4} ${height * 0.1}, ${width * 0.5} ${height * 0.5}
      C ${width * 0.6} ${height * 0.9}, ${width * 0.85} ${height * 0.9}, ${width * 0.85} ${height * 0.5}
      C ${width * 0.85} ${height * 0.1}, ${width * 0.6} ${height * 0.1}, ${width * 0.5} ${height * 0.5}
      C ${width * 0.4} ${height * 0.9}, ${width * 0.15} ${height * 0.9}, ${width * 0.15} ${height * 0.5}`;

    const gradientId = `infinity-gradient-${testId}`;
    const pathId = `infinity-path-${testId}`;

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          width,
          height,
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
        >
          {gradient && secondaryColor && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={secondaryColor} />
              </linearGradient>
            </defs>
          )}

          {/* Background path (faded) */}
          <path
            d={infinityPath}
            stroke={gradient && secondaryColor ? `url(#${gradientId})` : color}
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
            opacity={0.2}
          />

          {/* Animated path */}
          <path
            id={pathId}
            d={infinityPath}
            stroke={gradient && secondaryColor ? `url(#${gradientId})` : color}
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: '50 200',
              animation: `infinity-dash ${effectiveDuration} linear infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
            }}
          />

          {/* Traveling dot */}
          {showDot && (
            <circle
              r={dotSize / 2}
              fill={secondaryColor || color}
              style={{
                animation: `infinity-dot ${effectiveDuration} linear infinite`,
                animationDirection: reverse ? 'reverse' : 'normal',
              }}
            >
              <animateMotion
                dur={effectiveDuration}
                repeatCount="indefinite"
                path={infinityPath}
                keyPoints={reverse ? '1;0' : '0;1'}
                keyTimes="0;1"
              />
            </circle>
          )}
        </svg>
      </div>
    );
  }
);

InfinityLoader.displayName = 'InfinityLoader';
