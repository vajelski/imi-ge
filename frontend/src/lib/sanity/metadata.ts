import type { Metadata } from 'next'
import { getRouteSeo, getSiteSettings } from './queries'
import { getLocalizedValue, type Locale } from './types'
import { SITE_URL, DEFAULT_OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, DEFAULT_KEYWORDS, SITE_NAME } from '@/lib/seo/constants'

type SeoSource = {
    metaTitle?: { ka?: string; en?: string; ru?: string }
    metaDescription?: { ka?: string; en?: string; ru?: string }
    ogImageUrl?: string
    noindex?: boolean
}

function buildMetadataFromSeo(
    seo: SeoSource | null | undefined,
    locale: Locale,
    path: string,
    fallback: { title: string; description: string }
): Metadata {
    const publicLocale = locale === 'ka' ? 'ka' : 'en'
    const metaTitle = seo?.metaTitle ? getLocalizedValue(seo.metaTitle, locale) : fallback.title
    const metaDescription = seo?.metaDescription ? getLocalizedValue(seo.metaDescription, locale) : fallback.description
    const title = metaTitle?.includes('IMI.GE') ? metaTitle : `${metaTitle || fallback.title} — IMI.GE`

    const ogImageUrl = seo?.ogImageUrl || DEFAULT_OG_IMAGE
    const desc = metaDescription || fallback.description

    const base: Metadata = {
        title,
        description: desc,
        keywords: DEFAULT_KEYWORDS,
        ...(seo?.noindex && { robots: { index: false, follow: false } }),
        alternates: {
            canonical: `${SITE_URL}/${publicLocale}${path}`,
            languages: { 'x-default': `${SITE_URL}/ka${path}`, ka: `${SITE_URL}/ka${path}`, en: `${SITE_URL}/en${path}` },
        },
        openGraph: {
            title,
            description: desc,
            url: `${SITE_URL}/${publicLocale}${path}`,
            siteName: SITE_NAME,
            locale: publicLocale === 'ka' ? 'ka_GE' : 'en_US',
            alternateLocale: publicLocale === 'ka' ? ['en_US'] : ['ka_GE'],
            type: 'website',
            images: [{ url: ogImageUrl, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [ogImageUrl],
        },
    }
    return base
}

/** Home page: routeSeo('home') or siteSettings.defaultSeo, fallback to static */
export async function getHomeMetadata(
    locale: Locale,
    fallback: { title: string; description: string }
): Promise<Metadata> {
    const publicLocale = locale === 'ka' ? 'ka' : 'en'
    const [routeSeoData, siteSettings] = await Promise.all([
        getRouteSeo('home', false),
        getSiteSettings(false),
    ])

    const seo = routeSeoData?.seo as SeoSource | undefined
    const defaultSeo = siteSettings?.defaultSeo as { title?: SeoSource['metaTitle']; description?: SeoSource['metaDescription']; ogImageUrl?: string } | undefined

    const metaTitle: string = seo?.metaTitle
        ? (getLocalizedValue(seo.metaTitle, locale) as string) ?? fallback.title
        : defaultSeo?.title
          ? (getLocalizedValue(defaultSeo.title as any, locale) as string) ?? fallback.title
          : fallback.title
    const metaDescription: string = seo?.metaDescription
        ? (getLocalizedValue(seo.metaDescription, locale) as string) ?? fallback.description
        : defaultSeo?.description
          ? (getLocalizedValue(defaultSeo.description as any, locale) as string) ?? fallback.description
          : fallback.description

    const title = typeof metaTitle === 'string' && metaTitle.includes('IMI.GE') ? metaTitle : `IMI.GE — ${metaTitle || fallback.title}`
    const ogImage = seo?.ogImageUrl || defaultSeo?.ogImageUrl

    const ogImg = ogImage || DEFAULT_OG_IMAGE
    const desc = metaDescription || fallback.description

    return {
        title,
        description: desc,
        keywords: DEFAULT_KEYWORDS,
        ...(seo?.noindex && { robots: { index: false, follow: false } }),
        alternates: {
            canonical: `${SITE_URL}/${publicLocale}`,
            languages: { 'x-default': `${SITE_URL}/ka`, ka: `${SITE_URL}/ka`, en: `${SITE_URL}/en` },
        },
        openGraph: {
            title,
            description: desc,
            url: `${SITE_URL}/${publicLocale}`,
            siteName: SITE_NAME,
            locale: publicLocale === 'ka' ? 'ka_GE' : 'en_US',
            alternateLocale: publicLocale === 'ka' ? ['en_US'] : ['ka_GE'],
            type: 'website',
            images: [{ url: ogImg, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description: desc,
            images: [ogImg],
        },
    }
}

/** Legal pages: legal.seo from getLegalPage, fallback to static */
export function buildLegalMetadata(
    legal: { title?: SeoSource['metaTitle']; seo?: { metaTitle?: SeoSource['metaTitle']; metaDescription?: SeoSource['metaDescription']; noindex?: boolean } } | null,
    locale: Locale,
    path: string,
    fallback: { title: string; description: string }
): Metadata {
    const metaTitle: string = legal?.seo?.metaTitle
        ? (getLocalizedValue(legal.seo.metaTitle, locale) as string) ?? fallback.title
        : legal?.title
          ? (getLocalizedValue(legal.title, locale) as string) ?? fallback.title
          : fallback.title
    const metaDescription: string = legal?.seo?.metaDescription
        ? (getLocalizedValue(legal.seo.metaDescription, locale) as string) ?? fallback.description
        : fallback.description
    const title = metaTitle.includes('IMI.GE') ? metaTitle : `${metaTitle} — IMI.GE`
    return buildMetadataFromSeo(
        legal?.seo ? { ...legal.seo, metaTitle: { [locale]: metaTitle }, metaDescription: { [locale]: metaDescription } } : { metaTitle: { [locale]: metaTitle }, metaDescription: { [locale]: metaDescription } },
        locale,
        path,
        { title, description: metaDescription }
    )
}

/** Static routes: routeSeo(route), fallback to static */
export async function getRouteMetadata(
    route: string,
    path: string,
    locale: Locale,
    fallback: { title: string; description: string }
): Promise<Metadata> {
    const data = await getRouteSeo(route, false)
    return buildMetadataFromSeo(data?.seo, locale, path, fallback)
}
