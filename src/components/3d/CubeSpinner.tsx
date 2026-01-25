import { forwardRef } from 'react';
import { CubeSpinnerProps } from '../../types';
import {
  cn,
  normalizeSize,
  useReducedMotion,
  getEffectiveDuration,
  useLoaderVisibility,
} from '../../utils';

/**
 * CubeSpinner - 3D rotating cube loader with perspective
 *
 * A visually striking 3D cube that rotates in space with customizable face colors,
 * rotation axis, and optional wireframe edges.
 *
 * @example
 * ```tsx
 * <CubeSpinner size={60} />
 * <CubeSpinner size="lg" rotationAxis="diagonal" />
 * <CubeSpinner
 *   size={80}
 *   faceColors={['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']}
 *   showEdges
 *   edgeColor="#000000"
 * />
 * ```
 */
export const CubeSpinner = forwardRef<HTMLDivElement, CubeSpinnerProps>(
  (
    {
      size = 'md',
      color = '#3b82f6',
      faceColors,
      rotationAxis = 'diagonal',
      perspective = 600,
      showEdges = false,
      edgeColor = '#000000',
      speed = 'normal',
      reverse = false,
      respectMotionPreference = true,
      delay = 0,
      minDuration = 0,
      transition,
      className,
      style,
      testId = 'cube-spinner',
      visible = true,
      ariaLabel = 'Loading...',
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

    const cubeSize = normalizeSize(size);
    const halfSize = `calc(${cubeSize} / 2)`;

    // Default face colors if not provided
    const defaultFaceColors = [
      color, // front
      color, // back
      color, // right
      color, // left
      color, // top
      color, // bottom
    ];

    const colors = faceColors && faceColors.length === 6 ? faceColors : defaultFaceColors;

    // Animation class based on rotation axis
    const animationClass = {
      x: 'animate-cube-rotate-x',
      y: 'animate-cube-rotate-y',
      z: 'animate-cube-rotate-z',
      diagonal: 'animate-cube-rotate-diagonal',
    }[rotationAxis];

    const edgeStyle = showEdges
      ? {
          border: `1px solid ${edgeColor}`,
        }
      : {};

    return (
      <div
        ref={ref}
        data-testid={testId}
        className={cn('inline-flex items-center justify-center', className)}
        style={{
          ...style,
          opacity,
          transition: transitionStyle,
          perspective: `${perspective}px`,
        }}
        role="status"
        aria-label={ariaLabel}
        aria-busy="true"
        {...rest}
      >
        <div
          className={cn('relative', animationClass)}
          style={{
            width: cubeSize,
            height: cubeSize,
            transformStyle: 'preserve-3d',
            animationDuration: effectiveDuration,
            animationDirection: reverse ? 'reverse' : 'normal',
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: colors[0],
              transform: `translateZ(${halfSize})`,
              ...edgeStyle,
            }}
          />

          {/* Back face */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: colors[1],
              transform: `translateZ(calc(-${halfSize})) rotateY(180deg)`,
              ...edgeStyle,
            }}
          />

          {/* Right face */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: colors[2],
              transform: `translateX(${halfSize}) rotateY(90deg)`,
              ...edgeStyle,
            }}
          />

          {/* Left face */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: colors[3],
              transform: `translateX(calc(-${halfSize})) rotateY(-90deg)`,
              ...edgeStyle,
            }}
          />

          {/* Top face */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: colors[4],
              transform: `translateY(calc(-${halfSize})) rotateX(90deg)`,
              ...edgeStyle,
            }}
          />

          {/* Bottom face */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: colors[5],
              transform: `translateY(${halfSize}) rotateX(-90deg)`,
              ...edgeStyle,
            }}
          />
        </div>
      </div>
    );
  }
);

CubeSpinner.displayName = 'CubeSpinner';
