import React from 'react';
import { Shield, Database, Eye, Lock, Globe } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { getLegalPage, getSiteSettings } from '@/lib/sanity/queries';
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
        normal: ({ children }: any) => <p className="leading-loose text-gray-600 dark:text-gray-300 tracking-wide font-light text-lg font-sans mb-6">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 mt-8">{children}</h3>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-light list-disc list-inside mb-6">{children}</ul>,
    },
};

const PrivacyPage = async ({ params }: PrivacyPageProps) => {
    const { locale } = await params;
    const [legal, siteSettings] = await Promise.all([getLegalPage('privacy', false), getSiteSettings(false).catch(() => null)]);
    const contactEmail = siteSettings?.contacts?.primaryEmail ?? siteSettings?.contact?.email ?? 'hello@imi.ge';

    if (legal?.content) {
        const title = getLocalizedValue(legal.title, locale as Locale) || 'Privacy Policy';
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
                            <Shield className="w-10 h-10 text-primary" />
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
                    <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center animate-in zoom-in duration-500">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-widest">Questions?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 font-sans">Contact us regarding data protection:</p>
                        <a href={`mailto:${contactEmail}`} className="text-primary font-bold hover:text-secondary transition-colors text-xl font-heading">
                            {contactEmail}
                        </a>
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
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide font-sans">Last Updated: February 12, 2025</p>
                </div>

                <div className="p-8 md:p-12 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl mb-12">
                    <p className="leading-loose text-gray-600 dark:text-gray-300 tracking-wide font-light text-lg font-sans">
                        IMI.GE (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our website (imi.ge) and services.
                    </p>
                </div>

                <div className="space-y-12">
                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Database className="w-6 h-6 text-blue-500" />
                            </div>
                            1. Information We Collect
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed font-sans">
                            We may collect: (a) Personal data you provide (name, email, phone, company) when you contact us or use forms; (b) Technical data (IP address, browser type, device) via analytics; (c) Cookie data as described in our Cookie Policy. We do not sell your data to third parties.
                        </p>
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400 font-light list-disc list-inside font-sans">
                            <li><strong className="text-gray-900 dark:text-white">Personal:</strong> Name, email, phone (only when you provide them).</li>
                            <li><strong className="text-gray-900 dark:text-white">Technical:</strong> IP, browser, device (e.g. Google Analytics).</li>
                            <li><strong className="text-gray-900 dark:text-white">Cookies:</strong> Preferences and usage to improve the site.</li>
                        </ul>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Eye className="w-6 h-6 text-purple-500" />
                            </div>
                            2. How We Use Your Information
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-light leading-relaxed font-sans">
                            We use your data to: respond to your requests and provide services; improve our website and user experience; send relevant communications if you have agreed; comply with legal obligations; and protect our rights and security. We do not use your data for automated decision-making that significantly affects you.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-sans">Service provision</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">Processing enquiries and feedback.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 font-sans">Improvement</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">Analytics and UX improvements.</p>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Lock className="w-6 h-6 text-green-500" />
                            </div>
                            3. Data Security and Retention
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed font-sans">
                            We apply appropriate technical and organisational measures to protect your data. We retain personal data only as long as necessary for the purposes above or as required by law. You may request access, correction, or deletion of your data by contacting us at the email below.
                        </p>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Globe className="w-6 h-6 text-primary" />
                            </div>
                            4. Your Rights
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 font-light leading-relaxed font-sans">
                            Depending on applicable law, you may have the right to: access your data; correct inaccuracies; request deletion; restrict or object to processing; data portability; and withdraw consent. To exercise these rights or ask questions about this policy, contact us at:
                        </p>
                        <a href={`mailto:${contactEmail}`} className="text-primary font-bold hover:text-secondary transition-colors text-lg font-heading inline-block mt-2">
                            {contactEmail}
                        </a>
                    </section>

                    <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center animate-in zoom-in duration-500">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-widest">Questions?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 font-sans">Contact us regarding data protection:</p>
                        <a href={`mailto:${contactEmail}`} className="text-primary font-bold hover:text-secondary transition-colors text-xl font-heading">
                            {contactEmail}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
