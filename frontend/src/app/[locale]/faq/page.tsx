import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FAQStructuredData from '@/components/FAQStructuredData';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { Link } from '@/i18n/routing';
import { localizedMetadata } from '@/lib/seo/metadata';

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
const englishQuestions = [
  ['What is IMI.GE?', 'IMI.GE is a Georgian AI systems company building voice assistants, RAG systems, AI CRM integrations, and business automation.'],
  ['Can the AI answer customers in Georgian?', 'Yes. The system can be adapted to Georgian language, your terminology, and your service rules.'],
  ['How is RAG different from a regular chatbot?', 'RAG prepares answers from approved company documents and knowledge sources, making answers more grounded and controllable.'],
  ['Can AI integrate with an existing CRM?', 'Yes. AI can help score leads, capture context, and recommend next actions within an existing CRM process.'],
  ['How does an AI project start?', 'It starts with a specific process, available data, security boundaries, and an expected measurable outcome.'],
  ['How is answer quality controlled?', 'The knowledge source, quality checks, exception handling, and human approval points are defined before deployment.'],
  ['Is public API documentation available?', 'API capabilities depend on the specific product and integration scope. Public documentation is published only for approved interfaces.'],
  ['Where can I request a consultation?', 'You can submit a consultation request through the IMI.GE contact form.'],
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/faq', title: { ka: 'ხშირი კითხვები AI სისტემებზე', en: 'Frequently asked questions about AI systems' }, description: { ka: 'პასუხები IMI.GE-ის AI ასისტენტებზე, RAG-ზე, AI CRM ინტეგრაციასა და ბიზნეს ავტომატიზაციაზე.', en: 'Answers about IMI.GE AI assistants, RAG, AI CRM integration, and business automation.' } });
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const english = locale === 'en';
  const activeQuestions = english ? englishQuestions : questions;
  const items = activeQuestions.map(([question, answer]) => ({ question, answer }));
  return <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-8"><BreadcrumbStructuredData locale={locale} items={[{ name: english ? 'Home' : 'მთავარი', path: '' }, { name: english ? 'FAQ' : 'ხშირი კითხვები', path: '/faq' }]} /><FAQStructuredData items={items}/><p className="font-heading text-xs font-bold tracking-[.16em] text-primary">{english ? 'AI QUESTIONS AND ANSWERS' : 'AI კითხვები და პასუხები'}</p><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em] text-slate-950 dark:text-white sm:text-6xl">{english ? 'Frequently asked questions about AI systems' : 'AI სისტემებზე ხშირად დასმული კითხვები'}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{english ? 'Clear answers based on IMI.GE public services and implementation approach.' : 'პასუხები ეფუძნება IMI.GE-ის საჯარო სერვისებსა და დანერგვის მიდგომას.'}</p><div className="mt-12 divide-y divide-black/15 border-y border-black/15 dark:divide-white/15 dark:border-white/15">{activeQuestions.map(([question, answer]) => <section key={question} className="py-7"><h2 className="font-heading text-lg font-bold text-slate-950 dark:text-white">{question}</h2><p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{answer}</p></section>)}</div><Link href="/consultation" className="font-heading mt-10 inline-flex rounded-full bg-black px-6 py-4 text-sm font-bold text-white dark:bg-white dark:text-black">{english ? 'Start a consultation' : 'დაიწყეთ კონსულტაციით'}</Link></main>;
}
