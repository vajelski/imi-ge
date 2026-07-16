import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/sanity/queries';
import LocalizedLegalPage from '@/components/LocalizedLegalPage';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/privacy', title: { ka: 'კონფიდენციალურობის პოლიტიკა', en: 'Privacy policy' }, description: { ka: 'IMI.GE-ის კონფიდენციალურობისა და მონაცემთა დაცვის პოლიტიკა.', en: 'How IMI.GE collects, uses, and protects personal data.' }, noindex: true });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const settings = await getSiteSettings(false).catch(() => null);
  const email = settings?.contacts?.primaryEmail ?? settings?.contact?.email ?? 'hello@imi.ge';
  return <LocalizedLegalPage kind="privacy" locale={locale === 'en' ? 'en' : 'ka'} email={email} />;
}
