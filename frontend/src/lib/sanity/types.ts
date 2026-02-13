// Type definitions for Sanity content
export type Locale = 'ka' | 'en' | 'ru'

export interface LocalizedString {
    ka?: string
    en?: string
    ru?: string
}

export interface LocalizedText {
    ka?: string
    en?: string
    ru?: string
}

export interface LocalizedBlock {
    ka?: any[]
    en?: any[]
    ru?: any[]
}

export interface SeoSettings {
    metaTitle?: LocalizedString
    metaDescription?: LocalizedText
    ogImage?: {
        asset: {
            url: string
        }
    }
    noindex?: boolean
}

export interface HeroSection {
    _type: 'hero'
    badge?: LocalizedString
    title?: LocalizedText
    description?: LocalizedText
}

export interface TextBlock {
    _type: 'textBlock'
    title?: LocalizedString
    content?: LocalizedBlock
}

export interface ImageBlock {
    _type: 'imageBlock'
    image?: {
        asset: {
            url: string
        }
    }
    alt?: LocalizedString
}

export interface ValueItem {
    icon?: string
    title?: LocalizedString
    description?: LocalizedText
}

export interface ValuesGrid {
    _type: 'valuesGrid'
    items?: ValueItem[]
}

export type PageSection = HeroSection | TextBlock | ImageBlock | ValuesGrid

export interface Page {
    _id: string
    slug: {
        current: string
    }
    title: LocalizedString
    seo?: SeoSettings
    sections?: PageSection[]
}

export interface SiteSettings {
    siteName?: LocalizedString
    defaultSeo?: {
        title?: LocalizedString
        description?: LocalizedText
        ogImage?: {
            asset: {
                url: string
            }
        }
    }
    social?: {
        facebook?: string
        linkedin?: string
        twitter?: string
        instagram?: string
    }
    contact?: {
        email?: string
        phone?: string
        address?: LocalizedText
    }
}

export interface NavigationItem {
    label: LocalizedString
    href: string
    order: number
}

export interface Navigation {
    items: NavigationItem[]
}

export interface LegalPage {
    slug: {
        current: string
    }
    title: LocalizedString
    content: LocalizedBlock
    lastUpdated?: string
    seo?: {
        metaTitle?: LocalizedString
        metaDescription?: LocalizedText
        noindex?: boolean
    }
}

export interface BlogPost {
    _id: string
    slug: {
        current: string
    }
    title: LocalizedString
    excerpt: LocalizedText
    body?: LocalizedBlock
    publishedAt?: string
    imageUrl?: string
    category?: LocalizedString
    author?: LocalizedString
    seo?: SeoSettings
}

// Helper to get localized value with fallback
export function getLocalizedValue<T>(
    obj: { ka?: T; en?: T; ru?: T } | undefined,
    locale: Locale,
    fallbackLocale: Locale = 'ka'
): T | undefined {
    if (!obj) return undefined
    return obj[locale] || obj[fallbackLocale] || obj.en || obj.ka
}
