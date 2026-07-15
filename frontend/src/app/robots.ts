import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/cms-preview', '/admin', '/auth', '/ka/cms-preview', '/en/', '/ru/', '/ka/auth'],
        },
        sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/blog/sitemap.xml`, `${SITE_URL}/docs/sitemap.xml`],
        host: SITE_URL,
    };
}
