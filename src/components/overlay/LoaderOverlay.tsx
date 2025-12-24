import { forwardRef } from 'react';
import { LoaderOverlayProps } from '../../types';
import { cn } from '../../utils';

/**
 * LoaderOverlay - Overlay wrapper for displaying loaders over content
 *
 * A flexible overlay component that displays a loader over content during loading states.
 * Supports both full-screen and container-relative positioning.
 *
 * @example
 * ```tsx
 * // Full screen overlay
 * <LoaderOverlay loading={isLoading} loader={<SpinnerCircle />}>
 *   <YourContent />
 * </LoaderOverlay>
 *
 * // Container overlay with custom backdrop
 * <LoaderOverlay
 *   loading={isLoading}
 *   loader={<SpinnerRing />}
 *   position="absolute"
 *   backdropOpacity={0.7}
 *   blur
 * >
 *   <YourContent />
 * </LoaderOverlay>
 * ```
 */
export const LoaderOverlay = forwardRef<HTMLDivElement, LoaderOverlayProps>(
  (
    {
      loading = false,
      loader,
      children,
      position = 'fixed',
      backdropOpacity = 0.5,
      backdropColor = '#000000',
      blur = false,
      className,
      style,
      testId = 'loader-overlay',
      ariaLabel = 'Loading content...',
      zIndex = 9999,
      ...rest
    },
    ref
  ) => {
    const backdropStyles = {
      backgroundColor: backdropColor,
      opacity: backdropOpacity,
      backdropFilter: blur ? 'blur(4px)' : undefined,
      WebkitBackdropFilter: blur ? 'blur(4px)' : undefined,
    };

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('relative', className)}
        style={style}
        {...rest}
      >
        {children}

        {loading && (
          <div
            className={cn(
              'inset-0 flex items-center justify-center',
              position === 'fixed' ? 'fixed' : 'absolute'
            )}
            style={{
              zIndex,
            }}
            role="status"
            aria-label={ariaLabel}
            aria-busy="true"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={backdropStyles}
              aria-hidden="true"
            />

            {/* Loader */}
            <div className="relative z-10">{loader}</div>
          </div>
        )}
      </div>
    );
  }
);

LoaderOverlay.displayName = 'LoaderOverlay';
