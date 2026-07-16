import type { Metadata } from 'next';
import { ArrowUpRight, BadgeCheck, Code2, Eye, LockKeyhole, Rocket } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { localizedMetadata } from '@/lib/seo/metadata';

const copy = {
  ka: { eyebrow: 'DELIVERY MODEL', title: 'AI დანერგვა არის პროდუქტის განვითარება, არა ერთჯერადი ინტეგრაცია.', description: 'ჩვენი მოდელი აერთიანებს service design-ს, data governance-ს, engineering-სა და adoption-ს, რათა პილოტი არ დარჩეს isolated demo-დ.', phases: [['აღმოჩენა', 'ვიკვლევთ პროცესს, მომხმარებლის გზას, მონაცემის წყაროსა და KPI-ს.'], ['არქიტექტურა', 'ვგეგმავთ ინტეგრაციებს, წვდომას, მონაცემის საზღვრებსა და დამტკიცების ეტაპებს.'], ['პილოტი', 'ვუშვებთ ვიწრო, გაზომვად სამუშაო პროცესს რეალურ მომხმარებელსა და რეალურ კონტექსტში.'], ['მასშტაბირება', 'ვაფართოებთ გამოყენების შემთხვევას, ვამატებთ მონიტორინგს და პასუხისმგებლობას თქვენს გუნდს ვანიჭებთ.']], assuranceTitle: 'ხარისხი, უსაფრთხოება და ownership ერთი პროცესია.', assuranceText: 'პასუხების სისწორე, fallback სცენარები, მონაცემზე წვდომა და ადამიანის ჩართულობა განისაზღვრება design ეტაპიდან. შედეგად, თქვენი გუნდი იღებს არა მხოლოდ მოდელს, არამედ მართვად სისტემას.', cta: 'გადავხედოთ თქვენს use case-ს' },
  en: { eyebrow: 'DELIVERY MODEL', title: 'AI deployment is product development, not a one-off integration.', description: 'Our model combines service design, data governance, engineering, and adoption so the pilot does not remain an isolated demo.', phases: [['Discovery', 'We study the process, customer journey, data sources, and success metric.'], ['Architecture', 'We plan integrations, access, data boundaries, and approval points.'], ['Pilot', 'We launch a narrow, measurable workflow with real users and real context.'], ['Scale', 'We expand the use case, add monitoring, and transfer ownership to your team.']], assuranceTitle: 'Quality, safety, and ownership are one process.', assuranceText: 'Answer accuracy, fallback scenarios, data access, and human involvement are defined from the design stage. Your team receives a manageable system, not just a model.', cta: 'Review your use case' },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/implementation', title: { ka: 'AI დანერგვის მოდელი', en: 'AI implementation model' }, description: { ka: copy.ka.description, en: copy.en.description } });
}

export default async function ImplementationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const language = locale === 'en' ? 'en' : 'ka';
  const text = copy[language];
  const icons = [Eye, LockKeyhole, Code2, Rocket];
  return <div className="relative overflow-hidden pt-32 pb-24"><BreadcrumbStructuredData locale={language} items={[{ name: language === 'en' ? 'Home' : 'მთავარი', path: '' }, { name: language === 'en' ? 'Delivery model' : 'დანერგვის მოდელი', path: '/implementation' }]} /><section className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-primary">{text.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">{text.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{text.description}</p><div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{text.phases.map(([title, description], index) => { const Icon = icons[index]; return <article key={title} className="glass-panel rounded-3xl p-6"><p className="text-sm font-bold text-primary">0{index + 1}</p><Icon className="mt-10 text-primary" size={25}/><h2 className="mt-6 text-xl font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p></article>; })}</div><div className="mt-20 rounded-[2rem] border border-primary/25 bg-primary/10 p-8 sm:p-12"><BadgeCheck className="text-primary"/><h2 className="mt-5 text-3xl font-bold text-slate-950 dark:text-white">{text.assuranceTitle}</h2><p className="mt-4 max-w-2xl leading-8 text-slate-600 dark:text-slate-300">{text.assuranceText}</p><Link href="/consultation" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white dark:bg-white dark:text-slate-950">{text.cta} <ArrowUpRight size={18}/></Link></div></section></div>;
}
