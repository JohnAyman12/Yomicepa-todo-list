import { createContext } from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = 'light' | 'dark' | 'system';

export interface ThemeContextType {
    theme: Theme;
    preference: ThemePreference;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);