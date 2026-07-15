import { defineRouting } from 'next-intl/routing';
import { getLocalizedPath } from './path';

export const routing = defineRouting({
    locales: ['ka', 'en', 'ru'],
    defaultLocale: 'ka',
    localeDetection: false, // ყოველთვის ქართულზე გადადის default-ად, არა browser-ის ენაზე
});

// Custom getPathname — createNavigation causes "pathname" null crash during SSR
export const getPathname = ({ locale, href }: { locale: 'ka' | 'en' | 'ru'; href: string }) => getLocalizedPath(locale, href);

export { LocalizedLink as Link } from '@/components/LocalizedLink';
