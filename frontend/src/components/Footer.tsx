'use client';

import {
  Cpu,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import type { SiteSettings } from '@/lib/sanity/types';
import ThemeToggle from './ThemeToggle';

interface FooterProps {
  siteSettings?: SiteSettings | null;
  footerColumns?: { title: string; links: { url: string; label: string }[] }[];
  footerBottomLinks?: { label: string; href: string }[];
  siteName?: string;
}

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

  const socials = [
    { Icon: Facebook, href: siteSettings?.social?.facebook, label: 'Facebook' },
    { Icon: Linkedin, href: siteSettings?.social?.linkedin, label: 'LinkedIn' },
    { Icon: Instagram, href: siteSettings?.social?.instagram, label: 'Instagram' },
  ].filter(({ href }) => href);

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
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__grid">
          <div>
            <Link href="/" className="footer-brand">
              <span className="footer-brand__mark"><Cpu size={21} aria-hidden="true" /></span>
              <span>
                <strong>{siteName}</strong>
                <small>{english ? 'AI SYSTEMS / REAL OPERATIONS' : 'AI სისტემები / რეალური ოპერაციები'}</small>
              </span>
             </Link>
             <p className="footer-description">{english ? 'We connect customers, data, and teams around one operational goal.' : 'ვაერთიანებთ მომხმარებლებს, მონაცემებსა და გუნდებს ერთი ოპერაციული მიზნის გარშემო.'}</p>
             <div className="footer-pulse"><span><i />{english ? 'IMI SIGNAL' : 'IMI სიგნალი'}</span><strong>{english ? 'READY FOR THE NEXT WORKFLOW' : 'შემდეგი workflow მზადაა'}</strong></div>
             <div className="footer-socials">
              {socials.map(({ Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={16} aria-hidden="true" /></a>)}
              <ThemeToggle label={english ? 'Toggle theme' : 'თემის შეცვლა'} />
            </div>
          </div>

          <div className="footer-columns">
            {columns.slice(0, 2).map((column) => <div key={column.title}><p className="footer-label">{column.title}</p><div className="footer-column-links">{column.links.map((link) => renderLink(link.url, link.label))}</div></div>)}
          </div>

          <div>
            <p className="footer-label">{english ? 'CONTACT' : 'კონტაქტი'}</p>
            <div className="footer-contacts">
              {email && <a href={`mailto:${email}`} className="footer-contact"><Mail size={15} />{email}</a>}
              {phone && <a href={`tel:${phone}`} className="footer-contact"><Phone size={15} />{phone}</a>}
              <span className="footer-contact"><MapPin size={15} />{english ? 'Tbilisi, Georgia' : 'თბილისი, საქართველო'}</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteName}. {english ? 'All rights reserved.' : 'ყველა უფლება დაცულია.'}</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2">{footerBottomLinks?.map((item) => renderLink(item.href, item.label))}<Link href="/privacy" className="footer-link">{english ? 'Privacy' : 'კონფიდენციალურობა'}</Link><Link href="/terms" className="footer-link">{english ? 'Terms' : 'წესები და პირობები'}</Link></div>
        </div>
      </div>
    </footer>
  );
}
