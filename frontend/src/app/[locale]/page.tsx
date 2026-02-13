import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getHomeMetadata } from '@/lib/sanity/metadata';
import { getSiteSettings } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'hero' });
    return getHomeMetadata(locale as 'ka' | 'en' | 'ru', {
        title: `${t('titlePrefix')} ${t('titleHighlight')}`,
        description: t('description'),
    });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const siteSettings = await getSiteSettings(false).catch(() => null);
    const loc = locale as Locale;
    const primaryCTA = siteSettings?.branding?.primaryCTA?.enabled !== false && siteSettings?.branding?.primaryCTA
        ? { label: (getLocalizedValue(siteSettings.branding.primaryCTA.label, loc) as string) ?? '', href: siteSettings.branding.primaryCTA.href ?? '/contact' }
        : null;
    const secondaryCTA = siteSettings?.branding?.secondaryCTA?.enabled !== false && siteSettings?.branding?.secondaryCTA
        ? { label: (getLocalizedValue(siteSettings.branding.secondaryCTA.label, loc) as string) ?? '', href: siteSettings.branding.secondaryCTA.href ?? '/contact' }
        : null;

    return (
        <>
            <Hero ctaPrimary={primaryCTA} ctaSecondary={secondaryCTA} />
            <Services />
            <Pricing />
        </>
    );
}
