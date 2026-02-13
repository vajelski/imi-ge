import React from 'react';
import { Shield, Database, Eye, Lock, Globe } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getLegalPage } from '@/lib/sanity/queries';
import { getLocalizedValue, type Locale } from '@/lib/sanity/types';
import { buildLegalMetadata } from '@/lib/sanity/metadata';

interface PrivacyPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps) {
    const { locale } = await params;
    const legal = await getLegalPage('privacy', false);
    return buildLegalMetadata(legal, locale as Locale, '/privacy', {
        title: 'Privacy Policy',
        description: 'Learn how IMI.GE collects, uses, and protects your personal data.',
    });
}

const ptComponents = {
    block: {
        normal: ({ children }: any) => <p className="leading-loose text-gray-300 tracking-wide font-light text-lg font-sans mb-6">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-white mb-6 mt-12">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-white mb-4 mt-8">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 text-gray-400 font-light list-disc list-inside mb-6">{children}</ul>,
    },
};

const PrivacyPage = async ({ params }: PrivacyPageProps) => {
    const { locale } = await params;
    const legal = await getLegalPage('privacy', false);

    if (legal?.content) {
        const title = getLocalizedValue(legal.title, locale as Locale) || 'Privacy Policy';
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
                            <Shield className="w-10 h-10 text-primary" />
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
                    <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center animate-in zoom-in duration-500">
                        <h3 className="text-2xl font-heading font-bold text-white mb-4 uppercase tracking-widest">Questions?</h3>
                        <p className="text-gray-400 mb-6 font-sans">Contact us regarding data protection:</p>
                        <a href="mailto:hello@imi.ge" className="text-primary font-bold hover:text-secondary transition-colors text-xl font-heading">
                            hello@imi.ge
                        </a>
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
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 tracking-wide uppercase">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-400 tracking-wide font-sans">Last Updated: February 12, 2024</p>
                </div>

                <div className="glass-panel p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/5 shadow-xl mb-12">
                    <p className="leading-loose text-gray-300 tracking-wide font-light text-lg font-sans">
                        AI Solutions Georgia (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is committed to protecting your
                        personal data. This policy explains how we collect, use, and safeguard your information when you use our website (imi.ge) and
                        services.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Database className="w-6 h-6 text-blue-500" />
                            </div>
                            1. Information Collection
                        </h2>
                        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5 font-sans">
                            <p className="text-gray-300 mb-6 font-light leading-relaxed">
                                We collect the following types of information:
                            </p>
                            <ul className="space-y-4 text-gray-400 font-light list-disc list-inside">
                                <li><strong>Personal Identification:</strong> Name, email, phone number (voluntarily provided).</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, device type (via Google Analytics).</li>
                                <li><strong>Cookies:</strong> Information about your preferences to improve site performance.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Eye className="w-6 h-6 text-purple-500" />
                            </div>
                            2. How We Use Information
                        </h2>
                        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5 font-sans grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <h3 className="font-bold text-white mb-2">Service Provision</h3>
                                <p className="text-sm text-gray-400">Processing your requests and feedback.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <h3 className="font-bold text-white mb-2">Improvement</h3>
                                <p className="text-sm text-gray-400">Analyzing site functionality and UX.</p>
                            </div>
                        </div>
                    </section>

                    <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center animate-in zoom-in duration-500">
                        <h3 className="text-2xl font-heading font-bold text-white mb-4 uppercase tracking-widest">Questions?</h3>
                        <p className="text-gray-400 mb-6 font-sans">Contact us regarding data protection:</p>
                        <a href="mailto:hello@imi.ge" className="text-primary font-bold hover:text-secondary transition-colors text-xl font-heading">
                            hello@imi.ge
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
