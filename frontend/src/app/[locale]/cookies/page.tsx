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
        normal: ({ children }: any) => <p className="leading-loose text-gray-300 tracking-wide font-light text-lg font-sans mb-6">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-white mb-6 mt-12 flex items-center gap-4">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-white mb-4 mt-8">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 text-gray-400 font-sans list-disc list-inside leading-relaxed mb-6">{children}</ul>,
    },
};

const CookiesPage = async ({ params }: CookiesPageProps) => {
    const { locale } = await params;
    const legal = await getLegalPage('cookies', false);

    if (legal?.content) {
        const title = getLocalizedValue(legal.title, locale as Locale) || 'Cookie Policy';
        const content = getLocalizedValue(legal.content, locale as Locale);
        const lastUpdated = legal.lastUpdated
            ? new Date(legal.lastUpdated).toLocaleDateString(locale === 'ka' ? 'ka-GE' : locale === 'ru' ? 'ru-RU' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
              })
            : '';

        return (
            <div className="pt-40 pb-24 min-h-screen bg-darker transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-8 border border-primary/20 shadow-lg shadow-primary/20">
                            <Cookie className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-wide uppercase">
                            {title}
                        </h1>
                        {lastUpdated && <p className="text-lg text-gray-400 tracking-wide font-sans">Last Updated: {lastUpdated}</p>}
                    </div>
                    <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/5 shadow-xl">
                        {content && Array.isArray(content) && content.length > 0 ? (
                            <PortableText value={content} components={ptComponents} />
                        ) : (
                            <p className="text-gray-400">Content coming soon.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 min-h-screen bg-darker">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-8 border border-primary/20 shadow-lg shadow-primary/20">
                        <Cookie className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-wide uppercase">
                        Cookie Policy
                    </h1>
                    <p className="text-lg text-gray-400 tracking-wide font-sans">Last Updated: February 12, 2024</p>
                </div>

                <div className="space-y-12">
                    <section className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Info className="w-6 h-6 text-blue-500" />
                            </div>
                            1. What are Cookies?
                        </h2>
                        <p className="leading-loose text-gray-300 tracking-wide font-light text-lg font-sans">
                            Cookies are small text files that are stored on your device when you visit a website. They help us provide a better
                            experience by remembering your preferences and analyzing site traffic.
                        </p>
                    </section>

                    <section className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Shield className="w-6 h-6 text-purple-500" />
                            </div>
                            2. How We Use Cookies
                        </h2>
                        <ul className="space-y-4 text-gray-400 font-sans list-disc list-inside leading-relaxed">
                            <li><strong>Essential Cookies:</strong> Necessary for the website to function correctly (e.g., authentication).</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with the site (via Google Analytics).</li>
                            <li><strong>Preference Cookies:</strong> Remember your language and theme settings.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiesPage;
