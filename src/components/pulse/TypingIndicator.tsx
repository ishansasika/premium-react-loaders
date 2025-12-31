import { forwardRef } from 'react';
import { TypingIndicatorProps } from '../../types';
import { cn, normalizeSize, getAnimationDuration } from '../../utils';

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
      className,
      style,
      testId = 'typing-indicator',
      visible = true,
      ariaLabel = 'Typing...',
      ...rest
    },
    ref
  ) => {
    if (!visible) return null;

    const animationDuration = getAnimationDuration(speed);
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
              animation: `typing-${variant} ${animationDuration} ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

TypingIndicator.displayName = 'TypingIndicator';
