import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';
import { insights } from '@/data/insights';

export default function sitemap(): MetadataRoute.Sitemap { return insights.map((insight) => ({ url: `${SITE_URL}/ka/blog/${insight.slug}`, lastModified: new Date(insight.date), changeFrequency: 'monthly', priority: 0.75 })); }
