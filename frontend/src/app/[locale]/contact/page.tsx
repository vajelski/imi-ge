import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, MessageCircle, Cpu } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import TrackedOutboundLink from '@/components/TrackedOutboundLink';
import { getRouteMetadata } from '@/lib/sanity/metadata';
import { getSiteSettings } from '@/lib/sanity/queries';
import { getLocalizedValue } from '@/lib/sanity/types';

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
    const siteSettings = await getSiteSettings(false).catch(() => null);
    const contactEmail = siteSettings?.contacts?.primaryEmail ?? siteSettings?.contact?.email ?? t('email');
    const contactPhone = siteSettings?.contacts?.primaryPhone ?? siteSettings?.contact?.phone ?? t('phone');
    const contactAddress = siteSettings?.contacts?.address
        ? (getLocalizedValue(siteSettings.contacts.address, locale as 'ka' | 'en' | 'ru') as string)
        : siteSettings?.contact?.address
            ? (getLocalizedValue(siteSettings.contact.address, locale as 'ka' | 'en' | 'ru') as string)
            : t('address');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300 pt-40 pb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10 pointer-events-none" aria-hidden />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

                    {/* Left: Info */}
                    <div className="lg:w-5/12 w-full animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="lg:sticky lg:top-40">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 mb-8">
                                <MessageCircle className="w-4 h-4 text-primary" />
                                <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest">{t('badge')}</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                                {t('titlePrefix')}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>{' '}
                                {t('titleSuffix')}
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-sans font-light mb-10 leading-relaxed max-w-lg">
                                {t('description')}
                            </p>

                            <div className="space-y-4">
                                {contactEmail && (
                                    <TrackedOutboundLink href={`mailto:${contactEmail}`} eventName="click_email" className="group flex items-center gap-5 p-5 sm:p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/40 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">{t('emailLabel')}</span>
                                            <span className="text-base sm:text-lg font-sans font-medium text-gray-900 dark:text-white truncate block">{contactEmail}</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                                    </TrackedOutboundLink>
                                )}

                                {contactPhone && (
                                    <TrackedOutboundLink href={`tel:${contactPhone}`} eventName="click_phone" className="group flex items-center gap-5 p-5 sm:p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-secondary/40 hover:shadow-lg dark:hover:shadow-secondary/5 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary group-hover:scale-105 transition-transform shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">{locale === 'ka' ? 'ტელეფონი' : locale === 'ru' ? 'Телефон' : 'Phone'}</span>
                                            <span className="text-base sm:text-lg font-sans font-medium text-gray-900 dark:text-white">{contactPhone}</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0" />
                                    </TrackedOutboundLink>
                                )}

                                {contactAddress && (
                                    <div className="flex items-center gap-5 p-5 sm:p-6 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">{locale === 'ka' ? 'ლოკაცია' : locale === 'ru' ? 'Локация' : 'Location'}</span>
                                            <span className="text-base sm:text-lg font-sans font-medium text-gray-900 dark:text-white">{contactAddress}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 font-sans flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-primary" />
                                {locale === 'ka' ? 'უფასო კონსულტაცია — პასუხს გიცემთ 24 საათის განმავლობაში.' : locale === 'ru' ? 'Бесплатная консультация — ответим в течение 24 часов.' : 'Free consultation — we reply within 24 hours.'}
                            </p>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-7/12 w-full animate-in fade-in slide-in-from-right-8 duration-1000 delay-150">
                        <ContactForm />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
