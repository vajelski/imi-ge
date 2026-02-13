'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from '@/i18n/routing';

function isChunkLoadError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const err = error as Error & { digest?: string };
    return (
        err.name === 'ChunkLoadError' ||
        (err.message?.includes?.('Failed to load chunk') ?? false) ||
        (err.digest?.includes?.('CHUNK') ?? false)
    );
}

export default function LocaleError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[locale] Application error:', error?.message, error?.stack, error?.digest);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darker px-4 pt-24">
            <div className="text-center max-w-2xl">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
                        <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                        რაღაც შეცდომა მოხდა
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-sans mb-2">
                        {isChunkLoadError(error)
                            ? 'განახლებული ვერსია ხელმისაწვდომია. გთხოვთ გადატვირთოთ გვერდი (Ctrl+Shift+R).'
                            : 'მოხდა მოულოდნელი შეცდომა. გთხოვთ სცადოთ თავიდან.'}
                    </p>
                    {error?.digest && (
                        <p className="text-sm text-gray-500 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => isChunkLoadError(error) ? window.location.reload() : reset()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-heading font-bold"
                    >
                        <RefreshCw className="w-5 h-5" />
                        ხელახლა ცდა
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors font-heading font-bold"
                    >
                        <Home className="w-5 h-5" />
                        მთავარი
                    </Link>
                </div>
            </div>
        </div>
    );
}
