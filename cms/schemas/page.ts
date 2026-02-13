export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Must match existing route (e.g., "about", "services")',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'title',
            title: 'Page Title',
            type: 'object',
            fields: [
                { name: 'ka', type: 'string', title: 'Georgian' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ru', type: 'string', title: 'Russian' }
            ],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'seo',
            title: 'SEO Settings',
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
                {
                    name: 'ogImage',
                    type: 'image',
                    options: { hotspot: true }
                },
                {
                    name: 'noindex',
                    type: 'boolean',
                    initialValue: false
                }
            ]
        },
        {
            name: 'sections',
            title: 'Page Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'hero',
                    title: 'Hero Section',
                    fields: [
                        {
                            name: 'badge',
                            type: 'object',
                            fields: [
                                { name: 'ka', type: 'string' },
                                { name: 'en', type: 'string' },
                                { name: 'ru', type: 'string' }
                            ]
                        },
                        {
                            name: 'title',
                            type: 'object',
                            fields: [
                                { name: 'ka', type: 'text' },
                                { name: 'en', type: 'text' },
                                { name: 'ru', type: 'text' }
                            ]
                        },
                        {
                            name: 'description',
                            type: 'object',
                            fields: [
                                { name: 'ka', type: 'text' },
                                { name: 'en', type: 'text' },
                                { name: 'ru', type: 'text' }
                            ]
                        }
                    ]
                },
                {
                    type: 'object',
                    name: 'textBlock',
                    title: 'Text Block',
                    fields: [
                        {
                            name: 'title',
                            type: 'object',
                            fields: [
                                { name: 'ka', type: 'string' },
                                { name: 'en', type: 'string' },
                                { name: 'ru', type: 'string' }
                            ]
                        },
                        {
                            name: 'content',
                            type: 'object',
                            fields: [
                                { name: 'ka', type: 'array', of: [{ type: 'block' }] },
                                { name: 'en', type: 'array', of: [{ type: 'block' }] },
                                { name: 'ru', type: 'array', of: [{ type: 'block' }] }
                            ]
                        }
                    ]
                },
                {
                    type: 'object',
                    name: 'imageBlock',
                    title: 'Image Block',
                    fields: [
                        { name: 'image', type: 'image', options: { hotspot: true } },
                        {
                            name: 'alt',
                            type: 'object',
                            fields: [
                                { name: 'ka', type: 'string' },
                                { name: 'en', type: 'string' },
                                { name: 'ru', type: 'string' }
                            ]
                        }
                    ]
                },
                {
                    type: 'object',
                    name: 'valuesGrid',
                    title: 'Values Grid',
                    fields: [
                        {
                            name: 'items',
                            type: 'array',
                            of: [{
                                type: 'object',
                                fields: [
                                    { name: 'icon', type: 'string', description: 'Lucide icon name' },
                                    {
                                        name: 'title',
                                        type: 'object',
                                        fields: [
                                            { name: 'ka', type: 'string' },
                                            { name: 'en', type: 'string' },
                                            { name: 'ru', type: 'string' }
                                        ]
                                    },
                                    {
                                        name: 'description',
                                        type: 'object',
                                        fields: [
                                            { name: 'ka', type: 'text' },
                                            { name: 'en', type: 'text' },
                                            { name: 'ru', type: 'text' }
                                        ]
                                    }
                                ]
                            }]
                        }
                    ]
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title.en',
            slug: 'slug.current'
        },
        prepare({ title, slug }: { title: string; slug: string }) {
            return {
                title: title || 'Untitled',
                subtitle: `/${slug}`
            }
        }
    }
}
