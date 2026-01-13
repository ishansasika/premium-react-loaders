import { forwardRef, useState, useEffect, useRef } from 'react';
import { LoaderTransitionProps } from '../../types';
import { cn } from '../../utils';

/**
 * LoaderTransition - Smooth transitions between loading and loaded states
 *
 * Provides seamless transitions between loading content (skeleton, spinner) and actual content,
 * preventing jarring content switches and improving perceived performance.
 *
 * @example
 * ```tsx
 * // Fade transition from skeleton to content
 * <LoaderTransition
 *   loading={isLoading}
 *   loadingContent={<Skeleton width="100%" height={200} />}
 *   transitionType="fade"
 *   duration={300}
 * >
 *   <YourActualContent />
 * </LoaderTransition>
 *
 * // Slide up transition
 * <LoaderTransition
 *   loading={isLoading}
 *   loadingContent={<SpinnerCircle size={48} />}
 *   transitionType="slide-up"
 *   timing="spring"
 * >
 *   <YourContent />
 * </LoaderTransition>
 * ```
 */
export const LoaderTransition = forwardRef<HTMLDivElement, LoaderTransitionProps>(
  (
    {
      loading,
      loadingContent,
      children,
      transitionType = 'fade',
      duration = 300,
      timing = 'ease-out',
      keepMounted = false,
      exitDelay = 0,
      appearOnMount = false,
      className,
      style,
      testId = 'loader-transition',
      ariaLabel,
      visible = true,
      delay = 0,
      minDuration = 0,
      transition: transitionProp,
      ...rest
    },
    ref
  ) => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showLoading, setShowLoading] = useState(appearOnMount ? loading : false);
    const [showContent, setShowContent] = useState(!appearOnMount && !loading);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const entryTimeRef = useRef<number | null>(null);

    // Handle loading state changes
    useEffect(() => {
      if (!visible) {
        setShowLoading(false);
        setShowContent(false);
        return;
      }

      if (loading) {
        // Clear any pending timeouts
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Apply delay before showing loading content
        if (delay > 0) {
          timeoutRef.current = setTimeout(() => {
            setShowLoading(true);
            setShowContent(false);
            entryTimeRef.current = Date.now();
          }, delay);
        } else {
          setShowLoading(true);
          setShowContent(false);
          entryTimeRef.current = Date.now();
        }
      } else {
        // Calculate remaining minDuration
        const elapsed = entryTimeRef.current ? Date.now() - entryTimeRef.current : 0;
        const remainingMinDuration = Math.max(0, minDuration - elapsed);
        const totalDelay = exitDelay + remainingMinDuration;

        if (totalDelay > 0) {
          timeoutRef.current = setTimeout(() => {
            setIsTransitioning(true);
            timeoutRef.current = setTimeout(() => {
              setShowLoading(false);
              setShowContent(true);
              setIsTransitioning(false);
            }, duration);
          }, totalDelay);
        } else {
          setIsTransitioning(true);
          timeoutRef.current = setTimeout(() => {
            setShowLoading(false);
            setShowContent(true);
            setIsTransitioning(false);
          }, duration);
        }
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [loading, visible, delay, minDuration, exitDelay, duration]);

    // Get transition classes based on type
    const getTransitionClasses = (isLoading: boolean, isTransition: boolean) => {
      const baseClasses = 'loader-transition';
      const timingClass = `loader-transition-${timing}`;

      if (transitionType === 'none') {
        return baseClasses;
      }

      if (transitionType === 'fade') {
        if (isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-fade-enter-active`;
        if (!isLoading && isTransition) return `${baseClasses} ${timingClass} loader-transition-fade-exit-active`;
        if (!isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-fade-enter-active`;
        return `${baseClasses} ${timingClass}`;
      }

      if (transitionType === 'slide-up') {
        if (isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-up-enter-active`;
        if (!isLoading && isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-up-exit-active`;
        if (!isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-up-enter-active`;
        return `${baseClasses} ${timingClass}`;
      }

      if (transitionType === 'slide-down') {
        if (isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-down-enter-active`;
        if (!isLoading && isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-down-exit-active`;
        if (!isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-down-enter-active`;
        return `${baseClasses} ${timingClass}`;
      }

      if (transitionType === 'slide-left') {
        if (isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-left-enter-active`;
        if (!isLoading && isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-left-exit-active`;
        if (!isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-left-enter-active`;
        return `${baseClasses} ${timingClass}`;
      }

      if (transitionType === 'slide-right') {
        if (isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-right-enter-active`;
        if (!isLoading && isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-right-exit-active`;
        if (!isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-slide-right-enter-active`;
        return `${baseClasses} ${timingClass}`;
      }

      if (transitionType === 'scale') {
        if (isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-scale-enter-active`;
        if (!isLoading && isTransition) return `${baseClasses} ${timingClass} loader-transition-scale-exit-active`;
        if (!isLoading && !isTransition) return `${baseClasses} ${timingClass} loader-transition-scale-enter-active`;
        return `${baseClasses} ${timingClass}`;
      }

      return baseClasses;
    };

    const shouldShowLoading = showLoading || (keepMounted && loading);
    const shouldShowContent = showContent || (keepMounted && !loading);

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative', className)}
        style={style}
        role="status"
        aria-label={ariaLabel}
        aria-busy={loading}
        {...rest}
      >
        {shouldShowLoading && (
          <div
            className={getTransitionClasses(true, isTransitioning)}
            style={{
              transitionDuration: `${duration}ms`,
              display: showLoading ? 'block' : 'none',
            }}
          >
            {loadingContent}
          </div>
        )}

        {shouldShowContent && (
          <div
            className={getTransitionClasses(false, isTransitioning)}
            style={{
              transitionDuration: `${duration}ms`,
              display: showContent ? 'block' : 'none',
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

LoaderTransition.displayName = 'LoaderTransition';
