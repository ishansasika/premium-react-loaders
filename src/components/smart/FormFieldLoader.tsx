import { forwardRef } from 'react';
import { FormFieldLoaderProps } from '../../types';
import { cn, normalizeSize, useLoaderVisibility } from '../../utils';
import { Skeleton } from '../skeleton/Skeleton';

/**
 * FormFieldLoader - Loading state for form inputs
 *
 * Specialized loader for form fields that maintains layout during loading,
 * with support for various input types, labels, and validation messages.
 *
 * @example
 * ```tsx
 * <FormFieldLoader fieldType="text" showLabel showRequired />
 * <FormFieldLoader
 *   fieldType="select"
 *   labelWidth={120}
 *   fieldWidth="100%"
 *   showLabel
 *   showValidation
 * />
 * <FormFieldLoader fieldType="textarea" fieldHeight={120} />
 * ```
 */
export const FormFieldLoader = forwardRef<HTMLDivElement, FormFieldLoaderProps>(
  (
    {
      size = 'md',
      fieldType = 'text',
      showLabel = true,
      labelWidth = 100,
      fieldWidth = '100%',
      fieldHeight,
      showValidation = false,
      showRequired = false,
      showHelperText = false,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'form-field-loader',
      visible = true,
      ariaLabel = 'Loading form field...',
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

    // Field height based on type
    const getFieldHeight = () => {
      if (fieldHeight) return normalizeSize(fieldHeight);

      switch (fieldType) {
        case 'textarea':
          return '80px';
        case 'select':
          return '40px';
        case 'checkbox':
        case 'radio':
          return '20px';
        default:
          return '40px';
      }
    };

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('w-full', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        {/* Label */}
        {showLabel && (
          <div className="flex items-center gap-1 mb-2">
            <Skeleton
              width={normalizeSize(labelWidth)}
              height={16}
              borderRadius={4}
            />
            {showRequired && (
              <Skeleton
                width={8}
                height={8}
                variant="circular"
              />
            )}
          </div>
        )}

        {/* Field */}
        <div className="w-full">
          {fieldType === 'checkbox' || fieldType === 'radio' ? (
            // Checkbox/Radio with label on the right
            <div className="flex items-center gap-2">
              <Skeleton
                width={20}
                height={20}
                variant={fieldType === 'radio' ? 'circular' : 'rectangular'}
                borderRadius={fieldType === 'checkbox' ? 4 : undefined}
              />
              <Skeleton
                width={150}
                height={16}
                borderRadius={4}
              />
            </div>
          ) : fieldType === 'select' ? (
            // Select dropdown
            <div className="relative">
              <Skeleton
                width={fieldWidth}
                height={getFieldHeight()}
                borderRadius={6}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Skeleton
                  width={12}
                  height={12}
                  variant="rectangular"
                />
              </div>
            </div>
          ) : fieldType === 'file' ? (
            // File input
            <div className="flex gap-2">
              <Skeleton
                width={120}
                height={40}
                borderRadius={6}
              />
              <Skeleton
                width="calc(100% - 132px)"
                height={40}
                borderRadius={6}
              />
            </div>
          ) : (
            // Text, textarea, etc.
            <Skeleton
              width={fieldWidth}
              height={getFieldHeight()}
              borderRadius={6}
            />
          )}
        </div>

        {/* Helper text */}
        {showHelperText && (
          <div className="mt-1">
            <Skeleton
              width={200}
              height={14}
              borderRadius={4}
            />
          </div>
        )}

        {/* Validation message */}
        {showValidation && (
          <div className="flex items-center gap-1 mt-1">
            <Skeleton
              width={14}
              height={14}
              variant="circular"
            />
            <Skeleton
              width={180}
              height={14}
              borderRadius={4}
            />
          </div>
        )}
      </div>
    );
  }
);

FormFieldLoader.displayName = 'FormFieldLoader';
