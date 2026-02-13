import React from 'react';
import { Settings, FileText, Globe, MapPin, ArrowRight, CheckCircle2, TrendingUp, Search } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getRouteMetadata } from '@/lib/sanity/metadata';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import { SITE_URL } from '@/lib/seo/constants';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'seoPage' });
    return getRouteMetadata('services/seo', '/services/seo', locale as 'ka' | 'en' | 'ru', {
        title: t('hero.badge'),
        description: t('hero.description'),
    });
}

const SeoPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('seoPage');

    const iconMap = {
        Settings: Settings,
        FileText: FileText,
        Globe: Globe,
        MapPin: MapPin,
    };

    return (
        <div className="min-h-screen bg-darker pt-40 pb-24">
            <ServiceStructuredData
                name={t('hero.badge')}
                description={t('hero.description')}
                url={`${SITE_URL}/${locale}/services/seo`}
                locale={locale}
                serviceType="SEO & Marketing"
            />
            {/* Hero Section */}
            <section className="relative overflow-hidden mb-32">
                <div className="absolute inset-0 bg-primary/5 rounded-[3rem] transform -rotate-3 scale-110 blur-3xl opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <Search className="w-4 h-4 text-primary" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">
                            {t('hero.badge')}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 tracking-widest leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed mb-12">
                        {t('hero.description')}
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link
                            href="/services/audit"
                            className="px-10 py-5 bg-primary hover:bg-indigo-600 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-3 hover:-translate-y-1"
                        >
                            {t('hero.cta')} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Placeholder sections for full content migration if needed */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-panel p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary/30 transition-all">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 text-primary shadow-lg shadow-primary/20">
                            <Globe className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-4">Global SEO reach</h3>
                        <p className="text-gray-400 font-sans leading-relaxed text-lg italic">Coming soon: Full localized content for the SEO page features.</p>
                    </div>
                    <div className="glass-panel p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-secondary/30 transition-all">
                        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 text-secondary shadow-lg shadow-secondary/20">
                            <TrendingUp className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-4">Growth Focused</h3>
                        <p className="text-gray-400 font-sans leading-relaxed text-lg italic">Coming soon: Full localized content for the SEO results section.</p>
                    </div>
                </div>
            </section>

            {/* FAQ CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
                <div className="p-12 bg-white/5 rounded-[3rem] border border-white/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-heading font-bold text-white mb-6">Ready for Success?</h2>
                        <p className="text-gray-400 font-sans mb-10 max-w-2xl mx-auto">Contact us for a free consultation and initial audit to start your journey.</p>
                        <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-darker font-heading font-bold rounded-xl hover:bg-gray-200 transition-all uppercase tracking-wider shadow-xl hover:-translate-y-1">
                            Contact Us <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SeoPage;
