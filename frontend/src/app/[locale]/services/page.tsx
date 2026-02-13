import React from 'react';
import { Brain, MessageSquareCode, BarChart3, Smartphone, Globe, Code2, ArrowUpRight, Cpu, Layout, Search, Hammer, ShieldCheck, Zap, Database } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getRouteMetadata } from '@/lib/sanity/metadata';

const IconMap: Record<string, React.FC<any>> = {
    Brain, MessageSquareCode, BarChart3, Smartphone, Globe, Code2, Layout, Search, Hammer, ShieldCheck, Zap, Database
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'allServices' });
    return getRouteMetadata('services', '/services', locale as 'ka' | 'en' | 'ru', {
        title: t('badge'),
        description: t('description'),
    });
}

const AllServicesPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations('allServices');

    // Categorized index approach
    const categoryIndexes = [0, 1, 2];
    const itemIndexes = [[0, 1, 2], [0, 1, 2], [0, 1, 2]];

    return (
        <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default">
                        <Cpu className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">
                            {t('badge')}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest leading-tight">
                        {t('titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                <div className="space-y-32">
                    {categoryIndexes.map((catIdx) => {
                        const catTitle = t(`categories.${catIdx}.title`);

                        return (
                            <div key={catIdx} className="animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${catIdx * 200}ms` }}>
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="h-px flex-grow bg-gray-200 dark:bg-white/10"></div>
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider px-4">
                                        {catTitle}
                                    </h2>
                                    <div className="h-px flex-grow bg-gray-200 dark:bg-white/10"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {itemIndexes[catIdx].map((itemIdx) => {
                                        const title = t(`categories.${catIdx}.items.${itemIdx}.title`);
                                        const desc = t(`categories.${catIdx}.items.${itemIdx}.desc`);
                                        const iconKey = t(`categories.${catIdx}.items.${itemIdx}.icon`);
                                        const price = t(`categories.${catIdx}.items.${itemIdx}.price`);
                                        const link = t(`categories.${catIdx}.items.${itemIdx}.link`);

                                        const Icon = IconMap[iconKey] || Cpu;

                                        return (
                                            <Link key={itemIdx} href={link as any} className="group relative h-full block">
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="relative h-full rounded-[2rem] p-8 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 border border-gray-200 dark:border-white/10 group-hover:border-primary/30 flex flex-col hover:-translate-y-2 shadow-lg dark:shadow-none">

                                                    <div className="relative z-10 flex flex-col h-full">
                                                        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-white/10 dark:to-white/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10 dark:border-white/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-sm">
                                                            <Icon className="w-7 h-7 text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                                                        </div>

                                                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors tracking-wide">
                                                            {title}
                                                        </h3>

                                                        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed text-sm flex-grow font-sans font-light tracking-wide">
                                                            {desc}
                                                        </p>

                                                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-white/5 mt-auto">
                                                            <span className="text-gray-900 dark:text-white font-heading font-bold text-xs tracking-wider bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                                                                {price}
                                                            </span>
                                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-primary group-hover:text-white transition-all group-hover:rotate-45 border border-gray-200 dark:border-white/5">
                                                                <ArrowUpRight className="w-5 h-5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllServicesPage;
