import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import { getRouteMetadata } from '@/lib/sanity/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'contact' });
    return getRouteMetadata('contact', '/contact', locale as 'ka' | 'en' | 'ru', {
        title: t('badge'),
        description: t('description'),
    });
}

const ContactPage = async (props: { params: Promise<{ locale: string }> }) => {
    const params = await props.params;
    const { locale } = params;
    setRequestLocale(locale);
    const t = await getTranslations('contact');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300 pt-40 pb-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left Side: Info */}
                    <div className="lg:w-5/12 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="lg:sticky lg:top-40">
                            <h1 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
                                {t('titlePrefix')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span> <br />
                                {t('titleSuffix')}
                            </h1>

                            <p className="text-xl text-gray-700 dark:text-gray-300 font-sans font-light mb-12 leading-relaxed">
                                {t('description')}
                            </p>

                            <div className="space-y-8">
                                <a href={`mailto:${t('email')}`} className="group flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 shadow-sm dark:shadow-none hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{t('emailLabel')}</span>
                                        <span className="text-lg font-sans font-medium text-gray-900 dark:text-white">{t('email')}</span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary transition-colors group-hover:translate-x-1" />
                                </a>

                                <a href={`tel:${t('phone')}`} className="group flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-secondary/50 transition-all duration-300 shadow-sm dark:shadow-none hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{locale === 'ka' ? 'ტელეფონი' : locale === 'ru' ? 'Телефон' : 'Phone'}</span>
                                        <span className="text-lg font-sans font-medium text-gray-900 dark:text-white">{t('phone')}</span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-secondary transition-colors group-hover:translate-x-1" />
                                </a>

                                <div className="group flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-accent/50 transition-all duration-300 shadow-sm dark:shadow-none">
                                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{locale === 'ka' ? 'ლოკაცია' : locale === 'ru' ? 'Локация' : 'Location'}</span>
                                        <span className="text-lg font-sans font-medium text-gray-900 dark:text-white">{t('address')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Modern Form */}
                    <div className="lg:w-7/12">
                        <ContactForm />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
