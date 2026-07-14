import type { Metadata } from 'next';
import { ArrowUpRight, AudioLines, Building2, Map, PawPrint, ShieldCheck, Volume2 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'შერჩეული პროექტები',
  description: 'IMI.GE-ის ეკოსისტემის პროდუქტები: ქართული ხმოვანი AI, voice platform, urban intelligence და მონაცემებზე დაფუძნებული marketplace.',
};

const projects = [
  {
    name: 'Ertaoza',
    url: 'https://ertaoza.ge',
    icon: AudioLines,
    category: 'NATIONAL LANGUAGE AI',
    accent: 'from-violet-500/30 to-fuchsia-400/10',
    description: 'ქართული ენის AI ინფრასტრუქტურა, რომელიც ერთ ეკოსისტემაში აერთიანებს Text-to-Speech-ს, Speech-to-Text-ს, ქართულ LLM-სა და ხმოვან ავტომატიზაციას.',
    capabilities: ['ქართული TTS და ASR', 'ხმოვანი ასისტენტი', 'ქოლ-ცენტრის ავტომატიზაცია', 'ქართული NLP და LLM'],
    impact: 'ქართული ენისთვის შექმნილი voice და dialogue layer რეალური ბიზნეს-სცენარებისთვის.',
  },
  {
    name: 'CORD.GE',
    url: 'https://cord.ge',
    icon: Volume2,
    category: 'VOICE PLATFORM',
    accent: 'from-cyan-400/25 to-blue-500/10',
    description: 'Georgian-first AI voice workspace, სადაც ტექსტი გარდაიქმნება ბუნებრივ აუდიოდ, ბრენდული ხმა კი ინტეგრირდება პროდუქტში API-ის საშუალებით.',
    capabilities: ['Text-to-Speech', 'Voice cloning', 'SSML კონტროლი', 'MP3/WAV და JSON API'],
    impact: 'ხმის გენერაციიდან API ინტეგრაციამდე, ერთი production-ready workflow.',
  },
  {
    name: 'Urbania',
    url: '/projects/urbania',
    icon: Map,
    category: 'URBAN INTELLIGENCE',
    accent: 'from-emerald-400/25 to-teal-500/10',
    description: 'AI-ზე დაფუძნებული ურბანული და საკადასტრო აუდიტის workspace, რომელიც რუკას, ჩატს, ზონირებასა და უძრავი ქონების რისკების ანალიზს ერთ პროცესში აერთიანებს.',
    capabilities: ['საკადასტრო და იურიდიული აუდიტი', 'K1/K2/K3 და ზონირების ანალიზი', 'Developer / Architect / Investor View', 'რუკა და AI chat ერთ workspace-ში'],
    impact: 'ნაკვეთის რისკები და შესაძლებლობები გადაწყვეტილებამდე ხდება ხილული და სტრუქტურირებული.',
  },
  {
    name: 'Breeding.ge',
    url: 'http://breeding.ge',
    icon: PawPrint,
    category: 'TRUSTED MARKETPLACE',
    accent: 'from-amber-300/25 to-rose-400/10',
    description: 'ცხოველების შეჯვარების პლატფორმა, რომელიც აერთიანებს breed catalog-ს, breeder profile-ს, compatibility scoring-სა და უსაფრთხო ორმხრივ request flow-ს.',
    capabilities: ['952+ ჯიშის კატალოგი', '0-100 compatibility score', 'Health და pedigree სიგნალები', 'ორმხრივი approval პროცესი'],
    impact: 'წყვილის მოძებნა ეფუძნება გამჭვირვალე, შემოწმებად მონაცემებს და არა შემთხვევითობას.',
  },
];

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <div className="relative overflow-hidden pt-32 pb-24"><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-50" />
    <section className="mx-auto max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.22em] text-cyan-300">SELECTED PRODUCTS / IMI.GE ECOSYSTEM</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-6xl">ვქმნით პროდუქტებს, სადაც ტექნოლოგია რეალურ საჭიროებას პასუხობს.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">AI, voice, data და marketplace გამოცდილება ჩვენი გუნდისთვის მხოლოდ სერვისების ჩამონათვალი არ არის. ეს უკვე მოქმედი პროდუქტებია, რომლებიც სპეციფიკური პრობლემის გადასაჭრელად შევქმენით.</p></section>
    <section className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 lg:px-8">{projects.map(({ name, url, icon: Icon, category, accent, description, capabilities, impact }) => <article key={name} className="glass-panel relative overflow-hidden rounded-[2rem] p-7 sm:p-10"><div className={`absolute inset-0 -z-10 bg-gradient-to-br ${accent}`} /><div className="flex flex-col justify-between gap-8 md:flex-row"><div className="max-w-2xl"><div className="flex items-center gap-4"><div className="flex size-12 items-center justify-center rounded-2xl border border-white/15 bg-black/20 text-cyan-100"><Icon size={24} /></div><div><p className="text-xs font-bold tracking-[.18em] text-cyan-200">{category}</p><h2 className="mt-1 text-2xl font-bold text-white">{name}</h2></div></div><p className="mt-7 text-base leading-8 text-slate-200">{description}</p><p className="mt-7 border-l-2 border-cyan-200/60 pl-4 text-sm font-semibold leading-7 text-white">{impact}</p></div><a href={url} target="_blank" rel="noreferrer" className="inline-flex h-fit items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-cyan-200 hover:bg-white/20">ვებგვერდის ნახვა <ArrowUpRight size={17} /></a></div><div className="mt-9 grid gap-3 sm:grid-cols-2">{capabilities.map((capability) => <div key={capability} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-slate-200"><ShieldCheck size={17} className="shrink-0 text-cyan-200" />{capability}</div>)}</div></article>)}</section>
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-8"><div className="rounded-3xl border border-white/10 bg-white/[.04] p-8 sm:p-10"><Building2 className="text-cyan-200" /><h2 className="mt-5 text-2xl font-bold text-white">თქვენი იდეაც შეიძლება შემდეგი პროდუქტი იყოს.</h2><p className="mt-3 max-w-2xl text-slate-300">თუ თქვენს ბიზნესს სჭირდება AI, მონაცემები, ხმოვანი ინტერფეისი ან სრულფასოვანი ციფრული პლატფორმა, დავიწყოთ კონკრეტული ამოცანით.</p><a href={`/${locale}/contact`} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#080914] transition hover:bg-cyan-100">დაგვიკავშირდით <ArrowUpRight size={17} /></a></div></section>
  </div>;
}
