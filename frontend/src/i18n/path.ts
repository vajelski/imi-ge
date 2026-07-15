export type PublicLocale = 'ka' | 'en' | 'ru';

export function getLocalizedPath(locale: PublicLocale, href: string) {
  const path = href === '/' ? '' : href;
  return `/${locale}${path}`;
}
