import { forwardRef } from 'react';
import { TypingIndicatorProps } from '../../types';
import { cn, normalizeSize, useReducedMotion, getEffectiveDuration, useLoaderVisibility } from '../../utils';

/**
 * TypingIndicator - Chat typing indicator
 *
 * A loader for messaging/chat applications showing typing activity.
 *
 * @example
 * ```tsx
 * <TypingIndicator />
 * <TypingIndicator variant="fade" />
 * <TypingIndicator dotCount={5} color="#3b82f6" />
 * <TypingIndicator dotSize={10} gap={6} />
 * ```
 */
export const TypingIndicator = forwardRef<HTMLDivElement, TypingIndicatorProps>(
  (
    {
      size,
      color = '#3b82f6',
      dotCount = 3,
      dotSize = 8,
      gap = 4,
      variant = 'bounce',
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'typing-indicator',
      visible = true,
      ariaLabel = 'Typing...',
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
    const gapValue = normalizeSize(gap);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center', className)}
        style={{
          gap: gapValue,
          height: size ? normalizeSize(size) : 'auto',
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {Array.from({ length: dotCount }).map((_, index) => (
          <div
            key={index}
            className="rounded-full"
            style={{
              width: normalizeSize(dotSize),
              height: normalizeSize(dotSize),
              backgroundColor: color,
              animation: `typing-${variant} ${effectiveDuration} ease-in-out infinite`,
              animationDelay: reverse ? `${(dotCount - index - 1) * 0.2}s` : `${index * 0.2}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

TypingIndicator.displayName = 'TypingIndicator';
