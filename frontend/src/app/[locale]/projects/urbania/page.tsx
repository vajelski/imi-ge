import type { Metadata } from 'next';
import { ArrowUpRight, Building2, FileSearch, Layers3, MapPinned, Sparkles } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { localizedMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/constants';

type UrbaniaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  workspace: string;
  workspaceMeta: string;
  dataSteps: string[];
  lensEyebrow: string;
  lensTitle: string;
  perspectives: { title: string; text: string }[];
  workflowEyebrow: string;
  workflowTitle: string;
  workflow: { title: string; text: string }[];
  closingTitle: string;
  closingText: string;
};

const urbania: Record<'ka' | 'en', UrbaniaCopy> = {
  ka: {
    eyebrow: 'URBANIA / AI FOR EVERYONE',
    title: 'მიწის ნაკვეთის სრული კონტექსტი, ერთ AI workspace-ში.',
    description: 'Urbania არის ხელოვნურ ინტელექტზე დაფუძნებული ურბანული და საკადასტრო აუდიტის პლატფორმა. ის აერთიანებს რუკას, ჩატს და სტრუქტურირებულ ანალიზს, რათა სამშენებლო ან საინვესტიციო გადაწყვეტილება უფრო სწრაფად და მტკიცებულებებზე დაფუძნებით მიიღოთ.',
    workspace: 'Urbania workspace-ის ნახვა',
    workspaceMeta: 'კადასტრი → ზონირება → გადაწყვეტილება',
    dataSteps: ['საკადასტრო კოდი, ფართობი, გეომეტრია და ლოკაცია', 'ფუნქციური ზონა, K1/K2/K3 და მუნიციპალური შეზღუდვები', 'დეველოპერის, არქიტექტორისა და ინვესტორის ხედვები'],
    lensEyebrow: 'THREE DECISION LENSES',
    lensTitle: 'ერთი ნაკვეთი, სამი პროფესიული პერსპექტივა.',
    perspectives: [{ title: 'დეველოპერის ხედვა', text: 'განაშენიანების შესაძლებლობა, ფუნქციური ზონა, K1/K2/K3 კოეფიციენტები და პროექტის საწყისი შეზღუდვები ერთ სამუშაო კონტექსტში.' }, { title: 'არქიტექტორის ხედვა', text: 'ნაკვეთის გეომეტრია, ლოკაცია, ურბანული რეგულაციები და საპროექტო გადაწყვეტილებისთვის საჭირო სივრცითი სიგნალები.' }, { title: 'ინვესტორის ხედვა', text: 'საკადასტრო, იურიდიული და მუნიციპალური რისკების სტრუქტურირებული სურათი საინვესტიციო გადაწყვეტილებამდე.' }],
    workflowEyebrow: 'AUDIT WORKFLOW',
    workflowTitle: 'სწრაფი შეფასება, სიღრმისეული კონტექსტი.',
    workflow: [{ title: 'შეიყვანეთ საკადასტრო კოდი', text: 'Urbania აგროვებს ნაკვეთის იდენტიფიკაციისა და ლოკაციის მთავარ მონაცემებს.' }, { title: 'AI აერთიანებს კონტექსტს', text: 'საკადასტრო, გეომეტრიული, ურბანული და საჯარო რეესტრის მონაცემები ერთიანდება ერთ ანალიზში.' }, { title: 'მიიღეთ რისკები და შესაძლებლობები', text: 'შედეგი იყოფა დეველოპერის, არქიტექტორისა და ინვესტორისთვის გამოსადეგ ხედვებად.' }],
    closingTitle: 'უძრავი ქონების გადაწყვეტილება იწყება სწორად წაკითხული მონაცემით.',
    closingText: 'Urbania ამცირებს ხელით მოძიებასა და ფრაგმენტულ შემოწმებებზე დახარჯულ დროს, რათა ნაკვეთის რისკები და პოტენციალი გადაწყვეტილების მიღებამდე იყოს ხილული.',
  },
  en: {
    eyebrow: 'URBANIA / AI FOR EVERYONE',
    title: 'The full context of a parcel in one AI workspace.',
    description: 'Urbania is an AI workspace for cadastral and urban audit. It brings maps, conversation, and structured analysis together so construction and investment decisions can be made faster and with better evidence.',
    workspace: 'Open the Urbania workspace',
    workspaceMeta: 'CADASTRE → ZONING → DECISION',
    dataSteps: ['Cadastral code, area, geometry, and location', 'Functional zone, K1/K2/K3, and municipal constraints', 'Developer, architect, and investor perspectives'],
    lensEyebrow: 'THREE DECISION LENSES',
    lensTitle: 'One parcel, three professional perspectives.',
    perspectives: [{ title: 'Developer view', text: 'See development potential, functional zone, K1/K2/K3 coefficients, and initial project constraints in one working context.' }, { title: 'Architect view', text: 'Bring parcel geometry, location, urban regulations, and spatial signals needed for early design decisions together.' }, { title: 'Investor view', text: 'Build a structured picture of cadastral, legal, and municipal risks before an investment decision.' }],
    workflowEyebrow: 'AUDIT WORKFLOW',
    workflowTitle: 'Fast assessment, deeper context.',
    workflow: [{ title: 'Enter the cadastral code', text: 'Urbania collects the core identity and location data for the parcel.' }, { title: 'AI combines the context', text: 'Cadastral, geometric, urban, and public-registry signals are brought into one analysis.' }, { title: 'Receive risks and opportunities', text: 'The result is organized into views useful to developers, architects, and investors.' }],
    closingTitle: 'Real-estate decisions start with data that is read in context.',
    closingText: 'Urbania reduces time spent on manual searches and fragmented checks so parcel risk and potential are visible before the decision is made.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/projects/urbania', title: { ka: 'Urbania: AI საკადასტრო და ურბანული აუდიტი', en: 'Urbania: AI cadastral and urban audit' }, description: { ka: urbania.ka.description, en: urbania.en.description } });
}

export default async function UrbaniaProjectPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const language = locale === 'en' ? 'en' : 'ka';
  const copy = urbania[language];
  const applicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/${language}/projects/urbania#application`,
    name: 'Urbania',
    url: 'https://urbania.ge',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: language === 'en' ? 'en-US' : 'ka-GE',
    description: copy.description,
    featureList: copy.dataSteps,
    provider: { '@type': 'Organization', name: 'IMI.GE', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Georgia' },
  };
  return <div className="urbania-page relative overflow-hidden pt-32 pb-24"><BreadcrumbStructuredData locale={language} items={[{ name: language === 'en' ? 'Home' : 'მთავარი', path: '' }, { name: language === 'en' ? 'Projects' : 'პროექტები', path: '/projects' }, { name: 'Urbania', path: '/projects/urbania' }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }} /><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-50"/><section className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8"><div><p className="text-xs font-bold tracking-[.22em] text-cyan-300">{copy.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.1] text-white sm:text-6xl">{copy.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{copy.description}</p><a href="https://chat.urbania.ge/c/4b48e8fb-8447-4b7a-b130-1c069cc6a76d" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#080914] transition hover:bg-cyan-100">{copy.workspace} <ArrowUpRight size={18} /></a></div><div className="glass-panel rounded-[2rem] p-7 sm:p-8"><div className="flex items-center gap-3 border-b border-white/10 pb-5"><MapPinned className="text-cyan-200" /><div><p className="font-bold text-white">{language === 'en' ? 'Parcel intelligence' : 'Parcel intelligence'}</p><p className="text-xs text-slate-400">{copy.workspaceMeta}</p></div></div><div className="mt-6 space-y-3">{copy.dataSteps.map((step, index) => <div key={step} className={`rounded-2xl border p-4 text-sm ${index === 0 ? 'border-white/10 bg-black/20 text-slate-300' : index === 1 ? 'border-emerald-300/20 bg-emerald-400/10 text-emerald-50' : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-50'}`}>{step}</div>)}</div></div></section><section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">{copy.lensEyebrow}</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">{copy.lensTitle}</h2><div className="mt-12 grid gap-5 lg:grid-cols-3">{copy.perspectives.map(({ title, text }, index) => { const Icon = [Building2, Layers3, FileSearch][index]; return <article key={title} className="glass-panel rounded-3xl p-7"><Icon className="text-cyan-200" size={26}/><h3 className="mt-10 text-xl font-bold text-white">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-300">{text}</p></article>; })}</div></section><section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8"><div className="rounded-[2rem] border border-white/10 bg-white/[.035] p-8 sm:p-10"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">{copy.workflowEyebrow}</p><h2 className="mt-4 text-3xl font-bold text-white">{copy.workflowTitle}</h2><div className="mt-10 grid gap-6 md:grid-cols-3">{copy.workflow.map(({ title, text }, index) => <div key={title}><p className="text-lg font-bold text-cyan-200">0{index + 1}</p><h3 className="mt-6 font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{text}</p></div>)}</div></div></section><section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8"><div className="rounded-[2rem] border border-emerald-300/25 bg-emerald-400/10 p-8 sm:p-12"><Sparkles className="text-emerald-200"/><h2 className="mt-5 max-w-3xl text-3xl font-bold text-white sm:text-5xl">{copy.closingTitle}</h2><p className="mt-5 max-w-2xl leading-8 text-slate-200">{copy.closingText}</p></div></section></div>;
}
