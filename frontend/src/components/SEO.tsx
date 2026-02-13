import React from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}

// Legacy SEO component - not needed in Next.js App Router
// Metadata is handled by generateMetadata() in page components
const SEO: React.FC<SEOProps> = () => {
    return null;
};

export default SEO;
