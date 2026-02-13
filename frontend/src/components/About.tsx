import React from 'react';
import { Users, Target, Lightbulb, Award, Cpu, TrendingUp, Zap, ShieldCheck, Trophy } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import SEO from './SEO';

const About: React.FC = () => {
  const { content } = useContent();

  if (!content?.about) return null;
  const { about } = content;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-7 h-7 text-primary" />;
      case 'Lightbulb': return <Lightbulb className="w-7 h-7 text-secondary" />;
      case 'Users': return <Users className="w-7 h-7 text-blue-500" />;
      case 'Award': return <Award className="w-7 h-7 text-green-500" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-green-500" />;
      case 'Zap': return <Zap className="w-8 h-8 text-yellow-500" />;
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-blue-500" />;
      case 'Trophy': return <Trophy className="w-8 h-8 text-primary" />;
      default: return <Target className="w-7 h-7 text-primary" />;
    }
  };

  return (
    <section className="pt-40 pb-24 min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-darker">
      <SEO title="About Us — IMI.GE" description="Learn about our mission to transform businesses with AI and software innovation." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">{about.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-8 tracking-wide leading-tight">
            {about.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{about.titleHighlight}</span> {about.titleSuffix}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-sans font-light leading-relaxed max-w-3xl mx-auto">
            {about.description}
          </p>
        </div>

        {/* Image Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] shadow-2xl border border-gray-200 dark:border-white/10 group">
            <img
              src="https://picsum.photos/1600/800?grayscale"
              alt="Team working on AI project"
              loading="lazy"
              width="1600"
              height="800"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-16">
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-wider drop-shadow-lg">{about.imageTitle}</h3>
              <p className="text-gray-300 font-light text-lg tracking-wide font-sans">{about.imageDesc}</p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {about.values.map((val) => (
            <div key={val.id} className="glass-panel p-10 rounded-[2rem] hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 group h-full border border-gray-200 dark:border-white/5 hover:border-primary/30">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                {getIcon(val.icon)}
              </div>
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4 tracking-wider">{val.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-light leading-relaxed tracking-wide font-sans">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div id="vision" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">{about.visionTitle}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-sans max-w-3xl mx-auto">
              {about.visionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.visionPoints.map((item, idx) => (
              <div key={idx} className="group p-8 bg-white dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 shadow-lg dark:shadow-none flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {getIcon(item.icon)}
                </div>
                <h4 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-3">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
