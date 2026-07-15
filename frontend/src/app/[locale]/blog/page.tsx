import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { insights } from '@/data/insights';
import EnglishInsights from '@/components/EnglishInsights';

export const metadata: Metadata = { title: 'AI ინსაითები', description: 'IMI.GE-ის პრაქტიკული ინსაითები RAG სისტემებზე, ხმოვან AI-ზე, ბიზნეს ავტომატიზაციასა და AI დანერგვაზე.' };

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') return <EnglishInsights />;
  return <div className="relative overflow-hidden pt-32 pb-24"><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/><section className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-primary">IMI.GE INSIGHTS</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">სიღრმისეული მასალა მათთვის, ვინც AI-ს რეალურ ოპერაციაში ნერგავს.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">წერილები ეფუძნება იმ კითხვებს, რომლებიც ჩნდება AI voice, RAG, CRM და automation სისტემების დაგეგმვისას. მოკლე პასუხის ნაცვლად ვხსნით გადაწყვეტილების ლოგიკას.</p></section><section className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 md:grid-cols-3 lg:px-8">{insights.map((insight) => <article key={insight.slug} className="glass-panel group overflow-hidden rounded-[2rem]"><div className="relative aspect-[16/10] overflow-hidden border-b border-slate-900/10 dark:border-white/10"><Image src={insight.image} alt={insight.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="p-6"><p className="text-[11px] font-bold tracking-[.16em] text-primary">{insight.category}</p><h2 className="mt-7 text-xl font-bold leading-snug text-slate-950 dark:text-white">{insight.title}</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{insight.excerpt}</p><div className="mt-7 flex items-center justify-between border-t border-slate-900/10 pt-5 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400"><span className="flex items-center gap-2"><CalendarDays size={14}/>{new Date(insight.date).toLocaleDateString('ka-GE', { year: 'numeric', month: 'short', day: 'numeric' })}</span><span className="flex items-center gap-2"><Clock3 size={14}/>{insight.readTime}</span></div><Link href={`/blog/${insight.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-slate-950 hover:text-primary dark:text-white">სრულად წაიკითხეთ <ArrowUpRight size={17}/></Link></div></article>)}</section></div>;
}
