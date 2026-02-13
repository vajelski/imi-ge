'use client';

import React, { useState } from 'react';
import { Hammer, Code2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const BuilderForm = () => {
    const t = useTranslations('builder');
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
          Innovation & Future
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          We build digital products that matter.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;`);
        }, 2500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="glass-panel p-8 rounded-[2rem] border border-white/10 bg-white/5">
                <h3 className="text-2xl font-heading font-bold text-white mb-6">Interactive Demo</h3>
                <form onSubmit={handleGenerate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-heading font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">{t('form.label')}</label>
                        <textarea
                            rows={6}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder={t('form.placeholder')}
                            className="w-full bg-darker/50 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all placeholder-gray-600 resize-none font-sans"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={isGenerating || !prompt}
                        className="w-full bg-secondary hover:bg-fuchsia-600 text-white font-heading font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-secondary/25 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm disabled:opacity-50"
                    >
                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Code2 className="w-5 h-5" />}
                        {t('form.button')}
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
                <div className="flex-grow overflow-auto font-mono text-sm text-gray-300 min-h-[300px]">
                    {isGenerating ? (
                        <div className="flex items-center justify-center h-full text-secondary animate-pulse mt-20">
                            {t('form.generating')}
                        </div>
                    ) : codeSnippet ? (
                        <pre className="whitespace-pre-wrap">{codeSnippet}</pre>
                    ) : (
                        <div className="text-gray-600 italic text-center mt-20">
                            Code will appear here...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuilderForm;
