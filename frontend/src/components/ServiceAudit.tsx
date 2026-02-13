import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, BarChart, Zap, Shield, ArrowRight, Loader2, Mail } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useContent } from '../contexts/ContentContext';
import { parseJsonResponse } from '@/lib/safeFetch';
import SEO from './SEO';

interface AuditResult {
  url: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  securityScore: number;
  recommendations: {
    id: string;
    title: string;
    description: string;
    score?: number;
  }[];
  isMock?: boolean;
  apiError?: string;
}

const ServiceAudit: React.FC = () => {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState('');
  const [leadSaved, setLeadSaved] = useState(false);
  const [isSavingLead, setIsSavingLead] = useState(false);

  // Use content context
  const { content } = useContent();

  // Fallback to default if content not loaded (though defaultContent handles this)
  const auditContent = content?.audit || {
    hero: {
      badge: "AI აუდიტი",
      titlePrefix: "ვებ-გვერდის",
      titleHighlight: "ინტელექტუალურ",
      titleSuffix: "ანალიზი",
      description: "შეიყვანეთ თქვენი საიტის მისამართი და მიიღეთ რეალური AI აუდიტი წამებში: SEO, სისწრაფე, Accessibility და უსაფრთხოება."
    },
    input: {
      placeholder: "შეიყვანეთ URL (მაგ: imi.ge)",
      analyzeButton: "ანალიზი...",
      checkButton: "შემოწმება"
    },
    results: {
      recommendationsTitle: "მთავარი რეკომენდაციები",
      noIssues: "საიტზე კრიტიკული ხარვეზები არ მოიძებნა!",
      securityTitle: "უსაფრთხოება",
      leadSuccessTitle: "მოთხოვნა მიღებულია!",
      leadSuccessDesc: "ჩვენი გუნდი მალე გამოგიგზავნიათ სრულ რეპორტს.",
      leadTitle: "მიიღეთ სრული რეპორტი",
      leadDesc: "შეიყვანეთ ელ-ფოსტა და მიიღეთ დეტალური PDF ანალიზი უფასოდ.",
      emailPlaceholder: "tqveni@email.com"
    },
    features: [
      {
        title: "SEO ოპტიმიზაცია",
        desc: "Google-ის უახლეს ალგორითმებზე მორგებული ანალიზი."
      },
      {
        title: "სისწრაფის გაზრდა",
        desc: "Core Web Vitals მეტრიკების დეტალური შემოწმება."
      },
      {
        title: "უსაფრთხოება",
        desc: "SSL, Headers და სხვა უსაფრთხოების პარამეტრების აუდიტი."
      }
    ]
  };

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    // Basic URL validation
    let validUrl = url;
    if (!url.startsWith('http')) {
      validUrl = `https://${url}`;
      setUrl(validUrl);
    }

    setIsAnalyzing(true);
    setResult(null);
    setError('');
    setLeadSaved(false);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: validUrl })
      });

      const data = await parseJsonResponse<AuditResult & { error?: string }>(res);

      if (!res.ok) {
        throw new Error(data.error || 'აუდიტი ვერ განხორციელდა');
      }

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'დაფიქსირდა შეცდომა. სცადეთ მოგვიანებით.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !result) return;

    setIsSavingLead(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          url: result.url,
          reportType: 'full_audit',
          date: new Date().toISOString()
        })
      });

      if (res.ok) {
        setLeadSaved(true);
        setEmail('');
      }
    } catch (err) {
      console.error('Lead save failed', err);
    } finally {
      setIsSavingLead(false);
    }
  };

  // Helper for score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <section className="pt-40 pb-24 bg-darker min-h-screen relative">
      <SEO title="Free Website Audit — IMI.GE" description="Get a free, instant AI-powered audit of your website's performance, SEO, accessibility, and security." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-xs font-heading font-bold tracking-[0.2em] text-primary uppercase">{auditContent.hero.badge}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 tracking-widest glow-text">
            {auditContent.hero.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{auditContent.hero.titleHighlight}</span> {auditContent.hero.titleSuffix}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-sans font-light leading-relaxed tracking-wide">
            {auditContent.hero.description}
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="glass-panel p-8 rounded-[2rem] border border-white/10">
            <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder={auditContent.input.placeholder}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-darker/50 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all font-sans"
                required
              />
              <button
                type="submit"
                disabled={isAnalyzing}
                className="bg-primary hover:bg-indigo-600 text-white px-8 py-4 rounded-xl font-heading font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {auditContent.input.analyzeButton}
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    {auditContent.input.checkButton}
                  </>
                )}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="max-w-5xl mx-auto mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {result.isMock && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Google PageSpeed API დროებით მიუწვდომელია. ნაჩვენებია სავარაუდო მონაცემები.
              </div>
            )}
            {/* Scores Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Performance', score: result.scores.performance, icon: Zap },
                { label: 'SEO', score: result.scores.seo, icon: Search },
                { label: 'Accessibility', score: result.scores.accessibility, icon: CheckCircle2 },
                { label: 'Best Practices', score: result.scores.bestPractices, icon: Shield },
              ].map((item, idx) => (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 text-center">
                  <div className={`text-4xl font-bold mb-2 ${getScoreColor(item.score)}`}>{item.score}</div>
                  <div className="text-xs text-gray-400 font-sans uppercase tracking-wider mb-3">{item.label}</div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${getScoreColor(item.score).replace('text-', 'bg-')}`}
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations & Security */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Recommendations List */}
              <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-[2rem] border border-white/10 overflow-hidden">
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  {auditContent.results.recommendationsTitle}
                </h3>
                <div className="space-y-4">
                  {result.recommendations.length > 0 ? (
                    result.recommendations.map((rec, i) => {
                      // Translation Mapping
                      const translations: Record<string, { title: string, desc: string }> = {
                        "Eliminate render-blocking resources": {
                          title: "აღმოფხვერით რენდერის შემაფერხებელი რესურსები",
                          desc: "რესურსები ბლოკავს გვერდის პირველად დახატვას. განიხილეთ მნიშვნელოვანი JS/CSS-ის ინლაინ ჩასმა და დანარჩენის დაყოვნება."
                        },
                        "Properly size images": {
                          title: "სურათების ზომის ოპტიმიზაცია",
                          desc: "გამოიყენეთ სურათების სწორი ზომები, რათა დაზოგოთ მობილური ინტერნეტი და გააუმჯობესოთ ჩატვირთვის დრო."
                        },
                        "Reduce unused JavaScript": {
                          title: "შეამცირეთ გამოუყენებელი JavaScript",
                          desc: "წაშალეთ გამოუყენებელი კოდი ან დააყოვნეთ მისი ჩატვირთვა, სანამ არ გახდება საჭირო."
                        },
                        "Serve images in next-gen formats": {
                          title: "გამოიყენეთ თანამედროვე სურათების ფორმატები",
                          desc: "WebP და AVIF ფორმატები უზრუნველყოფს უკეთეს კომპრესიას ვიდრე PNG ან JPEG."
                        },
                        "Minify CSS": {
                          title: "CSS-ის მინიმიზაცია",
                          desc: "შეამცირეთ CSS ფაილების ზომა ზედმეტი სივრცეების და კომენტარების ამოღებით."
                        },
                        "Minify JavaScript": {
                          title: "JavaScript-ის მინიმიზაცია",
                          desc: "შეამცირეთ JS ფაილების ზომა კოდის ოპტიმიზაციით."
                        },
                        "Reduce initial server response time": {
                          title: "სერვერის პასუხის დროის შემცირება",
                          desc: "შეამცირეთ სერვერის დაყოვნება, რათა მომხმარებელმა სწრაფად მიიღოს კონტენტი."
                        },
                        "Background and foreground colors do not have a sufficient contrast ratio": {
                          title: "არასაკმარისი ფერთა კონტრასტი",
                          desc: "ტექსტსა და ფონს შორის დაბალი კონტრასტი ართულებს კითხვას ბევრი მომხმარებლისთვის."
                        },
                        "Network dependency tree": {
                          title: "ქსელური დამოკიდებულებების ოპტიმიზაცია",
                          desc: "მოერიდეთ კრიტიკული მოთხოვნების ჯაჭვურ გადაბმას, რაც ზრდის ჩატვირთვის დროს."
                        },
                        "Render blocking requests": {
                          title: "რენდერის შემაფერხებელი მოთხოვნები",
                          desc: "მოთხოვნები ბლოკავს გვერდის გამოჩენას. განიხილეთ მათი დაყოვნება."
                        },
                        "Uses long cache TTL": {
                          title: "გამოიყენეთ ქეშირების ხანგრძლივი პერიოდი",
                          desc: "სტატიკური რესურსების ქეშირება აჩქარებს განმეორებით ვიზიტებს."
                        },
                        "Enable text compression": {
                          title: "ჩართეთ ტექსტის კომპრესია",
                          desc: "გამოიყენეთ Gzip ან Brotli კომპრესია ტექსტური რესურსებისთვის."
                        }
                      };

                      // Fuzzy match or exact match
                      let title = rec.title;
                      let desc = rec.description;

                      const matchedKey = Object.keys(translations).find(key => rec.title.includes(key));
                      if (matchedKey) {
                        title = translations[matchedKey].title;
                        desc = translations[matchedKey].desc;
                      }

                      return (
                        <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 transition-colors hover:bg-white/10 group">
                          <div className="font-bold text-gray-200 mb-2 font-sans text-sm group-hover:text-primary transition-colors">{title}</div>
                          <div className="text-xs text-gray-400 font-light leading-relaxed break-words">
                            {desc && desc.length > 200 ? desc.substring(0, 200) + '...' : desc}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      {auditContent.results.noIssues}
                    </div>
                  )}
                </div>
              </div>

              {/* Security & Lead Gen */}
              <div className="space-y-6">
                {/* Security Score */}
                <div className="glass-panel p-6 rounded-[2rem] border border-white/10">
                  <h3 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    {auditContent.results.securityTitle}
                  </h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Security Headers</span>
                    <span className={`font-bold ${getScoreColor(result.securityScore)}`}>{result.securityScore}/100</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-blue-500 transition-all duration-1000`}
                      style={{ width: `${result.securityScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Lead Capture */}
                <div className="glass-panel p-6 rounded-[2rem] border border-primary/20 bg-primary/5">
                  {leadSaved ? (
                    <div className="text-center py-4 animate-in fade-in zoom-in">
                      <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-white font-bold mb-1">{auditContent.results.leadSuccessTitle}</h3>
                      <p className="text-xs text-gray-400">{auditContent.results.leadSuccessDesc}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveLead}>
                      <h3 className="text-white font-bold mb-3 text-sm">{auditContent.results.leadTitle}</h3>
                      <p className="text-xs text-gray-400 mb-4">{auditContent.results.leadDesc}</p>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          required
                          placeholder={auditContent.results.emailPlaceholder}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-darker/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-primary focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={isSavingLead}
                          className="bg-primary hover:bg-indigo-600 text-white rounded-lg px-3 flex items-center justify-center transition-colors disabled:opacity-50"
                        >
                          {isSavingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid (Static) */}
        {!result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 animate-in fade-in delay-200 duration-700">
            {auditContent.features.map((feature, idx) => {
              const icons = [BarChart, Zap, Shield];
              const Icon = icons[idx] || Shield;
              const colors = ['text-secondary', 'text-accent', 'text-green-500'];
              const bgColors = ['bg-secondary/10', 'bg-accent/10', 'bg-green-500/10'];

              return (
                <div key={idx} className="glass-panel p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300">
                  <div className={`w-14 h-14 ${bgColors[idx]} rounded-2xl flex items-center justify-center mb-6 ${colors[idx]}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 font-sans font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default ServiceAudit;
