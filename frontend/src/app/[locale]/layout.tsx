import '../../../index.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LazyCookieConsent from '@/components/LazyCookieConsent';
import StructuredData from '@/components/StructuredData';
import WebSiteStructuredData from '@/components/WebSiteStructuredData';
import { getNavigation, getSiteSettings } from '@/lib/sanity/queries';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const base = `${SITE_URL}/${locale}`;
    return {
        metadataBase: new URL(SITE_URL),
        title: {
            default: `${SITE_NAME} | AI & Tech Solutions Georgia`,
            template: `%s | ${SITE_NAME}`,
        },
        description: 'AI ინტეგრაცია, ვებ-დეველოპმენტი და ტექნოლოგიური კონსულტაცია საქართველოში. IMI.GE — მომავლის ტექნოლოგიები დღეს.',
        applicationName: SITE_NAME,
        referrer: 'origin-when-cross-origin',
        keywords: ['IMI.GE', 'AI საქართველო', 'ხელოვნური ინტელექტი', 'ვებ-დეველოპმენტი', 'SEO', 'ტექნოლოგიური კონსულტაცია'],
        authors: [{ name: SITE_NAME, url: SITE_URL }],
        creator: SITE_NAME,
        publisher: SITE_NAME,
        formatDetection: { email: false, telephone: false, address: false },
        openGraph: {
            type: 'website',
            siteName: SITE_NAME,
            locale: locale === 'ka' ? 'ka_GE' : locale === 'ru' ? 'ru_GE' : 'en_US',
            url: base,
        },
        twitter: {
            card: 'summary_large_image',
            site: '@imige',
        },
        alternates: {
            canonical: base,
            languages: { ka: `${SITE_URL}/ka`, en: `${SITE_URL}/en`, ru: `${SITE_URL}/ru` },
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
            { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
            { media: '(prefers-color-scheme: dark)', color: '#050505' },
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
    const [navigation, siteSettings] = await Promise.all([
        getNavigation(false).catch(() => null),
        getSiteSettings(false).catch(() => null),
    ]);

    const orgData = {
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+995-555-000-000',
            contactType: 'customer service',
            availableLanguage: ['Georgian', 'English', 'Russian']
        },
        sameAs: [
            'https://facebook.com/imi.ge',
            'https://linkedin.com/company/imi-ge'
        ]
    };

    const themeScript = `(function(){
var t=localStorage.getItem('theme');
var d=document.documentElement;
if(t==='light'){d.classList.remove('dark');}else if(t==='dark'){d.classList.add('dark');}
else{var h=parseInt(new Date().toLocaleString('en-US',{timeZone:'Asia/Tbilisi',hour:'numeric',hour12:false}));d.classList.toggle('dark',h<8||h>=20);}
})();`;

    return (
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
            <head>
                {/* DNS-prefetch for third-party origins (lightweight, no unused preconnect penalty) */}
                <link rel="dns-prefetch" href="https://cdn.sanity.io" />
                <link rel="dns-prefetch" href="https://apicdn.sanity.io" />
                <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
                {/* Preload critical fonts (loaded with font-display: optional for zero CLS) */}
                <link rel="preload" href="/fonts/bpg-mrgvlovani.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/bpg-mrgvlovani-caps.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="min-h-screen bg-gray-50 dark:bg-darker text-gray-900 dark:text-white font-sans selection:bg-primary selection:text-white flex flex-col transition-colors duration-300" suppressHydrationWarning>
                <StructuredData type="Organization" data={orgData} />
                <WebSiteStructuredData locale={locale} />
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Navbar navItems={navigation?.items} />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer siteSettings={siteSettings} />
                    <LazyCookieConsent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
