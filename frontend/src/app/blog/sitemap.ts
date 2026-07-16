import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';
import { insights } from '@/data/insights';
import { getSiteSettings } from '@/lib/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await getSiteSettings(false).catch(() => null);
  if (siteSettings?.toggles?.enableBlog === false) return [];
  return ['ka', 'en'].flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}/blog`,
      changeFrequency: 'daily' as const,
      priority: 0.85,
      alternates: { languages: { 'x-default': `${SITE_URL}/ka/blog`, ka: `${SITE_URL}/ka/blog`, en: `${SITE_URL}/en/blog` } },
    },
    ...insights.map((insight) => ({
      url: `${SITE_URL}/${locale}/blog/${insight.slug}`,
      lastModified: new Date(insight.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      alternates: { languages: { 'x-default': `${SITE_URL}/ka/blog/${insight.slug}`, ka: `${SITE_URL}/ka/blog/${insight.slug}`, en: `${SITE_URL}/en/blog/${insight.slug}` } },
    })),
  ]);
}
