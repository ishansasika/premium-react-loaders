import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge class names
 * Combines clsx for conditional classes
 *
 * @param inputs - Class names to merge
 * @returns Merged class name string
 *
 * @example
 * cn('base-class', condition && 'conditional-class', 'another-class')
 * // => 'base-class conditional-class another-class' (if condition is true)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
