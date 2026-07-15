import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ConversationalAssistant from '@/components/ConversationalAssistant';

export const metadata: Metadata = { title: 'AI ასისტენტი', description: 'ესაუბრეთ IMI.GE-ის ქართულ AI ასისტენტს სერვისებზე, AI CRM-ზე, ხმოვან ასისტენტებსა და ავტომატიზაციაზე.' };

export default async function AssistantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const english = locale === 'en';
  return <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:px-8"><BreadcrumbStructuredData locale={locale} items={[{ name: english ? 'Home' : 'მთავარი', path: '' }, { name: english ? 'AI assistant' : 'AI ასისტენტი', path: '/assistant' }]} /><div className="mx-auto mb-12 max-w-3xl text-center"><p className="font-heading text-xs font-bold tracking-[.16em] text-primary">{english ? 'TALK TO IMI.GE' : 'საუბარი IMI.GE-სთან'}</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.05em] text-slate-950 dark:text-white sm:text-6xl">{english ? 'Tell us what you want to make work better.' : 'მომიყევით, რა გსურთ, რომ უფრო მარტივად მუშაობდეს.'}</h1><p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{english ? 'The assistant helps you understand the right service, approach, and next step.' : 'ასისტენტი დაგეხმარებათ სერვისის, შესაძლო მიდგომისა და შემდეგი ნაბიჯის გარკვევაში.'}</p></div><ConversationalAssistant locale={english ? 'en' : 'ka'}/></main>;
}
