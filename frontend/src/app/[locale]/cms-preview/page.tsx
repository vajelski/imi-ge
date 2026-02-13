import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings, getNavigation, getPageBySlug, getRouteSeo } from '@/lib/sanity/queries';
import { ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'CMS Preview',
  robots: { index: false, follow: false },
};

export default async function CmsPreviewPage() {
    const fetchTime = new Date().toISOString()
    const [siteSettings, navigation, aboutPage, homeSeo] = await Promise.all([
        getSiteSettings(false),
        getNavigation(false),
        getPageBySlug('about', false),
        getRouteSeo('home', false),
    ])

    return (
        <div className="min-h-screen bg-darker text-white pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <h1 className="text-3xl font-heading font-bold">CMS მონაცემები (რეალურად რას იღებს საიტი)</h1>
                    <div className="flex gap-4">
                        <a
                            href="https://imi-ge.sanity.studio/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            რედაქტირება CMS-ში
                        </a>
                    </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-gray-400 text-sm">
                        ბოლო ჩატვირთვა: <strong className="text-white">{fetchTime}</strong> (ყოველი განახლებისას ახალი მონაცემი)
                    </p>
                </div>

                <section className="space-y-2">
                    <h2 className="text-xl font-heading font-bold text-primary">Site Settings</h2>
                    <pre className="p-4 bg-black/30 rounded-xl overflow-auto text-sm font-mono text-gray-300">
                        {JSON.stringify(siteSettings, null, 2)}
                    </pre>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-heading font-bold text-primary">Navigation</h2>
                    <pre className="p-4 bg-black/30 rounded-xl overflow-auto text-sm font-mono text-gray-300">
                        {JSON.stringify(navigation, null, 2)}
                    </pre>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-heading font-bold text-primary">About Page (slug: about)</h2>
                    <pre className="p-4 bg-black/30 rounded-xl overflow-auto text-sm font-mono text-gray-300">
                        {JSON.stringify(aboutPage, null, 2)}
                    </pre>
                </section>

                <section className="space-y-2">
                    <h2 className="text-xl font-heading font-bold text-primary">Home SEO (routeSeo)</h2>
                    <pre className="p-4 bg-black/30 rounded-xl overflow-auto text-sm font-mono text-gray-300">
                        {JSON.stringify(homeSeo, null, 2)}
                    </pre>
                </section>
            </div>
        </div>
    )
}
