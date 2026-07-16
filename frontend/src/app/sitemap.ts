import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/sanity/queries';
import { SITE_URL } from '@/lib/seo/constants';

const LOCALES = ['ka', 'en'] as const;
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
    { path: '/solutions/ai-operator', priority: 0.95, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/solutions/social-commerce-ai', priority: 0.95, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/projects', priority: 0.85, changeFreq: 'monthly' as const, key: 'projects' as const },
    { path: '/projects/urbania', priority: 0.85, changeFreq: 'monthly' as const, key: 'projects' as const },
    { path: '/consultation', priority: 0.9, changeFreq: 'monthly' as const, key: 'consultation' as const },
    { path: '/ai-readiness', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/implementation', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/faq', priority: 0.8, changeFreq: 'monthly' as const, key: 'services' as const },
    { path: '/assistant', priority: 0.85, changeFreq: 'monthly' as const, key: 'services' as const },
];

const PAGE_TOGGLE_KEYS: Record<string, string> = {
    home: 'homeEnabled',
    about: 'aboutEnabled',
    services: 'servicesEnabled',
    projects: 'portfolioEnabled',
    blog: 'blogEnabled',
    consultation: 'contactEnabled',
    docs: '',
    demos: 'demosEnabled',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];
    const siteSettings = await getSiteSettings(false).catch(() => null);
    const pageToggles = siteSettings?.pageToggles;

    for (const locale of LOCALES) {
        for (const { path, priority, changeFreq, key } of STATIC_PATHS) {
            const pageKey = PAGE_TOGGLE_KEYS[key];
            if (pageKey && pageToggles && (pageToggles as Record<string, boolean>)[pageKey] === false) continue;
            entries.push({
                url: `${SITE_URL}/${locale}${path}`,
                changeFrequency: changeFreq,
                priority,
                alternates: {
                    languages: Object.fromEntries(
                        [['x-default', `${SITE_URL}/ka${path}`], ...LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])]
                    ) as Record<string, string>,
                },
            });
        }
    }

    return entries;
}
