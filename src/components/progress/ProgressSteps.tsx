import { forwardRef, Fragment } from 'react';
import { ProgressStepsProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';

/**
 * ProgressSteps - Multi-step progress indicator
 *
 * A step-by-step progress indicator for wizards, forms, and workflows.
 *
 * @example
 * ```tsx
 * <ProgressSteps steps={4} currentStep={1} />
 * <ProgressSteps steps={5} currentStep={2} labels={['Info', 'Review', 'Payment', 'Confirm', 'Done']} />
 * <ProgressSteps steps={3} currentStep={1} orientation="vertical" />
 * <ProgressSteps steps={4} currentStep={2} connector="none" />
 * ```
 */
export const ProgressSteps = forwardRef<HTMLDivElement, ProgressStepsProps>(
  (
    {
      steps,
      currentStep,
      labels,
      showNumbers = true,
      orientation = 'horizontal',
      connector = 'line',
      color = '#3b82f6',
      completedColor,
      activeColor,
      inactiveColor = '#e0e0e0',
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'progress-steps',
      visible = true,
      ariaLabel = 'Progress steps',
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

    const completed = completedColor || color;
    const active = activeColor || color;

    const getStepStatus = (index: number): 'completed' | 'active' | 'inactive' => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'active';
      return 'inactive';
    };

    const getStepColor = (status: 'completed' | 'active' | 'inactive'): string => {
      if (status === 'completed') return completed;
      if (status === 'active') return active;
      return inactiveColor;
    };

    const getConnectorColor = (index: number): string => {
      return index < currentStep ? completed : inactiveColor;
    };

    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-center w-full' : 'flex-col items-start',
          className
        )}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={currentStep}
        aria-valuemin={0}
        aria-valuemax={steps - 1}
        {...rest}
      >
        {Array.from({ length: steps }).map((_, index) => {
          const status = getStepStatus(index);
          const stepColor = getStepColor(status);
          const showConnector = index < steps - 1 && connector === 'line';

          return (
            <Fragment key={index}>
              {/* Step */}
              <div
                className={cn(
                  'flex items-center',
                  isHorizontal ? 'flex-col' : 'flex-row gap-3'
                )}
              >
                {/* Step Circle */}
                <div
                  className="rounded-full flex items-center justify-center font-medium text-sm transition-colors"
                  style={{
                    width: '2rem',
                    height: '2rem',
                    backgroundColor: stepColor,
                    color: '#ffffff',
                  }}
                >
                  {showNumbers && <span>{index + 1}</span>}
                </div>

                {/* Step Label */}
                {labels?.[index] && (
                  <span
                    className={cn(
                      'text-xs mt-1 transition-colors',
                      isHorizontal ? 'text-center' : 'text-left'
                    )}
                    style={{
                      color: status === 'inactive' ? '#9ca3af' : '#374151',
                      maxWidth: isHorizontal ? '80px' : 'none',
                    }}
                  >
                    {labels[index]}
                  </span>
                )}
              </div>

              {/* Connector */}
              {showConnector && (
                <div
                  className="transition-colors"
                  style={{
                    backgroundColor: getConnectorColor(index),
                    ...(isHorizontal
                      ? {
                          height: '2px',
                          flex: 1,
                          marginLeft: '4px',
                          marginRight: '4px',
                        }
                      : {
                          width: '2px',
                          height: '32px',
                          marginLeft: '15px',
                          marginTop: labels?.[index] ? '4px' : '0',
                          marginBottom: '4px',
                        }),
                  }}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }
);

ProgressSteps.displayName = 'ProgressSteps';
