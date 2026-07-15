import { insights } from './insights';

export const insightVisuals: Record<string, { src: string; alt: { ka: string; en: string } }> = {
  'rag-system-before-chatbot': { src: 'https://cdn.undraw.co/illustration/guidelines_p5r7.svg', alt: { ka: 'ცოდნის არქიტექტურის ილუსტრაცია', en: 'Knowledge architecture illustration' } },
  'voice-ai-that-represents-your-brand': { src: 'https://cdn.undraw.co/illustration/chatting_29rn.svg', alt: { ka: 'ხმოვანი კომუნიკაციის ილუსტრაცია', en: 'Voice communication illustration' } },
  'ai-automation-roi-first-workflow': { src: 'https://cdn.undraw.co/illustration/growth-analytics_vzjz.svg', alt: { ka: 'AI ავტომატიზაციის ანალიტიკის ილუსტრაცია', en: 'AI automation analytics illustration' } },
};

const english: Record<string, { category: string; title: string; excerpt: string; sections: readonly [string, string][] }> = {
  'rag-system-before-chatbot': {
    category: 'Knowledge AI / RAG',
    title: 'Why strong AI assistants begin with knowledge architecture',
    excerpt: 'RAG is more than answering questions. It creates a controlled path from trusted company knowledge to useful action.',
    sections: [
      ['The problem: knowledge exists, but does not reach decisions', 'Most companies already have the answer in a contract, a drive, a CRM, an email, or an employee’s experience. The problem is fragmentation, slow search, and the need to verify every answer from scratch.'],
      ['RAG is controlled knowledge delivery', 'A RAG system does not simply let a model guess. It finds a relevant source, provides context, and generates an answer grounded in that source.'],
      ['What to decide before a pilot', 'Keep the first pilot narrow: one team, one document type, clear access rules, and one measurable task.'],
    ],
  },
  'voice-ai-that-represents-your-brand': {
    category: 'Voice AI',
    title: 'Voice AI that truly represents your brand',
    excerpt: 'A quality voice agent knows what to answer, when to hand off, and what context to leave in your CRM.',
    sections: [
      ['Voice is an interface, not a standalone product', 'A useful voice system deliberately manages the dialogue: it identifies the request, gathers the right detail, and routes the decision to the right channel.'],
      ['Language requires brand context', 'A strong Georgian voice experience understands your terminology, service rules, product names, and support scenarios.'],
      ['How to measure the effect', 'Accuracy, handoff quality, first-contact resolution, and successful lead completion make business impact visible.'],
    ],
  },
  'ai-automation-roi-first-workflow': {
    category: 'Automation',
    title: 'Where real AI automation ROI begins',
    excerpt: 'The fastest results come from repeatable workflows with enough context and clear human control.',
    sections: [
      ['Do not choose the loudest use case', 'The better starting point is a workflow with volume, repeatability, and a known cost of delay or error.'],
      ['The boundary of a good agent', 'An agent should know what it can do, what needs review, and when to stop. Quality comes from approval points and exception handling.'],
      ['The ROI formula', 'Count manual time, error cost, response delay, and lost conversion before setting pilot baselines.'],
    ],
  },
};

export function getLocalizedInsight(slug: string, locale: 'ka' | 'en') {
  const insight = insights.find((item) => item.slug === slug);
  if (!insight) return null;
  const translation = locale === 'en' ? english[slug] : null;
  return {
    ...insight,
    category: translation?.category ?? insight.category,
    title: translation?.title ?? insight.title,
    excerpt: translation?.excerpt ?? insight.excerpt,
    sections: translation?.sections ?? insight.sections,
    visual: insightVisuals[slug],
  };
}
