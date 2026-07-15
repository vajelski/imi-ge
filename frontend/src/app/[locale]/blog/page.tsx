import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import BlogExperience from '@/components/BlogExperience';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === 'en'
    ? { title: 'AI Insights for Business', description: 'Practical guidance on voice AI, RAG, CRM, and automation for teams building with AI.' }
    : { title: 'AI ინსაითები', description: 'პრაქტიკული ინსაითები RAG სისტემებზე, ხმოვან AI-ზე, ბიზნეს ავტომატიზაციასა და AI დანერგვაზე.' };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogExperience locale={locale === 'en' ? 'en' : 'ka'} />;
}
