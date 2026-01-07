import { forwardRef } from 'react';
import { SkeletonPageProps } from '../../types';
import { cn, useLoaderVisibility } from '../../utils';
import { Skeleton } from './Skeleton';
import { SkeletonText } from './SkeletonText';
import { SkeletonAvatar } from './SkeletonAvatar';

/**
 * SkeletonPage - Pre-built page loading skeleton
 *
 * A ready-to-use skeleton layout for full page loading states.
 * Displays a common page structure with header, navigation, and content sections.
 *
 * @example
 * ```tsx
 * <SkeletonPage />
 * <SkeletonPage variant="dashboard" />
 * <SkeletonPage variant="article" animate={false} />
 * ```
 */
export const SkeletonPage = forwardRef<HTMLDivElement, SkeletonPageProps>(
  (
    {
      variant = 'default',
      animate = true,
      baseColor = '#e0e0e0',
      highlightColor = '#f5f5f5',
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'skeleton-page',
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

    const commonProps = {
      animate,
      baseColor,
      highlightColor,
    };

    const renderDefault = () => (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <Skeleton width={200} height={32} {...commonProps} />
          <div className="flex items-center gap-4">
            <Skeleton width={100} height={36} borderRadius={6} {...commonProps} />
            <SkeletonAvatar size={40} {...commonProps} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <SkeletonText lines={3} {...commonProps} />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton height={120} borderRadius={8} {...commonProps} />
            <Skeleton height={120} borderRadius={8} {...commonProps} />
            <Skeleton height={120} borderRadius={8} {...commonProps} />
          </div>
          <SkeletonText lines={5} {...commonProps} />
        </div>
      </div>
    );

    const renderDashboard = () => (
      <div className="space-y-6">
        {/* Header with stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton width={180} height={28} {...commonProps} />
            <Skeleton width={120} height={36} borderRadius={6} {...commonProps} />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-2">
                <Skeleton width={100} height={16} {...commonProps} />
                <Skeleton width={80} height={32} {...commonProps} />
                <Skeleton width={60} height={12} {...commonProps} />
              </div>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <Skeleton height={300} borderRadius={8} {...commonProps} />

        {/* Table */}
        <div className="space-y-3">
          <div className="flex gap-4">
            <Skeleton width={150} height={20} {...commonProps} />
            <Skeleton width={150} height={20} {...commonProps} />
            <Skeleton width={150} height={20} {...commonProps} />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton width={150} height={16} {...commonProps} />
              <Skeleton width={150} height={16} {...commonProps} />
              <Skeleton width={150} height={16} {...commonProps} />
            </div>
          ))}
        </div>
      </div>
    );

    const renderArticle = () => (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Article header */}
        <div className="space-y-4">
          <Skeleton width="80%" height={40} {...commonProps} />
          <div className="flex items-center gap-3">
            <SkeletonAvatar size={48} {...commonProps} />
            <div className="space-y-2 flex-1">
              <Skeleton width={120} height={16} {...commonProps} />
              <Skeleton width={180} height={14} {...commonProps} />
            </div>
          </div>
        </div>

        {/* Featured image */}
        <Skeleton height={400} borderRadius={8} {...commonProps} />

        {/* Article content */}
        <div className="space-y-4">
          <SkeletonText lines={4} {...commonProps} />
          <Skeleton height={200} borderRadius={8} {...commonProps} />
          <SkeletonText lines={6} {...commonProps} />
          <Skeleton height={250} borderRadius={8} {...commonProps} />
          <SkeletonText lines={4} {...commonProps} />
        </div>
      </div>
    );

    const renderProfile = () => (
      <div className="space-y-6">
        {/* Profile header */}
        <div className="flex items-start gap-6 border-b pb-6">
          <SkeletonAvatar size={120} {...commonProps} />
          <div className="flex-1 space-y-3">
            <Skeleton width={200} height={32} {...commonProps} />
            <Skeleton width={150} height={20} {...commonProps} />
            <SkeletonText lines={2} {...commonProps} />
            <div className="flex gap-3">
              <Skeleton width={100} height={36} borderRadius={6} {...commonProps} />
              <Skeleton width={100} height={36} borderRadius={6} {...commonProps} />
            </div>
          </div>
        </div>

        {/* Profile content grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton width={100} height={20} {...commonProps} />
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={16} {...commonProps} />
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonAvatar size={40} {...commonProps} />
                  <div className="flex-1 space-y-2">
                    <Skeleton width={150} height={16} {...commonProps} />
                    <Skeleton width={100} height={12} {...commonProps} />
                  </div>
                </div>
                <SkeletonText lines={2} {...commonProps} />
                <Skeleton height={200} borderRadius={6} {...commonProps} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    const renderContent = () => {
      switch (variant) {
        case 'dashboard':
          return renderDashboard();
        case 'article':
          return renderArticle();
        case 'profile':
          return renderProfile();
        default:
          return renderDefault();
      }
    };

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('w-full p-6', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
        }}
        role="status"
        aria-label="Loading page..."
        aria-busy="true"
        {...rest}
      >
        {renderContent()}
      </div>
    );
  }
);

SkeletonPage.displayName = 'SkeletonPage';
