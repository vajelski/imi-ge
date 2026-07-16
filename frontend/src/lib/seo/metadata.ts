import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, type Locale } from './constants';

type LocalizedText = Record<Locale, string>;

interface LocalizedMetadataOptions {
  locale: string;
  path: string;
  title: LocalizedText;
  description: LocalizedText;
  type?: 'website' | 'article';
  image?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/** Builds one canonical and one complete hreflang set for every public route. */
export function localizedMetadata({
  locale,
  path,
  title,
  description,
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  publishedTime,
  modifiedTime,
}: LocalizedMetadataOptions): Metadata {
  const language: Locale = locale === 'en' ? 'en' : 'ka';
  const urlPath = path === '/' ? '' : path;
  const canonical = `${SITE_URL}/${language}${urlPath}`;
  const localizedUrls = {
    'x-default': `${SITE_URL}/ka${urlPath}`,
    ka: `${SITE_URL}/ka${urlPath}`,
    en: `${SITE_URL}/en${urlPath}`,
  };
  const selectedTitle = title[language];
  const selectedDescription = description[language];

  return {
    title: selectedTitle,
    description: selectedDescription,
    alternates: { canonical, languages: localizedUrls },
    openGraph: {
      type,
      siteName: SITE_NAME,
      url: canonical,
      locale: language === 'ka' ? 'ka_GE' : 'en_US',
      alternateLocale: language === 'ka' ? ['en_US'] : ['ka_GE'],
      title: selectedTitle,
      description: selectedDescription,
      images: [{ url: image, width: 1200, height: 630, alt: selectedTitle }],
      ...(publishedTime || modifiedTime ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@imige',
      title: selectedTitle,
      description: selectedDescription,
      images: [image],
    },
    robots: noindex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
