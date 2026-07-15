import React from 'react';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';

const WEBSITE_DESCRIPTION: Record<string, string> = {
  ka: 'AI ინტეგრაცია, ვებ-დეველოპმენტი და ტექნოლოგიური კონსულტაცია საქართველოში.',
  en: 'AI integration, web development and technology consulting in Georgia.',
  ru: 'Интеграция AI, веб-разработка и технологический консалтинг в Грузии.',
};

interface WebSiteStructuredDataProps {
  locale: string;
}

/**
 * WebSite schema for the Georgian public site.
 */
const WebSiteStructuredData: React.FC<WebSiteStructuredDataProps> = ({ locale }) => {
  const lang = locale === 'ka' ? 'ka' : locale === 'ru' ? 'ru' : 'en';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: WEBSITE_DESCRIPTION[locale] ?? WEBSITE_DESCRIPTION.en,
    inLanguage: [lang],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default WebSiteStructuredData;
