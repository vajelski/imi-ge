/**
 * Reusable localized text (ka, en, ru) — longer copy.
 * Use for: meta descriptions, paragraphs.
 * Validation: optional maxLength for SEO (e.g. meta description 160).
 */
export default {
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    { name: 'ka', type: 'text', title: 'Georgian (ka)', rows: 3 },
    { name: 'en', type: 'text', title: 'English (en)', rows: 3 },
    { name: 'ru', type: 'text', title: 'Russian (ru)', rows: 3 },
  ],
}
