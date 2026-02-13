export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'siteName',
            title: 'Site Name',
            type: 'object',
            fields: [
                { name: 'ka', type: 'string', title: 'Georgian' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'ru', type: 'string', title: 'Russian' }
            ]
        },
        {
            name: 'defaultSeo',
            title: 'Default SEO',
            type: 'object',
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
                    name: 'description',
                    type: 'object',
                    fields: [
                        { name: 'ka', type: 'text' },
                        { name: 'en', type: 'text' },
                        { name: 'ru', type: 'text' }
                    ]
                },
                {
                    name: 'ogImage',
                    type: 'image',
                    options: { hotspot: true }
                }
            ]
        },
        {
            name: 'social',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'facebook', type: 'url' },
                { name: 'linkedin', type: 'url' },
                { name: 'twitter', type: 'url' },
                { name: 'instagram', type: 'url' }
            ]
        },
        {
            name: 'contact',
            title: 'Contact Information',
            type: 'object',
            fields: [
                { name: 'email', type: 'string' },
                { name: 'phone', type: 'string' },
                {
                    name: 'address',
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
