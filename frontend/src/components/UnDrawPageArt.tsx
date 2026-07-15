'use client';

import { usePathname } from 'next/navigation';

type Illustration = {
  src: string;
  label: string;
};

const illustrations: Record<string, Illustration> = {
  services: { src: 'https://cdn.undraw.co/illustration/tech-keynote_ytf3.svg', label: 'Technology illustration' },
  projects: { src: 'https://cdn.undraw.co/illustration/solution-mindset_5xp7.svg', label: 'Product strategy illustration' },
  about: { src: 'https://cdn.undraw.co/illustration/group-chat_nze2.svg', label: 'Team collaboration illustration' },
  blog: { src: 'https://cdn.undraw.co/illustration/essay-writing_nlru.svg', label: 'Writing illustration' },
  docs: { src: 'https://cdn.undraw.co/illustration/guidelines_p5r7.svg', label: 'Guidelines illustration' },
  faq: { src: 'https://cdn.undraw.co/illustration/detailed-answer_kys9.svg', label: 'Answer illustration' },
  assistant: { src: 'https://cdn.undraw.co/illustration/chatting_29rn.svg', label: 'Conversation illustration' },
  consultation: { src: 'https://cdn.undraw.co/illustration/idea-to-plan_jnei.svg', label: 'Planning illustration' },
  'ai-readiness': { src: 'https://cdn.undraw.co/illustration/growth-analytics_vzjz.svg', label: 'Growth analytics illustration' },
  implementation: { src: 'https://cdn.undraw.co/illustration/mobile-site-builder_qibw.svg', label: 'Implementation illustration' },
  contact: { src: 'https://cdn.undraw.co/illustration/share-results_lfh5.svg', label: 'Contact illustration' },
  auth: { src: 'https://cdn.undraw.co/illustration/biometric-login_v832.svg', label: 'Secure login illustration' },
  demos: { src: 'https://cdn.undraw.co/illustration/code-thinking_tqs9.svg', label: 'Code illustration' },
  privacy: { src: 'https://cdn.undraw.co/illustration/file-manager_ivlr.svg', label: 'File manager illustration' },
  terms: { src: 'https://cdn.undraw.co/illustration/detailed-answer_kys9.svg', label: 'Terms illustration' },
  cookies: { src: 'https://cdn.undraw.co/illustration/system-interface_jffo.svg', label: 'System interface illustration' },
};

const defaultIllustration: Illustration = {
  src: 'https://cdn.undraw.co/illustration/system-interface_jffo.svg',
  label: 'AI system illustration',
};

function getIllustration(pathname: string) {
  const section = pathname.split('/').filter(Boolean)[1] ?? '';
  if (pathname.endsWith('/')) return defaultIllustration;
  return illustrations[section] ?? defaultIllustration;
}

export default function UnDrawPageArt() {
  const pathname = usePathname();
  const illustration = getIllustration(pathname);

  return (
    <div className="undraw-page-art" aria-hidden="true">
      <div className="undraw-page-art__halo" />
      <img src={illustration.src} alt="" loading="lazy" decoding="async" />
      <span>{illustration.label}</span>
    </div>
  );
}
