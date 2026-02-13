import React from 'react';
import { Link } from '@/i18n/routing';
import { ArrowRight, Check, X, AlertTriangle, Info, Loader2 } from 'lucide-react';
import SEO from './SEO';

const StyleGuide: React.FC = () => {
  return (
    <section className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
      <SEO title="Style Guide — IMI.GE" description="Design system and style guide for IMI.GE." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-widest">
            სტილის <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">სახელმძღვანელო</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-sans font-light max-w-2xl mx-auto">
            პროექტში გამოყენებული ფერები, ფონტები, ღილაკები და ფორმები.
          </p>
        </div>

        {/* Colors */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-white/10 pb-4">ფერები</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-primary shadow-lg"></div>
              <p className="font-heading font-bold text-gray-900 dark:text-white text-sm">Primary</p>
              <p className="text-xs text-gray-500 font-mono">#6366f1</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-secondary shadow-lg"></div>
              <p className="font-heading font-bold text-gray-900 dark:text-white text-sm">Secondary</p>
              <p className="text-xs text-gray-500 font-mono">#d946ef</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-accent shadow-lg"></div>
              <p className="font-heading font-bold text-gray-900 dark:text-white text-sm">Accent</p>
              <p className="text-xs text-gray-500 font-mono">#06b6d4</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-2xl bg-darker border border-white/10 shadow-lg"></div>
              <p className="font-heading font-bold text-gray-900 dark:text-white text-sm">Darker (Bg)</p>
              <p className="text-xs text-gray-500 font-mono">#050505</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-white/10 pb-4">ტიპოგრაფია</h2>
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-heading font-bold text-gray-900 dark:text-white mb-2">H1 სათაური (BPG Mrgvlovani Caps)</h1>
              <p className="text-sm text-gray-500 font-mono">text-5xl font-heading font-bold</p>
            </div>
            <div>
              <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">H2 სათაური</h2>
              <p className="text-sm text-gray-500 font-mono">text-4xl font-heading font-bold</p>
            </div>
            <div>
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">H3 სათაური</h3>
              <p className="text-sm text-gray-500 font-mono">text-3xl font-heading font-bold</p>
            </div>
            <div>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed mb-2">
                ეს არის ძირითადი ტექსტი (Body Text). გამოყენებულია BPG Mrgvlovani ფონტი. იდეალურია გრძელი ტექსტების წასაკითხად.
                აქვს კარგი კონტრასტი და დაშორებები.
              </p>
              <p className="text-sm text-gray-500 font-mono">text-lg font-sans font-light</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-white/10 pb-4">ღილაკები</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <button className="px-8 py-3 bg-primary hover:bg-indigo-600 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1">
              Primary Button
            </button>
            <button className="px-8 py-3 bg-secondary hover:bg-fuchsia-600 text-white rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-1">
              Secondary Button
            </button>
            <button className="px-8 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-xl font-heading font-bold uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-white/10 transition-all">
              Outline Button
            </button>
            <button disabled className="px-8 py-3 bg-primary/50 text-white/50 rounded-xl font-heading font-bold uppercase tracking-wider cursor-not-allowed">
              Disabled
            </button>
            <button className="p-4 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-white/10 pb-4">ფორმები</h2>
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ml-1">Input Field</label>
              <input type="text" className="w-full bg-white dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder-gray-400 font-sans" placeholder="Placeholder text..." />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ml-1">Select</label>
              <select className="w-full bg-white dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all font-sans">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ml-1">Textarea</label>
              <textarea rows={3} className="w-full bg-white dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder-gray-400 font-sans resize-none" placeholder="Type something..."></textarea>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
              <label className="text-sm text-gray-600 dark:text-gray-300 font-sans">Checkbox label</label>
            </div>
          </div>
        </div>

        {/* Alerts & Badges */}
        <div className="mb-20">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-white/10 pb-4">შეტყობინებები & ბეიჯები</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold font-sans border border-green-500/20">
                <Check className="w-4 h-4" /> Success
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold font-sans border border-red-500/20">
                <X className="w-4 h-4" /> Error
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-sm font-bold font-sans border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4" /> Warning
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold font-sans border border-blue-500/20">
                <Info className="w-4 h-4" /> Info
              </span>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 text-primary">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-sans font-medium">იტვირთება...</span>
            </div>
          </div>
        </div>

        {/* Auth Links */}
        <div className="text-center border-t border-gray-200 dark:border-white/10 pt-12">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">ავტორიზაციის გვერდები</h2>
          <div className="flex justify-center gap-6">
            <Link href="/auth" className="text-primary hover:text-secondary font-bold font-heading uppercase tracking-wider transition-colors">
              შესვლა / რეგისტრაცია
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StyleGuide;
