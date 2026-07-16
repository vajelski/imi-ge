import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { docs, getLocalizedDoc } from '@/data/docs';
import { localizedMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return ['ka', 'en'].flatMap((locale) => docs.map((doc) => ({ locale, slug: doc.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const kaDoc = getLocalizedDoc(slug, 'ka');
  const enDoc = getLocalizedDoc(slug, 'en');
  return kaDoc && enDoc
    ? localizedMetadata({ locale, path: `/docs/${slug}`, title: { ka: kaDoc.title, en: enDoc.title }, description: { ka: kaDoc.description, en: enDoc.description } })
    : { title: locale === 'en' ? 'Guide not found' : 'გზამკვლევი ვერ მოიძებნა', robots: { index: false, follow: false } };
}

export default async function DocPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const language = locale === 'en' ? 'en' : 'ka';
  const english = language === 'en';
  setRequestLocale(locale);
  const doc = getLocalizedDoc(slug, language);
  if (!doc) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-8">
      <BreadcrumbStructuredData locale={language} items={[{ name: english ? 'Home' : 'მთავარი', path: '' }, { name: english ? 'Documentation' : 'დოკუმენტაცია', path: '/docs' }, { name: doc.title, path: `/docs/${slug}` }]} />
      <Link href="/docs" className="font-heading text-sm font-bold underline underline-offset-4">{english ? 'All guides' : 'ყველა გზამკვლევი'}</Link>
      <h1 className="mt-12 text-4xl font-semibold tracking-[-.04em] text-slate-950 dark:text-white sm:text-6xl">{doc.title}</h1>
      <p className="mt-6 text-xl leading-8 text-slate-600 dark:text-slate-300">{doc.description}</p>
      <div className="mt-14 space-y-12">{doc.sections.map(([heading, text]) => <section key={heading}><h2 className="text-2xl font-semibold text-slate-950 dark:text-white">{heading}</h2><p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">{text}</p></section>)}</div>
      <Link href="/consultation" className="font-heading mt-14 inline-flex rounded-full bg-black px-6 py-4 text-sm font-bold text-white dark:bg-white dark:text-black">{english ? 'Discuss your workflow with IMI.GE' : 'განიხილეთ თქვენი ამოცანა IMI.GE-სთან'}</Link>
    </main>
  );
}
