import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';
import { insights } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap { return ['ka', 'en'].flatMap((locale) => insights.map((insight) => ({ url: `${SITE_URL}/${locale}/blog/${insight.slug}`, lastModified: new Date(insight.date), changeFrequency: 'monthly' as const, priority: 0.75 }))); }
