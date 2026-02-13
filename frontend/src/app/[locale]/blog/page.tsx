import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getRouteMetadata } from '@/lib/sanity/metadata';
import { draftMode } from 'next/headers';
import { getBlogPosts } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';

interface BlogPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BlogPageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog' });
    return getRouteMetadata('blog', '/blog', locale as 'ka' | 'en' | 'ru', {
        title: t('badge'),
        description: t('description'),
    });
}

const BlogPage = async ({ params }: BlogPageProps) => {
    const { locale } = await params;
    setRequestLocale(locale);
    const { isEnabled: preview } = await draftMode();
    const t = await getTranslations('blog');

    const sanityPosts = await getBlogPosts(preview);

    const readMoreKey =
        t('badge') === 'ბლოგი & სიახლეები'
            ? 'სრულად კითხვა'
            : t('badge') === 'Блог и новости'
              ? 'Читать полностью'
              : 'Read Full Story';

    if (sanityPosts.length > 0) {
        return (
            <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                        <h2 className="text-primary font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4">
                            {t('badge')}
                        </h2>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest leading-tight">
                            {t('titlePrefix')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light max-w-2xl mx-auto">
                            {t('description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {sanityPosts.map((post, idx) => {
                            const title = getLocalizedValue(post.title, locale as Locale) || 'Untitled';
                            const excerpt = getLocalizedValue(post.excerpt, locale as Locale) || '';
                            const category = getLocalizedValue(post.category, locale as Locale) || t('badge');
                            const author = getLocalizedValue(post.author, locale as Locale) || '';
                            const formattedDate = post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString(locale === 'ka' ? 'ka-GE' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                  })
                                : '';

                            return (
                                <article
                                    key={post._id}
                                    className="group bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 duration-1000"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={post.imageUrl || `https://picsum.photos/800/600?random=${idx + 10}`}
                                            alt={title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-darker/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-heading font-bold text-primary uppercase tracking-wider shadow-lg">
                                            {category}
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-sans mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {formattedDate}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> ~5 {locale === 'ka' ? 'წთ' : locale === 'ru' ? 'мин' : 'min'}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                            {title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                            {excerpt}
                                        </p>

                                        {author && (
                                            <div className="flex items-center gap-2 text-xs text-gray-400 font-sans mb-4">
                                                <User className="w-3 h-3" /> {author}
                                            </div>
                                        )}

                                        <Link
                                            href={`/blog/${post.slug.current}`}
                                            className="inline-flex items-center text-sm font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-wider mt-auto group/link"
                                        >
                                            {readMoreKey}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // Fallback to static content when no Sanity posts
    const postIndexes = [0, 1, 2, 3];
    return (
        <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <h2 className="text-primary font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4">
                        {t('badge')}
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest leading-tight">
                        {t('titlePrefix')}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {postIndexes.map((idx) => {
                        const title = t(`posts.${idx}.title`);
                        const excerpt = t(`posts.${idx}.excerpt`);
                        const date = t(`posts.${idx}.date`);
                        const author = t(`posts.${idx}.author`);
                        const category = t(`posts.${idx}.category`);
                        const readTime = t(`posts.${idx}.readTime`);
                        const image = `https://picsum.photos/800/600?random=${idx + 10}`;
                        const slug = `post-${idx + 1}`;

                        return (
                            <article
                                key={idx}
                                className="group bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full animate-in fade-in slide-in-from-bottom-8 duration-1000"
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-darker/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-heading font-bold text-primary uppercase tracking-wider shadow-lg">
                                        {category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-sans mb-4">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                        {title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 font-sans text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {excerpt}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs text-gray-400 font-sans mb-4">
                                        <User className="w-3 h-3" /> {author}
                                    </div>

                                        <Link
                                            href={`/blog/${slug}`}
                                            className="inline-flex items-center text-sm font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-wider mt-auto group/link"
                                        >
                                            {readMoreKey}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
