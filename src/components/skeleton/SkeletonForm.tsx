import { forwardRef } from 'react';
import { SkeletonFormProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';

/**
 * SkeletonForm - Form loading skeleton
 *
 * A skeleton loader for form layouts with configurable fields, labels, and submit button.
 *
 * @example
 * ```tsx
 * <SkeletonForm />
 * <SkeletonForm fields={5} showLabels={true} />
 * <SkeletonForm fields={3} showButton={false} />
 * <SkeletonForm fields={4} buttonPosition="right" />
 * ```
 */
export const SkeletonForm = forwardRef<HTMLDivElement, SkeletonFormProps>(
  (
    {
      fields = 3,
      showLabels = true,
      showButton = true,
      gap = 16,
      buttonWidth = '120px',
      buttonPosition = 'left',
      animate = true,
      baseColor,
      highlightColor,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'skeleton-form',
      visible = true,
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

    const gapValue = normalizeSize(gap);
    const buttonAlign =
      buttonPosition === 'left'
        ? 'justify-start'
        : buttonPosition === 'right'
        ? 'justify-end'
        : 'justify-center';

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('w-full', className)}
        style={{ ...style, display: 'flex', flexDirection: 'column', gap: gapValue, opacity, transition: transitionStyle }}
        role="status"
        aria-label="Loading form..."
        aria-busy="true"
        {...rest}
      >
        {/* Form Fields */}
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="w-full" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Field Label */}
            {showLabels && (
              <Skeleton
                width="30%"
                height="0.875rem"
                variant="text"
                animate={animate}
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            )}
            {/* Field Input */}
            <Skeleton
              width="100%"
              height="2.5rem"
              variant="rectangular"
              animate={animate}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        ))}

        {/* Submit Button */}
        {showButton && (
          <div className={cn('flex', buttonAlign)} style={{ marginTop: '8px' }}>
            <Skeleton
              width={buttonWidth}
              height="2.5rem"
              variant="rounded"
              animate={animate}
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
        )}
      </div>
    );
  }
);

SkeletonForm.displayName = 'SkeletonForm';
