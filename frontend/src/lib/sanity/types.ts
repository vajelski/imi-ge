// Type definitions for Sanity content
export type Locale = 'ka' | 'en'

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
        ogImage?: { asset: { url: string } }
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
    /** New shape: single source of truth (Sanity Settings) */
    contacts?: {
        primaryEmail?: string
        salesEmail?: string
        supportEmail?: string
        primaryPhone?: string
        secondaryPhone?: string
        address?: LocalizedString
        workingHours?: LocalizedString
        messengers?: { whatsappNumber?: string; telegramUsername?: string; messengerUrl?: string }
    }
    toggles?: {
        enableBlog?: boolean
        enablePortfolio?: boolean
        enableDemos?: boolean
        enablePricing?: boolean
        enableTestimonials?: boolean
        enableLogos?: boolean
        enableNewsletter?: boolean
        enableWhatsApp?: boolean
        enableTelegram?: boolean
        enableContactForm?: boolean
        enableLeadCapturePopup?: boolean
        enableCookieBanner?: boolean
        enableAnalytics?: boolean
    }
    pageToggles?: {
        homeEnabled?: boolean
        servicesEnabled?: boolean
        portfolioEnabled?: boolean
        blogEnabled?: boolean
        aboutEnabled?: boolean
        contactEnabled?: boolean
        termsEnabled?: boolean
        privacyEnabled?: boolean
        cookiesEnabled?: boolean
    }
    navigation?: {
        headerLinks?: Array<{ label?: LocalizedString; href?: string; enabled?: boolean }>
        footerColumns?: Array<{
            title?: LocalizedString
            links?: Array<{ label?: LocalizedString; href?: string; enabled?: boolean }>
        }>
        footerBottomLinks?: Array<{ label?: LocalizedString; href?: string; enabled?: boolean }>
    }
    branding?: {
        siteName?: LocalizedString
        logoUrl?: string
        faviconUrl?: string
        primaryCTA?: { label?: LocalizedString; href?: string; enabled?: boolean }
        secondaryCTA?: { label?: LocalizedString; href?: string; enabled?: boolean }
    }
    seoDefaults?: {
        metaTitle?: LocalizedString
        metaDescription?: LocalizedText
        ogImageUrl?: string
        twitterCard?: string
        robotsIndexDefault?: boolean
        robotsFollowDefault?: boolean
        canonicalBaseUrl?: string
    }
    integrations?: {
        ga4MeasurementId?: string
        gtmId?: string
        hotjarId?: string
    }
}

/** Resolved contact from new (contacts) or legacy (contact). Single source for layout/footer/contact page. */
export function getResolvedContact(
    settings: SiteSettings | null | undefined,
    locale: Locale
): { email: string | null; phone: string | null; address: string | null } {
    if (!settings) return { email: null, phone: null, address: null }
    const email = settings.contacts?.primaryEmail ?? settings.contact?.email ?? null
    const phone = settings.contacts?.primaryPhone ?? settings.contact?.phone ?? null
    const address = settings.contacts?.address
        ? (getLocalizedValue(settings.contacts.address, locale) as string) ?? null
        : settings.contact?.address
            ? (getLocalizedValue(settings.contact.address, locale) as string) ?? null
            : null
    return { email, phone, address }
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
    fallbackLocale?: Locale
): T | undefined {
    if (!obj) return undefined
    return obj[locale] || (fallbackLocale ? obj[fallbackLocale] : undefined)
}
