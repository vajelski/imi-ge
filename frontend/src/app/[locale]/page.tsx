import type { Metadata } from 'next';
import { ArrowUpRight, Bot, ChevronRight, Mic, Search, Workflow } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import FAQStructuredData from '@/components/FAQStructuredData';
import EnglishHome from '@/components/EnglishHome';

export const metadata: Metadata = { title: 'AI სისტემები ბიზნესისთვის საქართველოში', description: 'IMI.GE ქმნის ქართულენოვან AI სისტემებს: AI CRM, ხმოვანი ასისტენტები, RAG და ბიზნეს ავტომატიზაცია.' };

const capabilities = [
  { icon: Mic, title: 'ხმოვანი AI', text: 'მომხმარებელთან საუბარი, კვალიფიკაცია და სწორი გადამისამართება.' },
  { icon: Search, title: 'ცოდნის სისტემა', text: 'კომპანიის დოკუმენტები და მონაცემები ერთ სანდო პასუხში.' },
  { icon: Bot, title: 'AI CRM', text: 'ლიდები, context და მომდევნო ნაბიჯი ერთ ოპერაციულ ფენაში.' },
  { icon: Workflow, title: 'ავტომატიზაცია', text: 'განმეორებადი პროცესები სრულდება წესებით და კონტროლით.' },
];

const questions = [
  { question: 'რით იწყება AI ინტეგრაცია?', answer: 'ერთ კონკრეტულ პროცესით, სადაც დრო, კონტექსტი ან შემოსავალი ყველაზე ხშირად იკარგება.' },
  { question: 'შეუძლია AI-ს ქართულად მუშაობა?', answer: 'დიახ. სისტემას ვარგებთ ქართულ ენას, თქვენს ტერმინოლოგიასა და ბიზნეს წესებს.' },
  { question: 'როგორ იცავთ მონაცემს?', answer: 'წვდომა, ცოდნის წყარო და ადამიანის დამტკიცების ეტაპი განისაზღვრება პროექტის დასაწყისშივე.' },
];

const products = [
  ['Ertaoza', 'ქართული voice AI'],
  ['CORD.GE', 'ხმის პლატფორმა'],
  ['Urbania', 'ურბანული AI აუდიტი'],
  ['Breeding.ge', 'მონაცემებზე დაფუძნებული ბაზარი'],
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') return <EnglishHome />;

  return <main><FAQStructuredData items={questions} />
    <section className="bg-white px-5 pb-20 pt-32 text-[#171717] dark:bg-[#050505] dark:text-[#f7f7f7] sm:px-8 lg:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="font-heading text-xs font-bold tracking-[.16em] text-neutral-500 dark:text-neutral-400">IMI.GE / ხელოვნური ინტელექტი ბიზნესისთვის</p>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.95] tracking-[-.06em] sm:text-7xl xl:text-8xl">რომელი პროცესი გინდა, რომ <span className="text-neutral-400 dark:text-neutral-500">ხვალ</span> უფრო ჭკვიანად მუშაობდეს?</h1>
            <p className="mt-9 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">IMI.GE ქმნის AI სისტემებს, რომლებიც ერთიანდება თქვენს მომხმარებლებთან, ცოდნასთან, CRM-სა და ყოველდღიურ ოპერაციებთან.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link href="/consultation" className="font-heading inline-flex items-center justify-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-bold text-white transition hover:bg-neutral-700 dark:bg-white dark:text-black">დაიწყეთ კონსულტაციით <ArrowUpRight size={18} /></Link><Link href="/services" className="font-heading inline-flex items-center justify-center gap-3 rounded-full border border-black/20 px-6 py-4 text-sm font-bold transition hover:bg-black hover:text-white dark:border-white/25 dark:hover:bg-white dark:hover:text-black">შეისწავლეთ სერვისები <ChevronRight size={18} /></Link></div>
          </div>
          <div className="rounded-[2rem] border border-black/15 bg-[#f4f4f4] p-5 dark:border-white/15 dark:bg-[#171717]">
            <div className="grid gap-4 sm:grid-cols-[1.1fr_.9fr]">
              <div className="rounded-[1.5rem] border border-black/10 bg-white p-5 text-[#171717] dark:border-white/10 dark:bg-[#0d0d0d] dark:text-white">
                <p className="font-heading text-xs font-bold tracking-[.14em] text-neutral-500">თქვენი AI სამუშაო სივრცე</p>
                <blockquote className="mt-8 max-w-[28rem] text-lg font-medium leading-[1.55] tracking-[-.02em] sm:text-xl">„გვჭირდება სისტემა, რომელიც გაყიდვების მოთხოვნას გაიგებს და სწორ ადამიანთან გადაამისამართებს.“</blockquote>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 text-sm text-neutral-500 dark:border-white/10"><span>AI CRM / გაყიდვები</span><span className="font-heading text-[#171717] dark:text-white">მოქმედება მზადაა</span></div>
              </div>
              <div className="undraw-hero-illustration overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#ececec] p-3 dark:border-white/10 dark:bg-[#202020]"><img src="https://cdn.undraw.co/illustration/tech-keynote_ytf3.svg" alt="AI სამუშაო სივრცის ილუსტრაცია" loading="eager" decoding="async" /></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-black p-4 text-white dark:bg-white dark:text-black"><p className="font-heading text-xs font-bold">კონტექსტი</p><p className="mt-6 text-sm">CRM, ზარები და შეტყობინებები.</p></div><div className="rounded-2xl border border-black/10 p-4 text-[#171717] dark:border-white/10 dark:text-white"><p className="font-heading text-xs font-bold">კონტროლი</p><p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">ადამიანი რთულ გადაწყვეტილებას ამოწმებს.</p></div></div>
          </div>
        </div>
      </div>
    </section>
    <section className="border-y border-black/10 bg-[#f4f4f4] px-5 py-20 dark:border-white/10 dark:bg-[#111111] sm:px-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-.04em] text-[#171717] dark:text-white sm:text-5xl">AI არ არის ცალკე ინსტრუმენტი. ის თქვენი მუშაობის ახალი ინტერფეისია.</h2><Link href="/ai-readiness" className="font-heading text-sm font-bold text-[#171717] underline underline-offset-4 dark:text-white">AI მზადყოფნის შეფასება</Link></div><div className="mt-14 grid border-t border-black/15 dark:border-white/15 md:grid-cols-4">{capabilities.map(({ icon: Icon, title, text }, index) => <article key={title} className="border-b border-black/15 py-7 pr-8 dark:border-white/15 md:border-b-0 md:border-r md:px-7 first:pl-0 last:border-r-0"><span className="font-heading text-xs font-bold text-neutral-500">0{index + 1}</span><Icon className="mt-10" size={25} /><h3 className="mt-7 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{text}</p></article>)}</div></div></section>
    <section className="bg-black px-5 py-24 text-white sm:px-8"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-heading text-xs font-bold tracking-[.16em] text-neutral-400">როგორ ვმუშაობთ</p><h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-.04em]">მცირე პილოტი. რეალური შედეგი. შემდეგ მასშტაბირება.</h2></div><div className="grid gap-4 sm:grid-cols-3">{[['01', 'აღმოჩენა', 'ვპოულობთ კონკრეტულ ამოცანას.'], ['02', 'დანერგვა', 'ვაერთიანებთ მონაცემს და პროცესს.'], ['03', 'მფლობელობა', 'გუნდი იღებს მართვად სისტემას.']].map(([number, title, text]) => <div key={number} className="border-t border-white/25 pt-5"><p className="font-heading text-xs font-bold text-neutral-400">{number}</p><h3 className="mt-9 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-neutral-400">{text}</p></div>)}</div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="font-heading text-xs font-bold tracking-[.16em] text-neutral-500">პროდუქტები მოქმედებაში</p><h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] text-[#171717] dark:text-white">ციფრული პროდუქტები, რომლებსაც რეალური ამოცანა აქვთ.</h2></div><Link href="/projects" className="font-heading text-sm font-bold underline underline-offset-4">ყველა პროექტი</Link></div><div className="mt-12 grid gap-4 md:grid-cols-4">{products.map(([name, detail]) => <Link key={name} href={name === 'Urbania' ? '/projects/urbania' : '/projects'} className="group rounded-[1.75rem] border border-black/15 p-6 text-[#171717] transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"><p className="font-heading text-xs font-bold text-neutral-500 group-hover:text-neutral-300 dark:group-hover:text-neutral-600">IMI პროდუქტი</p><h3 className="mt-20 text-2xl font-semibold">{name}</h3><p className="mt-2 text-sm text-neutral-600 group-hover:text-neutral-300 dark:text-neutral-400 dark:group-hover:text-neutral-600">{detail}</p></Link>)}</div></section>
    <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8"><div className="border-t border-black/15 pt-12 dark:border-white/15"><p className="font-heading text-xs font-bold tracking-[.16em] text-neutral-500">ხშირი კითხვები</p><h2 className="mt-5 text-3xl font-semibold tracking-[-.04em] text-[#171717] dark:text-white">AI პროექტის დაწყებამდე</h2><div className="mt-8 divide-y divide-black/15 dark:divide-white/15">{questions.map(({ question, answer }) => <div key={question} className="py-6"><h3 className="font-heading font-bold text-[#171717] dark:text-white">{question}</h3><p className="mt-3 max-w-3xl leading-7 text-neutral-600 dark:text-neutral-400">{answer}</p></div>)}</div></div></section>
  </main>;
}
