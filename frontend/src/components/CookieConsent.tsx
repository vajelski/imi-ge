'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const CookieConsent: React.FC = () => {
    const t = useTranslations('cookieConsent');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('imi_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('imi_cookie_consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('imi_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-center pointer-events-none">
            <div className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl w-full flex flex-col md:flex-row items-center gap-6 pointer-events-auto animate-in slide-in-from-bottom-5 duration-500">
                <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                        <Cookie className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
                            {t('title')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                            {t('description')}{' '}
                            <Link href="/privacy" className="text-primary hover:text-indigo-600 font-bold underline decoration-primary/30 underline-offset-4 transition-colors">
                                {t('privacyLink')}
                            </Link>.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm"
                    >
                        {t('declineButton')}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors shadow-lg shadow-primary/20 text-sm"
                    >
                        {t('acceptButton')}
                    </button>
                </div>

                <button
                    onClick={handleDecline}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors md:hidden"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
