'use client';

import {
  ArrowUpRight,
  Cpu,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Phone,
  Sun,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import type { SiteSettings } from '@/lib/sanity/types';

interface FooterProps {
  siteSettings?: SiteSettings | null;
  footerColumns?: { title: string; links: { url: string; label: string }[] }[];
  footerBottomLinks?: { label: string; href: string }[];
  siteName?: string;
}

const routeLabels = {
  ka: ['AI CRM ინტეგრაცია', 'ხმოვანი AI', 'RAG სისტემები', 'AI მზადყოფნა'],
  en: ['AI CRM integration', 'Voice AI', 'RAG systems', 'AI readiness'],
};

const fallbackColumns = {
  ka: [
    { title: 'გზამკვლევი', links: [['სერვისები', '/services'], ['პროექტები', '/projects'], ['ინსაითები', '/blog']] },
    { title: 'რესურსები', links: [['დოკუმენტაცია', '/docs'], ['კითხვები', '/faq'], ['ესაუბრეთ AI-ს', '/assistant']] },
  ],
  en: [
    { title: 'Explore', links: [['Services', '/services'], ['Projects', '/projects'], ['Insights', '/blog']] },
    { title: 'Resources', links: [['Documentation', '/docs'], ['FAQ', '/faq'], ['Talk to AI', '/assistant']] },
  ],
};

export default function Footer({ siteSettings, footerColumns, footerBottomLinks, siteName = 'იმი.ჯი' }: FooterProps) {
  const locale = useLocale() === 'en' ? 'en' : 'ka';
  const english = locale === 'en';
  const pathname = usePathname();
  const showHomeCta = /^\/(ka|en)\/?$/.test(pathname);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => setTheme((localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark'), []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  const socials = [
    { Icon: Facebook, href: siteSettings?.social?.facebook, label: 'Facebook' },
    { Icon: Linkedin, href: siteSettings?.social?.linkedin, label: 'LinkedIn' },
    { Icon: Instagram, href: siteSettings?.social?.instagram, label: 'Instagram' },
  ].filter(({ href }) => href);

  const labels = routeLabels[locale];
  const routes = ['/services/ai-crm-integration', '/services/ai-voice-agents', '/services/rag-internal-ai', '/ai-readiness'];
  const email = siteSettings?.contacts?.primaryEmail ?? siteSettings?.contact?.email ?? 'hello@imi.ge';
  const phone = siteSettings?.contacts?.primaryPhone ?? siteSettings?.contact?.phone ?? '555904011';
  const columns = footerColumns?.length
    ? footerColumns
    : fallbackColumns[locale].map((column) => ({
        title: column.title,
        links: column.links.map(([label, url]) => ({ label, url })),
      }));

  const renderLink = (href: string, label: string) => {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="footer-link">{label}</a>;
    }
    return <Link key={href} href={href as never} className="footer-link">{label}</Link>;
  };

  return (
    <footer className="site-footer relative overflow-hidden bg-[#070707] px-4 pb-4 pt-14 text-white sm:px-6 lg:pt-20">
      <div className="pointer-events-none absolute -left-48 top-0 size-[36rem] rounded-full bg-white/[.08] blur-[150px]" />
      <div className="pointer-events-none absolute -right-48 bottom-0 size-[32rem] rounded-full bg-white/[.06] blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        {showHomeCta && (
          <section className="footer-cta group relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/[.055] p-6 backdrop-blur-xl sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <div className="flex items-center gap-3 text-xs font-bold tracking-[.2em] text-slate-300">
                  <span className="size-2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,.8)]" />
                  {english ? 'THE NEXT DECISION' : 'შემდეგი გადაწყვეტილება'}
                </div>
                <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.08] tracking-[-.04em] sm:text-5xl lg:text-6xl">
                  {english ? 'Make one difficult process work smarter.' : 'ერთი რთული პროცესი უფრო ჭკვიანად აამუშავე.'}
                </h2>
                <p className="mt-6 max-w-xl leading-8 text-slate-300">
                  {english ? 'Bring the bottleneck. We will map a secure, measurable AI workflow.' : 'მოიტანეთ მთავარი bottleneck. ერთად შევქმნით უსაფრთხო, გაზომვად AI workflow-ს.'}
                </p>
                <Link href="/consultation" className="font-heading mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-950 transition hover:bg-slate-200">
                  {english ? 'Start a consultation' : 'დავიწყოთ კონსულტაციით'} <ArrowUpRight size={17} />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {routes.map((href, index) => (
                  <Link key={href} href={href as never} className="group/link min-h-32 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10">
                    <p className="font-heading text-[10px] font-bold tracking-[.16em] text-slate-400">0{index + 1}</p>
                    <p className="font-heading mt-8 flex items-center justify-between text-sm font-bold">{labels[index]} <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" /></p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="grid gap-12 border-b border-white/10 px-2 py-14 lg:grid-cols-[1.3fr_1fr_.8fr] lg:py-16">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-slate-950 transition-transform group-hover:rotate-6"><Cpu size={21} /></span>
              <span>
                <span className="font-heading block text-xl font-bold tracking-[-.04em]">{siteName}</span>
                <span className="font-heading mt-1 block text-[10px] font-bold tracking-[.16em] text-slate-400">{english ? 'AI SYSTEMS / REAL OPERATIONS' : 'AI სისტემები / რეალური ოპერაციები'}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">{english ? 'We connect customers, data, and teams around one operational goal.' : 'ვაერთიანებთ მომხმარებლებს, მონაცემებსა და გუნდებს ერთი ოპერაციული მიზნის გარშემო.'}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {socials.map(({ Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 hover:text-white"><Icon size={16} /></a>)}
              <button type="button" onClick={toggleTheme} aria-label={english ? 'Toggle theme' : 'თემის შეცვლა'} className="grid size-10 place-items-center rounded-xl border border-white/10 text-slate-300 transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 hover:text-white">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {columns.slice(0, 2).map((column) => <div key={column.title}><p className="font-heading text-[10px] font-bold tracking-[.16em] text-slate-400">{column.title}</p><div className="mt-5 grid gap-3 text-sm text-slate-300">{column.links.map((link) => renderLink(link.url, link.label))}</div></div>)}
          </div>

          <div>
            <p className="font-heading text-[10px] font-bold tracking-[.16em] text-slate-400">{english ? 'CONTACT' : 'კონტაქტი'}</p>
            <div className="mt-5 grid gap-4 text-sm text-slate-300">
              {email && <a href={`mailto:${email}`} className="footer-contact"><Mail size={15} />{email}</a>}
              {phone && <a href={`tel:${phone}`} className="footer-contact"><Phone size={15} />{phone}</a>}
              <span className="footer-contact"><MapPin size={15} />{english ? 'Tbilisi, Georgia' : 'თბილისი, საქართველო'}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-2 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {siteName}. {english ? 'All rights reserved.' : 'ყველა უფლება დაცულია.'}</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">{footerBottomLinks?.map((item) => renderLink(item.href, item.label))}<Link href="/privacy" className="footer-link">{english ? 'Privacy' : 'კონფიდენციალურობა'}</Link><Link href="/terms" className="footer-link">{english ? 'Terms' : 'წესები და პირობები'}</Link></div>
        </div>
      </div>
    </footer>
  );
}
