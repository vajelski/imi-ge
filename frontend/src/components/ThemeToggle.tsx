'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeToggleProps {
  label?: string;
  className?: string;
}

const getTheme = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

export default function ThemeToggle({ label, className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(getTheme());

    const syncTheme = () => setTheme(getTheme());
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'theme') syncTheme();
    };

    window.addEventListener('imi-theme-change', syncTheme);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('imi-theme-change', syncTheme);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
    setTheme(next);
    window.dispatchEvent(new Event('imi-theme-change'));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={label ?? (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}
      title={label ?? (theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme')}
    >
      {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
