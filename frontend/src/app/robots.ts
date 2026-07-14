import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/constants';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/cms-preview', '/admin', '/auth', '/ka/cms-preview', '/en/cms-preview', '/ru/cms-preview', '/ka/auth', '/en/auth', '/ru/auth'],
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
}
