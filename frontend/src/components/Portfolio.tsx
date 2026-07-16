import React from 'react';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SEO from './SEO';

const projects = [
  {
    id: 1,
    title: "FinTech AI ასისტენტი",
    category: "ჩატბოტი & NLP",
    description: "წამყვანი ქართული ბანკისთვის შექმნილი ჭკვიანი ასისტენტი, რომელიც ამუშავებს მომხმარებლის ტრანზაქციებს და პასუხობს კითხვებს ბუნებრივ ენაზე.",
    image: "https://picsum.photos/800/600?random=1",
    tags: ["Python", "React", "AWS"]
  },
  {
    id: 2,
    title: "E-commerce პლატფორმა",
    category: "Web Development",
    description: "სრულყოფილი ონლაინ მაღაზია გადახდის სისტემებით, მარაგების მართვით და სწრაფი ძებნის ფუნქციით.",
    image: "https://picsum.photos/800/600?random=2",
    tags: ["Next.js", "Node.js", "Stripe"]
  },
  {
    id: 3,
    title: "სამედიცინო აპლიკაცია",
    category: "Mobile App",
    description: "iOS და Android აპლიკაცია კლინიკებისთვის, პაციენტების ჩაწერის და სამედიცინო ისტორიის მართვის ფუნქციით.",
    image: "https://picsum.photos/800/600?random=3",
    tags: ["React Native", "Firebase", "AI"]
  },
  {
    id: 4,
    title: "Smart City მონიტორინგი",
    category: "IoT & AI",
    description: "ქალაქის საცობების და გარემოს დაბინძურების მონიტორინგის სისტემა რეალურ დროში.",
    image: "https://picsum.photos/800/600?random=4",
    tags: ["IoT", "Edge AI", "Grafana"]
  },
  {
    id: 5,
    title: "უძრავი ქონების პორტალი",
    category: "Web Platform",
    description: "ინოვაციური პლატფორმა უძრავი ქონების ყიდვა-გაყიდვისთვის, 3D ტურებით და AI ფასის შეფასებით.",
    image: "https://picsum.photos/800/600?random=5",
    tags: ["Vue.js", "Django", "Three.js"]
  },
  {
    id: 6,
    title: "ლოჯისტიკის მართვის სისტემა",
    category: "Enterprise Software",
    description: "კომპლექსური ERP სისტემა სატრანსპორტო კომპანიისთვის, მარშრუტების ოპტიმიზაციით და ავტოპარკის მართვით.",
    image: "https://picsum.photos/800/600?random=6",
    tags: ["Angular", "Java Spring", "PostgreSQL"]
  }
];

const Portfolio: React.FC = () => {
  return (
    <section className="pt-40 pb-24 bg-gray-50 dark:bg-darker transition-colors duration-300 min-h-screen relative">
      <SEO title="Our Work — IMI.GE" description="View our portfolio of successful projects and digital transformations." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 backdrop-blur-md">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">წარმატების ისტორიები</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest">
            რეალიზებული <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">პროექტები</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-sans font-light leading-relaxed tracking-wide">
            გაეცანით რეალურ მაგალითებს, თუ როგორ გარდაქმნის ჩვენი ტექნოლოგიები ბიზნეს პროცესებს.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <article key={project.id} className="group glass-panel rounded-[2rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] flex flex-col h-full hover:-translate-y-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-darker/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button className="p-4 bg-white/10 text-white rounded-full hover:bg-primary hover:scale-110 transition-all border border-white/20 backdrop-blur-md" aria-label="View Live">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                  <button className="p-4 bg-white/10 text-white rounded-full hover:bg-white hover:text-darker hover:scale-110 transition-all border border-white/20 backdrop-blur-md" aria-label="View Code">
                    <Github className="w-6 h-6" />
                  </button>
                </div>
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-darker/90 backdrop-blur-md px-5 py-2 rounded-full border border-gray-200 dark:border-white/10 shadow-lg">
                  <span className="text-xs font-heading font-bold text-primary uppercase tracking-widest">{project.category}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors tracking-wide">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 line-clamp-3 font-light leading-relaxed text-sm flex-grow tracking-wide font-sans">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-medium text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-lg border border-gray-200 dark:border-white/5 tracking-wide font-sans">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="flex items-center text-sm font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-[0.15em] group/btn mt-auto">
                  სრულად ნახვა <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="inline-block p-12 bg-white dark:bg-white/5 rounded-[2.5rem] border border-gray-200 dark:border-white/10 relative overflow-hidden group max-w-4xl w-full shadow-2xl dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 tracking-wider">გაქვთ ინოვაციური იდეა?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-10 font-light text-lg tracking-wide font-sans">
                მოდით განვიხილოთ თქვენი პროექტი და ვიპოვოთ საუკეთესო ტექნოლოგიური გადაწყვეტილება.
              </p>
              <Link href="/consultation" className="inline-flex items-center justify-center px-10 py-5 text-sm font-heading font-bold text-white bg-primary hover:bg-indigo-600 rounded-2xl transition-all uppercase tracking-[0.2em] shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1">
                უფასო კონსულტაცია
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
