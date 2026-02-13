import { MetadataRoute } from 'next';
import { getBlogPosts, getSiteSettings } from '@/lib/sanity/queries';
import { SITE_URL } from '@/lib/seo/constants';

const LOCALES = ['ka', 'en', 'ru'] as const;
const STATIC_PATHS = [
    { path: '', priority: 1, changeFreq: 'daily' as const, key: 'home' as const },
    { path: '/about', priority: 0.9, changeFreq: 'monthly' as const, key: 'about' as const },
    { path: '/services', priority: 0.9, changeFreq: 'weekly' as const, key: 'services' as const },
    { path: '/services/audit', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/builder', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/seo', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/portfolio', priority: 0.8, changeFreq: 'weekly' as const, key: 'portfolio' as const },
    { path: '/blog', priority: 0.85, changeFreq: 'daily' as const, key: 'blog' as const },
    { path: '/contact', priority: 0.85, changeFreq: 'monthly' as const, key: 'contact' as const },
    { path: '/demos', priority: 0.8, changeFreq: 'weekly' as const, key: 'demos' as const },
    { path: '/privacy', priority: 0.4, changeFreq: 'yearly' as const, key: 'privacy' as const },
    { path: '/terms', priority: 0.4, changeFreq: 'yearly' as const, key: 'terms' as const },
    { path: '/cookies', priority: 0.4, changeFreq: 'yearly' as const, key: 'cookies' as const },
];

const PAGE_TOGGLE_KEYS: Record<string, string> = {
    home: 'homeEnabled',
    about: 'aboutEnabled',
    services: 'servicesEnabled',
    portfolio: 'portfolioEnabled',
    blog: 'blogEnabled',
    contact: 'contactEnabled',
    demos: 'demosEnabled',
    privacy: 'privacyEnabled',
    terms: 'termsEnabled',
    cookies: 'cookiesEnabled',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];
    const siteSettings = await getSiteSettings(false).catch(() => null);
    const pageToggles = siteSettings?.pageToggles;
    const enableBlog = siteSettings?.toggles?.enableBlog !== false;

    for (const locale of LOCALES) {
        for (const { path, priority, changeFreq, key } of STATIC_PATHS) {
            const pageKey = PAGE_TOGGLE_KEYS[key];
            if (pageKey && pageToggles && (pageToggles as Record<string, boolean>)[pageKey] === false) continue;
            if (key === 'blog' && !enableBlog) continue;
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

    const posts = enableBlog ? await getBlogPosts(false) : [];
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
