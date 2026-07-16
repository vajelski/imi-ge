import React from 'react';
import { Cookie, Shield, Info } from 'lucide-react';
import { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import { getLegalPage } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';
import { buildLegalMetadata } from '@/lib/sanity/metadata';

interface CookiesPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CookiesPageProps) {
    const { locale } = await params;
    const legal = await getLegalPage('cookies', false);
    return buildLegalMetadata(legal, locale as Locale, '/cookies', {
        title: 'Cookie Policy',
        description: 'Information about how IMI.GE uses cookies and similar technologies.',
    });
}

const ptComponents = {
    block: {
        normal: ({ children }: any) => <p className="leading-loose text-gray-600 dark:text-gray-300 tracking-wide font-light text-lg font-sans mb-6">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12 flex items-center gap-4">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 mt-8">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-sans list-disc list-inside leading-relaxed mb-6">{children}</ul>,
    },
};

const CookiesPage = async ({ params }: CookiesPageProps) => {
    const { locale } = await params;
    const legal = await getLegalPage('cookies', false);

    if (legal?.content) {
        const title = getLocalizedValue(legal.title, locale as Locale) || 'Cookie Policy';
        const content = getLocalizedValue(legal.content, locale as Locale);
        const lastUpdated = legal.lastUpdated
            ? new Date(legal.lastUpdated).toLocaleDateString(locale === 'ka' ? 'ka-GE' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              })
            : '';

        return (
            <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-8 border border-primary/20 shadow-lg shadow-primary/20">
                            <Cookie className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">
                            {title}
                        </h1>
                        {lastUpdated && <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide font-sans">Last Updated: {lastUpdated}</p>}
                    </div>
                    <div className="p-8 md:p-12 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        {content && Array.isArray(content) && content.length > 0 ? (
                            <PortableText value={content} components={ptComponents} />
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">Content coming soon.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-8 border border-primary/20 shadow-lg shadow-primary/20">
                        <Cookie className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">
                        Cookie Policy
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide font-sans">Last Updated: February 12, 2025</p>
                </div>

                <div className="space-y-8">
                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Info className="w-6 h-6 text-blue-500" />
                            </div>
                            1. What Are Cookies?
                        </h2>
                        <p className="leading-loose text-gray-600 dark:text-gray-300 tracking-wide font-light text-lg font-sans">
                            Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you signed in where applicable, and allow us to understand how the site is used (e.g. via analytics). We use only what is necessary for the site to work and to improve your experience.
                        </p>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Shield className="w-6 h-6 text-purple-500" />
                            </div>
                            2. How We Use Cookies
                        </h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-sans list-disc list-inside leading-relaxed">
                            <li><strong className="text-gray-900 dark:text-white">Essential:</strong> Required for the site to function (e.g. security, session).</li>
                            <li><strong className="text-gray-900 dark:text-white">Analytics:</strong> We may use tools like Google Analytics to understand traffic and usage (anonymised where possible).</li>
                            <li><strong className="text-gray-900 dark:text-white">Preferences:</strong> To remember your language and theme (light/dark) choices.</li>
                        </ul>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Cookie className="w-6 h-6 text-green-500" />
                            </div>
                            3. Managing Cookies
                        </h2>
                        <p className="leading-loose text-gray-600 dark:text-gray-300 tracking-wide font-light text-lg font-sans">
                            You can control cookies via your browser settings (e.g. block or delete cookies). Note that blocking essential cookies may affect how the site works. For analytics, you can use browser add-ons or opt-out tools provided by the relevant services. Our cookie banner (if shown) lets you accept or decline non-essential cookies.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiesPage;
