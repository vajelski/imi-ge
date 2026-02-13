export default {
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    fields: [
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Must be: privacy, terms, or cookies',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'title',
            title: 'Page Title',
            type: 'object',
            fields: [
                { name: 'ka', type: 'string' },
                { name: 'en', type: 'string' },
                { name: 'ru', type: 'string' }
            ]
        },
        {
            name: 'content',
            title: 'Content',
            type: 'object',
            fields: [
                {
                    name: 'ka',
                    type: 'array',
                    of: [{ type: 'block' }]
                },
                {
                    name: 'en',
                    type: 'array',
                    of: [{ type: 'block' }]
                },
                {
                    name: 'ru',
                    type: 'array',
                    of: [{ type: 'block' }]
                }
            ]
        },
        {
            name: 'lastUpdated',
            title: 'Last Updated',
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
                        { name: 'ka', type: 'text', rows: 3 },
                        { name: 'en', type: 'text', rows: 3 },
                        { name: 'ru', type: 'text', rows: 3 }
                    ]
                },
                { name: 'noindex', type: 'boolean', initialValue: false }
            ]
        }
    ]
}
