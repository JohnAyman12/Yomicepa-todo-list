import { useState, useEffect, type ReactNode } from 'react';
import { ThemeContext, type Theme, type ThemePreference } from './ThemeContext';

const THEME_STORAGE_KEY = 'todo_app_theme';

const getSystemTheme = (): Theme =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const resolveEffectiveTheme = (pref: ThemePreference): Theme => {
    switch (pref) {
        case 'light':
            return 'light';
        case 'dark':
            return 'dark';
        case 'system':
            return getSystemTheme();
        default: {
            const _exhaustiveCheck: never = pref;
            return _exhaustiveCheck;
        }
    }
};

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [preference, setPreference] = useState<ThemePreference>(() => {
        try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemePreference;
            if (saved === 'light' || saved === 'dark' || saved === 'system') {
                return saved;
            }
        } catch (e) {
            console.error('Failed to read theme preference from localStorage:', e);
        }
        return 'system';
    });

    const [activeTheme, setActiveTheme] = useState<Theme>(() =>
        resolveEffectiveTheme(preference)
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateActiveTheme = () => {
            const currentEffectiveTheme = resolveEffectiveTheme(preference);
            setActiveTheme(currentEffectiveTheme);
            document.documentElement.setAttribute('data-theme', currentEffectiveTheme);
        };

        updateActiveTheme();

        const handleSystemChange = () => {
            if (preference === 'system') {
                updateActiveTheme();
            }
        };

        mediaQuery.addEventListener('change', handleSystemChange);
        return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }, [preference]);

    const toggleTheme = () => {
        setPreference((prev) => {
            let next: ThemePreference;

            switch (prev) {
                case 'light':
                    next = 'dark';
                    break;
                case 'dark':
                    next = 'system';
                    break;
                case 'system':
                    next = 'light';
                    break;
                default: {
                    const _exhaustiveCheck: never = prev;
                    return _exhaustiveCheck;
                }
            }
            return next;
        });
    };

    useEffect(() => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, preference);
        } catch (e) {
            console.error('Failed to save theme preference to localStorage:', e);
        }
    }, [preference]);

    return (
        <ThemeContext.Provider value={{ theme: activeTheme, preference, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}