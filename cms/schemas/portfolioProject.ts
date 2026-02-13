/**
 * Portfolio Project (collection) — localized content, enabled, SEO.
 * Case study: problem, solution, stack, result.
 */
export default {
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' }, validation: (Rule: any) => Rule.required() },
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    { name: 'title', title: 'Title', type: 'localeString' },
    { name: 'category', title: 'Category', type: 'localeString' },
    { name: 'description', title: 'Description', type: 'localeText' },
    { name: 'problem', title: 'Problem (case study)', type: 'localeText' },
    { name: 'solution', title: 'Solution', type: 'localeText' },
    { name: 'stack', title: 'Stack', type: 'array', of: [{ type: 'string' }] },
    { name: 'result', title: 'Result', type: 'localeText' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
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
