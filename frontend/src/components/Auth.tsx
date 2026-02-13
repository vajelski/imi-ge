import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Facebook, Linkedin, Chrome } from 'lucide-react';
import SEO from './SEO';

type AuthMode = 'login' | 'register' | 'forgot-password';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Auth submit:', { mode, email, password, name });
  };

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode);
    setShowPassword(false);
  };

  return (
    <section className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300 flex items-center justify-center relative overflow-hidden">
      <SEO title="Login / Register — IMI.GE" description="Access your IMI.GE account to manage services, view analytics, and more." />
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md px-4 relative z-10">
        <div className="bg-white dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              {mode === 'login' && 'ავტორიზაცია'}
              {mode === 'register' && 'რეგისტრაცია'}
              {mode === 'forgot-password' && 'პაროლის აღდგენა'}
            </h1>
            <p className="text-gray-500 dark:text-gray-300 font-sans text-sm">
              {mode === 'login' && 'კეთილი იყოს თქვენი დაბრუნება'}
              {mode === 'register' && 'შექმენით ახალი ანგარიში'}
              {mode === 'forgot-password' && 'შეიყვანეთ ელ.ფოსტა ინსტრუქციისთვის'}
            </p>
          </div>

          {/* Social Login */}
          {mode !== 'forgot-password' && (
            <div className="mb-8">
              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <Chrome className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors" />
                </button>
                <button className="flex items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <Facebook className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button className="flex items-center justify-center p-3 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
                </button>
              </div>
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-[#1a1a1a] text-gray-500 font-sans text-xs">ან გააგრძელეთ ელ.ფოსტით</span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div className="space-y-1.5">
                <label className="text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ml-1">სახელი</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 pl-12 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder-gray-400 font-sans group-hover:border-gray-300 dark:group-hover:border-white/20"
                    placeholder="თქვენი სახელი"
                    required
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary" />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ml-1">ელ.ფოსტა</label>
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 pl-12 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder-gray-400 font-sans group-hover:border-gray-300 dark:group-hover:border-white/20"
                  placeholder="example@mail.com"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary" />
              </div>
            </div>

            {mode !== 'forgot-password' && (
              <div className="space-y-1.5">
                <label className="text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider ml-1">პაროლი</label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-xl px-5 py-3.5 pl-12 pr-12 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all placeholder-gray-400 font-sans group-hover:border-gray-300 dark:group-hover:border-white/20"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => toggleMode('forgot-password')}
                  className="text-xs font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-wider"
                >
                  დაგავიწყდათ პაროლი?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-indigo-600 text-white font-heading font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 uppercase tracking-wider text-sm mt-2"
            >
              {mode === 'login' && 'შესვლა'}
              {mode === 'register' && 'რეგისტრაცია'}
              {mode === 'forgot-password' && 'გაგზავნა'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            {mode === 'login' && (
              <p className="text-sm text-gray-500 dark:text-gray-300 font-sans">
                არ გაქვთ ანგარიში?{' '}
                <button onClick={() => toggleMode('register')} className="text-primary hover:text-secondary font-bold transition-colors ml-1">
                  დარეგისტრირდით
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-sm text-gray-500 dark:text-gray-300 font-sans">
                უკვე გაქვთ ანგარიში?{' '}
                <button onClick={() => toggleMode('login')} className="text-primary hover:text-secondary font-bold transition-colors ml-1">
                  გაიარეთ ავტორიზაცია
                </button>
              </p>
            )}
            {mode === 'forgot-password' && (
              <button onClick={() => toggleMode('login')} className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-sans transition-colors flex items-center justify-center gap-2 mx-auto group">
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                უკან დაბრუნება
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Auth;
