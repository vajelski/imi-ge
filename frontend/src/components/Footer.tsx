'use client';

import { ArrowUpRight, Cpu, Facebook, Instagram, Linkedin, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import type { SiteSettings } from '@/lib/sanity/types';

interface FooterProps { siteSettings?: SiteSettings | null; footerColumns?: { title: string; links: { url: string; label: string }[] }[]; footerBottomLinks?: { label: string; href: string }[]; siteName?: string; }

const routeLabels = {
  ka: ['AI CRM ინტეგრაცია', 'ხმოვანი AI', 'RAG სისტემები', 'AI მზადყოფნა'],
  en: ['AI CRM integration', 'Voice AI', 'RAG systems', 'AI readiness'],
};

export default function Footer({ siteSettings, footerBottomLinks, siteName = 'იმი.ჯი' }: FooterProps) {
  const locale = useLocale() === 'en' ? 'en' : 'ka';
  const english = locale === 'en';
  const pathname = usePathname();
  const showHomeCta = /^\/(ka|en)\/?$/.test(pathname);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => setTheme((localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark'), []);
  const toggleTheme = () => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); localStorage.setItem('theme', next); document.documentElement.classList.toggle('dark', next === 'dark'); };
  const socials = [{ Icon: Facebook, href: siteSettings?.social?.facebook, label: 'Facebook' }, { Icon: Linkedin, href: siteSettings?.social?.linkedin, label: 'LinkedIn' }, { Icon: Instagram, href: siteSettings?.social?.instagram, label: 'Instagram' }].filter(({ href }) => href);
  const labels = routeLabels[locale];
  const routes = ['/services/ai-crm-integration', '/services/ai-voice-agents', '/services/rag-internal-ai', '/ai-readiness'];

  return <footer className="site-footer relative overflow-hidden bg-[#070707] px-4 pb-4 pt-16 text-white sm:px-6"><div className="pointer-events-none absolute -left-48 top-0 size-[36rem] rounded-full bg-primary/30 blur-[150px]"/><div className="pointer-events-none absolute -right-48 bottom-0 size-[32rem] rounded-full bg-secondary/15 blur-[130px]"/><div className="relative mx-auto max-w-7xl">
    {showHomeCta && <section className="footer-cta overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/[.055] p-6 backdrop-blur-xl sm:p-10 lg:p-12"><div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]"><div><p className="font-heading text-xs font-bold tracking-[.2em] text-cyan-200">{english ? 'THE NEXT DECISION' : 'შემდეგი გადაწყვეტილება'}</p><h2 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.05] sm:text-5xl">{english ? 'Your CRM, voice, and knowledge can work as one system.' : 'თქვენი CRM, ხმა და ცოდნა მზადაა ერთ სისტემად იმუშაოს.'}</h2><p className="mt-6 max-w-xl leading-8 text-slate-300">{english ? 'Bring one difficult process. We will turn it into a secure, measurable AI workflow.' : 'მოიტანეთ ერთი რთული პროცესი. ერთად ვაქცევთ მას უსაფრთხო, გაზომვად AI workflow-ად.'}</p><Link href="/consultation" className="font-heading mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950">{english ? 'Start a consultation' : 'დავიწყოთ კონსულტაციით'} <ArrowUpRight size={17}/></Link></div><div className="grid gap-3 content-end sm:grid-cols-2">{routes.map((href, index) => <Link key={href} href={href as never} className="group min-h-32 rounded-2xl border border-white/10 bg-black/15 p-4 transition hover:bg-white/10"><p className="font-heading text-[10px] font-bold tracking-[.16em] text-cyan-300">0{index + 1}</p><p className="font-heading mt-8 flex items-center justify-between text-sm font-bold">{labels[index]}<ArrowUpRight size={16}/></p></Link>)}</div></div></section>}
    <div className="grid gap-10 px-2 py-12 lg:grid-cols-[minmax(0,1fr)_12rem_12rem] lg:py-14"><div><Link href="/" className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white text-slate-950"><Cpu size={20}/></span><span><span className="font-heading block text-xl font-bold tracking-[-.04em]">{siteName}</span><span className="font-heading mt-1 block text-[10px] font-bold tracking-[.16em] text-slate-400">{english ? 'AI systems for real operations' : 'AI სისტემები რეალური ოპერაციებისთვის'}</span></span></Link><p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">{english ? 'We build AI systems that connect customers, data, and teams around one operational goal.' : 'ვქმნით AI სისტემებს, რომლებიც კომპანიების მომხმარებელს, მონაცემებსა და გუნდებს ერთი მიზნის გარშემო აერთიანებს.'}</p></div><div><p className="font-heading text-[10px] font-bold tracking-[.16em] text-cyan-300">{english ? 'GUIDE' : 'გზამკვლევი'}</p><div className="mt-5 grid gap-3 text-sm text-slate-300"><Link href="/services">{english ? 'Services' : 'სერვისები'}</Link><Link href="/projects">{english ? 'Projects' : 'პროექტები'}</Link><Link href="/blog">{english ? 'Insights' : 'ინსაითები'}</Link><Link href="/docs">{english ? '06 Documentation' : '06 დოკუმენტაცია'}</Link><Link href="/faq">{english ? '07 FAQ' : '07 კითხვები'}</Link><Link href="/assistant">{english ? '08 Talk to AI' : '08 ესაუბრეთ AI-ს'}</Link></div></div><div><p className="font-heading text-[10px] font-bold tracking-[.16em] text-cyan-300">{english ? 'CONTACT' : 'კონტაქტი'}</p><div className="mt-5 flex gap-2">{socials.map(({ Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-9 place-items-center rounded-xl border border-white/10 text-slate-300"><Icon size={16}/></a>)}<button type="button" onClick={toggleTheme} aria-label={english ? 'Toggle theme' : 'თემის შეცვლა'} className="grid size-9 place-items-center rounded-xl border border-white/10 text-slate-300">{theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}</button></div></div></div>
    <div className="flex flex-col gap-4 border-t border-white/10 px-2 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} {siteName}. {english ? 'All rights reserved.' : 'ყველა უფლება დაცულია.'}</span><div className="flex flex-wrap gap-x-5 gap-y-2">{footerBottomLinks?.map((item) => <Link key={item.href} href={item.href as never}>{item.label}</Link>)}<Link href="/privacy">{english ? 'Privacy' : 'კონფიდენციალურობა'}</Link><Link href="/terms">{english ? 'Terms' : 'წესები და პირობები'}</Link></div></div>
  </div></footer>;
}
