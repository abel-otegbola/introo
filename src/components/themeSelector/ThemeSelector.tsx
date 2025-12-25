'use client'
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor } from '@phosphor-icons/react';

export default function ThemeSelector() {
    const { theme, setTheme } = useContext(ThemeContext);

    const themes = [
        { value: 'light' as const, label: 'Light', icon: Sun },
        { value: 'dark' as const, label: 'Dark', icon: Moon },
        { value: 'system' as const, label: 'System', icon: Monitor },
    ];

    return (
        <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-500 font-medium">THEME</p>
            <div className="flex items-center gap-2 p-1 bg-secondary/[0.09] rounded-lg">
                {themes.map((themeOption) => {
                    const Icon = themeOption.icon;
                    return (
                        <button
                            key={themeOption.value}
                            onClick={() => setTheme(themeOption.value)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                                theme === themeOption.value
                                    ? 'bg-white dark:bg-primary text-secondary shadow-sm'
                                    : 'text-gray-400 hover:text-secondary'
                            }`}
                        >
                            <Icon size={16} weight="duotone" />
                            <span className="text-xs font-medium hidden sm:inline">{themeOption.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
