import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BlogExperience from '@/components/BlogExperience';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ path: '/blog', locale, title: { ka: 'AI ინსაითები', en: 'AI insights for business' }, description: { ka: 'პრაქტიკული ინსაითები RAG სისტემებზე, ხმოვან AI-ზე, ბიზნეს ავტომატიზაციასა და AI დანერგვაზე.', en: 'Practical guidance on voice AI, RAG, CRM, and automation for teams building with AI.' } });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogExperience locale={locale === 'en' ? 'en' : 'ka'} />;
}
