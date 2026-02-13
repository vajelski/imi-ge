export default {
    name: 'blogPost',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title.en' },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'title',
            title: 'Title',
            type: 'object',
            fields: [
                { name: 'ka', type: 'string' },
                { name: 'en', type: 'string' },
                { name: 'ru', type: 'string' }
            ]
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'category',
            title: 'Category',
            type: 'object',
            fields: [
                { name: 'ka', type: 'string' },
                { name: 'en', type: 'string' },
                { name: 'ru', type: 'string' }
            ]
        },
        {
            name: 'author',
            title: 'Author',
            type: 'object',
            fields: [
                { name: 'ka', type: 'string' },
                { name: 'en', type: 'string' },
                { name: 'ru', type: 'string' }
            ]
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'object',
            fields: [
                { name: 'ka', type: 'text', rows: 3 },
                { name: 'en', type: 'text', rows: 3 },
                { name: 'ru', type: 'text', rows: 3 }
            ]
        },
        {
            name: 'body',
            title: 'Body',
            type: 'object',
            fields: [
                { name: 'ka', type: 'array', of: [{ type: 'block' }] },
                { name: 'en', type: 'array', of: [{ type: 'block' }] },
                { name: 'ru', type: 'array', of: [{ type: 'block' }] }
            ]
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime'
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'object',
                    fields: [
                        { name: 'ka', type: 'string' },
                        { name: 'en', type: 'string' },
                        { name: 'ru', type: 'string' }
                    ]
                },
                {
                    name: 'metaDescription',
                    type: 'object',
                    fields: [
                        { name: 'ka', type: 'text' },
                        { name: 'en', type: 'text' },
                        { name: 'ru', type: 'text' }
                    ]
                }
            ]
        }
    ]
}
