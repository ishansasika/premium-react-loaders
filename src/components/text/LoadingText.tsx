import { forwardRef } from 'react';
import { LoadingTextProps } from '../../types';
import {
  cn,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * LoadingText - Animated loading text with ellipsis
 *
 * Customizable "Loading..." text with various animation styles.
 *
 * @example
 * ```tsx
 * <LoadingText />
 * <LoadingText text="Please wait" animation="fade" />
 * <LoadingText text="Processing" dotCount={4} color="#3b82f6" />
 * <LoadingText animation="bounce" fontSize={18} />
 * ```
 */
export const LoadingText = forwardRef<HTMLDivElement, LoadingTextProps>(
  (
    {
      text = 'Loading',
      animation = 'dots',
      fontSize = 16,
      fontWeight = 500,
      color = '#374151',
      dotCount = 3,
      showEllipsis = true,
      textClassName,
      speed = 'normal',
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'loading-text',
      visible = true,
      ariaLabel,
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

    const durationNum = parseInt(effectiveDuration, 10);
    const normalizedFontSize = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

    const renderDots = () => {
      if (!showEllipsis) return null;

      switch (animation) {
        case 'dots':
          return (
            <span className="inline-flex">
              {Array.from({ length: dotCount }, (_, index) => (
                <span
                  key={index}
                  style={{
                    animation: `loading-text-dot ${durationNum}ms ease-in-out infinite`,
                    animationDelay: `${index * (durationNum / dotCount / 2)}ms`,
                  }}
                >
                  .
                </span>
              ))}
            </span>
          );

        case 'fade':
          return (
            <span
              style={{
                animation: `loading-text-fade ${durationNum}ms ease-in-out infinite`,
              }}
            >
              ...
            </span>
          );

        case 'bounce':
          return (
            <span className="inline-flex">
              {Array.from({ length: dotCount }, (_, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    animation: `loading-text-bounce ${durationNum}ms ease-in-out infinite`,
                    animationDelay: `${index * (durationNum / dotCount / 2)}ms`,
                  }}
                >
                  .
                </span>
              ))}
            </span>
          );

        case 'wave':
          return (
            <span className="inline-flex">
              {Array.from({ length: dotCount }, (_, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    animation: `loading-text-wave ${durationNum}ms ease-in-out infinite`,
                    animationDelay: `${index * (durationNum / dotCount / 1.5)}ms`,
                  }}
                >
                  .
                </span>
              ))}
            </span>
          );

        default:
          return '...';
      }
    };

    const renderText = () => {
      if (animation === 'wave' || animation === 'bounce') {
        // Animate each character
        return (
          <>
            {text.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: `loading-text-${animation} ${durationNum}ms ease-in-out infinite`,
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </>
        );
      }

      if (animation === 'fade') {
        return (
          <span
            style={{
              animation: `loading-text-fade ${durationNum}ms ease-in-out infinite`,
            }}
          >
            {text}
          </span>
        );
      }

      return text;
    };

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center', className)}
        style={{
          opacity,
          transition: transitionStyle,
          ...style,
        }}
        role="status"
        aria-label={ariaLabel || `${text}...`}
        aria-busy="true"
        {...rest}
      >
        <span
          className={cn('inline-flex items-baseline', textClassName)}
          style={{
            fontSize: normalizedFontSize,
            fontWeight,
            color,
          }}
        >
          {renderText()}
          {renderDots()}
        </span>
      </div>
    );
  }
);

LoadingText.displayName = 'LoadingText';
