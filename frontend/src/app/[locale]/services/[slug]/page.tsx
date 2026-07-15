import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, LockKeyhole, MessageSquareText, Network, Sparkles } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const services = {
  'ai-voice-agents': { eyebrow: 'ხმოვანი AI', title: 'თქვენი ბრენდის ხმა, რომელიც ნებისმიერ დროს პასუხობს.', description: 'ვქმნით ქართულ და მრავალენოვან ხმოვან AI ასისტენტებსა და ჩატბოტებს, რომლებიც საუბრობენ ბუნებრივად, მართავენ დიალოგს და საჭირო კონტექსტს სწორ გუნდამდე მიჰყავთ.', outcomes: ['24/7 პასუხი და კვალიფიკაცია', 'გაყიდვებისა და CRM ინტეგრაცია', 'ხარისხის კონტროლი და ანალიტიკა'] },
  'rag-internal-ai': { eyebrow: 'ცოდნის AI / RAG', title: 'კომპანიის ცოდნა, რომელსაც თქვენი გუნდი რეალურ დროში იყენებს.', description: 'შიდა AI ასისტენტი აერთიანებს წესებს, ხელშეკრულებებს, ოპერაციულ დოკუმენტაციასა და CRM მონაცემებს ერთი დაცული, წყაროზე მიბმული გამოცდილებისთვის.', outcomes: ['დოკუმენტებზე დაფუძნებული პასუხები', 'წვდომა როლებისა და უფლებების მიხედვით', 'უსაფრთხო ცოდნის ძიება'] },
  'business-automation': { eyebrow: 'ოპერაციული AI', title: 'განმეორებადი ოპერაციები გადააბარეთ AI აგენტებს.', description: 'ვაპროექტებთ სამუშაო პროცესებს, რომლებიც ამოწმებს მონაცემს, ქმნის ჩანაწერს, გზავნის შეტყობინებას, ამუშავებს დოკუმენტს და რთულ შემთხვევას ადამიანთან აბრუნებს.', outcomes: ['გაყიდვები და ლიდების გადანაწილება', 'დოკუმენტებისა და მოთხოვნების დამუშავება', 'SLA და გამონაკლისების კონტროლი'] },
  'ai-native-web': { eyebrow: 'AI-ზე დაფუძნებული ვებ-პროდუქტი', title: 'ციფრული პროდუქტი, სადაც AI არქიტექტურის ნაწილია.', description: 'ვქმნით სწრაფ, SEO-ძლიერ ვებ-გამოცდილებებსა და ვებ-აპლიკაციებს, რომლებიც AI-ს, მონაცემებსა და კონვერსიის სამუშაო პროცესებს ერთ წარმოების სისტემაში აერთიანებს.', outcomes: ['პროდუქტის სტრატეგია და UX', 'AI-სთვის მზად backend არქიტექტურა', 'Core Web Vitals და ანალიტიკა'] },
  'ai-crm-integration': { eyebrow: 'AI CRM ინტეგრაცია', title: 'არსებული CRM აქციეთ გაყიდვების ინტელექტის სისტემად.', description: 'ვაერთიანებთ AI-ს თქვენს არსებულ CRM-სა და კომუნიკაციის არხებთან, რომ ლიდების შეფასება, კონტექსტის შეგროვება, follow-up და მომდევნო ნაბიჯის შერჩევა ავტომატურად და გამჭვირვალედ მუშაობდეს.', outcomes: ['ლიდების AI შეფასება', 'შეთავაზებული მომდევნო ნაბიჯი', 'CRM ჩანაწერების ავტომატური გამდიდრება'] },
  'ai-first-crm': { eyebrow: 'CRM ტრანსფორმაცია', title: 'გადაიყვანეთ კომპანია AI-first CRM ოპერაციულ მოდელზე.', description: 'ვგეგმავთ CRM-ის სრულ გარდაქმნას: პროცესების აღმოჩენიდან მონაცემის მიგრაციამდე, ინტეგრაციებიდან AI აგენტებამდე. შედეგია სისტემა, რომელიც გაყიდვებს, მომსახურებასა და ოპერაციებს ერთ კონტექსტში მართავს.', outcomes: ['CRM არქიტექტურის გეგმა', 'მონაცემის მიგრაცია და ხარისხი', 'AI სამუშაო პროცესები თავიდანვე'] },
  'sales-intelligence': { eyebrow: 'გაყიდვების ინტელექტი', title: 'გაყიდვების გუნდი გადაწყვეტილებას უკეთესი სიგნალებით იღებს.', description: 'AI აანალიზებს ლიდების, კომუნიკაციისა და CRM მონაცემს, რათა გუნდი ფოკუსირდეს გარიგებებზე, სადაც რეალური პოტენციალი ან რისკი ჩანს.', outcomes: ['გარიგების რისკის სიგნალები', 'გაყიდვების პროგნოზი', 'მომდევნო საუკეთესო მოქმედება'] },
  'ai-governance': { eyebrow: 'AI უსაფრთხოება', title: 'AI დანერგვა, რომელსაც თქვენი კომპანია მართავს.', description: 'AI სისტემის სანდოობა იწყება წესებით: ვის აქვს წვდომა, რომელი მონაცემი გამოიყენება, როგორ იზომება პასუხის ხარისხი და როდის ერთვება ადამიანი გადაწყვეტილებაში.', outcomes: ['მონაცემისა და წვდომის პოლიტიკა', 'ხარისხისა და რისკის კონტროლი', 'ადამიანის დამტკიცების წესები'] },
} as const;

type ServiceSlug = keyof typeof services;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  return service ? { title: service.title, description: service.description } : {};
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = services[slug as ServiceSlug];
  if (!service) notFound();
  return <div className="relative overflow-hidden pt-32 pb-24"><div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-40"/><section className="mx-auto max-w-5xl px-6 lg:px-8"><p className="text-xs font-bold tracking-[.2em] text-cyan-700 dark:text-cyan-300">{service.eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">{service.title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{service.description}</p><div className="mt-10 flex flex-wrap gap-3"><Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white dark:bg-white dark:text-slate-950">დაიწყეთ კონსულტაციით <ArrowUpRight size={18}/></Link><Link href="/projects" className="inline-flex items-center gap-2 rounded-xl border border-slate-900/15 px-6 py-4 text-sm font-bold text-slate-950 dark:border-white/15 dark:text-white">ნახეთ ჩვენი პროდუქტები</Link></div></section><section className="mx-auto mt-20 grid max-w-5xl gap-5 px-6 md:grid-cols-3 lg:px-8">{service.outcomes.map((outcome, index) => { const Icon = [MessageSquareText, Network, LockKeyhole][index]; return <div key={outcome} className="glass-panel rounded-3xl p-6"><Icon size={23} className="text-cyan-700 dark:text-cyan-200"/><h2 className="mt-8 text-lg font-bold text-slate-950 dark:text-white">{outcome}</h2><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">გამოსავალი ერგება თქვენს არსებულ პროცესებს, მონაცემთა წესებსა და გუნდის მუშაობის მოდელს.</p></div>})}</section><section className="mx-auto mt-20 max-w-5xl px-6 lg:px-8"><div className="glass-panel rounded-[2rem] p-8 sm:p-10"><Sparkles className="text-primary"/><h2 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">დანერგვა იწყება მკაფიო საზომით.</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{['პროცესის აღმოჩენა', 'უსაფრთხო არქიტექტურა', 'პილოტი და მასშტაბირება'].map((step) => <div key={step} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"><Check size={17} className="text-cyan-700 dark:text-cyan-200"/>{step}</div>)}</div></div></section></div>;
}
