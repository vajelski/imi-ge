'use client';

import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, Zap, Shield, Loader2, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseJsonResponse } from '@/lib/safeFetch';

interface AuditResult {
    url: string;
    scores: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
    };
    securityScore: number;
    recommendations: {
        id: string;
        title: string;
        description: string;
        score?: number;
    }[];
    isMock?: boolean;
    apiError?: string;
}

const AuditForm = () => {
    const t = useTranslations('audit');
    const [url, setUrl] = useState('');
    const [email, setEmail] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState('');
    const [leadSaved, setLeadSaved] = useState(false);
    const [isSavingLead, setIsSavingLead] = useState(false);

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        let validUrl = url;
        if (!url.startsWith('http')) {
            validUrl = `https://${url}`;
            setUrl(validUrl);
        }

        setIsAnalyzing(true);
        setResult(null);
        setError('');
        setLeadSaved(false);

        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: validUrl })
            });

            const data = await parseJsonResponse<AuditResult & { error?: string }>(res);

            if (!res.ok) {
                throw new Error(data.error || 'Audit failed');
            }

            setResult(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error occurred. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSaveLead = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !result) return;

        setIsSavingLead(true);
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    url: result.url,
                    reportType: 'full_audit',
                    date: new Date().toISOString()
                })
            });

            if (res.ok) {
                setLeadSaved(true);
                setEmail('');
            }
        } catch (err) {
            console.error('Lead save failed', err);
        } finally {
            setIsSavingLead(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="glass-panel p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-lg dark:shadow-none">
                    <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder={t('input.placeholder')}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-gray-100 dark:bg-darker/50 border border-gray-300 dark:border-white/10 rounded-xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-sans placeholder:text-gray-500 dark:placeholder:text-gray-400"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isAnalyzing}
                            className="bg-primary hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px]"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {t('input.analyzeButton')}
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    {t('input.checkButton')}
                                </>
                            )}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
                            <AlertTriangle className="w-4 h-4" />
                            {error}
                        </div>
                    )}
                </div>
            </div>

            {result && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: t('scores.performance'), score: result.scores.performance, icon: Zap },
                            { label: t('scores.seo'), score: result.scores.seo, icon: Search },
                            { label: t('scores.accessibility'), score: result.scores.accessibility, icon: CheckCircle2 },
                            { label: t('scores.bestPractices'), score: result.scores.bestPractices, icon: Shield },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-panel p-6 rounded-2xl border border-gray-200 dark:border-white/5 text-center bg-white dark:bg-white/5 shadow-lg dark:shadow-none">
                                <div className={`text-4xl font-bold mb-2 ${getScoreColor(item.score)}`}>{item.score}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-300 font-sans uppercase tracking-wider mb-3">{item.label}</div>
                                <div className="w-full bg-gray-200 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(item.score).replace('text-', 'bg-')}`}
                                        style={{ width: `${item.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg dark:shadow-none">
                            <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                                {t('results.recommendationsTitle')}
                            </h3>
                            <div className="space-y-4">
                                {result.recommendations.length > 0 ? (
                                    result.recommendations.map((rec, i) => (
                                        <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-100 dark:hover:bg-white/10 group">
                                            <div className="font-bold text-gray-800 dark:text-gray-200 mb-2 font-sans text-sm group-hover:text-primary transition-colors">{rec.title}</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-300 font-light leading-relaxed break-words line-clamp-2">
                                                {rec.description}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-green-500 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                        {t('results.noIssues')}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-panel p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg dark:shadow-none">
                                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                    {t('results.securityTitle')}
                                </h3>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-600 dark:text-gray-300 text-sm">Security Headers</span>
                                    <span className={`font-bold ${getScoreColor(result.securityScore)}`}>{result.securityScore}/100</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-white/5 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-blue-500 transition-all duration-1000"
                                        style={{ width: `${result.securityScore}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-[2rem] border border-primary/20 bg-primary/5">
                                {leadSaved ? (
                                    <div className="text-center py-4 animate-in fade-in zoom-in">
                                        <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <CheckCircle2 className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-gray-900 dark:text-white font-bold mb-1">{t('results.leadSuccessTitle')}</h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">{t('results.leadSuccessDesc')}</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSaveLead}>
                                        <h3 className="text-gray-900 dark:text-white font-bold mb-3 text-sm">{t('results.leadTitle')}</h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">{t('results.leadDesc')}</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                required
                                                placeholder={t('results.emailPlaceholder')}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-gray-100 dark:bg-darker/50 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-gray-900 dark:text-white focus:border-primary focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isSavingLead}
                                                aria-label={t('results.leadTitle')}
                                                className="bg-primary hover:bg-indigo-600 text-white rounded-lg px-3 flex items-center justify-center transition-colors disabled:opacity-50"
                                            >
                                                {isSavingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuditForm;
