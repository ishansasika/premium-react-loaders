import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'gray';

export const THEME_COLORS: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#1a1a1a',
  gray: '#f5f5f5',
};

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('demo-theme');
    return (stored as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('demo-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, setTheme };
}
