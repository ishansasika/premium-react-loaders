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
export function getAnimationDuration(speed: 'slow' | 'normal' | 'fast' | number = 'normal'): string {
  if (typeof speed === 'number') {
    // Validate number is valid and positive, clamp to reasonable range (50ms - 10000ms)
    const validSpeed = !isNaN(speed) && speed > 0 ? Math.max(50, Math.min(10000, speed)) : 1000;
    return `${validSpeed}ms`;
  }

  const speedMap = {
    slow: '2s',
    normal: '1s',
    fast: '0.5s',
  };

  return speedMap[speed] || speedMap.normal;
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

/**
 * Safely parse size to number with fallback
 */
export function parseSizeToNumber(size: number | string | undefined, fallback: number): number {
  if (typeof size === 'number') {
    return !isNaN(size) && size > 0 ? size : fallback;
  }

  if (typeof size === 'string') {
    const parsed = parseInt(size, 10);
    return !isNaN(parsed) && parsed > 0 ? parsed : fallback;
  }

  return fallback;
}

/**
 * Calculate relative luminance of a color (0-1 scale)
 * Used for determining if text should be light or dark for contrast
 */
export function getColorLuminance(color: string): number {
  // Try to parse hex color
  if (isHexColor(color)) {
    const rgb = hexToRgb(color);
    if (rgb) {
      // Convert RGB to relative luminance using WCAG formula
      const { r, g, b } = rgb;
      const [rs, gs, bs] = [r, g, b].map((c) => {
        const val = c / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
  }

  // Try to parse RGB/RGBA color
  if (isRgbColor(color)) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      const [rs, gs, bs] = [r, g, b].map((c) => {
        const val = c / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
  }

  // Default to 0.5 (medium luminance) if unable to parse
  return 0.5;
}

/**
 * Get contrast color (black or white) based on background luminance
 */
export function getContrastColor(backgroundColor: string): string {
  const luminance = getColorLuminance(backgroundColor);
  // WCAG standard: use white text on dark backgrounds (luminance < 0.5)
  return luminance < 0.5 ? '#ffffff' : '#000000';
}
