// SEO for static routes (home, services, contact, etc.) — სრული კონტროლი CMS-ში

const seoFields = [
    {
        name: 'metaTitle',
        title: 'Meta Title',
        type: 'object',
        fields: [
            { name: 'ka', type: 'string', title: 'ქართული' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'ru', type: 'string', title: 'Русский' }
        ]
    },
    {
        name: 'metaDescription',
        title: 'Meta Description',
        type: 'object',
        fields: [
            { name: 'ka', type: 'text', rows: 3, title: 'ქართული' },
            { name: 'en', type: 'text', rows: 3, title: 'English' },
            { name: 'ru', type: 'text', rows: 3, title: 'Русский' }
        ]
    },
    {
        name: 'ogImage',
        title: 'Open Graph Image',
        type: 'image',
        options: { hotspot: true }
    },
    {
        name: 'noindex',
        title: 'No Index',
        type: 'boolean',
        initialValue: false,
        description: 'თუ ჩართულია, გვერდი არ მოხვდება საძიებოში'
    }
];

export default {
    name: 'routeSeo',
    title: 'Route SEO',
    type: 'document',
    fields: [
        {
            name: 'route',
            title: 'Route',
            type: 'string',
            description: 'გვერდის ბილიკი',
            options: {
                list: [
                    { title: 'მთავარი (/)', value: 'home' },
                    // about — იყენებს page schema-ს
                    { title: 'სერვისები (/services)', value: 'services' },
                    { title: 'SEO სერვისი (/services/seo)', value: 'services/seo' },
                    { title: 'Builder (/services/builder)', value: 'services/builder' },
                    { title: 'Audit (/services/audit)', value: 'services/audit' },
                    { title: 'ბლოგი (/blog)', value: 'blog' },
                    { title: 'კონტაქტი (/contact)', value: 'contact' },
                    { title: 'პორტფოლიო (/portfolio)', value: 'portfolio' },
                    { title: 'დემოები (/demos)', value: 'demos' }
                ]
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: seoFields
        }
    ],
    preview: {
        select: { route: 'route', metaTitle: 'seo.metaTitle.en' },
        prepare({ route, metaTitle }: { route: string; metaTitle: string }) {
            return {
                title: metaTitle || route,
                subtitle: `/${route}`
            };
        }
    }
};
