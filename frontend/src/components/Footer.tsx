'use client';

import { ArrowUpRight, Cpu, Facebook, Instagram, Linkedin, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import type { SiteSettings } from '@/lib/sanity/types';

export type FooterColumn = { title: string; links: { url: string; label: string }[] };
export type FooterBottomLink = { label: string; href: string };

interface FooterProps { siteSettings?: SiteSettings | null; footerColumns?: FooterColumn[]; footerBottomLinks?: FooterBottomLink[]; siteName?: string; }

const routes = [
  { label: 'AI CRM ინტეგრაცია', href: '/services/ai-crm-integration' },
  { label: 'ხმოვანი AI', href: '/services/ai-voice-agents' },
  { label: 'RAG სისტემები', href: '/services/rag-internal-ai' },
  { label: 'AI მზადყოფნა', href: '/ai-readiness' },
];

export default function Footer({ siteSettings, footerBottomLinks, siteName = 'იმი.ჯი' }: FooterProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => setTheme((localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark'), []);
  const toggleTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); localStorage.setItem('theme', next); document.documentElement.classList.toggle('dark', next === 'dark'); };
  const socials = [{ Icon: Facebook, href: siteSettings?.social?.facebook, label: 'Facebook' }, { Icon: Linkedin, href: siteSettings?.social?.linkedin, label: 'LinkedIn' }, { Icon: Instagram, href: siteSettings?.social?.instagram, label: 'Instagram' }].filter(({ href }) => href);

  return <footer className="site-footer relative overflow-hidden bg-[#070707] px-4 pb-4 pt-16 text-white sm:px-6"><div className="pointer-events-none absolute -left-48 top-0 size-[36rem] rounded-full bg-primary/30 blur-[150px]"/><div className="pointer-events-none absolute -right-48 bottom-0 size-[32rem] rounded-full bg-secondary/15 blur-[130px]"/>
    <div className="relative mx-auto max-w-7xl"><section className="footer-cta overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/[.055] p-6 backdrop-blur-xl sm:p-10 lg:p-12"><div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]"><div><p className="font-heading text-xs font-bold tracking-[.2em] text-cyan-200">შემდეგი გადაწყვეტილება</p><h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.05] sm:text-5xl">თქვენი CRM, ხმა და ცოდნა მზადაა ერთ სისტემად იმუშაოს.</h2><p className="mt-6 max-w-xl leading-8 text-slate-300">მოიტანეთ ერთი რთული პროცესი. ერთად ვაქცევთ მას უსაფრთხო, გაზომვად AI workflow-ად.</p><Link href="/consultation" className="font-heading mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-100">დავიწყოთ კონსულტაციით <ArrowUpRight size={17}/></Link></div><div className="grid gap-3 content-end sm:grid-cols-2">{routes.map((route, index) => <Link key={route.href} href={route.href as never} className="group min-h-32 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:border-cyan-200/60 hover:bg-white/10"><p className="font-heading text-[10px] font-bold tracking-[.16em] text-cyan-300">0{index + 1}</p><p className="font-heading mt-8 flex items-center justify-between text-sm font-bold">{route.label}<ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></p></Link>)}</div></div></section>
      <div className="grid gap-10 px-2 py-12 lg:grid-cols-[minmax(0,1fr)_12rem_12rem] lg:py-14"><div><Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white text-slate-950"><Cpu size={20}/></span><span><span className="font-heading block text-xl font-bold tracking-[-.04em]">{siteName}</span><span className="font-heading mt-1 block text-[10px] font-bold tracking-[.16em] text-slate-400">AI სისტემები რეალური ოპერაციებისთვის</span></span></Link><p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">ვქმნით AI სისტემებს, რომლებიც კომპანიების მომხმარებელს, მონაცემებსა და გუნდებს ერთი მიზნის გარშემო აერთიანებს.</p></div><div><p className="font-heading text-[10px] font-bold tracking-[.16em] text-cyan-300">გზამკვლევი</p><div className="mt-5 grid gap-3 text-sm text-slate-300"><Link href="/services" className="hover:text-white">სერვისები</Link><Link href="/projects" className="hover:text-white">პროექტები</Link><Link href="/blog" className="hover:text-white">ინსაითები</Link><Link href="/docs" className="hover:text-white">06 დოკუმენტაცია</Link><Link href="/faq" className="hover:text-white">07 კითხვები</Link><Link href="/assistant" className="hover:text-white">08 ესაუბრეთ AI-ს</Link></div></div><div><p className="font-heading text-[10px] font-bold tracking-[.16em] text-cyan-300">კონტაქტი</p><div className="mt-5 flex gap-2">{socials.map(({ Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-9 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-200"><Icon size={16}/></a>)}<button type="button" onClick={toggleTheme} aria-label="თემის შეცვლა" className="grid size-9 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan-300 hover:text-cyan-200">{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}</button></div></div></div>
      <div className="flex flex-col gap-4 border-t border-white/10 px-2 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {siteName}. ყველა უფლება დაცულია.</span><div className="flex flex-wrap gap-x-5 gap-y-2">{footerBottomLinks?.map((item) => <Link key={item.href} href={item.href as never} className="hover:text-slate-200">{item.label}</Link>)}<Link href="/privacy" className="hover:text-slate-200">კონფიდენციალურობა</Link><Link href="/terms" className="hover:text-slate-200">წესები და პირობები</Link></div></div>
    </div>
  </footer>;
}
