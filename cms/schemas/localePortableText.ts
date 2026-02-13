/**
 * Reusable localized portable text (ka, en, ru) — block content.
 */
export default {
  name: 'localePortableText',
  title: 'Localized Portable Text',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    { name: 'ka', type: 'array', title: 'Georgian (ka)', of: [{ type: 'block' }] },
    { name: 'en', type: 'array', title: 'English (en)', of: [{ type: 'block' }] },
    { name: 'ru', type: 'array', title: 'Russian (ru)', of: [{ type: 'block' }] },
  ],
}
