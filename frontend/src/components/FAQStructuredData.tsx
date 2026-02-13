import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  items: FAQItem[];
}

/**
 * FAQPage schema for pages with FAQ content
 * @see https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */
const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ items }) => {
  if (!items?.length) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default FAQStructuredData;
