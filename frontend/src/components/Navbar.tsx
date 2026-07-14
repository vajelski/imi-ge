'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useSelectedLayoutSegments, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Menu, X, Cpu, Sun, Moon, Globe, ArrowUpRight, ChevronDown } from 'lucide-react';
import type { NavigationItem } from '@/lib/sanity/types';

interface NavbarProps {
  navItems?: NavigationItem[] | null;
  /** Site name from CMS branding (default: იმი.ჯი) */
  siteName?: string;
}

const AGENCY_NAVIGATION = [
  { href: '/', labels: { ka: 'მთავარი', en: 'Home', ru: 'Главная' } },
  { href: '/services', labels: { ka: 'სერვისები', en: 'Services', ru: 'Услуги' } },
  { href: '/use-cases', labels: { ka: 'გამოყენების სფეროები', en: 'Use cases', ru: 'Кейсы' } },
  { href: '/blog', labels: { ka: 'ინსაითები', en: 'Insights', ru: 'Инсайты' } },
];

const Navbar: React.FC<NavbarProps> = ({ siteName: siteNameProp }) => {
  const locale = useLocale();
  const router = useRouter();
  const siteName = siteNameProp ?? 'იმი.ჯი';

  // useSelectedLayoutSegments avoids pathname null (next-intl's usePathname throws)
  const segments = useSelectedLayoutSegments();
  const pathname = segments.length ? '/' + segments.join('/') : '/';

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = document.documentElement;

    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme as 'dark' | 'light');

    if (initialTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const languages = [
    { code: 'ka', label: 'GEO', full: 'ქართული' },
    { code: 'en', label: 'ENG', full: 'English' },
    { code: 'ru', label: 'RUS', full: 'Русский' },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const handleLocaleChange = (newLocale: string) => {
    router.replace(`/${newLocale}${pathname === '/' ? '' : pathname}`);
    setIsLangOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled
      ? 'bg-[#070914]/85 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl shadow-black/30'
      : 'bg-transparent py-7'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
               <div className="relative p-2.5 bg-primary/15 rounded-xl border border-primary/30 group-hover:border-cyan-300/70 transition-all duration-300 neon-ring">
                <Cpu className="h-6 w-6 text-primary relative z-10" />
              </div>
               <span className="font-heading font-bold text-xl tracking-widest text-white group-hover:text-cyan-200 transition-colors">
                {siteName}
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center space-x-8">
              {AGENCY_NAVIGATION.map((item) => {
                    const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href as any}
                        className={`nav-link ${active ? 'nav-link-active' : ''} text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 ${active
                          ? 'text-cyan-200'
                          : 'text-slate-300 hover:text-white'
                          }`}
                      >
                        {item.labels[locale as 'ka' | 'en' | 'ru'] ?? item.labels.en}
                      </Link>
                    );
                  })}
            </div>

            <div className="h-6 w-px bg-gray-300 dark:bg-white/10"></div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-300 font-heading font-bold text-xs uppercase group"
              >
                <Globe className="w-4 h-4" />
                {currentLang.label}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-darker border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in duration-200">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLocaleChange(l.code)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-heading font-bold uppercase hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex items-center justify-between ${locale === l.code ? 'text-primary bg-primary/5' : 'text-gray-600 dark:text-gray-300'
                        }`}
                    >
                      {l.full}
                      {locale === l.code && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-white text-[#090a12] text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 shadow-lg shadow-white/10 flex items-center gap-2 hover:bg-cyan-100 hover:-translate-y-0.5"
            >
              {locale === 'ka' ? 'AI კონსულტაცია' : locale === 'ru' ? 'AI-консультация' : 'AI consultation'}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mr-2 flex lg:hidden gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={toggleMenu} aria-label={isOpen ? 'Close menu' : 'Open menu'} className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none transition-all duration-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-darker/95 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 absolute w-full shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {AGENCY_NAVIGATION.map((item) => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href as any}
                      onClick={toggleMenu}
                      className={`block px-4 py-4 rounded-xl text-sm font-heading font-bold uppercase tracking-wider transition-all ${active
                          ? 'text-cyan-200 bg-primary/10 border border-primary/20'
                          : 'text-slate-200 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {item.labels[locale as 'ka' | 'en' | 'ru'] ?? item.labels.en}
                    </Link>
                  );
                })}

            <div className="flex gap-2 px-4 py-4">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLocaleChange(l.code)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-heading font-bold uppercase border transition-all ${locale === l.code
                    ? 'bg-primary/10 border-primary text-primary shadow-sm'
                    : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <Link href="/contact" onClick={toggleMenu} className="block mt-2 text-center bg-white text-[#090a12] px-4 py-4 rounded-xl text-sm font-heading font-bold uppercase tracking-wider shadow-lg shadow-white/10 hover:bg-cyan-100 transition-colors">
              {locale === 'ka' ? 'AI კონსულტაცია' : locale === 'ru' ? 'AI-консультация' : 'AI consultation'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
