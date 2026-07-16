import React from 'react';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  imageUrl?: string | null;
  author?: string | null;
  publishedAt?: string | null;
  url: string;
  inLanguage?: string;
}

/**
 * Article schema for blog posts
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */
const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  title,
  description,
  imageUrl,
  author,
  publishedAt,
  url,
  inLanguage,
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: title,
    description: description || undefined,
    image: imageUrl ? imageUrl : `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Organization',
      name: author || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
        logo: {
         '@type': 'ImageObject',
         url: `${SITE_URL}/og-image.png`,
         width: 1200,
         height: 630,
       },
    },
    datePublished: publishedAt || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(inLanguage ? { inLanguage } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default ArticleStructuredData;
