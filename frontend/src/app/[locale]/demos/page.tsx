import React from 'react';
import { Sparkles } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LazyDemosView from '@/components/LazyDemosView';
import { getRouteMetadata } from '@/lib/sanity/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return getRouteMetadata('demos', '/demos', locale as 'ka' | 'en', {
        title: 'Live Demos',
        description: 'Explore our interactive AI and web development demos.',
    });
}

const DemosPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params;
    setRequestLocale(locale);
    // const t = await getTranslations('demos'); // Namespace might be needed later

    return (
        <section className="pt-40 pb-24 bg-darker min-h-screen relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-gray-400 uppercase">Interactive Showroom</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-widest leading-tight">
                        Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Future Tech</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-sans font-light leading-relaxed tracking-wide">
                        Experience our AI technologies live. Chat with assistants, generate images, and test voice capabilities.
                    </p>
                </div>

                {/* Client Side Demos View */}
                <LazyDemosView />

            </div>
        </section>
    );
};

export default DemosPage;
