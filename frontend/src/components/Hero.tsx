import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowRight, Bot, Smartphone, Zap, Globe, MessageCircle, Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const Hero = async () => {
  const t = await getTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-48 pb-20 bg-gray-50 dark:bg-darker transition-colors duration-300">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 cursor-default shadow-sm dark:shadow-none transition-all hover:border-primary/50">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-heading font-bold tracking-widest text-gray-700 dark:text-gray-300 uppercase">
              {t('badge')}
            </span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold tracking-tight mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <span className="block text-gray-900 dark:text-white">{t('titlePrefix')}</span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent pb-4">
            {t('titleHighlight')}
          </span>
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-16 leading-relaxed font-sans font-light animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          {t('description')}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600">
          <Link href="/contact" className="group relative inline-flex items-center justify-center px-10 py-5 text-sm font-heading font-bold text-white bg-indigo-700 hover:bg-indigo-800 rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-100 group-hover:opacity-90 transition-opacity"></div>
            <span className="relative flex items-center gap-3 tracking-wider uppercase">
              {t('ctaPrimary')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-10 py-5 text-sm font-heading font-bold text-gray-900 dark:text-white bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white dark:hover:bg-white/10 shadow-xl hover:scale-105 active:scale-95"
          >
            <span className="relative flex items-center gap-3 tracking-wider uppercase">
              {t('ctaSecondary')}
              <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-800">
          <div className="rounded-[3rem] p-12 max-w-7xl mx-auto border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-darker/60 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="flex flex-col items-center text-center group">
                <div className="p-5 bg-primary/10 rounded-3xl mb-6 text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <Globe className="w-10 h-10" />
                </div>
                <h2 className="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase tracking-widest mb-3">{t('trust1Title')}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-sans font-light leading-relaxed">
                  {t('trust1Desc')}
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="p-5 bg-secondary/10 rounded-3xl mb-6 text-secondary shadow-sm group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                  <Bot className="w-10 h-10" />
                </div>
                <h2 className="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase tracking-widest mb-3">{t('trust2Title')}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-sans font-light leading-relaxed">
                  {t('trust2Desc')}
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="p-5 bg-accent/10 rounded-3xl mb-6 text-accent shadow-sm group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                  <Zap className="w-10 h-10" />
                </div>
                <h2 className="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase tracking-widest mb-3">{t('trust3Title')}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-sans font-light leading-relaxed">
                  {t('trust3Desc')}
                </p>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="p-5 bg-green-500/10 rounded-3xl mb-6 text-green-500 shadow-sm group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
                  <Smartphone className="w-10 h-10" />
                </div>
                <h2 className="text-gray-900 dark:text-white font-heading font-bold text-sm uppercase tracking-widest mb-3">{t('trust4Title')}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-sans font-light leading-relaxed">
                  {t('trust4Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
