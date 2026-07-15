import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';
import { docs } from '@/data/docs';

export default function sitemap(): MetadataRoute.Sitemap { return [{ url: `${SITE_URL}/ka/docs`, changeFrequency: 'monthly', priority: 0.8 }, ...docs.map((doc) => ({ url: `${SITE_URL}/ka/docs/${doc.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }))]; }
