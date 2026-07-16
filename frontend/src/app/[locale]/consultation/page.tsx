import type { Metadata } from 'next';
import { ArrowUpRight, CalendarCheck2, Compass, ShieldCheck } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ContactForm from '@/components/ContactForm';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/consultation', title: { ka: 'AI სტრატეგიის კონსულტაცია', en: 'AI strategy consultation' }, description: { ka: '60-წუთიანი AI strategy session: პროცესის, მონაცემების, ინტეგრაციების, რისკების და პირველი პილოტის შეფასება.', en: 'A 60-minute AI strategy session to assess your process, data, integrations, risks, and first pilot.' } });
}

export default async function ConsultationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const english = locale === 'en';
  const items = english ? [['What is the real bottleneck?', 'We identify the most expensive friction in one process.'], ['What is the safe boundary?', 'We assess data, access, and human approval points.'], ['What happens next?', 'We recommend a pilot, architecture, or discovery sprint.']] : [['რა არის რეალური bottleneck', 'ვარჩევთ ერთი პროცესის ყველაზე ძვირადღირებულ friction-ს.'], ['რა არის უსაფრთხო საზღვარი', 'ვაფასებთ მონაცემებს, წვდომას და human approval-ის წერტილებს.'], ['რა უნდა მოხდეს შემდეგ', 'გაწვდით პილოტის, არქიტექტურის ან discovery sprint-ის რეკომენდაციას.']];
  const icons = [Compass, ShieldCheck, CalendarCheck2];
  return <div className="relative overflow-hidden pt-32 pb-24"><BreadcrumbStructuredData locale={locale} items={[{ name: english ? 'Home' : 'მთავარი', path: '' }, { name: english ? 'AI consultation' : 'AI კონსულტაცია', path: '/consultation' }]} /><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/><section className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div><p className="text-xs font-bold tracking-[.2em] text-primary">{english ? 'WORKING SESSION / 60 MINUTES' : 'სამუშაო სესია / 60 წუთი'}</p><h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">{english ? 'An AI consultation that ends with a concrete next step.' : 'AI კონსულტაცია, რომელიც დასრულდება კონკრეტული შემდეგი ნაბიჯით.'}</h1><p className="mt-7 text-lg leading-8 text-slate-600 dark:text-slate-300">{english ? 'This is not a product demo. We choose a process, assess the data, and define a practical path to deployment.' : 'ეს არ არის product demo. ერთად ვარჩევთ პროცესს, ვაფასებთ მონაცემებს და ვსაზღვრავთ პრაქტიკულ დანერგვის გზას.'}</p><div className="mt-10 space-y-5">{items.map(([title, text], index) => { const Component = icons[index]; return <div key={title} className="flex gap-4"><Component size={21} className="mt-1 shrink-0 text-primary"/><div><h2 className="font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></div></div>})}</div><Link href="/implementation" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">{english ? 'See our delivery model' : 'ნახეთ დანერგვის მოდელი'} <ArrowUpRight size={17}/></Link></div><div><ContactForm /></div></section></div>;
}
