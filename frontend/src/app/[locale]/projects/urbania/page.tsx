import type { Metadata } from 'next';
import { ArrowUpRight, Building2, FileSearch, Layers3, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

const siteUrl = 'https://imi.ge';

export const metadata: Metadata = {
  title: 'Urbania: AI საკადასტრო და ურბანული აუდიტი',
  description: 'Urbania არის AI-ზე დაფუძნებული ურბანული და საკადასტრო აუდიტის workspace საქართველოში: მიწის ნაკვეთის, ზონირების, K1/K2/K3 და საინვესტიციო რისკების ანალიზი.',
  keywords: ['Urbania', 'საკადასტრო აუდიტი', 'მიწის ნაკვეთის ანალიზი', 'ზონირება', 'K1 K2 K3', 'უძრავი ქონების AI', 'ურბანული დაგეგმარება', 'კადასტრის კოდი'],
  alternates: { canonical: '/ka/projects/urbania' },
  openGraph: { title: 'Urbania: AI საკადასტრო და ურბანული აუდიტი', description: 'ჭკვიანი workspace მიწის, ზონირების და უძრავი ქონების საინვესტიციო შეფასებისთვის.' },
};

const perspectives = [
  { icon: Building2, title: 'Developer View', text: 'განაშენიანების შესაძლებლობა, ფუნქციური ზონა, K1/K2/K3 კოეფიციენტები და პროექტის საწყისი შეზღუდვები ერთ სამუშაო კონტექსტში.' },
  { icon: Layers3, title: 'Architect View', text: 'ნაკვეთის გეომეტრია, ლოკაცია, ურბანული რეგულაციები და საპროექტო გადაწყვეტილებისთვის საჭირო სივრცითი სიგნალები.' },
  { icon: FileSearch, title: 'Investor View', text: 'საკადასტრო, იურიდიული და მუნიციპალური რისკების სტრუქტურირებული სურათი საინვესტიციო გადაწყვეტილებამდე.' },
];

const workflow = [
  ['01', 'შეიყვანეთ საკადასტრო კოდი', 'Urbania აგროვებს ნაკვეთის იდენტიფიკაციისა და ლოკაციის მთავარ მონაცემებს.'],
  ['02', 'AI აერთიანებს კონტექსტს', 'საკადასტრო, გეომეტრიული, ურბანული და საჯარო რეესტრის მონაცემები ერთიანდება ერთ ანალიზში.'],
  ['03', 'მიიღეთ რისკები და შესაძლებლობები', 'შედეგი იყოფა დეველოპერის, არქიტექტორისა და ინვესტორისთვის გამოსადეგ ხედვებად.'],
];

export default async function UrbaniaProjectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Urbania',
    url: 'https://urbania.ge',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'ka-GE',
    description: 'AI-ზე დაფუძნებული ურბანული და საკადასტრო აუდიტის workspace საქართველოში.',
    featureList: ['საკადასტრო და იურიდიული აუდიტი', 'ზონირების ანალიზი', 'K1, K2 და K3 კოეფიციენტები', 'Developer, Architect და Investor View'],
    provider: { '@type': 'Organization', name: 'IMI.GE', url: siteUrl },
    areaServed: { '@type': 'Country', name: 'საქართველო' },
  };
  return <div className="relative overflow-hidden pt-32 pb-24"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }} /><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-50" />
    <section className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8"><div><p className="text-xs font-bold tracking-[.22em] text-cyan-300">URBANIA / AI FOR EVERYONE</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.1] text-white sm:text-6xl">მიწის ნაკვეთის სრული კონტექსტი, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-emerald-300">ერთ AI workspace-ში.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">Urbania არის ხელოვნურ ინტელექტზე დაფუძნებული ურბანული და საკადასტრო აუდიტის პლატფორმა. ის აერთიანებს რუკას, ჩატს და სტრუქტურირებულ ანალიზს, რათა სამშენებლო ან საინვესტიციო გადაწყვეტილება უფრო სწრაფად და მტკიცებულებებზე დაფუძნებით მიიღოთ.</p><a href="https://chat.urbania.ge/c/4b48e8fb-8447-4b7a-b130-1c069cc6a76d" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#080914] transition hover:bg-cyan-100">Urbania workspace-ის ნახვა <ArrowUpRight size={18} /></a></div>
      <div className="glass-panel rounded-[2rem] p-7 sm:p-8"><div className="flex items-center gap-3 border-b border-white/10 pb-5"><MapPinned className="text-cyan-200" /><div><p className="font-bold text-white">Parcel intelligence</p><p className="text-xs text-slate-400">კადასტრი → ზონირება → გადაწყვეტილება</p></div></div><div className="mt-6 space-y-3"><div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">საკადასტრო კოდი, ფართობი, გეომეტრია და ლოკაცია</div><div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-emerald-50">ფუნქციური ზონა, K1/K2/K3 და მუნიციპალური შეზღუდვები</div><div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm text-cyan-50">დეველოპერის, არქიტექტორისა და ინვესტორის ხედვები</div></div></div></section>
    <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">THREE DECISION LENSES</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">ერთი ნაკვეთი, სამი პროფესიული პერსპექტივა.</h2><div className="mt-12 grid gap-5 lg:grid-cols-3">{perspectives.map(({ icon: Icon, title, text }) => <article key={title} className="glass-panel rounded-3xl p-7"><Icon className="text-cyan-200" size={26}/><h3 className="mt-10 text-xl font-bold text-white">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-300">{text}</p></article>)}</div></section>
    <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8"><div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-8 sm:p-10"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">AUDIT WORKFLOW</p><h2 className="mt-4 text-3xl font-bold text-white">სწრაფი შეფასება, სიღრმისეული კონტექსტი.</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{workflow.map(([number, title, text]) => <div key={number}><p className="text-lg font-bold text-cyan-200">{number}</p><h3 className="mt-6 font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></div>)}</div></div></section>
    <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8"><div className="rounded-[2rem] border border-emerald-300/25 bg-emerald-400/10 p-8 sm:p-12"><Sparkles className="text-emerald-200"/><h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-5xl">უძრავი ქონების გადაწყვეტილება იწყება სწორად წაკითხული მონაცემით.</h2><p className="mt-5 max-w-2xl leading-8 text-slate-200">Urbania ამცირებს ხელით მოძიებასა და ფრაგმენტულ შემოწმებებზე დახარჯულ დროს, რათა ნაკვეთის რისკები და პოტენციალი გადაწყვეტილების მიღებამდე იყოს ხილული.</p></div></section>
  </div>;
}
