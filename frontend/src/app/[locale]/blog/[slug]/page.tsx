import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { insights } from '@/data/insights';
import { getLocalizedInsight } from '@/data/localizedInsights';
import ArticleStructuredData from '@/components/ArticleStructuredData';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { localizedMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';

export function generateStaticParams() { return ['ka', 'en'].flatMap((locale) => insights.map(({ slug }) => ({ locale, slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const insight = getLocalizedInsight(slug, locale === 'en' ? 'en' : 'ka');
  if (!insight) return { title: locale === 'en' ? 'Insight not found' : 'ინსაითი ვერ მოიძებნა', robots: { index: false, follow: false } };
  const kaInsight = getLocalizedInsight(slug, 'ka');
  const enInsight = getLocalizedInsight(slug, 'en');
  if (!kaInsight || !enInsight) return { title: locale === 'en' ? 'Insight not found' : 'ინსაითი ვერ მოიძებნა', robots: { index: false, follow: false } };
  return localizedMetadata({ locale, path: `/blog/${slug}`, title: { ka: kaInsight.title, en: enInsight.title }, description: { ka: kaInsight.excerpt, en: enInsight.excerpt }, type: 'article', image: insight.visual?.src ?? `${SITE_URL}/og-image.png`, publishedTime: `${insight.date}T00:00:00.000Z` });
}

export default async function InsightPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const language = locale === 'en' ? 'en' : 'ka';
  setRequestLocale(locale);
  const insight = getLocalizedInsight(slug, language);
  if (!insight) notFound();
  const publishedAt = `${insight.date}T00:00:00.000Z`;
  return <div className="blog-article"><ArticleStructuredData title={insight.title} description={insight.excerpt} imageUrl={insight.visual?.src} author="IMI.GE" publishedAt={publishedAt} url={`${SITE_URL}/${language}/blog/${slug}`} inLanguage={language} /><BreadcrumbStructuredData locale={language} items={[{ name: language === 'en' ? 'Insights' : 'ინსაითები', path: '/blog' }, { name: insight.title, path: `/blog/${slug}` }]} /><article className="blog-container blog-article__layout"><Link href="/blog" className="blog-back"><ArrowLeft size={17} />{language === 'en' ? 'All insights' : 'ყველა ინსაითი'}</Link><div className="blog-article__heading"><p className="blog-category">{insight.category}</p><h1>{insight.title}</h1><p className="blog-article__excerpt">{insight.excerpt}</p><div className="blog-meta"><span><CalendarDays size={15} />{new Date(insight.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ka-GE', { year: 'numeric', month: 'long', day: 'numeric' })}</span><span><Clock3 size={15} />{insight.readTime}</span></div></div><div className="blog-article__visual"><img src={insight.visual?.src} alt={insight.visual?.alt[language]} /></div><div className="blog-article__body">{insight.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}<div className="blog-article__cta"><p>{language === 'en' ? 'Have a similar workflow?' : 'გაქვთ მსგავსი workflow?'}</p><h2>{language === 'en' ? 'Let us map the first practical step.' : 'ერთად შევაფასოთ პირველი პრაქტიკული ნაბიჯი.'}</h2><Link href="/consultation">{language === 'en' ? 'Start a consultation' : 'AI კონსულტაცია'} <ArrowUpRight size={16} /></Link></div></div></article></div>;
}
