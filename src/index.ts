// Import styles
import './styles/index.css';

// Component exports
export * from './components';

// Type exports
export type * from './types';

// Context exports (Theme Provider)
export { ThemeProvider, useTheme } from './context';
export type { LoaderTheme, ThemeProviderProps } from './context';

// Hook exports
export { useLoader } from './hooks';
export type { UseLoaderOptions, UseLoaderReturn } from './hooks';

// Utility exports
export { cn } from './utils/classNames';
export { getAnimationDuration, normalizeSize } from './utils/colors';

// Version
export const version = '2.1.0';
