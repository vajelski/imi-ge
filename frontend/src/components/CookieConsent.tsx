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
        <div className="cookie-consent" role="region" aria-label={t('title')}>
            <div className="cookie-consent__panel">
                <div className="cookie-consent__content">
                    <div className="cookie-consent__icon">
                        <Cookie size={25} aria-hidden="true" />
                    </div>
                    <div>
                        <h3 className="cookie-consent__title">
                            {t('title')}
                        </h3>
                        <p className="cookie-consent__description">
                            {t('description')}{' '}
                            <Link href="/privacy" className="cookie-consent__link">
                                {t('privacyLink')}
                            </Link>.
                        </p>
                    </div>
                </div>

                <div className="cookie-consent__actions">
                    <button
                        type="button"
                        onClick={handleDecline}
                        className="cookie-consent__button cookie-consent__button--secondary"
                    >
                        {t('declineButton')}
                    </button>
                    <button
                        type="button"
                        onClick={handleAccept}
                        className="cookie-consent__button cookie-consent__button--primary"
                    >
                        {t('acceptButton')}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleDecline}
                    className="cookie-consent__close"
                    aria-label="Close"
                >
                    <X size={18} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
