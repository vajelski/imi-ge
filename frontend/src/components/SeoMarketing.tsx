import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Settings, FileText, Globe, MapPin, ArrowRight, CheckCircle2, TrendingUp, BarChart3, Search } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SEO from './SEO';

const iconMap = {
    Settings: Settings,
    FileText: FileText,
    Globe: Globe,
    MapPin: MapPin,
};

const SeoMarketing: React.FC = () => {
    const { content } = useContent();

    if (!content) return null;

    // Create a default structure if seoPage is missing in context yet (for safety)
    const seoData = (content as any).seoPage || {
        hero: { badge: "Loading...", title: "Loading...", description: "", cta: "" },
        features: [],
        process: [],
        results: { title: "", items: [] },
        faq: []
    };

    return (
        <div className="min-h-screen bg-darker pt-24 pb-24">
            <SEO title="SEO & Marketing — IMI.GE" description="Data-driven SEO strategies and marketing solutions to grow your business." />
            {/* Hero Section */}
            <section className="relative overflow-hidden mb-32">
                <div className="absolute inset-0 bg-primary/5 rounded-[3rem] transform -rotate-3 scale-110 blur-3xl opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in-up">
                        <Search className="w-4 h-4 text-primary" />
                        <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">
                            {seoData.hero.badge}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 tracking-wide leading-tight animate-fade-in-up delay-100">
                        {seoData.hero.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed mb-12 animate-fade-in-up delay-200">
                        {seoData.hero.description}
                    </p>
                    <div className="flex justify-center gap-6 animate-fade-in-up delay-300">
                        <Link
                            href="/ai-readiness"
                            className="px-8 py-4 bg-primary hover:bg-indigo-600 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                        >
                            {seoData.hero.cta} <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {seoData.features.map((feature: any, index: number) => {
                        const Icon = iconMap[feature.icon as keyof typeof iconMap] || Settings;
                        return (
                            <div key={index} className="glass-panel p-10 rounded-[2.5rem] hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-primary/20">
                                <div className="w-14 h-14 bg-darker rounded-2xl flex items-center justify-center mb-8 text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 font-sans leading-relaxed text-lg">
                                    {feature.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Process Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent transform -translate-x-1/2 hidden md:block"></div>
                <div className="space-y-12 md:space-y-24">
                    {seoData.process.map((step: any, index: number) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                            <div className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-12">
                                <div className={`relative px-8 py-4 rounded-2xl bg-darker border border-primary/20 text-4xl font-heading font-bold text-primary shadow-xl shadow-primary/10 ${index % 2 !== 0 ? 'md:ml-auto md:mr-0' : 'md:ml-0'}`}>
                                    {step.step}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 md:pl-12 text-center md:text-left">
                                <h3 className="text-2xl font-heading font-bold text-white mb-4">{step.title}</h3>
                                <p className="text-gray-400 font-sans leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Results Section */}
            <section className="bg-gradient-to-br from-darker to-primary/10 py-24 rounded-[3rem] max-w-7xl mx-auto mb-32 border border-white/5 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
                <div className="px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-16">{seoData.results.title}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {seoData.results.items.map((item: string, index: number) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 text-green-400">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <span className="text-lg font-heading font-bold text-white max-w-[200px]">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <h2 className="text-3xl font-heading font-bold text-white mb-12 text-center">ხშირად დასმული კითხვები</h2>
                <div className="space-y-6">
                    {seoData.faq.map((item: any, index: number) => (
                        <div key={index} className="glass-panel p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-colors">
                            <div className="flex items-start gap-6">
                                <span className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 font-heading font-bold text-gray-400 text-xs uppercase">
                                    {item.bg || "FAQ"}
                                </span>
                                <div>
                                    <h3 className="text-xl font-heading font-bold text-white mb-3">{item.q}</h3>
                                    <p className="text-gray-400 font-sans leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20">
                <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary">
                    <div className="bg-darker rounded-2xl px-12 py-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-heading font-bold text-white mb-6">მზად ხართ წარმატებისთვის?</h2>
                            <p className="text-gray-400 font-sans mb-10 max-w-2xl mx-auto">დაგვიკავშირდით და მიიღეთ უფასო კონსულტაცია და პირველადი აუდიტი.</p>
                            <Link href="/consultation" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-darker font-heading font-bold rounded-xl hover:bg-gray-200 transition-colors text-lg uppercase tracking-wider">
                                დაგვიკავშირდით <TrendingUp className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SeoMarketing;
