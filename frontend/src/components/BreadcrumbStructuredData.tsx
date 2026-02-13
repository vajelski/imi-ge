import React from 'react';
import { SITE_URL } from '@/lib/seo/constants';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbStructuredDataProps {
  locale: string;
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList schema for inner pages
 * @see https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 */
const BreadcrumbStructuredData: React.FC<BreadcrumbStructuredDataProps> = ({ locale, items }) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default BreadcrumbStructuredData;
