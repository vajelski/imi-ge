import React from 'react';
import { Search, BarChart, Zap, Shield } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import AuditForm from '@/components/AuditForm';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import { getRouteMetadata } from '@/lib/sanity/metadata';
import { SITE_URL } from '@/lib/seo/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'audit' });
    return getRouteMetadata('services/audit', '/services/audit', locale as 'ka' | 'en' | 'ru', {
        title: t('hero.badge'),
        description: t('hero.description'),
    });
}

const AuditPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('audit');

    return (
        <section className="pt-40 pb-24 bg-gray-50 dark:bg-darker min-h-screen relative transition-colors duration-500">
            <ServiceStructuredData
                name={t('hero.badge')}
                description={t('hero.description')}
                url={`${SITE_URL}/${locale}/services/audit`}
                locale={locale}
                serviceType="AI Site Audit"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Search className="w-4 h-4 text-primary" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">{t('hero.badge')}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-wide md:tracking-widest leading-tight">
                        {t('hero.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('hero.titleHighlight')}</span> {t('hero.titleSuffix')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-sans font-light leading-relaxed tracking-wide">
                        {t('hero.description')}
                    </p>
                </div>

                {/* Audit Form & Results */}
                <AuditForm />

                {/* Static features for visual balance if no result */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                    {[
                        { titleKey: 'features.seoTitle' as const, descKey: 'features.seoDesc' as const, icon: BarChart, color: 'text-secondary' },
                        { titleKey: 'features.speedTitle' as const, descKey: 'features.speedDesc' as const, icon: Zap, color: 'text-accent' },
                        { titleKey: 'features.securityTitle' as const, descKey: 'features.securityDesc' as const, icon: Shield, color: 'text-green-500' }
                    ].map((feature, i) => (
                        <div key={i} className="glass-panel p-8 rounded-[2rem] border border-gray-200 dark:border-white/5 bg-white dark:bg-white/5 hover:-translate-y-2 transition-all shadow-lg dark:shadow-none">
                            <div className={`w-14 h-14 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{t(feature.titleKey)}</h3>
                            <p className="text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed">{t(feature.descKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AuditPage;
