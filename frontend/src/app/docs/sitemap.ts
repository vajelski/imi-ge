import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';
import { docs } from '@/data/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['ka', 'en'].flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}/docs`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: { 'x-default': `${SITE_URL}/ka/docs`, ka: `${SITE_URL}/ka/docs`, en: `${SITE_URL}/en/docs` } },
    },
    ...docs.map((doc) => ({
      url: `${SITE_URL}/${locale}/docs/${doc.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: { languages: { 'x-default': `${SITE_URL}/ka/docs/${doc.slug}`, ka: `${SITE_URL}/ka/docs/${doc.slug}`, en: `${SITE_URL}/en/docs/${doc.slug}` } },
    })),
  ]);
}
