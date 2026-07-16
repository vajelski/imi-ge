import type { Metadata } from 'next';
import LocalizedLegalPage from '@/components/LocalizedLegalPage';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/terms', title: { ka: 'მომსახურების წესები და პირობები', en: 'Terms of service' }, description: { ka: 'IMI.GE-ის საიტისა და მომსახურებების გამოყენების წესები.', en: 'Terms for using the IMI.GE website and services.' }, noindex: true });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LocalizedLegalPage kind="terms" locale={locale === 'en' ? 'en' : 'ka'} />;
}
