import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/sanity/queries';
import { SITE_URL } from '@/lib/seo/constants';
import { insights } from '@/data/insights';

// The public experience is Georgian-only. English and Russian legacy URLs redirect to /ka.
const LOCALES = ['ka'] as const;
const STATIC_PATHS = [
    { path: '', priority: 1, changeFreq: 'daily' as const, key: 'home' as const },
    { path: '/about', priority: 0.9, changeFreq: 'monthly' as const, key: 'about' as const },
    { path: '/services', priority: 0.9, changeFreq: 'weekly' as const, key: 'services' as const },
    { path: '/services/ai-voice-agents', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/rag-internal-ai', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/business-automation', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/ai-native-web', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/ai-crm-integration', priority: 0.9, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/ai-first-crm', priority: 0.9, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/sales-intelligence', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/services/ai-governance', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/use-cases', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/projects', priority: 0.85, changeFreq: 'monthly' as const, key: 'portfolio' as const },
    { path: '/projects/urbania', priority: 0.85, changeFreq: 'monthly' as const, key: 'portfolio' as const },
    { path: '/consultation', priority: 0.9, changeFreq: 'monthly' as const, key: 'contact' as const },
    { path: '/ai-readiness', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/implementation', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/faq', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/docs', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/blog', priority: 0.85, changeFreq: 'daily' as const, key: 'blog' as const },
    { path: '/contact', priority: 0.85, changeFreq: 'monthly' as const, key: 'contact' as const },
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

    for (const locale of LOCALES) {
        for (const insight of insights) {
            const path = `/blog/${insight.slug}`;
            entries.push({
                url: `${SITE_URL}/${locale}${path}`,
                lastModified: new Date(insight.date),
                changeFrequency: 'monthly',
                priority: 0.75,
                alternates: {
                    languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])) as Record<string, string>,
                },
            });
        }
    }

    return entries;
}
