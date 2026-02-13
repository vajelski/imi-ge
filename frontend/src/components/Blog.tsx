import React from 'react';
import { Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SEO from './SEO';

const blogPosts = [
  {
    id: 1,
    title: "როგორ შეცვლის AI ქართულ ბიზნესს 2025 წელს",
    excerpt: "ხელოვნური ინტელექტის გავლენა ადგილობრივ ბაზარზე და ახალი შესაძლებლობები კომპანიებისთვის. ანალიტიკა და პროგნოზები.",
    date: "15 მარტი, 2024",
    author: "რევაზ ბრეგვაძე",
    category: "AI ტენდენციები",
    readTime: "5 წთ",
    image: "https://picsum.photos/800/600?random=10",
    featured: true
  },
  {
    id: 2,
    title: "რატომ გჭირდებათ ვებ-გვერდის აუდიტი?",
    excerpt: "ტექნიკური ხარვეზები, რომლებიც თქვენს გაყიდვებს აფერხებს და მათი აღმოფხვრის გზები.",
    date: "10 მარტი, 2024",
    author: "რევაზ ბრეგვაძე",
    category: "SEO & Web",
    readTime: "3 წთ",
    image: "https://picsum.photos/800/600?random=11",
    featured: false
  },
  {
    id: 3,
    title: "Chatbot vs Live Chat: რომელია უკეთესი?",
    excerpt: "ავტომატიზაციის და ადამიანური რესურსის შედარება მომხმარებელთა მხარდაჭერაში.",
    date: "5 მარტი, 2024",
    author: "რევაზ ბრეგვაძე",
    category: "ავტომატიზაცია",
    readTime: "4 წთ",
    image: "https://picsum.photos/800/600?random=12",
    featured: false
  },
  {
    id: 4,
    title: "კიბერუსაფრთხოება მცირე ბიზნესისთვის",
    excerpt: "მარტივი ნაბიჯები თქვენი მონაცემების დასაცავად ჰაკერული შეტევებისგან.",
    date: "1 მარტი, 2024",
    author: "რევაზ ბრეგვაძე",
    category: "უსაფრთხოება",
    readTime: "6 წთ",
    image: "https://picsum.photos/800/600?random=13",
    featured: false
  }
];

const Blog: React.FC = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="pt-40 pb-24 min-h-screen bg-gray-50 dark:bg-darker transition-colors duration-300">
      <SEO title="Blog & Insights — IMI.GE" description="Latest news, tech insights, and AI trends from the IMI.GE team." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-20">
          <h2 className="text-primary font-heading font-bold tracking-[0.2em] uppercase text-sm mb-4">ბლოგი & სიახლეები</h2>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-widest">
            ტექნოლოგიური <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ინსაიტები</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-sans font-light max-w-2xl mx-auto">
            გაიგეთ მეტი ციფრული სამყაროს სიახლეებზე, რჩევებსა და საუკეთესო პრაქტიკებზე.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-20">
            <Link href={`/blog/${featuredPost.id}`} className="group relative block rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-heading font-bold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-300 text-xs font-sans flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-300 font-sans text-lg mb-6 line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 font-sans">
                  <span className="flex items-center gap-2"><User className="w-4 h-4" /> {featuredPost.author}</span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {otherPosts.map((post) => (
            <article key={post.id} className="group bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-darker/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-heading font-bold text-primary uppercase tracking-wider shadow-lg">
                  {post.category}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-300 font-sans mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 font-sans text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                <Link href={`/blog/${post.id}`} className="inline-flex items-center text-sm font-heading font-bold text-primary hover:text-secondary transition-colors uppercase tracking-wider mt-auto group/link">
                  სრულად კითხვა <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;
