import type { Metadata } from 'next';
import { Clock3, Mail, Phone, ShieldCheck } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import TrackedOutboundLink from '@/components/TrackedOutboundLink';
import { getSiteSettings } from '@/lib/sanity/queries';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/contact', title: { ka: 'დაგვიკავშირდით IMI.GE-ს', en: 'Contact IMI.GE' }, description: { ka: 'დაგეგმეთ AI voice agent, RAG, CRM automation ან AI-native web პროდუქტის სტრატეგიული კონსულტაცია IMI.GE-სთან.', en: 'Tell IMI.GE which process you want to improve and plan a practical AI next step.' } });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') return <div className="relative overflow-hidden pt-32 pb-24"><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/><section className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><p className="text-xs font-bold tracking-[.2em] text-primary">CONTACT IMI.GE</p><h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">Tell us which process you want to improve.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">Share your current workflow, systems, and desired outcome. We will help you define a practical AI next step.</p><div className="mt-10 space-y-3 text-sm text-slate-600 dark:text-slate-300"><p>We reply within one business day.</p><p>Your information is used for consultation purposes only.</p></div></div><div><ContactForm /></div></section></div>;
  const siteSettings = await getSiteSettings(false).catch(() => null);
  const email = siteSettings?.contacts?.primaryEmail ?? siteSettings?.contact?.email ?? 'hello@imi.ge';
  const phone = siteSettings?.contacts?.primaryPhone ?? siteSettings?.contact?.phone ?? null;
  return <div className="relative overflow-hidden pt-32 pb-24"><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/>
    <section className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div><p className="text-xs font-bold tracking-[.2em] text-cyan-700 dark:text-cyan-300">STRATEGIC AI CONSULTATION</p><h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">დავიწყოთ იმ პროცესით, რომელსაც ყველაზე მეტი გავლენა აქვს.</h1><p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">მოგვიყევით თქვენს ამოცანაზე. პირველ შეხვედრაზე ვაფასებთ მონაცემს, ინტეგრაციებს, უსაფრთხოების მოთხოვნებს და პრაქტიკულ დანერგვის გზას.</p><div className="mt-10 space-y-4"><TrackedOutboundLink href={`mailto:${email}`} eventName="click_email" className="glass-panel flex items-center gap-4 rounded-2xl p-5"><Mail className="text-cyan-700 dark:text-cyan-200"/><div><p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">EMAIL</p><p className="mt-1 font-semibold text-slate-950 dark:text-white">{email}</p></div></TrackedOutboundLink>{phone && <TrackedOutboundLink href={`tel:${phone}`} eventName="click_phone" className="glass-panel flex items-center gap-4 rounded-2xl p-5"><Phone className="text-cyan-700 dark:text-cyan-200"/><div><p className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400">PHONE</p><p className="mt-1 font-semibold text-slate-950 dark:text-white">{phone}</p></div></TrackedOutboundLink>}</div><div className="mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300"><p className="flex items-center gap-3"><Clock3 size={18} className="text-primary"/> პასუხი ერთი სამუშაო დღის განმავლობაში.</p><p className="flex items-center gap-3"><ShieldCheck size={18} className="text-primary"/> მოთხოვნის მონაცემები მხოლოდ კონსულტაციის მიზნით მუშავდება.</p></div></div><div><div className="mb-5"><p className="text-sm font-bold text-slate-950 dark:text-white">რა უნდა მოგვწეროთ</p><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">მოკლედ აღწერეთ მიმდინარე პროცესი, გუნდი, გამოყენებული სისტემები და ის შედეგი, რომლის მიღებაც გსურთ.</p></div><ContactForm /></div></section>
  </div>;
}
