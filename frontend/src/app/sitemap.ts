import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/sanity/queries';
import { SITE_URL } from '@/lib/seo/constants';

const LOCALES = ['ka', 'en', 'ru'] as const;
const STATIC_PATHS = [
    { path: '', priority: 1, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/services/audit', priority: 0.85, changeFreq: 'monthly' as const },
    { path: '/services/builder', priority: 0.85, changeFreq: 'monthly' as const },
    { path: '/services/seo', priority: 0.85, changeFreq: 'monthly' as const },
    { path: '/portfolio', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/blog', priority: 0.85, changeFreq: 'daily' as const },
    { path: '/contact', priority: 0.85, changeFreq: 'monthly' as const },
    { path: '/demos', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const },
    { path: '/cookies', priority: 0.4, changeFreq: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];

    for (const locale of LOCALES) {
        for (const { path, priority, changeFreq } of STATIC_PATHS) {
            entries.push({
                url: `${SITE_URL}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: changeFreq,
                priority,
                alternates: {
                    languages: Object.fromEntries(
                        LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
                    ) as Record<string, string>,
                },
            });
        }
    }

    const posts = await getBlogPosts(false);
    for (const locale of LOCALES) {
        for (const post of posts) {
            const slug = post.slug?.current;
            if (!slug) continue;
            const path = `/blog/${slug}`;
            entries.push({
                url: `${SITE_URL}/${locale}${path}`,
                lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: Object.fromEntries(
                        LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])
                    ) as Record<string, string>,
                },
            });
        }
    }

    return entries;
}
