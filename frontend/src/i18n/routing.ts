import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['ka', 'en', 'ru'],
    defaultLocale: 'ka'
});

// Custom getPathname — createNavigation causes "pathname" null crash during SSR
export function getPathname({
    locale,
    href,
}: {
    locale: 'ka' | 'en' | 'ru';
    href: string;
}): string {
    const path = href === '/' ? '' : href;
    return `/${locale}${path}`;
}

export { LocalizedLink as Link } from '@/components/LocalizedLink';
