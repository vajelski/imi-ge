/**
 * Author (collection) — for blog and content attribution.
 */
export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'localeString' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name.en' } },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Bio', type: 'localeText' },
  ],
  preview: {
    select: { name: 'name.en' },
    prepare({ name }: { name: string }) {
      return { title: name || 'Untitled' }
    },
  },
}
