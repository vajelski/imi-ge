export default {
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    __experimental_actions: ['update', 'publish'],
    fields: [
        {
            name: 'items',
            title: 'Navigation Items',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'label',
                        title: 'Label',
                        type: 'object',
                        fields: [
                            { name: 'ka', type: 'string', title: 'Georgian' },
                            { name: 'en', type: 'string', title: 'English' },
                            { name: 'ru', type: 'string', title: 'Russian' }
                        ]
                    },
                    {
                        name: 'href',
                        title: 'URL Path',
                        type: 'string',
                        description: 'e.g., /about, /services, /contact'
                    },
                    {
                        name: 'order',
                        title: 'Order',
                        type: 'number'
                    }
                ]
            }]
        }
    ]
}
