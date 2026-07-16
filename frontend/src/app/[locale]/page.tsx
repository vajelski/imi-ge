import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FAQStructuredData from '@/components/FAQStructuredData';
import HomeExperience from '@/components/HomeExperience';
import { localizedMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/', title: { ka: 'AI სისტემები ბიზნესისთვის საქართველოში', en: 'AI systems for business in Georgia' }, description: { ka: 'IMI.GE ქმნის ქართულენოვან AI სისტემებს: AI CRM, ხმოვანი ასისტენტები, RAG და ბიზნეს ავტომატიზაცია.', en: 'IMI.GE builds Georgian-first AI systems: AI CRM, voice assistants, RAG, and business automation.' } });
}

const questions = [
  { question: 'რით იწყება AI ინტეგრაცია?', answer: 'ერთ კონკრეტულ პროცესით, სადაც დრო, კონტექსტი ან შემოსავალი ყველაზე ხშირად იკარგება.' },
  { question: 'შეუძლია AI-ს ქართულად მუშაობა?', answer: 'დიახ. სისტემას ვარგებთ ქართულ ენას, თქვენს ტერმინოლოგიასა და ბიზნეს წესებს.' },
  { question: 'როგორ იცავთ მონაცემს?', answer: 'წვდომა, ცოდნის წყარო და ადამიანის დამტკიცების ეტაპი განისაზღვრება პროექტის დასაწყისშივე.' },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') return <><FAQStructuredData items={[{ question: 'What does AI integration start with?', answer: 'One specific process where time, context, or revenue is being lost most often.' }, { question: 'Can AI work in Georgian?', answer: 'Yes. We adapt systems to Georgian language, your terminology, and your business rules.' }, { question: 'How do you protect data?', answer: 'Access, knowledge sources, and human approval points are defined at the start of the project.' }]} /><HomeExperience locale="en" /></>;
  return <><FAQStructuredData items={questions} /><HomeExperience locale="ka" /></>;
}
