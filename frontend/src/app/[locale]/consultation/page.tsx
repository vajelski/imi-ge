import type { Metadata } from 'next';
import { ArrowUpRight, CalendarCheck2, Compass, ShieldCheck } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ContactForm from '@/components/ContactForm';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const metadata: Metadata = { title: 'AI სტრატეგიის კონსულტაცია', description: '60-წუთიანი AI strategy session: პროცესის, მონაცემების, ინტეგრაციების, რისკების და პირველი პილოტის შეფასება.' };

export default async function ConsultationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="relative overflow-hidden pt-32 pb-24"><BreadcrumbStructuredData locale={locale} items={[{ name: 'მთავარი', path: '' }, { name: 'AI კონსულტაცია', path: '/consultation' }]} /><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/><section className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8"><div><p className="text-xs font-bold tracking-[.2em] text-primary">WORKING SESSION / 60 MINUTES</p><h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">AI კონსულტაცია, რომელიც დასრულდება კონკრეტული შემდეგი ნაბიჯით.</h1><p className="mt-7 text-lg leading-8 text-slate-600 dark:text-slate-300">ეს არ არის product demo. ერთად ვარჩევთ პროცესს, ვაფასებთ მონაცემებს და ვსაზღვრავთ, აქვს თუ არა AI-ს საკმარისი საფუძველი თქვენს რეალურ ოპერაციაში.</p><div className="mt-10 space-y-5">{[[Compass,'რა არის რეალური bottleneck','ვარჩევთ ერთი პროცესის ყველაზე ძვირადღირებულ friction-ს.'],[ShieldCheck,'რა არის უსაფრთხო საზღვარი','ვაფასებთ მონაცემებს, წვდომას და human approval-ის წერტილებს.'],[CalendarCheck2,'რა უნდა მოხდეს შემდეგ','გაწვდით პილოტის, არქიტექტურის ან discovery sprint-ის რეკომენდაციას.']].map(([Icon,title,text]) => { const Component = Icon as typeof Compass; return <div key={title as string} className="flex gap-4"><Component size={21} className="mt-1 shrink-0 text-primary"/><div><h2 className="font-bold text-slate-950 dark:text-white">{title as string}</h2><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{text as string}</p></div></div>})}</div><Link href="/implementation" className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">ნახეთ დანერგვის მოდელი <ArrowUpRight size={17}/></Link></div><div><ContactForm /></div></section></div>;
}
