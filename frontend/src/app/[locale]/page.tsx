import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getHomeMetadata } from '@/lib/sanity/metadata';

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

    return (
        <>
            <Hero />
            <Services />
            <Pricing />
        </>
    );
}
