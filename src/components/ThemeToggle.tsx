// src/components/ThemeToggle.tsx
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative w-14 h-7 rounded-full bg-gray-600 dark:bg-gray-600 light:bg-gray-300 transition-colors duration-300"
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-sm
          ${theme === 'light' ? 'translate-x-7 bg-yellow-400' : 'translate-x-0 bg-gray-800'}`}
      >
        {theme === 'light' ? '☀️' : '🌙'}
      </span>
    </button>
  );
}