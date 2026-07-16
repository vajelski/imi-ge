import React from 'react';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getRouteMetadata } from '@/lib/sanity/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'portfolio' });
    return getRouteMetadata('portfolio', '/portfolio', locale as 'ka' | 'en', {
        title: t('badge'),
        description: t('description'),
    });
}

const PortfolioPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;
    const { locale } = params;
    setRequestLocale(locale);
    const t = await getTranslations('portfolio');

    // Project indexes
    const projectIndexes = [0, 1, 2, 3, 4, 5];

    return (
        <div className="pt-40 pb-24 bg-gray-50 dark:bg-darker transition-colors duration-300 min-h-screen relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
                        <Layers className="w-4 h-4 text-primary" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">
                            {t('badge')}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest leading-tight">
                        {t('titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-sans font-light leading-relaxed tracking-wide">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projectIndexes.map((idx) => {
                        const title = t(`projects.${idx}.title`);
                        const category = t(`projects.${idx}.category`);
                        const desc = t(`projects.${idx}.desc`);
                        // Standardizing image for demo
                        const image = `https://picsum.photos/800/600?random=${idx + 1}`;

                        return (
                            <article key={idx} className="group rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col h-full hover:-translate-y-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 animate-in fade-in slide-in-from-bottom-8 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={image}
                                        alt={title}
                                        loading="lazy"
                                        width="800"
                                        height="600"
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-darker/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <button className="p-4 bg-white/10 text-white rounded-full hover:bg-primary hover:scale-110 transition-all border border-white/20 backdrop-blur-md" aria-label="View Live">
                                            <ExternalLink className="w-6 h-6" />
                                        </button>
                                        <button className="p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-darker hover:scale-110 transition-all border border-white/20 backdrop-blur-md" aria-label="View Code">
                                            <Github className="w-6 h-6" />
                                        </button>
                                    </div>
                                    <div className="absolute top-6 left-6 bg-white/90 dark:bg-darker/90 backdrop-blur-md px-5 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-lg">
                                        <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest">{category}</span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors tracking-wide">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3 font-light leading-relaxed text-sm flex-grow tracking-wide font-sans">
                                        {desc}
                                    </p>

                                    <button className="flex items-center text-sm font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-[0.15em] group/btn mt-auto">
                                        {locale === 'ka' ? 'სრულად ნახვა' : 'View Full Story'} <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-32 text-center animate-in fade-in zoom-in duration-1000">
                    <div className="inline-block p-12 bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-200 dark:border-white/10 relative overflow-hidden group max-w-4xl w-full shadow-2xl dark:shadow-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wider">
                                {t('ctaTitle')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-10 font-light text-lg tracking-wide font-sans">
                                {t('ctaDesc')}
                            </p>
                            <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-sm font-heading font-bold text-white bg-primary hover:bg-indigo-600 rounded-2xl transition-all uppercase tracking-[0.2em] shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1">
                                {t('ctaButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
