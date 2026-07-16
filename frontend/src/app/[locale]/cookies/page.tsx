import type { Metadata } from 'next';
import LocalizedLegalPage from '@/components/LocalizedLegalPage';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/cookies', title: { ka: 'ქუქი-ფაილების პოლიტიკა', en: 'Cookie policy' }, description: { ka: 'ინფორმაცია IMI.GE-ის ქუქი-ფაილებისა და მსგავსი ტექნოლოგიების გამოყენების შესახებ.', en: 'How IMI.GE uses cookies and similar technologies.' }, noindex: true });
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LocalizedLegalPage kind="cookies" locale={locale === 'en' ? 'en' : 'ka'} />;
}
