import { createContext, useContext, useMemo, ReactNode } from 'react';

/**
 * Theme configuration for loaders
 */
export interface LoaderTheme {
  /** Primary color for loaders */
  primaryColor?: string;
  /** Secondary color for loaders */
  secondaryColor?: string;
  /** Base color for skeletons */
  skeletonBase?: string;
  /** Highlight color for skeletons */
  skeletonHighlight?: string;
  /** Default size for loaders */
  defaultSize?: number | string;
  /** Default speed for animations */
  defaultSpeed?: 'slow' | 'normal' | 'fast' | number;
  /** Default delay before showing loaders */
  defaultDelay?: number;
  /** Default minimum duration for loaders */
  defaultMinDuration?: number;
  /** Default transition duration */
  defaultTransition?: number | boolean;
  /** Respect user's motion preferences by default */
  respectMotionPreference?: boolean;
}

interface ThemeContextValue {
  theme: LoaderTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  /** Theme configuration */
  theme?: LoaderTheme;
  /** Child components */
  children: ReactNode;
}

/**
 * ThemeProvider - Global theme configuration for loaders
 *
 * Provides theme values to all loader components in the component tree.
 * Components will use theme values as defaults unless overridden by props.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from 'premium-react-loaders';
 *
 * function App() {
 *   return (
 *     <ThemeProvider
 *       theme={{
 *         primaryColor: '#8b5cf6',
 *         defaultSpeed: 'fast',
 *         defaultDelay: 200,
 *         defaultMinDuration: 600,
 *       }}
 *     >
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ theme = {}, children }: ThemeProviderProps) {
  const value = useMemo(() => ({ theme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * useTheme - Access theme configuration
 *
 * Returns the current theme configuration from ThemeProvider.
 * If no ThemeProvider is present, returns an empty theme object.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme } = useTheme();
 *   return <div style={{ color: theme.primaryColor }}>Hello</div>;
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  return context || { theme: {} };
}

/**
 * Get theme value with fallback
 * @internal
 */
export function useThemeValue<K extends keyof LoaderTheme>(
  key: K,
  propValue: LoaderTheme[K] | undefined,
  defaultValue: LoaderTheme[K]
): LoaderTheme[K] {
  const { theme } = useTheme();
  return propValue !== undefined ? propValue : theme[key] !== undefined ? theme[key] : defaultValue;
}
