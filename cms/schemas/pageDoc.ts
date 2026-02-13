/**
 * Page document — one per route (home, services, portfolio, blog, about, contact, demos).
 * slug is fixed per document; enabled toggles the page.
 */
export default {
  name: 'pageDoc',
  title: 'Page Document',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Services', value: 'services' },
          { title: 'Portfolio', value: 'portfolio' },
          { title: 'Blog', value: 'blog' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'Demos', value: 'demos' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hero',
          title: 'Hero Section',
          fields: [
            { name: 'badge', type: 'localeString' },
            { name: 'title', type: 'localeText' },
            { name: 'description', type: 'localeText' },
          ],
        },
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          fields: [
            { name: 'title', type: 'localeString' },
            { name: 'content', type: 'localePortableText' },
          ],
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image Block',
          fields: [
            { name: 'image', type: 'image', options: { hotspot: true } },
            { name: 'alt', type: 'localeString' },
          ],
        },
        {
          type: 'object',
          name: 'valuesGrid',
          title: 'Values Grid',
          fields: [
            {
              name: 'items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'icon', type: 'string' },
                    { name: 'title', type: 'localeString' },
                    { name: 'description', type: 'localeText' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Overrides',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'localeString', description: 'Max ~60 chars' },
        { name: 'metaDescription', type: 'localeText', description: 'Max ~160 chars' },
        { name: 'ogImage', type: 'image', options: { hotspot: true } },
        { name: 'canonical', type: 'url' },
        { name: 'noindex', type: 'boolean', initialValue: false },
      ],
    },
  ],
  preview: {
    select: { slug: 'slug' },
    prepare({ slug }: { slug: string }) {
      return { title: slug ? `/${slug}` : 'Untitled', subtitle: slug }
    },
  },
}
