'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Cpu, Facebook, Twitter, Linkedin, Instagram, Sun, Moon } from 'lucide-react';
import type { SiteSettings } from '@/lib/sanity/types';

export type FooterColumn = { title: string; links: { url: string; label: string }[] };
export type FooterBottomLink = { label: string; href: string };

interface FooterProps {
  siteSettings?: SiteSettings | null;
  /** When set, used instead of message-based columns (from CMS) */
  footerColumns?: FooterColumn[];
  /** Bottom bar links from CMS (e.g. Privacy, Terms) */
  footerBottomLinks?: FooterBottomLink[];
  /** Site name from CMS branding */
  siteName?: string;
}

const socialIcons = [
  { Icon: Facebook, key: 'facebook' as const },
  { Icon: Twitter, key: 'twitter' as const },
  { Icon: Linkedin, key: 'linkedin' as const },
  { Icon: Instagram, key: 'instagram' as const },
];

const Footer: React.FC<FooterProps> = ({ siteSettings, footerColumns: footerColumnsProp, footerBottomLinks, siteName: siteNameProp }) => {
  const t = useTranslations('footer');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const siteName = siteNameProp ?? 'იმი.ჯი';
  const columnsSource = footerColumnsProp ?? (t.raw('columns') as FooterColumn[] | undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme((savedTheme || systemTheme) as 'dark' | 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };


  return (
    <footer className="bg-gray-100 dark:bg-darker border-t border-gray-200 dark:border-white/5 pt-24 pb-12 relative overflow-hidden transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-1 md:col-span-5 lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3 text-gray-900 dark:text-white font-heading font-bold text-2xl group cursor-pointer w-fit">
              <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/50 transition-colors">
                <Cpu className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="tracking-widest group-hover:text-primary transition-colors">{siteName}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 max-w-sm leading-relaxed font-sans font-light">
              {t('description') || 'ჩვენ ვქმნით მომავლის ტექნოლოგიებს დღეს. დაგვიკავშირდით და გახადეთ თქვენი ბიზნესი უფრო ეფექტური ხელოვნური ინტელექტის დახმარებით.'}
            </p>
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon, key }) => {
                const url = siteSettings?.social?.[key];
                return (
                  <a
                    key={key}
                    href={url || '#'}
                    target={url ? '_blank' : undefined}
                    rel={url ? 'noopener noreferrer' : undefined}
                    aria-label={key}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200 dark:border-white/5 hover:border-primary shadow-lg hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="col-span-1 md:col-span-7 lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {columnsSource?.map((column, colIdx) => {
              const links = column.links ?? [];
              return (
                <div key={colIdx}>
                  <h2 className="text-gray-900 dark:text-white font-heading font-bold uppercase tracking-widest mb-8 text-sm border-b border-gray-200 dark:border-white/10 pb-4 inline-block">
                    {column.title}
                  </h2>
                  <ul className="space-y-4 text-gray-700 dark:text-gray-300 text-sm font-medium font-sans">
                    {links.map((link, linkIdx) => {
                      const url = link.url || '#';
                      const isExternal = url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:');
                      const isMailto = url.startsWith('mailto:');
                      return (
                        <li key={linkIdx}>
                          {isMailto ? (
                            <a
                              href={url}
                              className="hover:text-primary transition-colors"
                              data-cfasync="false"
                              dangerouslySetInnerHTML={{ __html: `<!--email_off-->${link.label}<!--/email_off-->` }}
                            />
                          ) : url.startsWith('http') ? (
                            <a href={url} className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                              {link.label}
                            </a>
                          ) : (
                            <Link href={url as any} className="hover:text-primary transition-colors">
                              {link.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 dark:text-gray-300 text-xs font-medium tracking-wider font-sans">
            &copy; {new Date().getFullYear()} {t('copyrightText') || 'ყველა უფლება დაცულია.'}
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {footerBottomLinks?.map((bl, i) => (
              <Link key={i} href={bl.href as any} className="text-xs text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                {bl.label}
              </Link>
            ))}
            <Link
              href="/cms-preview"
              className="text-xs text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              CMS მონახულება
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all shadow-xl hover:scale-110"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="#"
              className="text-xs text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-sans"
            >
              {t('creditText')} <span className="font-semibold">{t('creditName')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
