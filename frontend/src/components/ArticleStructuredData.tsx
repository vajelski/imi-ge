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
    '@type': 'Article',
    headline: title,
    description: description || undefined,
    image: imageUrl ? imageUrl : `${SITE_URL}/og-image.png`,
    author: {
      '@type': 'Organization',
      name: author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    datePublished: publishedAt || undefined,
    dateModified: publishedAt || undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
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
