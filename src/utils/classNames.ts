type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassValue[];

/**
 * Utility function to merge class names
 * Lightweight alternative to clsx for conditional classes
 *
 * @param inputs - Class names to merge
 * @returns Merged class name string
 *
 * @example
 * cn('base-class', condition && 'conditional-class', 'another-class')
 * // => 'base-class conditional-class another-class' (if condition is true)
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const result = cn(...input);
      if (result) classes.push(result);
    }
  }

  return classes.join(' ');
}
