'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Cpu, Menu, Moon, Sun, X } from 'lucide-react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Link } from '@/i18n/routing';
import type { NavigationItem } from '@/lib/sanity/types';

interface NavbarProps {
  navItems?: NavigationItem[] | null;
  siteName?: string;
}

const navigation = [
  { href: '/', label: 'მთავარი', marker: '01' },
  { href: '/services', label: 'სერვისები', marker: '02' },
  { href: '/use-cases', label: 'სფეროები', marker: '03' },
  { href: '/projects', label: 'პროექტები', marker: '04' },
  { href: '/blog', label: 'ინსაითები', marker: '05' },
];

export default function Navbar({ siteName = 'იმი.ჯი' }: NavbarProps) {
  const segments = useSelectedLayoutSegments();
  const pathname = segments.length ? `/${segments.join('/')}` : '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme ?? 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
    <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-[1.35rem] border px-3 py-2 transition-all duration-500 sm:px-4 ${scrolled ? 'border-slate-900/10 bg-white/85 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#070707]/85 dark:shadow-black/30' : 'border-transparent bg-white/45 backdrop-blur-md dark:bg-[#070707]/35'}`}>
      <Link href="/" className="group flex items-center gap-3 rounded-xl px-2 py-1.5">
        <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><Cpu size={19}/><i className="absolute -right-3 -top-3 size-6 rounded-full bg-secondary/70 blur-md"/></span>
        <span><span className="font-heading block text-base font-bold leading-none tracking-[-.04em] text-slate-950 dark:text-white">{siteName}</span><span className="mt-1 block text-[9px] font-bold tracking-[.16em] text-slate-500 dark:text-slate-400">AI / OPERATING SYSTEMS</span></span>
      </Link>

      <div className="hidden items-center gap-1 lg:flex">{navigation.map((item) => {
        const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return <Link key={item.href} href={item.href as never} className={`font-heading group relative rounded-xl px-3 py-2 text-xs font-semibold transition ${active ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'}`}><span className="mr-1.5 text-[9px] opacity-50">{item.marker}</span>{item.label}</Link>;
      })}</div>

      <div className="flex items-center gap-1.5"><button type="button" onClick={toggleTheme} className="grid size-9 place-items-center rounded-xl text-slate-600 transition hover:bg-slate-900/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white" aria-label={theme === 'dark' ? 'ნათელ რეჟიმზე გადასვლა' : 'მუქ რეჟიმზე გადასვლა'}>{theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}</button><Link href="/consultation" className="font-heading hidden items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:bg-slate-950 lg:inline-flex dark:bg-white dark:text-black dark:hover:bg-neutral-200">AI კონსულტაცია <ArrowUpRight size={15}/></Link><button type="button" onClick={() => setOpen((value) => !value)} className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 lg:hidden" aria-label={open ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}>{open ? <X size={19}/> : <Menu size={19}/>}</button></div>
    </nav>
    {open && <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[1.35rem] border border-slate-900/10 bg-white/95 p-2 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-[#070707]/95 lg:hidden">{navigation.map((item) => <Link key={item.href} href={item.href as never} onClick={() => setOpen(false)} className="font-heading flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-950 hover:bg-primary/10 dark:text-white dark:hover:bg-white/10"><span>{item.label}</span><span className="text-xs text-primary">{item.marker}</span></Link>)}<Link href="/consultation" onClick={() => setOpen(false)} className="font-heading mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">AI კონსულტაცია <ArrowUpRight size={16}/></Link></div>}
  </header>;
}
