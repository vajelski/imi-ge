import { SITE_URL } from '@/lib/seo/constants';

export default function ItemListStructuredData({ locale, items }: { locale: 'ka' | 'en'; items: { name: string; path: string }[] }) {
  if (!items.length) return null;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    inLanguage: locale === 'en' ? 'en-US' : 'ka-GE',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: `${SITE_URL}/${locale}${item.path}` })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
