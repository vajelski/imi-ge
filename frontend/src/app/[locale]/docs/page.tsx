import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { docs } from '@/data/docs';

export const metadata: Metadata = { title: 'AI დოკუმენტაცია და გზამკვლევები', description: 'IMI.GE-ის საჯარო გზამკვლევები AI მზადყოფნაზე, RAG სისტემებზე, ხმოვან AI-სა და AI უსაფრთხოებაზე.' };

export default async function DocsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <main className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-8"><BreadcrumbStructuredData locale={locale} items={[{ name: 'მთავარი', path: '' }, { name: 'დოკუმენტაცია', path: '/docs' }]} /><p className="font-heading text-xs font-bold tracking-[.16em] text-primary">IMI.GE დოკუმენტაცია</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em] text-slate-950 dark:text-white sm:text-6xl">AI სისტემების პრაქტიკული გზამკვლევები</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">საჯარო მასალა იმისთვის, რომ AI პროექტი სწორად დაგეგმოთ, მართოთ და შეაფასოთ.</p><div className="mt-14 grid gap-4 md:grid-cols-2">{docs.map((doc) => <Link key={doc.slug} href={`/docs/${doc.slug}`} className="group rounded-[1.75rem] border border-black/15 p-6 transition hover:bg-black hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black"><BookOpen size={22}/><h2 className="mt-12 text-xl font-semibold">{doc.title}</h2><p className="mt-3 text-sm leading-7 text-neutral-600 group-hover:text-neutral-300 dark:text-neutral-400">{doc.description}</p><span className="font-heading mt-7 inline-flex items-center gap-2 text-sm font-bold">გზამკვლევის წაკითხვა <ArrowUpRight size={16}/></span></Link>)}</div></main>;
}
