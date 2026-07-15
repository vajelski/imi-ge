import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';
import { docs } from '@/data/docs';

export default function sitemap(): MetadataRoute.Sitemap { return ['ka', 'en'].flatMap((locale) => [{ url: `${SITE_URL}/${locale}/docs`, changeFrequency: 'monthly' as const, priority: 0.8 }, ...docs.map((doc) => ({ url: `${SITE_URL}/${locale}/docs/${doc.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }))]); }
