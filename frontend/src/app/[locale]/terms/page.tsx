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
        normal: ({ children }: any) => <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6 font-sans">{children}</p>,
        h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 mt-12">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 mt-8">{children}</h3>,
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
            <div className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-8 border border-secondary/20 shadow-lg shadow-secondary/20">
                            <FileText className="w-10 h-10 text-secondary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">
                            {title}
                        </h1>
                        {lastUpdated && <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide font-sans">Effective Date: {lastUpdated}</p>}
                    </div>
                    <div className="p-8 md:p-12 rounded-[2.5rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
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
                <div className="text-center mb-20">
                    <div className="inline-flex items-center justify-center p-4 bg-secondary/10 rounded-2xl mb-8 border border-secondary/20 shadow-lg shadow-secondary/20">
                        <FileText className="w-10 h-10 text-secondary" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">
                        Terms of Service
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 tracking-wide font-sans">Effective Date: February 12, 2025</p>
                </div>

                <div className="space-y-8 font-sans">
                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">1. Acceptance of Terms</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6">
                            By accessing or using imi.ge (the &quot;Site&quot;) and our services, you agree to be bound by these Terms of Service. If you do not agree, do not use the Site or our services. We may update these terms from time to time; continued use after changes constitutes acceptance.
                        </p>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">2. Use of Services</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6">
                            Our services (including AI tools, consulting, and website development) are provided for lawful and professional use. You agree not to: use the services for illegal purposes; infringe intellectual property; send spam or malicious content; attempt to gain unauthorised access; or overload our systems. We may apply rate limits and suspend access for abuse.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300 font-sans">Fair use: services for intended business purposes.</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300 font-sans">Rate limiting may apply to protect the service.</span>
                            </div>
                        </div>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">3. Intellectual Property</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6">
                            The Site and our materials (design, code, content, branding) are owned by IMI.GE or our licensors. You may not copy, modify, or distribute them without our written permission. Content you provide to us (e.g. in contact forms) may be used to deliver services and as set out in our Privacy Policy.
                        </p>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">4. Limitation of Liability</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            To the fullest extent permitted by law, IMI.GE is not liable for any indirect, incidental, special, or consequential damages arising from your use (or inability to use) the Site or services. Our total liability shall not exceed the amount you paid us in the twelve months before the claim. Some jurisdictions do not allow these limitations; where they apply, our liability is limited to the maximum permitted.
                        </p>
                    </section>

                    <section className="p-8 md:p-10 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">5. Governing Law and Contact</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            These terms are governed by the laws of Georgia. Disputes shall be resolved in the courts of Georgia. For questions about these terms, contact us via the contact details on the Site.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
