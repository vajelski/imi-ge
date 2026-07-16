import React from 'react';
import { TrendingUp, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

const IconMap: Record<string, React.FC<any>> = {
  TrendingUp, Clock, ShieldCheck
};

const Pricing = async () => {
  const t = await getTranslations('pricing');

  const icons = ['TrendingUp', 'Clock', 'ShieldCheck'];
  const rawValues = t.raw('values') as Array<{ title: string; description: string; items: string[] }>;
  const values = rawValues.map((v, i) => ({
    id: `v${i + 1}`,
    title: v.title,
    description: v.description,
    icon: icons[i] || 'Clock',
    listItems: v.items,
  }));

  return (
    <section className="pt-40 pb-24 bg-gray-50 dark:bg-darker transition-colors duration-500 relative overflow-hidden" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 animate-in fade-in slide-in-from-top-4 duration-1000">
          <span className="text-indigo-600 dark:text-indigo-400 font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest">
            {t('titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 font-sans font-light max-w-3xl mx-auto tracking-wide leading-relaxed">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch mb-20">
          {values.map((item, idx) => {
            const Icon = IconMap[item.icon] || Clock;
            const isHighlighted = idx === 1;

            return (
              <div key={item.id} className={`group relative rounded-[2rem] p-10 flex flex-col animate-in fade-in zoom-in duration-700 ${isHighlighted ? 'bg-gradient-to-b from-white to-gray-50 dark:from-white/10 dark:to-white/5 border border-primary/20 dark:border-primary/50 shadow-2xl z-10 scale-105' : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/30 shadow-xl transition-all duration-300 hover:-translate-y-2'}`} style={{ animationDelay: `${idx * 200}ms` }}>
                {isHighlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-2.5 rounded-full text-xs font-heading font-bold uppercase tracking-[0.2em] shadow-xl animate-bounce">
                    {t('roiFocus')}
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${isHighlighted ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'} group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 font-sans leading-relaxed mb-8 flex-grow text-sm">
                  {item.description}
                </p>

                <ul className="space-y-4 mt-auto">
                  {item.listItems.map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 font-sans group/li">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 group-hover/li:scale-125 transition-transform" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="inline-block p-12 bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-200 dark:border-white/10 relative overflow-hidden group max-w-4xl w-full shadow-2xl hover:border-primary/30 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wider">{t('ctaTitle')}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-10 font-sans font-light text-lg tracking-wide">
                {t('ctaDescription')}
              </p>
              <Link href="/consultation" className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 text-sm font-heading font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition-all duration-300 uppercase tracking-[0.2em] shadow-xl shadow-primary/25 hover:scale-105 active:scale-95">
                {t('ctaButton')} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
