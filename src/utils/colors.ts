/**
 * Check if a color is a valid hex color
 */
export function isHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Check if a color is a valid RGB/RGBA color
 */
export function isRgbColor(color: string): boolean {
  return /^rgba?\([\d\s,./]+\)$/.test(color);
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Get animation duration in CSS format
 */
export function getAnimationDuration(speed: 'slow' | 'normal' | 'fast' | number): string {
  if (typeof speed === 'number') {
    return `${speed}ms`;
  }

  const speedMap = {
    slow: '2s',
    normal: '1s',
    fast: '0.5s',
  };

  return speedMap[speed];
}

/**
 * Normalize size value to CSS string
 */
export function normalizeSize(size?: number | string): string {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  return size || 'auto';
}
