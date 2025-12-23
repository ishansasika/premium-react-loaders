import { useTheme, Theme } from '../../contexts/ThemeContext';

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const themes: { value: Theme; label: string }[] = [
    { value: 'light', label: 'Light' },
    { value: 'gray', label: 'Gray' },
    { value: 'dark', label: 'Dark' },
  ];

  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
      {themes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
            theme === value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
