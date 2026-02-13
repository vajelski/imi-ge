/**
 * Service (collection) — localized content, enabled, SEO overrides.
 */
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' }, validation: (Rule: any) => Rule.required() },
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'description', type: 'localeText', title: 'Description' },
    {
      name: 'seo',
      title: 'SEO Overrides',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'localeString' },
        { name: 'metaDescription', type: 'localeText' },
        { name: 'ogImage', type: 'image', options: { hotspot: true } },
        { name: 'noindex', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    select: { title: 'title.en', slug: 'slug.current' },
    prepare({ title, slug }: { title: string; slug: string }) {
      return { title: title || 'Untitled', subtitle: slug }
    },
  },
}
