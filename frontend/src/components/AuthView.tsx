'use client';

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff, ShieldCheck, Facebook, Linkedin, Chrome } from 'lucide-react';
import { useTranslations } from 'next-intl';

type AuthMode = 'login' | 'register' | 'forgot-password';

const AuthView = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Auth submit:', { mode, email, password, name });
    };

    const toggleMode = (newMode: AuthMode) => {
        setMode(newMode);
        setShowPassword(false);
    };

    return (
        <div className="w-full max-w-md px-4 relative z-10 mx-auto">
            <div className="glass-panel p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-lg shadow-primary/10">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2 tracking-wider">
                        {mode === 'login' && 'Authorization'}
                        {mode === 'register' && 'Registration'}
                        {mode === 'forgot-password' && 'Password Recovery'}
                    </h1>
                    <p className="text-gray-400 font-sans text-sm">
                        {mode === 'login' && 'Welcome back to your dashboard'}
                        {mode === 'register' && 'Create your account to get started'}
                        {mode === 'forgot-password' && 'Enter your email to receive instructions'}
                    </p>
                </div>

                {/* Social Login */}
                {mode !== 'forgot-password' && (
                    <div className="mb-8">
                        <div className="grid grid-cols-3 gap-4">
                            <button className="flex items-center justify-center p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group">
                                <Chrome className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                            </button>
                            <button className="flex items-center justify-center p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group">
                                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </button>
                            <button className="flex items-center justify-center p-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors group">
                                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            </button>
                        </div>
                        <div className="relative mt-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-[#0a0a0a] text-gray-500 font-sans">OR CONTINUE WITH EMAIL</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {mode === 'register' && (
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-heading font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-darker/50 border border-white/10 rounded-xl px-5 py-3.5 pl-12 text-white focus:border-primary focus:outline-none transition-all placeholder-gray-600 font-sans"
                                    placeholder="John Doe"
                                    required
                                />
                                <UserIcon className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-heading font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-darker/50 border border-white/10 rounded-xl px-5 py-3.5 pl-12 text-white focus:border-primary focus:outline-none transition-all placeholder-gray-600 font-sans"
                                placeholder="name@example.com"
                                required
                            />
                            <Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>

                    {mode !== 'forgot-password' && (
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-heading font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
                            <div className="relative group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-darker/50 border border-white/10 rounded-xl px-5 py-3.5 pl-12 pr-12 text-white focus:border-primary focus:outline-none transition-all placeholder-gray-600 font-sans"
                                    placeholder="••••••••"
                                    required
                                />
                                <Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {mode === 'login' && (
                        <div className="flex justify-end">
                            <button type="button" onClick={() => toggleMode('forgot-password')} className="text-[10px] font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-widest">
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button type="submit" className="w-full bg-primary hover:bg-indigo-600 text-white font-heading font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm">
                        {mode === 'login' && 'Login'}
                        {mode === 'register' && 'Register'}
                        {mode === 'forgot-password' && 'Submit'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center">
                    {mode === 'login' && (
                        <p className="text-sm text-gray-500 font-sans">
                            Don't have an account? <button onClick={() => toggleMode('register')} className="text-primary hover:text-secondary font-bold transition-colors ml-1">Sign Up</button>
                        </p>
                    )}
                    {mode === 'register' && (
                        <p className="text-sm text-gray-500 font-sans">
                            Already have an account? <button onClick={() => toggleMode('login')} className="text-primary hover:text-secondary font-bold transition-colors ml-1">Sign In</button>
                        </p>
                    )}
                    {mode === 'forgot-password' && (
                        <button onClick={() => toggleMode('login')} className="text-sm text-gray-500 hover:text-white font-sans transition-colors flex items-center justify-center gap-2 mx-auto group">
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthView;
