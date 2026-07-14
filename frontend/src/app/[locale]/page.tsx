import type { Metadata } from 'next';
import { ArrowUpRight, Bot, Database, Gauge, MessageSquareText, Sparkles, Workflow } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'კორპორაციული AI სისტემები',
  description: 'AI ასისტენტები, RAG სისტემები, CRM ინტეგრაციები და ბიზნეს პროცესების ავტომატიზაცია.',
};

const services = [
  [MessageSquareText, 'AI ხმოვანი ასისტენტები და ჩატბოტები', '24/7 საუბრის გამოცდილება, რომელიც პასუხობს, კვალიფიცირებს ლიდებს და თქვენს CRM-ში ზუსტ კონტექსტს ტოვებს.'],
  [Database, 'RAG და შიდა AI სისტემები', 'უსაფრთხო წვდომა კომპანიის ცოდნაზე, კონტრაქტებზე, პოლიტიკებსა და მონაცემებზე ბუნებრივი ენით.'],
  [Gauge, 'AI-Native ვებ-დეველოპმენტი', 'სწრაფი, სანდო ვებ-პროდუქტები, სადაც ავტომატიზაცია და ინტელექტი backend-ის ნაწილია.'],
  [Workflow, 'ბიზნეს პროცესების ავტომატიზაცია', 'აგენტები, რომლებიც განმეორებად პროცესებს ასრულებენ და გუნდს რთულ გადაწყვეტილებებზე ათავისუფლებენ.'],
] as const;

const process = [
  ['01', 'სისტემის დიაგნოსტიკა', 'ვპოულობთ პროცესებს, სადაც AI რეალურად ამცირებს დროს, ხარჯს ან პასუხის დაგვიანებას.'],
  ['02', 'არქიტექტურა და უსაფრთხოება', 'ვგეგმავთ ინტეგრაციებს CRM-ის, მონაცემებისა და წვდომის წესების გათვალისწინებით.'],
  ['03', 'პილოტი და დანერგვა', 'ვქმნით საზომ პილოტს, ვამოწმებთ რეალურ სცენარებს და ეტაპობრივად ვუშვებთ წარმოებაში.'],
  ['04', 'ოპტიმიზაცია და მასშტაბირება', 'ვაკვირდებით შედეგებს, ვხვეწავთ agent-ების ქცევას და ვამატებთ ახალ workflow-ებს.'],
];

const articles = [
  ['RAG', 'რატომ არ არის კომპანიისთვის საკმარისი უბრალოდ “ChatGPT”?', 'როგორ იქმნება დაცული შიდა AI, რომელიც პასუხობს მხოლოდ თქვენს კონტროლირებულ ცოდნაზე.'],
  ['VOICE AI', 'ხმის ასისტენტი, რომელიც ბრენდს ადამიანურად წარმოადგენს', 'სცენარები, ინტეგრაციები და ხარისხის კონტროლი ქართულენოვანი voice automation-ისთვის.'],
  ['AUTOMATION', 'AI agent-ები: სად იწყება რეალური ROI', 'ოთხი ბიზნეს-პროცესი, სადაც ავტომატიზაცია უკვე ზრდის ოპერაციულ სიჩქარეს.'],
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="overflow-hidden">
    <section className="relative isolate min-h-[740px] pt-36"><div className="ai-grid absolute inset-0 -z-10 opacity-70" /><div className="absolute left-1/2 top-32 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:pt-20"><div className="pt-8"><div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold tracking-[.16em] text-cyan-200"><Sparkles size={15} /> ENTERPRISE AI SYSTEMS</div><h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl">თქვენი ბიზნესი <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-secondary">AI-ით უფრო სწრაფად</span> მუშაობს.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">IMI.GE ქმნის კორპორაციულ AI სისტემებს, რომლებიც საუბრობენ მომხმარებლებთან, პოულობენ ინფორმაციას და ავტომატურად ამოძრავებენ ბიზნეს-პროცესებს.</p><div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#080914] hover:bg-cyan-100">დაგეგმე AI კონსულტაცია <ArrowUpRight size={18} /></Link><Link href="/services" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white hover:border-cyan-200/60">გაიცანი შესაძლებლობები</Link></div></div>
        <div className="glass-panel self-center rounded-[2rem] p-6 sm:p-8"><div className="flex items-center gap-3 border-b border-white/10 pb-5"><div className="flex size-10 items-center justify-center rounded-xl bg-primary/20 text-cyan-200"><Bot size={21} /></div><div><p className="text-sm font-bold text-white">IMI Intelligence Layer</p><p className="text-xs text-slate-400">ოპერაციული AI orchestration</p></div></div><div className="space-y-4 py-6"><div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">ახალი ლიდი მიღებულია. დავიწყო კვალიფიკაცია და შევქმნა ჩანაწერი CRM-ში?</div><div className="ml-8 rounded-2xl bg-primary/20 p-4 text-sm text-white">ვამოწმებ მოთხოვნას, ვქმნი დავალებას და ანგარიშს ვუგზავნი გაყიდვების გუნდს.</div></div><div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center text-xs text-slate-400"><span>24/7 რეაგირება</span><span>ერთიანი კონტექსტი</span><span>საზომი შედეგი</span></div></div></div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">CORE CAPABILITIES</p><h2 className="mt-4 max-w-3xl text-3xl font-bold text-white sm:text-5xl">AI არ არის ცალკე ინსტრუმენტი. ის თქვენი ოპერაციული უპირატესობაა.</h2><div className="mt-12 grid gap-5 md:grid-cols-2">{services.map(([Icon,title,text]) => <article key={title} className="glass-panel rounded-3xl p-7 transition hover:-translate-y-1 hover:border-primary/60"><Icon className="text-cyan-200" size={25}/><h3 className="mt-7 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></article>)}</div></section>
    <section className="border-y border-white/10 bg-white/[.025] py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">HOW WE WORK</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">როგორ ვაავტომატიზებთ თქვენს ბიზნესს</h2><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{process.map(([number,title,text]) => <div key={number} className="rounded-3xl border border-white/10 p-6"><span className="text-sm font-bold text-cyan-300">{number}</span><h3 className="mt-10 text-lg font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8"><div className="flex items-end justify-between gap-5"><div><p className="text-xs font-bold tracking-[.2em] text-cyan-300">INTELLIGENCE BRIEFING</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">AI პრაქტიკაში</h2></div><Link href="/blog" className="text-sm font-bold text-cyan-200">ყველა ინსაითი →</Link></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{articles.map(([tag,title,text]) => <article key={title} className="glass-panel rounded-3xl p-7"><p className="text-xs font-bold tracking-[.16em] text-cyan-300">{tag}</p><h3 className="mt-12 text-xl font-bold leading-snug text-white">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-300">{text}</p></article>)}</div></section>
    <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-8"><div className="rounded-[2rem] border border-primary/30 bg-primary/15 p-8 sm:p-12"><p className="text-xs font-bold tracking-[.2em] text-cyan-200">THE NEXT MOVE</p><h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-5xl">თქვენი AI სტრატეგია იწყება კონკრეტული ბიზნეს-ამოცანით.</h2><p className="mt-5 max-w-xl text-slate-200">პირველ შეხვედრაზე შევაფასებთ ტექნიკურ შესაძლებლობას, დანერგვის გზას და მოსალოდნელ ეფექტს.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#080914] hover:bg-cyan-100">დაჯავშნე კონსულტაცია <ArrowUpRight size={18}/></Link></div></section>
  </div>;
}
