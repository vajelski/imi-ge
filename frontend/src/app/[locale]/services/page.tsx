import type { Metadata } from 'next';
import { ArrowUpRight, Bot, Code2, Database, Headphones, ShieldCheck, Workflow } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'AI სერვისები ბიზნესისთვის',
  description: 'ხმოვანი AI, RAG სისტემები, CRM ავტომატიზაცია და AI-ზე დაფუძნებული ვებ-პროდუქტები საქართველოს ბიზნესებისთვის.',
};

const services = [
  { href: '/services/ai-voice-agents', icon: Headphones, label: 'ხმოვანი AI', title: 'AI ხმოვანი ასისტენტები და ჩატბოტები', description: 'ქართულად მოსაუბრე ხმოვანი და ტექსტური ასისტენტები მომხმარებლის მხარდაჭერის, ლიდების კვალიფიკაციისა და ზარების ავტომატიზაციისთვის.', outputs: ['24/7 მხარდაჭერა', 'CRM კონტექსტის აღრიცხვა', 'ზარების გადამისამართება და ხარისხის კონტროლი'] },
  { href: '/services/rag-internal-ai', icon: Database, label: 'ცოდნის AI', title: 'RAG და შიდა AI სისტემები', description: 'ენის მოდელი, რომელიც უსაფრთხოდ მუშაობს თქვენს დოკუმენტებთან, წესებთან, CRM-სა და ცოდნის ბაზასთან.', outputs: ['როლებზე დაფუძნებული წვდომა', 'წყაროზე მიბმული პასუხები', 'შიდა პროცესების ავტომატიზაცია'] },
  { href: '/services/business-automation', icon: Workflow, label: 'ოპერაციული AI', title: 'ბიზნეს პროცესების ავტომატიზაცია', description: 'AI აგენტები, რომლებიც ამუშავებენ განმეორებად დავალებებს, აკონტროლებენ SLA-ს და ადამიანურ გუნდს რთულ ნაწილზე ტოვებენ.', outputs: ['ლიდების გადანაწილება', 'დოკუმენტების დამუშავება', 'ოპერაციული შეტყობინებები'] },
  { href: '/services/ai-native-web', icon: Code2, label: 'პროდუქტის ინჟინერია', title: 'AI-ზე დაფუძნებული ვებ-პროდუქტები', description: 'სწრაფი საიტები და ვებ-აპლიკაციები, სადაც AI ფუნქცია არქიტექტურის ორგანული ნაწილია და არა ზედაპირული დამატება.', outputs: ['კონვერსიაზე ორიენტირებული UX', 'დაცული backend პროცესები', 'წარმადობის მონიტორინგი'] },
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="relative overflow-hidden pt-32 pb-24"><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40" />
    <section className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-cyan-700 dark:text-cyan-300">IMI.GE შესაძლებლობები</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">AI სერვისები, რომლებიც თქვენს ოპერაციულ სისტემაში ერთიანდება.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">ვმუშაობთ კონკრეტული ბიზნეს-ამოცანით და არა ტექნოლოგიის დემონსტრირებით. ყოველი მიმართულება იწყება პროცესის დიაგნოსტიკით და სრულდება გაზომვადი, უსაფრთხო სისტემით.</p></section>
    <section className="mx-auto mt-16 grid max-w-7xl gap-5 px-6 lg:grid-cols-2 lg:px-8">{services.map(({ href, icon: Icon, label, title, description, outputs }) => <article key={href} className="glass-panel rounded-[2rem] p-7 sm:p-9"><div className="flex items-start justify-between gap-6"><div className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-cyan-700 dark:text-cyan-200"><Icon size={25}/></div><p className="text-[11px] font-bold tracking-[.16em] text-cyan-700 dark:text-cyan-300">{label}</p></div><h2 className="mt-10 text-2xl font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p><div className="mt-8 grid gap-2 sm:grid-cols-3">{outputs.map((output) => <span key={output} className="rounded-xl border border-slate-900/10 bg-white/40 px-3 py-2 text-xs text-slate-600 dark:border-white/10 dark:bg-black/10 dark:text-slate-300">{output}</span>)}</div><Link href={href} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-slate-950 hover:text-primary dark:text-white dark:hover:text-cyan-200">სერვისის დეტალები <ArrowUpRight size={17}/></Link></article>)}</section>
    <section className="mx-auto mt-20 max-w-7xl px-6 lg:px-8"><div className="rounded-[2rem] border border-primary/25 bg-primary/10 p-8 sm:p-12"><Bot className="text-primary"/><h2 className="mt-6 text-3xl font-bold text-slate-950 dark:text-white">არ იცით, საიდან დაიწყოთ?</h2><p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">საწყის შეხვედრაზე ვადგენთ, რომელი სამუშაო პროცესი მოიტანს სწრაფ შედეგს, რა მონაცემებია საჭირო და როგორ ავიცილოთ თავიდან არასაჭირო AI ექსპერიმენტები.</p><Link href="/consultation" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white dark:bg-white dark:text-slate-950">დაგეგმეთ AI სტრატეგია <ArrowUpRight size={18}/></Link></div></section>
  </div>;
}
