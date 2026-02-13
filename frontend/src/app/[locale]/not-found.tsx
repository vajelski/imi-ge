'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darker px-4">
            <div className="text-center max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-9xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-sans">
                        {t('description')}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-heading font-bold"
                    >
                        <Home className="w-5 h-5" />
                        {t('homeButton')}
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors font-heading font-bold"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        {t('backButton')}
                    </button>
                </div>
            </div>
        </div>
    );
}
