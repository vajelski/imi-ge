import React from 'react';
import { Users, Target, Lightbulb, Award, Cpu, TrendingUp, Zap, ShieldCheck, Trophy } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getPageBySlug } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';

const IconMap: Record<string, React.FC<any>> = {
    Target, Lightbulb, Users, Award, TrendingUp, Zap, ShieldCheck, Trophy, Cpu
};

interface AboutPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
    const { locale } = await params;

    const { isEnabled: preview } = await draftMode();
    const sanityPage = await getPageBySlug('about', preview);

    if (sanityPage && sanityPage.seo) {
        const metaTitle = getLocalizedValue(sanityPage.seo.metaTitle, locale as Locale) || 'About Us — IMI.GE';
        const metaDescription = getLocalizedValue(sanityPage.seo.metaDescription, locale as Locale) || '';

        return {
            title: metaTitle,
            description: metaDescription,
            alternates: {
                canonical: `https://imi.ge/${locale}/about`,
                languages: {
                    ka: 'https://imi.ge/ka/about',
                    en: 'https://imi.ge/en/about',
                    ru: 'https://imi.ge/ru/about',
                },
            },
        };
    }

    // Fallback to static content
    const t = await getTranslations({ locale, namespace: 'about' });
    return {
        title: `${t('badge')} — IMI.GE`,
        description: t('description'),
        alternates: {
            canonical: `https://imi.ge/${locale}/about`,
            languages: {
                ka: 'https://imi.ge/ka/about',
                en: 'https://imi.ge/en/about',
                ru: 'https://imi.ge/ru/about',
            },
        },
    };
}

const AboutPage = async ({ params }: AboutPageProps) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const { isEnabled: preview } = await draftMode();
    const t = await getTranslations('about');

    const sanityPage = await getPageBySlug('about', preview);

    if (sanityPage && sanityPage.sections) {
        return (
            <div className="pt-40 pb-24 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-darker">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {sanityPage.sections.map((section, index) => {
                        // Hero Section
                        if (section._type === 'hero') {
                            const badge = getLocalizedValue(section.badge, locale as Locale);
                            const title = getLocalizedValue(section.title, locale as Locale);
                            const description = getLocalizedValue(section.description, locale as Locale);

                            return (
                                <div key={index} className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default">
                                        <Cpu className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
                                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">
                                            {badge}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-wide leading-tight">
                                        {title}
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                                        {description}
                                    </p>
                                </div>
                            );
                        }

                        // Values Grid
                        if (section._type === 'valuesGrid' && section.items) {
                            return (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                                    {section.items.map((item, itemIndex) => {
                                        const Icon = item.icon ? IconMap[item.icon] : Award;
                                        const title = getLocalizedValue(item.title, locale as Locale);
                                        const description = getLocalizedValue(item.description, locale as Locale);

                                        return (
                                            <div
                                                key={itemIndex}
                                                className="group relative p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
                                            >
                                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                                                </div>
                                                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 tracking-wide">
                                                    {title}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                                                    {description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }

                        // Text Block (Vision)
                        if (section._type === 'textBlock') {
                            const title = getLocalizedValue(section.title, locale as Locale);
                            const content = getLocalizedValue(section.content, locale as Locale);
                            const textContent = content && content[0]?.children?.[0]?.text;

                            return (
                                <div key={index} className="mb-32">
                                    <div className="max-w-4xl mx-auto text-center">
                                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-wide">
                                            {title}
                                        </h2>
                                        <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light leading-relaxed">
                                            {textContent}
                                        </p>
                                    </div>
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            </div>
        );
    }

    // Fallback to static JSON content
    const valueIndexes = [0, 1, 2, 3];
    const visionIndexes = [0, 1, 2, 3];

    return (
        <div className="pt-40 pb-24 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-darker">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 group cursor-default">
                        <Cpu className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">
                            {t('badge')}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-wide leading-tight">
                        {t('titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span> {t('titleSuffix')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light leading-relaxed max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Image Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 animate-in fade-in zoom-in duration-1000 delay-200">
                    <div className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] shadow-2xl border border-gray-200 dark:border-white/10 group">
                        <img
                            src="https://picsum.photos/1600/800?grayscale"
                            alt="Team working on AI project"
                            loading="lazy"
                            width="1600"
                            height="800"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 md:p-16">
                            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-wider drop-shadow-lg">
                                {t('imageTitle')}
                            </h3>
                            <p className="text-gray-300 font-light text-lg tracking-wide font-sans">
                                {t('imageDesc')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {valueIndexes.map((idx) => {
                        const valTitle = t(`values.${idx}.title`);
                        const valDesc = t(`values.${idx}.desc`);
                        const iconName = t(`values.${idx}.icon`);
                        const Icon = IconMap[iconName] || Award;

                        return (
                            <div
                                key={idx}
                                className="group relative p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 animate-in fade-in zoom-in duration-700"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 tracking-wide">
                                    {valTitle}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                                    {valDesc}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Vision Section */}
                <div className="mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-wide">
                            {t('visionTitle')}
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light leading-relaxed">
                            {t('visionDesc')}
                        </p>
                    </div>

                    {/* Vision Points Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {visionIndexes.map((idx) => {
                            const pointTitle = t(`visionPoints.${idx}.title`);
                            const pointDesc = t(`visionPoints.${idx}.desc`);
                            const iconName = t(`visionPoints.${idx}.icon`);
                            const Icon = IconMap[iconName] || TrendingUp;

                            return (
                                <div
                                    key={idx}
                                    className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border border-primary/20 dark:border-primary/30 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2"
                                    style={{ animationDelay: `${idx * 100 + 400}ms` }}
                                >
                                    <div className="mb-6 inline-flex p-4 rounded-2xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 tracking-wide">
                                        {pointTitle}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                                        {pointDesc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
