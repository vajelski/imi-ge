'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Cpu, Menu, X } from 'lucide-react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { NavigationItem } from '@/lib/sanity/types';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  navItems?: NavigationItem[] | null;
  siteName?: string;
}

const fallbackNavigation: NavigationItem[] = [
  ['/services', 'სერვისები', 'Services'], ['/use-cases', 'სფეროები', 'Use cases'],
  ['/projects', 'პროექტები', 'Projects'], ['/blog', 'ინსაითები', 'Insights'], ['/docs', 'დოკები', 'Docs'],
  ['/faq', 'კითხვები', 'FAQ'], ['/assistant', 'AI ასისტენტი', 'AI assistant'],
].map(([href, ka, en], order) => ({ href, label: { ka, en }, order }));

export default function Navbar({ navItems, siteName = 'იმი.ჯი' }: NavbarProps) {
  const segments = useSelectedLayoutSegments();
  const locale = useLocale() as 'ka' | 'en';
  const pathname = segments.length ? `/${segments.join('/')}` : '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigation = (navItems?.length ? navItems : fallbackNavigation).map((item, index) => ({
    ...item,
    marker: String(index + 1).padStart(2, '0'),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const languagePath = segments.length ? `/${segments.join('/')}` : '';

  return <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
    <nav className="site-nav" aria-label={locale === 'en' ? 'Main navigation' : 'მთავარი ნავიგაცია'}>
      <Link href="/" className="site-brand">
        <span className="site-brand__mark"><Cpu size={18} aria-hidden="true" /></span>
        <span><strong>{siteName}</strong><small>AI / OPERATING SYSTEMS</small></span>
      </Link>

      <div className="site-nav__links">
        {navigation.map((item) => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return <Link key={item.href} href={item.href as never} className={`site-nav__link${active ? ' site-nav__link--active' : ''}`} aria-current={active ? 'page' : undefined}><span>{item.marker}</span>{item.label[locale]}</Link>;
        })}
      </div>

      <div className="site-nav__actions">
        <div className="language-switcher" aria-label={locale === 'en' ? 'Language' : 'ენა'}>
          <a href={`/ka${languagePath}`} className={locale === 'ka' ? 'language-switcher__active' : ''} aria-current={locale === 'ka' ? 'page' : undefined}>KA</a>
          <a href={`/en${languagePath}`} className={locale === 'en' ? 'language-switcher__active' : ''} aria-current={locale === 'en' ? 'page' : undefined}>EN</a>
        </div>
        <ThemeToggle label={locale === 'en' ? 'Toggle theme' : 'თემის შეცვლა'} />
        <Link href="/consultation" className="site-nav__cta">{locale === 'en' ? 'AI consultation' : 'AI კონსულტაცია'} <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <button type="button" onClick={() => setOpen((value) => !value)} className="site-nav__menu" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}>{open ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}</button>
      </div>
    </nav>
    {open && <div id="mobile-navigation" className="site-nav__mobile">
      <div className="site-nav__mobile-links">{navigation.map((item) => <Link key={item.href} href={item.href as never} onClick={() => setOpen(false)} className="site-nav__mobile-link"><span>{item.label[locale]}</span><small>{item.marker}</small></Link>)}</div>
      <div className="site-nav__mobile-footer">
        <div className="language-switcher" aria-label={locale === 'en' ? 'Language' : 'ენა'}><a href={`/ka${languagePath}`} className={locale === 'ka' ? 'language-switcher__active' : ''} aria-current={locale === 'ka' ? 'page' : undefined}>KA</a><a href={`/en${languagePath}`} className={locale === 'en' ? 'language-switcher__active' : ''} aria-current={locale === 'en' ? 'page' : undefined}>EN</a></div>
        <Link href="/consultation" onClick={() => setOpen(false)} className="site-nav__cta">{locale === 'en' ? 'AI consultation' : 'AI კონსულტაცია'} <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
    </div>}
  </header>;
}
