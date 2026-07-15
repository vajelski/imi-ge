import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FAQStructuredData from '@/components/FAQStructuredData';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { Link } from '@/i18n/routing';

const questions = [
  ['რა არის IMI.GE?', 'IMI.GE არის ქართული AI სისტემების კომპანია, რომელიც ბიზნესისთვის ქმნის ხმოვან ასისტენტებს, RAG სისტემებს, AI CRM ინტეგრაციასა და სამუშაო პროცესების ავტომატიზაციას.'],
  ['შეუძლია AI-ს მომხმარებლის კითხვებზე ქართულად პასუხი?', 'დიახ. სისტემას ვარგებთ ქართულ ენას, კომპანიის ტერმინოლოგიასა და მომსახურების წესებს.'],
  ['რით განსხვავდება RAG ჩვეულებრივი ჩატბოტისგან?', 'RAG პასუხს კომპანიის დამტკიცებული დოკუმენტებიდან და ცოდნის წყაროებიდან ამზადებს, რათა პასუხი კონტროლირებადი და დასაბუთებული იყოს.'],
  ['შეიძლება თუ არა AI არსებულ CRM-ში ინტეგრირდეს?', 'დიახ. AI შეიძლება დაეხმაროს ლიდების შეფასებას, კონტექსტის აღრიცხვას და მომდევნო მოქმედების შერჩევას არსებულ CRM პროცესში.'],
  ['როგორ იწყება AI პროექტი?', 'პროექტი იწყება კონკრეტული პროცესის, მონაცემების, უსაფრთხოების საზღვრისა და მოსალოდნელი შედეგის შეფასებით.'],
  ['როგორ კონტროლდება AI პასუხის ხარისხი?', 'წინასწარ განისაზღვრება ცოდნის წყარო, ხარისხის შემოწმება, გამონაკლისების პროცესი და ადამიანის ჩართულობის ეტაპები.'],
  ['არის თუ არა API დოკუმენტაცია საჯაროდ ხელმისაწვდომი?', 'API შესაძლებლობები განისაზღვრება კონკრეტული პროდუქტისა და ინტეგრაციის ამოცანის მიხედვით. საჯარო API დოკუმენტაცია გამოქვეყნდება მხოლოდ დამტკიცებული ინტერფეისის არსებობის შემთხვევაში.'],
  ['სად შეიძლება კონსულტაციის დაჯავშნა?', 'კონსულტაციის მოთხოვნა შეგიძლიათ დატოვოთ IMI.GE-ის საკონტაქტო ფორმიდან.'],
];

export const metadata: Metadata = { title: 'ხშირი კითხვები AI სისტემებზე', description: 'პასუხები IMI.GE-ის AI ასისტენტებზე, RAG-ზე, AI CRM ინტეგრაციასა და ბიზნეს ავტომატიზაციაზე.' };

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = questions.map(([question, answer]) => ({ question, answer }));
  return <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-8"><BreadcrumbStructuredData locale={locale} items={[{ name: 'მთავარი', path: '' }, { name: 'ხშირი კითხვები', path: '/faq' }]} /><FAQStructuredData items={items}/><p className="font-heading text-xs font-bold tracking-[.16em] text-primary">AI კითხვები და პასუხები</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em] text-slate-950 dark:text-white sm:text-6xl">AI სისტემებზე ხშირად დასმული კითხვები</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">პასუხები ეფუძნება IMI.GE-ის საჯარო სერვისებსა და implementation მიდგომას.</p><div className="mt-12 divide-y divide-black/15 border-y border-black/15 dark:divide-white/15 dark:border-white/15">{questions.map(([question, answer]) => <section key={question} className="py-7"><h2 className="font-heading text-lg font-bold text-slate-950 dark:text-white">{question}</h2><p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{answer}</p></section>)}</div><Link href="/consultation" className="font-heading mt-10 inline-flex rounded-full bg-black px-6 py-4 text-sm font-bold text-white dark:bg-white dark:text-black">დაიწყეთ კონსულტაციით</Link></main>;
}
