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
import { getTranslations } from 'next-intl/server';
import { getNavigation, getSiteSettings } from '@/lib/sanity/queries';
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
    ru: {
        title: 'IMI.GE | AI и технологические решения в Грузии',
        description: 'Интеграция AI, веб-разработка и технологический консалтинг в Грузии. IMI.GE — технологии будущего сегодня.',
        keywords: ['IMI.GE', 'AI Грузия', 'искусственный интеллект', 'веб-разработка', 'SEO', 'технологический консалтинг'],
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const loc = locale as Locale;
    const siteSettings = await getSiteSettings(false).catch(() => null);
    const defaultSeo = siteSettings?.defaultSeo as { title?: { ka?: string; en?: string; ru?: string }; description?: { ka?: string; en?: string; ru?: string } } | undefined;
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
            locale: locale === 'ka' ? 'ka_GE' : locale === 'ru' ? 'ru_GE' : 'en_US',
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
            languages: { 'x-default': `${SITE_URL}/en`, ka: `${SITE_URL}/ka`, en: `${SITE_URL}/en`, ru: `${SITE_URL}/ru` },
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

    const loc = locale as Locale;
    const contact = siteSettings?.contacts ?? siteSettings?.contact;
    const contactEmail = siteSettings?.contacts?.primaryEmail ?? siteSettings?.contact?.email ?? null;
    const contactPhone = siteSettings?.contacts?.primaryPhone ?? siteSettings?.contact?.phone ?? null;

    // Nav: prefer siteSettings.navigation.headerLinks (CMS) when present, else legacy navigation
    const headerLinks = siteSettings?.navigation?.headerLinks?.filter((x) => x.enabled !== false);
    const navItems = headerLinks?.length
        ? headerLinks.map((item, i) => ({
              label: item.label ?? { ka: item.href || 'Link', en: item.href || 'Link', ru: item.href || 'Link' },
              href: item.href || '#',
              order: i,
          }))
        : (navigation?.items ?? null);

    // Footer columns: from CMS when present, else from messages; inject contact into mailto/tel column
    const tFooter = await getTranslations({ locale, namespace: 'footer' });
    const fallbackColumns = (tFooter.raw('columns') as { title: string; links: { label: string; url: string }[] }[]) ?? [];
    const cmsColumns = siteSettings?.navigation?.footerColumns?.filter(Boolean);
    const footerColumnsResolved: { title: string; links: { url: string; label: string }[] }[] =
        cmsColumns?.length
            ? cmsColumns.map((col) => {
                  const title = (getLocalizedValue(col.title, loc) as string) ?? '';
                  const links = (col.links ?? [])
                      .filter((l) => l.enabled !== false)
                      .map((l) => {
                          const label = (getLocalizedValue(l.label, loc) as string) ?? '';
                          const href = l.href ?? '#';
                          if (href.startsWith('mailto:') && contactEmail) return { url: `mailto:${contactEmail}`, label: contactEmail };
                          if (href.startsWith('tel:') && contactPhone) return { url: `tel:${contactPhone}`, label: contactPhone };
                          return { url: href, label };
                      });
                  return { title, links };
              })
            : fallbackColumns.map((col) => {
                  const isContactColumn = (col.links || []).some(
                      (l: { url?: string }) => (l?.url || '').startsWith('mailto:') || (l?.url || '').startsWith('tel:')
                  );
                  const links =
                      isContactColumn && (contactEmail || contactPhone)
                          ? [
                              ...(contactEmail ? [{ url: `mailto:${contactEmail}`, label: contactEmail }] : []),
                              ...(contactPhone ? [{ url: `tel:${contactPhone}`, label: contactPhone }] : []),
                          ]
                          : (col.links || []).map((l: { url?: string; label?: string }) => ({ url: l?.url || '#', label: l?.label ?? '' }));
                  return { title: col.title ?? '', links };
              });

    const footerBottomLinksResolved = (siteSettings?.navigation?.footerBottomLinks ?? [])
        .filter((l) => l.enabled !== false)
        .map((l) => ({ label: (getLocalizedValue(l.label, loc) as string) ?? '', href: l.href ?? '#' }));

    const siteNameResolved = (getLocalizedValue(siteSettings?.branding?.siteName, loc) as string) || 'იმი.ჯი';
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
        logo: `${SITE_URL}/favicon.svg`,
        ...(telephone || email ? {
            contactPoint: {
                '@type': 'ContactPoint',
                ...(telephone && { telephone }),
                ...(email && { email }),
                contactType: 'customer service',
                availableLanguage: ['Georgian', 'English', 'Russian']
            }
        } : {}),
        sameAs: sameAs.length > 0 ? sameAs : ['https://facebook.com/imi.ge', 'https://linkedin.com/company/imi-ge']
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
                <GoogleAnalytics />
                <ScrollTracker />
                <StructuredData type="Organization" data={orgData} />
                <WebSiteStructuredData locale={locale} />
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Navbar navItems={navItems} siteName={siteNameResolved} />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer
                        siteSettings={siteSettings}
                        footerColumns={footerColumnsResolved}
                        footerBottomLinks={footerBottomLinksResolved.length ? footerBottomLinksResolved : undefined}
                        siteName={siteNameResolved}
                    />
                    <LazyCookieConsent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
