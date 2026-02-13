import React from 'react';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getLegalPage } from '@/lib/sanity/queries';
import { buildLegalMetadata } from '@/lib/sanity/metadata';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';

interface TermsPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps) {
    const { locale } = await params;
    const legal = await getLegalPage('terms', false);
    return buildLegalMetadata(legal, locale as Locale, '/terms', {
        title: 'Terms of Service',
        description: 'Terms and conditions for using IMI.GE services and website.',
    });
}

const ptComponents = {
    block: {
        normal: ({ children }: any) => <p className="text-gray-300 leading-relaxed font-light mb-6 font-sans">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-white mb-6 mt-12">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-white mb-4 mt-8">{children}</h3>,
    },
};

const TermsPage = async ({ params }: TermsPageProps) => {
    const { locale } = await params;
    const legal = await getLegalPage('terms', false);

    if (legal?.content) {
        const title = getLocalizedValue(legal.title, locale as Locale) || 'Terms of Service';
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
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-8 border border-secondary/20 shadow-lg shadow-secondary/20">
                            <FileText className="w-10 h-10 text-secondary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-wide uppercase">
                            {title}
                        </h1>
                        {lastUpdated && <p className="text-lg text-gray-400 tracking-wide font-sans">Effective Date: {lastUpdated}</p>}
                    </div>
                    <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-xl">
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
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-8 border border-secondary/20 shadow-lg shadow-secondary/20">
                        <FileText className="w-10 h-10 text-secondary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-wide uppercase">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-400 tracking-wide font-sans">Effective Date: January 1, 2024</p>
                </div>

                <div className="space-y-12 font-sans">
                    <section className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6">1. Acceptance of Terms</h2>
                        <p className="text-gray-300 leading-relaxed font-light mb-6">
                            By accessing or using imi.ge, you agree to be bound by these Terms of Service. If you do not agree, please do not use our
                            services.
                        </p>
                    </section>

                    <section className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6">2. Use of Services</h2>
                        <p className="text-gray-300 leading-relaxed font-light mb-6">
                            Our AI tools and services are provided for professional use. You agree not to misuse the services for illegal activities,
                            spam, or intellectual property infringement.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-gray-300">Fair Use Policy</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                <span className="text-sm text-gray-300">Rate Limiting</span>
                            </div>
                        </div>
                    </section>

                    <section className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-white mb-6">3. Liability</h2>
                        <p className="text-gray-300 leading-relaxed font-light">
                            AI Solutions Georgia is not liable for any indirect, incidental, or consequential damages arising from the use or inability
                            to use our tools.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
