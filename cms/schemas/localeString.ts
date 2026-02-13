/**
 * Reusable localized string (ka, en, ru).
 * Use for: meta titles, labels, short copy.
 * Validation: optional maxLength for SEO (e.g. meta title 60).
 */
export default {
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    { name: 'ka', type: 'string', title: 'Georgian (ka)' },
    { name: 'en', type: 'string', title: 'English (en)' },
    { name: 'ru', type: 'string', title: 'Russian (ru)' },
  ],
}
