import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, ArrowRight, Clock, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from './SEO';
import { useContent } from '../contexts/ContentContext';
import { parseJsonResponse } from '@/lib/safeFetch';

const Contact: React.FC = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    interests: [] as string[],
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!content) return null;
  const { contact } = content;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // id pattern: contact-name -> name
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
        body: JSON.stringify(formData)
      });

      const data = await parseJsonResponse<{ error?: string }>(res);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', company: '', email: '', interests: [], message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      console.error('Contact error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
      <SEO title="Contact Us — IMI.GE" description="Get in touch with IMI.GE for your next project. We are ready to help you innovate." />
      <section className="pt-40 pb-24 relative overflow-hidden" id="contact">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col lg:flex-row gap-20">

            {/* Left Side: Creative Info */}
            <div className="lg:w-5/12">
              <div className="sticky top-40">
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                  {contact.titlePrefix} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{contact.titleHighlight}</span> <br />
                  {contact.titleSuffix}
                </h2>

                <p className="text-xl text-gray-700 dark:text-gray-300 font-sans font-light mb-12 leading-relaxed">
                  {contact.description}
                </p>

                <div className="space-y-8">
                  <a href={`mailto:${contact.email}`} className="group flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors shadow-sm dark:shadow-none">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">ელ.ფოსტა</span>
                      <span className="text-lg font-sans font-medium text-gray-900 dark:text-white">{contact.email}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary transition-colors" />
                  </a>

                  <a href={`tel:${contact.phone}`} className="group flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-secondary/50 transition-colors shadow-sm dark:shadow-none">
                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">ტელეფონი</span>
                      <span className="text-lg font-sans font-medium text-gray-900 dark:text-white">{contact.phone}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 ml-auto group-hover:text-secondary transition-colors" />
                  </a>

                  <div className="group flex items-center gap-6 p-6 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-accent/50 transition-colors shadow-sm dark:shadow-none">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-heading font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-1">ლოკაცია</span>
                      <span className="text-lg font-sans font-medium text-gray-900 dark:text-white">{contact.address}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Modern Form */}
            <div className="lg:w-7/12">
              <div className="bg-white dark:bg-white/5 p-10 md:p-12 rounded-[3rem] border border-gray-200 dark:border-white/10 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[3rem]"></div>

                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-8 relative z-10">პროექტის დეტალები</h3>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">სახელი</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 font-sans"
                        placeholder="თქვენი სახელი"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-company" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">კომპანია</label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 font-sans"
                        placeholder="კომპანიის სახელი"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">ელ.ფოსტა</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 font-sans"
                      placeholder="example@company.ge"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1 block">ინტერესის სფერო</span>
                    <div className="flex flex-wrap gap-3">
                      {['ვებ-დეველოპმენტი', 'AI ინტეგრაცია', 'მობილური აპლიკაცია', 'აუდიტი', 'სხვა'].map((tag) => (
                        <label key={tag} className="cursor-pointer">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={formData.interests.includes(tag)}
                            onChange={() => handleInterestChange(tag)}
                          />
                          <span className="inline-block px-4 py-2 rounded-xl bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-sm font-sans peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-colors hover:bg-gray-100 dark:hover:bg-white/10">
                            {tag}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-heading font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider ml-1">შეტყობინება</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-50 dark:bg-darker/50 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-4 text-gray-900 dark:text-white focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors placeholder-gray-400 resize-none font-sans"
                      placeholder="მოგვიყევით პროექტის შესახებ..."
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
                        იგზავნება...
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        გაგზავნილია
                      </>
                    ) : status === 'error' ? (
                      <>
                        <AlertCircle className="w-5 h-5" />
                        შეცდომა - სცადეთ კვლავ
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        გაგზავნა
                      </>
                    )}
                  </button>

                  {status === 'error' && (
                    <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
                  )}
                </form>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
