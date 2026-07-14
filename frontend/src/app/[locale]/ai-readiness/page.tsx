import type { Metadata } from 'next';
import { ArrowUpRight, CheckCircle2, CircleDashed, Database, UsersRound } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const metadata: Metadata = { title: 'AI Readiness Assessment', description: 'შეაფასეთ რამდენად მზად არის თქვენი კომპანია AI voice, RAG, automation ან AI-native product-ის დანერგვისთვის.' };

const checks = [
  ['პროცესი', 'არსებობს განმეორებადი workflow, რომელსაც დღეს გუნდი ხელით მართავს?'],
  ['მონაცემები', 'ცოდნა, დოკუმენტები ან CRM ჩანაწერები საკმარისად ორგანიზებულია?'],
  ['Ownership', 'ვინ ამოწმებს AI-ის პასუხს და მართავს პროცესის ხარისხს?'],
  ['ინტეგრაცია', 'რომელი სისტემები უნდა დაუკავშირდეს პირველ პილოტს?'],
  ['შედეგი', 'როგორ გაზომავთ დროს, ხარისხს, კონვერსიას ან დანახარჯს?'],
];

export default async function AiReadinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="relative overflow-hidden pt-32 pb-24"><BreadcrumbStructuredData locale={locale} items={[{ name: 'მთავარი', path: '' }, { name: 'AI Readiness', path: '/ai-readiness' }]} /><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/><section className="mx-auto max-w-6xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-primary">AI READINESS / SELF-ASSESSMENT</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">არის თუ არა თქვენი ბიზნესი მზად AI სისტემის დასანერგად?</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">AI readiness არ ნიშნავს, რომ უკვე დიდი მონაცემთა გუნდი გყავთ. ნიშნავს, რომ შეგიძლიათ იპოვოთ კონკრეტული პროცესი, პასუხისმგებელი ადამიანი და გაზომვადი შედეგი.</p><div className="mt-14 grid gap-5 lg:grid-cols-[1fr_.7fr]"><div className="glass-panel rounded-[2rem] p-7 sm:p-9"><p className="text-sm font-bold text-slate-950 dark:text-white">ხუთი კითხვა პირველ პილოტამდე</p><div className="mt-7 space-y-4">{checks.map(([title, text], index) => <div key={title} className="flex gap-4 rounded-2xl border border-slate-900/10 bg-white/50 p-4 dark:border-white/10 dark:bg-black/10"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{index + 1}</span><div><h2 className="font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></div></div>)}</div></div><aside className="rounded-[2rem] bg-slate-950 p-7 text-white sm:p-9"><CircleDashed className="text-cyan-300" size={27}/><h2 className="mt-8 text-2xl font-bold">თუ სამზე მეტ კითხვაზე “კი” პასუხობთ, პილოტი რეალისტურია.</h2><p className="mt-5 text-sm leading-7 text-slate-300">შემდეგი ნაბიჯი არის readiness workshop: ვირჩევთ use case-ს, ვადგენთ data boundary-ს და ვქმნით delivery plan-ს.</p><div className="mt-8 space-y-3 text-sm text-slate-200"><p className="flex gap-3"><Database size={18} className="text-cyan-300"/> ცოდნისა და მონაცემის ფენა</p><p className="flex gap-3"><UsersRound size={18} className="text-cyan-300"/> გუნდი და პასუხისმგებლობა</p><p className="flex gap-3"><CheckCircle2 size={18} className="text-cyan-300"/> KPI და ხარისხის კონტროლი</p></div><Link href="/consultation" className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950">დაგეგმეთ readiness workshop <ArrowUpRight size={17}/></Link></aside></div></section></div>;
}
