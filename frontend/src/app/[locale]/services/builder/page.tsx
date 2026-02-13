import React from 'react';
import { Hammer, Layout, Smartphone, Code2, Check } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getRouteMetadata } from '@/lib/sanity/metadata';
import { Link } from '@/i18n/routing';
import BuilderForm from '@/components/BuilderForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'builder' });
    return getRouteMetadata('services/builder', '/services/builder', locale as 'ka' | 'en' | 'ru', {
        title: t('hero.badge'),
        description: t('hero.description'),
    });
}

const BuilderPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('builder');

    return (
        <section className="pt-40 pb-24 bg-darker min-h-screen relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
                        <Hammer className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-secondary uppercase">{t('hero.badge')}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-widest leading-tight">
                        {t('hero.titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">{t('hero.titleHighlight')}</span> {t('hero.titleSuffix')}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed tracking-wide">
                        {t('hero.description')}
                    </p>
                </div>

                {/* Interactive Builder */}
                <BuilderForm />

                {/* Benefits Grid */}
                <div className="mb-32">
                    <h2 className="text-3xl font-heading font-bold text-white mb-12 text-center tracking-wider">{t('benefits.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[0, 1, 2].map((i) => {
                            const icons = [Layout, Smartphone, Code2];
                            const Icon = icons[i];
                            return (
                                <div key={i} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-secondary/30 transition-all hover:-translate-y-1">
                                    <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 text-secondary">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 font-heading">{t(`benefits.items.${i}.title`)}</h4>
                                    <p className="text-gray-400 font-sans text-sm leading-relaxed">{t(`benefits.items.${i}.desc`)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Pricing/CTA */}
                <div className="max-w-4xl mx-auto glass-panel p-10 rounded-[2.5rem] border border-secondary/30 relative overflow-hidden bg-white/5">
                    <div className="absolute top-0 right-0 bg-secondary text-white px-6 py-2 rounded-bl-2xl font-heading font-bold text-xs tracking-wider">
                        POPULAR
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-3xl font-heading font-bold text-white mb-2">Enterprise Plan</h3>
                            <p className="text-gray-400 font-sans mb-6">AI Builder + Dedicated Support</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                                    <Check className="w-4 h-4 text-secondary" /> Unlimited Generations
                                </li>
                                <li className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                                    <Check className="w-4 h-4 text-secondary" /> Hosting & Domain Included
                                </li>
                                <li className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                                    <Check className="w-4 h-4 text-secondary" /> SEO & Marketing Package
                                </li>
                            </ul>
                        </div>
                        <div className="text-center md:text-right">
                            <div className="text-4xl font-heading font-bold text-white mb-2">Contact Us</div>
                            <div className="text-sm text-gray-500 font-sans mb-6">Customized for you</div>
                            <Link href="/contact" className="inline-block bg-secondary hover:bg-fuchsia-600 text-white px-10 py-4 rounded-xl font-heading font-bold uppercase tracking-[0.2em] transition-all shadow-lg shadow-secondary/25 hover:-translate-y-1">
                                Order Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuilderPage;
