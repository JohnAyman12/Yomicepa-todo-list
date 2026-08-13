import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme } from './ThemeContext';

const THEME_STORAGE_KEY = 'todo_app_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
            if (savedTheme === 'light' || savedTheme === 'dark') {
                return savedTheme;
            }
        } catch (e) {
            console.error(e);
        }
        // Fall back to browser preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
    });

    // 1. Sync theme state with <html data-theme="..."> attribute
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // 2. Listen to Chrome/OS system theme changes dynamically
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            // Only auto-switch if user hasn't set an explicit manual override in localStorage
            const hasManualOverride = localStorage.getItem(THEME_STORAGE_KEY);
            if (!hasManualOverride) {
                const newTheme = e.matches ? 'dark' : 'light';
                setTheme(newTheme);
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const nextTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            return nextTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}