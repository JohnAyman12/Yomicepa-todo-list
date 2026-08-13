import { useTheme } from '../../Context/ThemeContext/useTheme';
import '../../styles/ThemeToggle.css';

export default function ThemeToggle() {
    const { preference, toggleTheme } = useTheme();

    const getLabel = () => {
        switch (preference) {
            case 'light':
                return '☀️ Light';
            case 'dark':
                return '🌙 Dark';
            case 'system':
                return '💻 Auto (System)';
            default: {
                const _exhaustiveCheck: never = preference;
                return _exhaustiveCheck;
            }
        }
    };

    return (
        <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={`Current mode: ${preference}. Click to switch.`}
        >
            {getLabel()}
        </button>
    );
}