import React from 'react';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import { PortableText } from '@portabletext/react';
import { getBlogPost, getBlogPosts } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';
import { draftMode } from 'next/headers';
import ArticleStructuredData from '@/components/ArticleStructuredData';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

interface BlogPostPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getBlogPosts(false);
    const params: { locale: string; slug: string }[] = [];
    for (const locale of ['ka', 'en', 'ru'] as const) {
        for (const post of posts) {
            if (post.slug?.current) {
                params.push({ locale, slug: post.slug.current });
            }
        }
        // Include fallback static posts when no Sanity content
        if (posts.length === 0) {
            for (let i = 1; i <= 4; i++) {
                params.push({ locale, slug: `post-${i}` });
            }
        }
    }
    return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const { isEnabled: preview } = await draftMode();
    const post = await getBlogPost(slug, preview);

    if (!post) {
        return { title: 'Post Not Found — IMI.GE' };
    }

    const metaTitle = post.seo?.metaTitle
        ? getLocalizedValue(post.seo.metaTitle, locale as Locale)
        : getLocalizedValue(post.title, locale as Locale);
    const metaDescription = post.seo?.metaDescription
        ? getLocalizedValue(post.seo.metaDescription, locale as Locale)
        : getLocalizedValue(post.excerpt, locale as Locale);
    const title = `${metaTitle || 'Blog'} — IMI.GE`;
    const url = `https://imi.ge/${locale}/blog/${slug}`;
    const ogImage = (post as { imageUrl?: string }).imageUrl || 'https://imi.ge/og-image.png';

    return {
        title,
        description: metaDescription || '',
        openGraph: {
            title,
            description: metaDescription || '',
            url,
            type: 'article',
            publishedTime: post.publishedAt || undefined,
            modifiedTime: post.publishedAt || undefined,
            authors: [getLocalizedValue(post.author, locale as Locale)].filter(Boolean) as string[],
            images: [{ url: ogImage, width: 1200, height: 630, alt: metaTitle || '' }],
            locale: locale === 'ka' ? 'ka_GE' : locale === 'ru' ? 'ru_GE' : 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: metaDescription || '',
            images: [ogImage],
        },
        alternates: {
            canonical: url,
            languages: {
                ka: `https://imi.ge/ka/blog/${slug}`,
                en: `https://imi.ge/en/blog/${slug}`,
                ru: `https://imi.ge/ru/blog/${slug}`,
            },
        },
    };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const { isEnabled: preview } = await draftMode();
    const t = await getTranslations('blog');

    let post = await getBlogPost(slug, preview);

    // Fallback for static placeholder posts (post-1, post-2, etc.) when no Sanity content
    const fallbackMatch = slug.match(/^post-(\d+)$/);
    if (!post && fallbackMatch) {
        const idx = parseInt(fallbackMatch[1], 10) - 1;
        if (idx >= 0 && idx <= 3) {
            const title = t(`posts.${idx}.title`);
            const excerpt = t(`posts.${idx}.excerpt`);
            const author = t(`posts.${idx}.author`);
            const date = t(`posts.${idx}.date`);
            const category = t(`posts.${idx}.category`);

            return (
                <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-sm font-heading font-bold text-primary hover:text-secondary uppercase tracking-wider mb-12 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {t('badge') === 'ბლოგი & სიახლეები' ? 'უკან ბლოგზე' : t('badge') === 'Блог и новости' ? 'Назад в блог' : 'Back to Blog'}
                        </Link>
                        <article className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <img
                                src={`https://picsum.photos/800/600?random=${idx + 10}`}
                                alt={title}
                                className="w-full rounded-[2rem] aspect-[21/9] object-cover mb-12"
                            />
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide leading-tight">
                                {title}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light mb-12 leading-relaxed border-l-4 border-primary pl-6">
                                {excerpt}
                            </p>
                            <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 font-sans mb-8">
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {date}
                                </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 italic">
                                {locale === 'ka'
                                    ? 'სრული კონტენტი გამოჩნდება Sanity CMS-ში პოსტის შექმნის შემდეგ.'
                                    : locale === 'ru'
                                      ? 'Полный контент появится после создания поста в Sanity CMS.'
                                      : 'Full content will appear after creating the post in Sanity CMS.'}
                            </p>
                        </article>
                    </div>
                </div>
            );
        }
    }

    if (!post) {
        notFound();
    }

    const title = getLocalizedValue(post.title, locale as Locale) || 'Untitled';
    const excerpt = getLocalizedValue(post.excerpt, locale as Locale);
    const category = getLocalizedValue(post.category, locale as Locale);
    const author = getLocalizedValue(post.author, locale as Locale);
    const body = getLocalizedValue(post.body, locale as Locale);
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString(locale === 'ka' ? 'ka-GE' : locale === 'ru' ? 'ru-RU' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : '';

    const ptComponents = {
        block: {
            normal: ({ children }: any) => <p className="mb-4 text-gray-600 dark:text-gray-400 font-sans leading-relaxed">{children}</p>,
            h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-4">{children}</h2>,
            h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-3">{children}</h3>,
        },
    };

    const tBlog = locale === 'ka' ? 'ბლოგი' : locale === 'ru' ? 'Блог' : 'Blog';

    return (
        <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
            <ArticleStructuredData
                title={title}
                description={excerpt || ''}
                imageUrl={post.imageUrl}
                author={author}
                publishedAt={post.publishedAt}
                url={`https://imi.ge/${locale}/blog/${slug}`}
            />
            <BreadcrumbStructuredData
                locale={locale}
                items={[
                    { name: tBlog, path: '/blog' },
                    { name: title, path: `/blog/${slug}` },
                ]}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-heading font-bold text-primary hover:text-secondary uppercase tracking-wider mb-12 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {t('badge') === 'ბლოგი & სიახლეები' ? 'უკან ბლოგზე' : t('badge') === 'Блог и новости' ? 'Назад в блог' : 'Back to Blog'}
                </Link>

                <article className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {post.imageUrl && (
                        <div className="relative rounded-[2rem] overflow-hidden mb-12 aspect-[21/9]">
                            <img
                                src={post.imageUrl}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                            {(category || formattedDate) && (
                                <div className="absolute bottom-4 left-6 flex gap-4">
                                    {category && (
                                        <span className="bg-primary/90 text-white px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider">
                                            {category}
                                        </span>
                                    )}
                                    {formattedDate && (
                                        <span className="flex items-center gap-2 text-white/90 text-sm font-sans">
                                            <Calendar className="w-4 h-4" />
                                            {formattedDate}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mb-8">
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide leading-tight">
                            {title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-sans">
                            {author && (
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {author}
                                </span>
                            )}
                            {formattedDate && !post.imageUrl && (
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formattedDate}
                                </span>
                            )}
                        </div>
                    </div>

                    {excerpt && (
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-sans font-light mb-12 leading-relaxed border-l-4 border-primary pl-6">
                            {excerpt}
                        </p>
                    )}

                    {body && Array.isArray(body) && body.length > 0 ? (
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <PortableText value={body} components={ptComponents} />
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 italic">Content coming soon.</p>
                    )}
                </article>
            </div>
        </div>
    );
};

export default BlogPostPage;
