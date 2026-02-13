import React from 'react';
import { Cpu, Code2, Target, Award, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

const Founder: React.FC = () => {
  return (
    <section className="pt-40 pb-24 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center gap-12 mb-32">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-[2rem] rotate-6 blur-lg opacity-60 dark:opacity-100"></div>
              <div className="absolute inset-0 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 overflow-hidden shadow-2xl">
                <img
                  src="https://ui-avatars.com/api/?name=Revaz+Bregvadze&background=6366f1&color=fff&size=512"
                  alt="Revaz Bregvadze"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">Founder & Architect</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wide">
              რევაზ ბრეგვაძე
            </h1>
            <h2 className="text-xl md:text-2xl text-primary font-heading font-bold mb-8 tracking-wider">
              AI ინჟინერი | ტექნოლოგიური ინოვატორი | ციფრული ტრანსფორმაციის არქიტექტორი
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed mb-8">
              მე ვარ პროგრამისტი და ხელოვნური ინტელექტის პრაქტიკოსი, რომელიც ქმნის ტექნოლოგიურ გადაწყვეტილებებს ადამიანებისა და კომპანიებისთვის.
              ჩემი მიზანია ტექნოლოგია გახდეს რეალური ძალა განვითარებისთვის, ოპტიმიზაციისთვის და ზრდისთვის.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link href="/contact" className="px-8 py-3 bg-primary hover:bg-indigo-700 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/30">
                დაკავშირება
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Founder;
