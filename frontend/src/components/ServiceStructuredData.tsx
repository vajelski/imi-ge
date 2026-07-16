import React from 'react';
import { SITE_URL, SITE_NAME } from '@/lib/seo/constants';

export interface ServiceStructuredDataProps {
  name: string;
  description: string;
  url: string;
  locale: string;
  serviceType?: string;
}

/**
 * Service schema for services pages
 * @see https://schema.org/Service
 */
const ServiceStructuredData: React.FC<ServiceStructuredDataProps> = ({
  name,
  description,
  url,
  locale,
  serviceType = 'ProfessionalService',
}) => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: description || undefined,
    url,
    provider: {
      '@type': 'Organization',
       '@id': `${SITE_URL}/#organization`,
       name: SITE_NAME,
       url: SITE_URL,
       logo: `${SITE_URL}/og-image.png`,
    },
    areaServed: { '@type': 'Country', name: 'Georgia' },
     inLanguage: locale === 'ka' ? 'ka' : 'en',
    ...(serviceType && { serviceType }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default ServiceStructuredData;
