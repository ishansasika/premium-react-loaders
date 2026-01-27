import { forwardRef } from 'react';
import { FlipCardProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * FlipCard - 3D card flip loader
 *
 * A card that flips between front and back faces in 3D space,
 * with customizable colors and flip direction.
 *
 * @example
 * ```tsx
 * <FlipCard width={100} height={60} />
 * <FlipCard
 *   width={120}
 *   height={80}
 *   direction="vertical"
 *   frontColor="#3b82f6"
 *   backColor="#8b5cf6"
 * />
 * ```
 */
export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      secondaryColor = '#8b5cf6',
      direction = 'horizontal',
      frontColor,
      backColor,
      width,
      height,
      interval,
      perspective = 1000,
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'flip-card',
      visible = true,
      ariaLabel = 'Loading...',
      ...rest
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const effectiveDuration = getEffectiveDuration(
      interval !== undefined ? interval : speed,
      respectMotionPreference,
      prefersReducedMotion
    );
    const { shouldRender, opacity, transitionStyle } = useLoaderVisibility(
      visible,
      delay,
      minDuration,
      transition
    );

    if (!shouldRender) return null;

    const cardWidth = width ? normalizeSize(width) : normalizeSize(size);
    const cardHeight = height ? normalizeSize(height) : `calc(${normalizeSize(size)} * 0.6)`;

    const front = frontColor || color;
    const back = backColor || secondaryColor;

    const animationClass =
      direction === 'horizontal' ? 'animate-flip-card-horizontal' : 'animate-flip-card-vertical';

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
          perspective: `${perspective}px`,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className={cn('relative', animationClass)}
          style={{
            width: cardWidth,
            height: cardHeight,
            transformStyle: 'preserve-3d',
            animationDuration: effectiveDuration,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-md flex items-center justify-center"
            style={{
              backgroundColor: front,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          />

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-md flex items-center justify-center"
            style={{
              backgroundColor: back,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: direction === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)',
            }}
          />
        </div>
      </div>
    );
  }
);

FlipCard.displayName = 'FlipCard';
