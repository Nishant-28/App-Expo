import React, { createContext, useState, useContext, ReactNode } from 'react';
import { COLORS, DARK_COLORS } from '@/constants/theme';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colors: typeof COLORS; // Type can be either COLORS or DARK_COLORS
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const colors = theme === 'light' ? COLORS : DARK_COLORS;

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    colors,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 