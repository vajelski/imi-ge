import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowLeft, CalendarDays, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { insightBySlug, insights } from '@/data/insights';
import ArticleStructuredData from '@/components/ArticleStructuredData';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export function generateStaticParams() { return ['ka', 'en', 'ru'].flatMap((locale) => insights.map(({ slug }) => ({ locale, slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const insight = insightBySlug(slug);
  if (!insight) return { title: 'ინსაითი ვერ მოიძებნა' };
  return { title: insight.title, description: insight.excerpt, alternates: { canonical: `https://imi.ge/${locale}/blog/${slug}`, languages: { ka: `https://imi.ge/ka/blog/${slug}`, en: `https://imi.ge/en/blog/${slug}`, ru: `https://imi.ge/ru/blog/${slug}` } }, openGraph: { type: 'article', title: insight.title, description: insight.excerpt, images: [{ url: `https://imi.ge${insight.image}`, width: 800, height: 500, alt: insight.title }] } };
}

export default async function InsightPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const insight = insightBySlug(slug);
  if (!insight) notFound();
  const publishedAt = `${insight.date}T00:00:00.000Z`;
  return <div className="relative overflow-hidden pt-32 pb-24"><ArticleStructuredData title={insight.title} description={insight.excerpt} imageUrl={`https://imi.ge${insight.image}`} author="IMI.GE" publishedAt={publishedAt} url={`https://imi.ge/${locale}/blog/${slug}`}/><BreadcrumbStructuredData locale={locale} items={[{name: 'ინსაითები', path: '/blog'}, {name: insight.title, path: `/blog/${slug}`}]} /><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-35"/><article className="mx-auto max-w-4xl px-6 lg:px-8"><Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-slate-950 hover:text-primary dark:text-white"><ArrowLeft size={17}/> ყველა ინსაითი</Link><p className="mt-12 text-xs font-bold tracking-[.18em] text-primary">{insight.category}</p><h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">{insight.title}</h1><p className="mt-7 max-w-3xl border-l-2 border-primary pl-5 text-xl leading-8 text-slate-600 dark:text-slate-300">{insight.excerpt}</p><div className="mt-8 flex gap-6 text-sm text-slate-500 dark:text-slate-400"><span className="flex items-center gap-2"><CalendarDays size={16}/>{new Date(insight.date).toLocaleDateString('ka-GE', {year:'numeric', month:'long', day:'numeric'})}</span><span className="flex items-center gap-2"><Clock3 size={16}/>{insight.readTime}</span></div><div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2rem] border border-slate-900/10 dark:border-white/10"><Image src={insight.image} alt={insight.title} fill priority sizes="(max-width: 768px) 100vw, 896px" className="object-cover"/></div><div className="mt-14 space-y-12">{insight.sections.map(([heading, text]) => <section key={heading}><h2 className="text-2xl font-bold text-slate-950 dark:text-white">{heading}</h2><p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{text}</p></section>)}</div><div className="mt-16 rounded-[2rem] bg-primary/10 p-8"><p className="text-sm font-bold text-slate-950 dark:text-white">გაქვთ მსგავსი workflow?</p><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">შევაფასოთ თქვენი კონკრეტული პროცესი, მონაცემების ხელმისაწვდომობა და პირველი პილოტის რეალისტური საზღვრები.</p><Link href="/consultation" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950">AI კონსულტაცია <ArrowLeft className="rotate-180" size={17}/></Link></div></article></div>;
}
