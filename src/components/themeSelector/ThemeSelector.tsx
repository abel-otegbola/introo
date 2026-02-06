'use client'
import { useContext, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { MoonIcon, SunIcon, MonitorIcon } from '@phosphor-icons/react';
import { useOutsideClick } from '@/customHooks/useOutsideClick';

export default function ThemeSelector({ openSidebar }: { openSidebar: boolean }) {
    const { theme, setTheme } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);

    const themes = [
        { value: 'light' as const, label: 'Light', icon: <SunIcon size={16} /> },
        { value: 'dark' as const, label: 'Dark', icon: <MoonIcon size={16} /> },
        { value: 'system' as const, label: 'System', icon: <MonitorIcon size={16} /> },
    ];

    const themeRef = useOutsideClick(setOpen, false);

    return (
        <div ref={themeRef} className="relative flex flex-col gap-2 border border-gray-500/[0.1] p-2 rounded-lg">
            <button  className={`text-xs text-gray-500 font-medium text-start ${openSidebar ? "px-1" : "px-2"}`} onClick={() => setOpen(!open)}>{openSidebar ? themes.find(t => t.value === theme)?.icon : "THEME"}</button>
            <div className={`flex flex-col items-center w-full gap-2 p-1 bg-white dark:bg-primary rounded-lg border border-gray-500/[0.1] shadow-xs rounded-lg absolute bottom-[120%] left-0 transform mt-2 ${open ? 'block' : 'hidden'}`}>
                {themes.map((themeOption) => {
                    return (
                        <button
                            key={themeOption.value}
                            onClick={() => setTheme(themeOption.value)}
                            className={`flex items-center justify-start gap-2 py-2 w-full rounded-md transition-all duration-200 ${
                                theme === themeOption.value
                                    ? 'bg-white dark:bg-[#000]/[0.5] border border-gray-500/[0.1]'
                                    : 'text-gray-400'
                            }
                            ${openSidebar ? "px-2" : "px-3"}`}
                        >
                            {themeOption.icon}
                            <span className={`font-medium ${openSidebar ? "md:hidden" : "block"}`}>{themeOption.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
