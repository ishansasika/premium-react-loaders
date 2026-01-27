import { forwardRef, useEffect, useState } from 'react';
import { SmartSkeletonProps } from '../../types';
import { SkeletonCard } from './SkeletonCard';
import { SkeletonTable } from './SkeletonTable';
import { SkeletonList } from './SkeletonList';
import { SkeletonText } from './SkeletonText';
import { SkeletonImage } from './SkeletonImage';
import { SkeletonForm } from './SkeletonForm';

/**
 * SmartSkeleton - Intelligent skeleton with auto-detection
 *
 * Automatically detects content layout and generates appropriate skeleton variant,
 * or uses explicit content type for predictable rendering.
 *
 * @example
 * ```tsx
 * // Explicit content type
 * <SmartSkeleton contentType="card" />
 * <SmartSkeleton contentType="table" itemCount={5} />
 *
 * // Auto-detection from reference element
 * <SmartSkeleton
 *   contentType="auto"
 *   referenceElement={containerRef.current}
 *   detectionStrategy="mixed"
 * />
 * ```
 */
export const SmartSkeleton = forwardRef<HTMLDivElement, SmartSkeletonProps>(
  (
    {
      contentType = 'text',
      referenceElement,
      itemCount = 3,
      detectionStrategy = 'mixed',
      width,
      height,
      animate = true,
      baseColor,
      highlightColor,
      className,
      style,
      testId = 'smart-skeleton',
      visible = true,
      ...rest
    },
    ref
  ) => {
    const [detectedType, setDetectedType] = useState<string>(contentType);

    // Auto-detect content type from reference element
    useEffect(() => {
      if (contentType !== 'auto' || !referenceElement) return;

      const detectContentType = () => {
        // DOM-based detection
        if (detectionStrategy === 'dom' || detectionStrategy === 'mixed') {
          const tagName = referenceElement.tagName.toLowerCase();

          // Check for specific elements
          if (tagName === 'table' || referenceElement.querySelector('table')) {
            return 'table';
          }
          if (tagName === 'form' || referenceElement.querySelector('form')) {
            return 'form';
          }
          if (tagName === 'ul' || tagName === 'ol' || referenceElement.querySelector('ul, ol')) {
            return 'list';
          }
          if (tagName === 'img' || referenceElement.querySelector('img')) {
            return 'image';
          }

          // Check for card-like structures
          const hasImage = !!referenceElement.querySelector('img');
          const hasText = referenceElement.textContent && referenceElement.textContent.length > 50;
          if (hasImage && hasText) {
            return 'card';
          }
        }

        // Dimension-based detection
        if (detectionStrategy === 'dimensions' || detectionStrategy === 'mixed') {
          const { width, height } = referenceElement.getBoundingClientRect();
          const aspectRatio = width / height;

          // Wide and short = likely a form or list
          if (aspectRatio > 2 && height < 100) {
            return 'text';
          }

          // Square-ish and medium = likely a card
          if (aspectRatio >= 0.7 && aspectRatio <= 1.5 && width > 200) {
            return 'card';
          }

          // Very wide = likely a table
          if (aspectRatio > 3) {
            return 'table';
          }

          // Tall and narrow = likely a list
          if (aspectRatio < 0.5) {
            return 'list';
          }
        }

        // Default fallback
        return 'text';
      };

      const type = detectContentType();
      setDetectedType(type);
    }, [contentType, referenceElement, detectionStrategy]);

    // Use detected type or explicit type
    const activeType = contentType === 'auto' ? detectedType : contentType;

    // Common props
    const commonProps = {
      ref,
      className,
      style,
      testId,
      visible,
      animate,
      baseColor,
      highlightColor,
      ...rest,
    };

    // Render appropriate skeleton variant
    switch (activeType) {
      case 'card':
        return (
          <SkeletonCard
            {...commonProps}
            width={width}
            hasAvatar
            lines={3}
          />
        );

      case 'table':
        return (
          <SkeletonTable
            {...commonProps}
            rows={itemCount}
            columns={4}
            showHeader
          />
        );

      case 'list':
        return (
          <SkeletonList
            {...commonProps}
            items={itemCount}
            itemHeight={60}
          />
        );

      case 'form':
        return (
          <SkeletonForm
            {...commonProps}
            fields={itemCount || 4}
            showLabels
          />
        );

      case 'image':
        return (
          <SkeletonImage
            {...commonProps}
            width={width || '100%'}
            height={height || 200}
          />
        );

      case 'text':
      default:
        return (
          <SkeletonText
            {...commonProps}
            lines={itemCount}
          />
        );
    }
  }
);

SmartSkeleton.displayName = 'SmartSkeleton';
