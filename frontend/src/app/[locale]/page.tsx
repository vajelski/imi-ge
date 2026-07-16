import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import HomeExperience from '@/components/HomeExperience';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/', title: { ka: 'AI სისტემები ბიზნესისთვის საქართველოში', en: 'AI systems for business in Georgia' }, description: { ka: 'IMI.GE ქმნის ქართულენოვან AI სისტემებს: AI CRM, ხმოვანი ასისტენტები, RAG და ბიზნეს ავტომატიზაცია.', en: 'IMI.GE builds Georgian-first AI systems: AI CRM, voice assistants, RAG, and business automation.' } });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeExperience locale={locale === 'en' ? 'en' : 'ka'} />;
}
