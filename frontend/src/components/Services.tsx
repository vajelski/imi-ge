import React from 'react';
import { Brain, MessageSquareCode, Smartphone, ArrowUpRight, Cpu, Layout, Search, Hammer } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

const IconMap: Record<string, React.FC<any>> = {
  Brain, MessageSquareCode, Smartphone, Layout, Search, Hammer
};

const Services = async () => {
  const t = await getTranslations('servicesSection');
  const itemsT = await getTranslations('services');

  // In next-intl, we can't easily map over arrays in JSON without some tricks 
  // or just knowing the IDs. For now, I'll use IDs 1, 2, 3 as defined in JSON.
  const serviceIds = ['1', '2', '3'];

  return (
    <section className="pt-40 pb-24 relative min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 animate-in fade-in slide-in-from-top-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-white/5 border border-primary/20 dark:border-white/10 mb-6 group cursor-default">
            <Cpu className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-xs font-heading font-bold tracking-[0.2em] text-indigo-700 dark:text-gray-300 uppercase">
              {t('badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest">
            {t('titlePrefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300 mx-auto font-sans font-light leading-relaxed tracking-wide">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {serviceIds.map((id, index) => {
            // This is a bit manual but safe for next-intl Server Components
            const title = itemsT(`${index}.title`);
            const description = itemsT(`${index}.description`);
            const iconKey = itemsT(`${index}.icon`);
            const price = itemsT(`${index}.price`);
            const path = itemsT(`${index}.path`);

            const Icon = IconMap[iconKey] || Cpu;

            return (
              <Link key={id} href={path as any} className="group relative h-full block animate-in fade-in zoom-in duration-700" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative h-full rounded-[2rem] p-10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 border border-gray-200 dark:border-white/10 group-hover:border-primary/30 flex flex-col shadow-2xl group-hover:-translate-y-2">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-white/10 dark:to-white/5 rounded-2xl flex items-center justify-center mb-8 border border-primary/10 dark:border-white/10 group-hover:border-primary/50 transition-all duration-500 shadow-sm group-hover:scale-110">
                      <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors tracking-wide">
                      {title}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 mb-10 leading-relaxed text-sm flex-grow font-sans font-light tracking-wide">
                      {description}
                    </p>

                    <div className="flex items-center justify-between pt-8 border-t border-gray-200 dark:border-white/5 mt-auto">
                      <span className="text-gray-900 dark:text-white font-heading font-bold text-sm tracking-wider bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                        {price}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-gray-200 dark:border-white/5 group-hover:rotate-45">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
