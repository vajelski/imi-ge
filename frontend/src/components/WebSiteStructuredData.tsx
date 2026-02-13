import React from 'react';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';

interface WebSiteStructuredDataProps {
  locale: string;
}

/**
 * WebSite schema with SearchAction (Sitelinks Search Box) for Google
 * @see https://developers.google.com/search/docs/appearance/sitelinks-searchbox
 */
const WebSiteStructuredData: React.FC<WebSiteStructuredDataProps> = ({ locale }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: 'AI ინტეგრაცია, ვებ-დეველოპმენტი და ტექნოლოგიური კონსულტაცია საქართველოში.',
    inLanguage: [locale === 'ka' ? 'ka' : locale === 'ru' ? 'ru' : 'en'],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
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
