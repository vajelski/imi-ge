import React, { useState } from 'react';
import { Hammer, Code2, Layout, Smartphone, ArrowRight, Loader2, Check } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SEO from './SEO';

const ServiceBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsGenerating(true);

    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setCodeSnippet(`// Generated Component for: ${prompt}
import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 min-h-screen flex items-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          მომავლის ტექნოლოგიები
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          ჩვენ ვქმნით ინოვაციურ ციფრულ პროდუქტებს.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
          დაწყება
        </button>
      </div>
    </div>
  );
};

export default HeroSection;`);
    }, 2500);
  };

  return (
    <section className="pt-40 pb-24 bg-darker min-h-screen relative">
      <SEO title="Build Your Service — IMI.GE" description="Customize your perfect service package for web development, AI, and marketing." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
            <Hammer className="w-4 h-4 text-secondary" />
            <span className="text-xs font-heading font-bold tracking-[0.2em] text-secondary uppercase">AI Builder</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-widest glow-text">
            ვებ-გვერდების <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">ავტომატური</span> გენერაცია
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed tracking-wide">
            აღწერეთ თქვენი იდეა ტექსტურად და ჩვენი AI დაგიწერთ სუფთა, ოპტიმიზირებულ კოდს (React + Tailwind).
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <div className="glass-panel p-8 rounded-[2rem] border border-white/10">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">სცადეთ დემო</h3>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-heading font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">აღწერეთ სექცია</label>
                <textarea
                  rows={6}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="მაგალითად: შექმენი Hero სექცია ლურჯი გრადიენტით, დიდი სათაურით 'მომავლის ტექნოლოგიები' და თეთრი ღილაკით."
                  className="w-full bg-darker/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all placeholder-gray-600 resize-none font-sans"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isGenerating || !prompt}
                className="w-full bg-secondary hover:bg-fuchsia-600 text-white font-heading font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-secondary/25 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Code2 className="w-5 h-5" />}
                კოდის გენერაცია
              </button>
            </form>
          </div>

          <div className="glass-panel p-8 rounded-[2rem] border border-white/10 bg-[#1e1e1e] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-500 font-mono">HeroSection.tsx</span>
            </div>
            <div className="flex-grow overflow-auto font-mono text-sm text-gray-300">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full text-secondary animate-pulse">
                  AI წერს კოდს...
                </div>
              ) : codeSnippet ? (
                <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
              ) : (
                <div className="text-gray-600 italic text-center mt-20">
                  კოდი გამოჩნდება აქ...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-32">
          <h2 className="text-3xl font-heading font-bold text-white mb-12 text-center tracking-wider">რატომ AI Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-secondary/30 transition-all">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 text-secondary">
                <Layout className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-heading">სუფთა კოდი</h4>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                ჩვენი AI არ იყენებს "Drag & Drop" ნაგავს. ის წერს პროფესიონალურ React კოდს, რომელიც ადვილად შესაცვლელია.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-secondary/30 transition-all">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 text-accent">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-heading">რესპონსიული</h4>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                გენერირებული დიზაინი ავტომატურად ერგება მობილურებს, პლანშეტებს და დესკტოპებს.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-secondary/30 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 text-green-500">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3 font-heading">სწრაფი დეველოპმენტი</h4>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                დაზოგეთ დეველოპმენტის დროის 70%. იდეიდან პროტოტიპამდე სულ რაღაც წუთებში.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Box */}
        <div className="max-w-4xl mx-auto glass-panel p-10 rounded-[2.5rem] border border-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-secondary text-white px-6 py-2 rounded-bl-2xl font-heading font-bold text-xs tracking-wider">
            პოპულარული
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-heading font-bold text-white mb-2">სრული პაკეტი</h3>
              <p className="text-gray-400 font-sans mb-6">AI Builder + დეველოპერის მხარდაჭერა</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                  <Check className="w-4 h-4 text-secondary" /> ულიმიტო გენერაცია
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                  <Check className="w-4 h-4 text-secondary" /> ჰოსტინგი და დომენი
                </li>
                <li className="flex items-center gap-3 text-gray-300 font-sans text-sm">
                  <Check className="w-4 h-4 text-secondary" /> SEO ოპტიმიზაცია
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="text-4xl font-heading font-bold text-white mb-2">შეთანხმებით</div>
              <div className="text-sm text-gray-500 font-sans mb-6">ერთჯერადი გადასახადი</div>
              <Link href="/contact" className="inline-block bg-secondary hover:bg-fuchsia-600 text-white px-8 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-secondary/25">
                შეკვეთა
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServiceBuilder;
