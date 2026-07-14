'use client';

import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { parseJsonResponse } from '@/lib/safeFetch';
import { trackEvent } from '@/lib/analytics';

const ContactForm = () => {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        interests: [] as string[],
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const honeypotRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const key = id.replace('contact-', '');
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleInterestChange = (interest: string) => {
        setFormData(prev => {
            const interests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    website: honeypotRef.current?.value ?? '',
                }),
            });

            const data = await parseJsonResponse<{ error?: string }>(res);

            if (!res.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            trackEvent('submit_contact_form');
            setFormData({ name: '', company: '', email: '', interests: [], message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error: any) {
            console.error('Contact error:', error);
            setStatus('error');
            setErrorMessage(error.message || t('error'));
        }
    };

    const interestsNames = [
        'AI ხმოვანი ასისტენტი ან ჩატბოტი',
        'RAG / შიდა AI სისტემა',
        'CRM და ბიზნეს პროცესების ავტომატიზაცია',
        'AI-Native ვებ-პროდუქტი',
        'AI სტრატეგია და კონსულტაცია',
    ];

    return (
        <div className="bg-white dark:bg-white/5 p-10 md:p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[3rem]"></div>
            <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 relative z-10">{t('formTitle')}</h3>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Honeypot: leave empty; bots often fill it. Server rejects if non-empty. */}
                <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true">
                    <label htmlFor="contact-website">Website (leave blank)</label>
                    <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">{t('nameLabel')}</label>
                        <input
                            id="contact-name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 font-sans"
                            placeholder={t('nameLabel')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contact-company" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">{t('companyLabel')}</label>
                        <input
                            id="contact-company"
                            type="text"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 font-sans"
                            placeholder={t('companyLabel')}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">{t('emailLabel')}</label>
                    <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 font-sans"
                        placeholder="example@company.com"
                    />
                </div>

                <div className="space-y-2">
                    <span className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1 block">{t('interestLabel')}</span>
                    <div className="flex flex-wrap gap-3">
                        {interestsNames.map((interest) => {
                            return (
                                <label key={interest} className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={formData.interests.includes(interest)}
                                        onChange={() => handleInterestChange(interest)}
                                    />
                                    <span className="inline-block px-4 py-2 rounded-xl bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-sans peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                                        {interest}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">{t('messageLabel')}</label>
                    <textarea
                        id="contact-message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 resize-none font-sans"
                        placeholder="..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className={`w-full font-heading font-bold py-5 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 uppercase tracking-wider text-sm
          ${status === 'success' ? 'bg-green-600 text-white shadow-green-600/20' :
                            status === 'error' ? 'bg-red-600 text-white shadow-red-600/20' :
                                'bg-primary hover:bg-indigo-600 text-white shadow-primary/20'}`}
                >
                    {status === 'loading' ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t('sending')}
                        </>
                    ) : status === 'success' ? (
                        <>
                            <CheckCircle className="w-5 h-5" />
                            {t('success')}
                        </>
                    ) : status === 'error' ? (
                        <>
                            <AlertCircle className="w-5 h-5" />
                            {t('error')}
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            {t('submitButton')}
                        </>
                    )}
                </button>

                {status === 'error' && (
                    <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default ContactForm;
