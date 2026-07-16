import '../../../index.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LazyCookieConsent from '@/components/LazyCookieConsent';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ScrollTracker from '@/components/ScrollTracker';
import StructuredData from '@/components/StructuredData';
import WebSiteStructuredData from '@/components/WebSiteStructuredData';
import { getSiteSettings } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';

/** Locale-specific default meta when Sanity defaultSeo is missing */
const DEFAULT_LAYOUT_META: Record<Locale, { title: string; description: string; keywords: string[] }> = {
    ka: {
        title: 'IMI.GE | AI და ტექნოლოგიური გადაწყვეტილებები საქართველოში',
        description: 'AI ინტეგრაცია, ვებ-დეველოპმენტი და ტექნოლოგიური კონსულტაცია საქართველოში. IMI.GE — მომავლის ტექნოლოგიები დღეს.',
        keywords: ['IMI.GE', 'AI საქართველო', 'ხელოვნური ინტელექტი', 'ვებ-დეველოპმენტი', 'SEO', 'ტექნოლოგიური კონსულტაცია'],
    },
    en: {
        title: `${SITE_NAME} | AI & Tech Solutions Georgia`,
        description: 'AI integration, web development and technology consulting in Georgia. IMI.GE — future technologies today.',
        keywords: ['IMI.GE', 'AI Georgia', 'artificial intelligence', 'web development', 'SEO', 'technology consulting'],
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const loc = locale as Locale;
    const siteSettings = await getSiteSettings(false).catch(() => null);
    const defaultSeo = siteSettings?.defaultSeo as { title?: { ka?: string; en?: string }; description?: { ka?: string; en?: string } } | undefined;
    const fallback = DEFAULT_LAYOUT_META[loc] ?? DEFAULT_LAYOUT_META.en;
    const title = defaultSeo?.title ? (getLocalizedValue(defaultSeo.title, loc) as string) ?? fallback.title : fallback.title;
    const description = defaultSeo?.description ? (getLocalizedValue(defaultSeo.description, loc) as string) ?? fallback.description : fallback.description;
    const base = `${SITE_URL}/${locale}`;
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: title,
            template: `%s | ${SITE_NAME}`,
        },
        description,
        applicationName: SITE_NAME,
        referrer: 'origin-when-cross-origin',
        keywords: fallback.keywords,
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        formatDetection: { email: false, telephone: false, address: false },
        openGraph: {
            type: 'website',
            siteName: SITE_NAME,
            locale: locale === 'ka' ? 'ka_GE' : 'en_US',
            url: base,
            title,
            description,
        },
        twitter: {
            card: 'summary_large_image',
            site: '@imige',
            title,
            description,
        },
        alternates: {
            canonical: base,
            languages: {
                'x-default': `${SITE_URL}/ka`,
                ka: `${SITE_URL}/ka`,
                en: `${SITE_URL}/en`,
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: { index: true, follow: true },
        },
        icons: { icon: '/favicon.svg' },
        manifest: '/manifest.json',
    };
}

export function generateViewport() {
    return {
        width: 'device-width',
        initialScale: 1,
        themeColor: [
            { media: '(prefers-color-scheme: light)', color: '#f7f9fc' },
            { media: '(prefers-color-scheme: dark)', color: '#07111f' },
        ],
    };
}

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;
    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering for this locale (required for ISR + next-intl)
    setRequestLocale(locale);

    const messages = await getMessages();
    const siteSettings = await getSiteSettings(false).catch(() => null);

    const loc = locale as Locale;

    const siteNameResolved = (getLocalizedValue(siteSettings?.branding?.siteName, loc) as string) || (loc === 'en' ? SITE_NAME : 'იმი.ჯი');
    const telephone = (siteSettings?.contacts?.primaryPhone ?? siteSettings?.contact?.phone) ?? null;
    const email = (siteSettings?.contacts?.primaryEmail ?? siteSettings?.contact?.email) ?? null;
    const sameAs = [
        siteSettings?.social?.facebook,
        siteSettings?.social?.linkedin,
        siteSettings?.social?.twitter,
        siteSettings?.social?.instagram
    ].filter(Boolean) as string[];
    const orgData = {
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        legalName: SITE_NAME,
        description: 'Georgian-first AI systems, implementation guidance, and technology consulting for business operations.',
        logo: `${SITE_URL}/favicon.svg`,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: telephone || '555904011',
            email: email || 'hello@imi.ge',
            contactType: 'customer service',
            availableLanguage: ['Georgian', 'English'],
        },
        areaServed: { '@type': 'Country', name: 'Georgia' },
        knowsAbout: ['AI systems', 'CRM integration', 'retrieval-augmented generation', 'voice AI', 'business process automation'],
        ...(sameAs.length > 0 ? { sameAs } : {})
    };

    const themeScript = `(function(){var t=localStorage.getItem('theme');var dark=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',dark);})();`;

    return (
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* DNS-prefetch for third-party origins (lightweight, no unused preconnect penalty) */}
                <link rel="dns-prefetch" href="https://cdn.sanity.io" />
                <link rel="dns-prefetch" href="https://apicdn.sanity.io" />
                <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" />
                <link rel="preload" href="/fonts/bpg-mrgvlovani-caps.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="min-h-screen bg-[var(--page)] text-[var(--text)] font-sans selection:bg-primary selection:text-white flex flex-col transition-colors duration-300" suppressHydrationWarning>
                <GoogleAnalytics />
                <ScrollTracker />
                <StructuredData type="Organization" data={orgData} />
                <WebSiteStructuredData locale={locale} />
                <NextIntlClientProvider locale={locale} messages={messages}>
                         <Navbar siteName={siteNameResolved} />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer
                        siteSettings={siteSettings}
                        siteName={siteNameResolved}
                    />
                    <LazyCookieConsent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
