import { ArrowUpRight, CalendarDays, Clock3 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { insights } from '@/data/insights';
import { getLocalizedInsight } from '@/data/localizedInsights';

export default function BlogExperience({ locale }: { locale: 'ka' | 'en' }) {
  const english = locale === 'en';
  const localized = insights.map((item) => getLocalizedInsight(item.slug, locale)!);
  const featured = localized[0];
  const rest = localized.slice(1);
  return <div className="blog-experience">
    <section className="blog-hero"><div className="blog-container"><p className="blog-eyebrow">IMI.GE / {english ? 'INSIGHTS' : 'ინსაითები'}</p><h1>{english ? 'Practical thinking for teams building with AI.' : 'სიღრმისეული მასალა მათთვის, ვინც AI-ს რეალურ ოპერაციაში ნერგავს.'}</h1><p>{english ? 'Clear guidance on voice AI, RAG, CRM, and automation decisions.' : 'წერილები ეფუძნება იმ კითხვებს, რომლებიც ჩნდება AI voice, RAG, CRM და automation სისტემების დაგეგმვისას.'}</p></div></section>
    <section className="blog-container blog-featured"><Link href={`/blog/${featured.slug}`} className="blog-featured__card"><div className="blog-featured__visual"><span className="blog-index">01 / FEATURED</span><img src={featured.visual?.src} alt={featured.visual?.alt[locale]} /></div><div className="blog-featured__content"><p className="blog-category">{featured.category}</p><h2>{featured.title}</h2><p className="blog-excerpt">{featured.excerpt}</p><div className="blog-meta"><span><CalendarDays size={14} />{new Date(featured.date).toLocaleDateString(english ? 'en-US' : 'ka-GE', { year: 'numeric', month: 'short', day: 'numeric' })}</span><span><Clock3 size={14} />{featured.readTime}</span><span className="blog-read">{english ? 'Read article' : 'წაიკითხეთ'} <ArrowUpRight size={15} /></span></div></div></Link></section>
    <section className="blog-container blog-grid">{rest.map((insight, index) => <article className="blog-card" key={insight.slug}><Link href={`/blog/${insight.slug}`}><div className="blog-card__visual"><span className="blog-index">0{index + 2}</span><img src={insight.visual?.src} alt={insight.visual?.alt[locale]} /></div><div className="blog-card__body"><p className="blog-category">{insight.category}</p><h2>{insight.title}</h2><p className="blog-excerpt">{insight.excerpt}</p><div className="blog-meta"><span>{new Date(insight.date).toLocaleDateString(english ? 'en-US' : 'ka-GE', { year: 'numeric', month: 'short', day: 'numeric' })}</span><span>{insight.readTime}</span><ArrowUpRight size={16} /></div></div></Link></article>)}</section>
  </div>;
}
