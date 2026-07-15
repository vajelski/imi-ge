import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import FAQStructuredData from '@/components/FAQStructuredData';
import HomeExperience from '@/components/HomeExperience';

export const metadata: Metadata = { title: 'AI სისტემები ბიზნესისთვის საქართველოში', description: 'IMI.GE ქმნის ქართულენოვან AI სისტემებს: AI CRM, ხმოვანი ასისტენტები, RAG და ბიზნეს ავტომატიზაცია.' };

const questions = [
  { question: 'რით იწყება AI ინტეგრაცია?', answer: 'ერთ კონკრეტულ პროცესით, სადაც დრო, კონტექსტი ან შემოსავალი ყველაზე ხშირად იკარგება.' },
  { question: 'შეუძლია AI-ს ქართულად მუშაობა?', answer: 'დიახ. სისტემას ვარგებთ ქართულ ენას, თქვენს ტერმინოლოგიასა და ბიზნეს წესებს.' },
  { question: 'როგორ იცავთ მონაცემს?', answer: 'წვდომა, ცოდნის წყარო და ადამიანის დამტკიცების ეტაპი განისაზღვრება პროექტის დასაწყისშივე.' },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale === 'en') return <HomeExperience locale="en" />;
  return <><FAQStructuredData items={questions} /><HomeExperience locale="ka" /></>;
}
