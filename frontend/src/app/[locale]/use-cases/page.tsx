import type { Metadata } from 'next';
import { ArrowUpRight, Building2, Headphones, Landmark, ShoppingBag, Stethoscope, Warehouse } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { localizedMetadata } from '@/lib/seo/metadata';

const useCases = [
  {
    icon: Building2,
    title: 'კორპორაციული ოპერაციები',
    description: 'ერთიან მონაცემთა ფენაში ვაერთიანებთ CRM-ს, დოკუმენტებსა და შიდა პროცესებს, რათა გუნდმა გადაწყვეტილება წუთებში მიიღოს.',
    outcome: 'ნაკლები ხელით შესრულებული სამუშაო და გამჭვირვალე ოპერაციები',
  },
  {
    icon: Warehouse,
    title: 'ლოგისტიკა და საველე ოპერაციები',
    description: 'AI იღებს შეკვეთას, ამოწმებს სტატუსს, აერთიანებს ოპერაციულ მონაცემს და გუნდს მხოლოდ გამონაკლისი შემთხვევებით ტვირთავს.',
    outcome: 'სწრაფი კოორდინაცია, ნაკლები შეცდომა და სრული ოპერაციული ხილვადობა',
  },
  {
    icon: Stethoscope,
    title: 'ჯანდაცვა და პროფესიული სერვისები',
    description: 'კონტროლირებულ ცოდნის ფენაში გაერთიანებული წესები, დოკუმენტები და მომსახურების სცენარები ამცირებს ინფორმაციის ძიებაზე დახარჯულ დროს.',
    outcome: 'კონფიდენციალური პროცესები, თანმიმდევრული პასუხები და მაღალი ხარისხის მომსახურება',
  },
  {
    icon: Headphones,
    title: 'კლიენტების მომსახურება',
    description: 'ქართული ენის AI ხმოვანი აგენტები და ჩატბოტები პასუხობენ მოთხოვნებს, ახდენენ კვალიფიკაციას და რთულ შემთხვევებს სწორ გუნდთან გზავნიან.',
    outcome: '24/7 მომსახურება ყოველგვარი ხარისხის კომპრომისის გარეშე',
  },
  {
    icon: ShoppingBag,
    title: 'გაყიდვები და ელექტრონული კომერცია',
    description: 'პერსონალიზებული შეთავაზებები, ლიდების შეფასება და ავტომატური follow-up სცენარები ზრდის კონვერსიას გაყიდვების გუნდის გადატვირთვის გარეშე.',
    outcome: 'უფრო სწრაფი რეაგირება და მეტი შემოსავალი არსებული ტრაფიკიდან',
  },
  {
    icon: Landmark,
    title: 'ფინანსები და რეგულირებული სფეროები',
    description: 'უსაფრთხო RAG სისტემები აძლევს თანამშრომლებს კონტროლირებულ წვდომას შიდა პოლიტიკებზე, კონტრაქტებსა და ცოდნის ბაზაზე.',
    outcome: 'დაცული ცოდნის ძიება, აუდიტის კვალით და როლებზე დაფუძნებული წვდომით',
  },
];
const englishUseCases = [
  { icon: Building2, title: 'Corporate operations', description: 'Unify CRM, documents, and internal processes so teams can reach decisions faster.', outcome: 'Less manual work and clearer operations' },
  { icon: Warehouse, title: 'Logistics and field operations', description: 'AI receives requests, checks status, combines operational data, and escalates only exceptions.', outcome: 'Faster coordination and fewer errors' },
  { icon: Stethoscope, title: 'Healthcare and professional services', description: 'Controlled knowledge access reduces time spent searching rules, documents, and service scenarios.', outcome: 'Consistent answers with controlled access' },
  { icon: Headphones, title: 'Customer support', description: 'Voice agents and chatbots answer questions, qualify requests, and route complex cases to the right team.', outcome: 'Always-on service without losing quality' },
  { icon: ShoppingBag, title: 'Sales and ecommerce', description: 'Personalized offers, lead scoring, and automated follow-up help teams respond faster.', outcome: 'Faster response and better use of existing traffic' },
  { icon: Landmark, title: 'Finance and regulated industries', description: 'Secure RAG systems give staff controlled access to policies, contracts, and internal knowledge.', outcome: 'Auditable knowledge access with role-based controls' },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata({ locale, path: '/use-cases', title: { ka: 'AI გამოყენების სფეროები', en: 'AI use cases for real business operations' }, description: { ka: 'კორპორაციული AI ინტეგრაციები გაყიდვებისთვის, მომსახურებისთვის, ოპერაციებისთვის და რეგულირებული ინდუსტრიებისთვის.', en: 'Corporate AI integrations for sales, service, operations, and regulated industries.' } });
}

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const english = locale === 'en';
  const activeUseCases = english ? englishUseCases : useCases;

  return (
    <div className="relative overflow-hidden pt-32 pb-24">
      <div className="ai-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-primary">{english ? 'AI IN PRACTICE / 2026' : 'AI პრაქტიკაში / 2026'}</p>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 dark:text-white sm:text-6xl">
          {english ? 'AI that works inside real business processes.' : 'AI, რომელიც რეალურ ბიზნეს-პროცესებში მუშაობს.'}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {english ? 'We do not build isolated demos. We design integrations that connect your data, teams, and customer experience into one working system.' : 'არ ვქმნით იზოლირებულ დემოებს. ვაპროექტებთ ინტეგრაციებს, რომლებიც თქვენს მონაცემებს, გუნდებსა და მომხმარებლის გამოცდილებას ერთ სამუშაო სისტემად აერთიანებს.'}
        </p>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-5 px-6 md:grid-cols-2 lg:px-8">
        {activeUseCases.map(({ icon: Icon, title, description, outcome }) => (
          <article key={title} className="glass-panel group rounded-3xl p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/60">
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-cyan-700 dark:text-cyan-200 neon-ring">
              <Icon size={23} />
            </div>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
            <p className="mt-7 border-t border-slate-900/10 pt-5 text-sm font-semibold text-cyan-800 dark:border-white/10 dark:text-cyan-100">{outcome}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
        <div className="glass-panel flex flex-col justify-between gap-8 rounded-3xl p-8 md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{english ? 'YOUR OPERATING MODEL' : 'თქვენი სამუშაო მოდელი'}</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-950 dark:text-white">{english ? 'Plan your first AI workflow.' : 'დავგეგმოთ თქვენი პირველი AI workflow.'}</h2>
          </div>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#090a12] transition hover:bg-cyan-100">
             {english ? 'Strategy consultation' : 'სტრატეგიული კონსულტაცია'} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
