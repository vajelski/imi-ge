import React from 'react';
import { Brain, MessageSquareCode, BarChart3, Smartphone, Globe, Code2, ArrowUpRight, Cpu, Layout, Search, Hammer, ShieldCheck, Zap, Database } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SEO from './SEO';

const allServices = [
  {
    category: "ვებ & მობაილ დეველოპმენტი",
    items: [
      {
        title: 'ვებ-გვერდების დამზადება',
        description: 'თანამედროვე, სწრაფი და SEO-ზე მორგებული ვებ-გვერდები. E-commerce, კორპორატიული საიტები და ლენდინგები.',
        icon: Layout,
        price: 'დეტალურად',
        link: '/consultation'
      },
      {
        title: 'მობილური აპლიკაციები',
        description: 'iOS და Android აპლიკაციების შექმნა (React Native / Flutter). ინტუიციური UI/UX დიზაინი და მაღალი წარმადობა.',
        icon: Smartphone,
        price: 'დეტალურად',
        link: '/consultation'
      },
      {
        title: 'AI ვებ-მშენებელი',
        description: 'თქვენი იდეიდან მზა კოდამდე. ჩვენი AI წერს სუფთა React/Tailwind კოდს თქვენი აღწერილობის მიხედვით.',
        icon: Hammer,
        price: 'დეტალურად',
        link: '/services/ai-native-web'
      }
    ]
  },
  {
    category: "AI & ავტომატიზაცია",
    items: [
      {
        title: 'ქართული AI ასისტენტები',
        description: 'თქვენს ბიზნესზე მორგებული ჩატბოტები, რომლებიც საუბრობენ გამართული ქართულით და ემსახურებიან კლიენტებს 24/7.',
        icon: MessageSquareCode,
        price: 'დეტალურად',
        link: '/assistant'
      },
      {
        title: 'AI ავტომატიზაცია',
        description: 'რუტინული პროცესების ავტომატიზაცია ხელოვნური ინტელექტის გამოყენებით. CRM და ERP სისტემების ინტეგრაცია.',
        icon: Brain,
        price: 'დეტალურად',
        link: '/consultation'
      },
      {
        title: 'მონაცემთა ანალიტიკა',
        description: 'დიდი მონაცემების (Big Data) დამუშავება და პროგნოზირებადი მოდელების შექმნა ბიზნესისთვის.',
        icon: BarChart3,
        price: 'დეტალურად',
        link: '/consultation'
      }
    ]
  },
  {
    category: "აუდიტი & ოპტიმიზაცია",
    items: [
      {
        title: 'AI საიტის აუდიტი',
        description: 'სრული ტექნიკური და SEO ანალიზი ხელოვნური ინტელექტის გამოყენებით. აღმოაჩინეთ ხარვეზები წამებში.',
        icon: Search,
        price: 'დეტალურად',
        link: '/ai-readiness'
      },
      {
        title: 'SEO & ციფრული მარკეტინგი',
        description: 'საიტის დაწინაურება Google-ის საძიებო სისტემაში და ტექნიკური ოპტიმიზაცია (PageSpeed 100%).',
        icon: Globe,
        price: 'დეტალურად',
        link: '/consultation'
      },
      {
        title: 'კიბერუსაფრთხოება',
        description: 'სისტემების დაცვა შეტევებისგან, სისუსტეების აღმოჩენა და უსაფრთხოების სტანდარტების დანერგვა.',
        icon: ShieldCheck,
        price: 'დეტალურად',
        link: '/consultation'
      }
    ]
  }
];

const AllServices: React.FC = () => {
  return (
    <section className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
      <SEO title="All Services — IMI.GE" description="Explore our full range of services including AI integration, custom software, and SEO." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-24">
          <h2 className="text-primary font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4">ჩვენი სერვისები</h2>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest">
            სრული ციფრული <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">კატალოგი</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-sans font-light max-w-3xl mx-auto">
            ყველაფერი, რაც თქვენს ბიზნესს სჭირდება ციფრული ტრანსფორმაციისთვის - ერთ სივრცეში.
          </p>
        </div>

        <div className="space-y-32">
          {allServices.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-grow bg-gray-200 dark:bg-white/10"></div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 dark:text-white uppercase tracking-wider px-4">
                  {category.category}
                </h2>
                <div className="h-px flex-grow bg-gray-200 dark:bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((service, sIdx) => {
                  const Icon = service.icon;
                  return (
                    <Link key={sIdx} href={service.link} className="group relative h-full block">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative h-full glass-panel rounded-[2rem] p-8 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-500 border border-gray-200 dark:border-white/10 group-hover:border-primary/30 flex flex-col hover:-translate-y-2 shadow-lg dark:shadow-none">

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-white/10 dark:to-white/5 rounded-2xl flex items-center justify-center mb-6 border border-primary/10 dark:border-white/10 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                            <Icon className="w-7 h-7 text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                          </div>

                          <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors tracking-wide">
                            {service.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-sm flex-grow font-sans font-light tracking-wide">
                            {service.description}
                          </p>

                          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-white/5 mt-auto">
                            <span className="text-gray-900 dark:text-white font-heading font-bold text-xs tracking-wider bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/5 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                              {service.price}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:bg-primary hover:text-white transition-all group-hover:rotate-45 border border-gray-200 dark:border-white/5">
                              <ArrowUpRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AllServices;
