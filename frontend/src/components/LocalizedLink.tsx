'use client';

import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import { getPathname } from '@/i18n/routing';
import type { ComponentProps } from 'react';

/**
 * Link that uses getPathname instead of next-intl's Link.
 * Avoids "Cannot read properties of null (reading 'pathname')" when
 * next-intl's routing context returns null during SSR/hydration.
 */
export function LocalizedLink({
  href,
  ...props
}: Omit<ComponentProps<typeof NextLink>, 'href'> & { href: string }) {
  const locale = useLocale();
  const resolvedHref = getPathname({ locale: locale as 'ka' | 'en' | 'ru', href });
  return <NextLink href={resolvedHref} {...props} />;
}
