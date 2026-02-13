import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
// Reflect Sanity version in Studio title (from cms package.json)
import pkg from './package.json' with { type: 'json' }

const sanityVersion = (pkg as { dependencies?: { sanity?: string } }).dependencies?.sanity ?? ''

export default defineConfig({
    name: 'default',
    title: sanityVersion ? `IMI Studio (v${sanityVersion})` : 'IMI Studio',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'd9x8a9z8',
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    document: {
        productionUrl: (_prev, { document }) => {
            const secret = process.env.SANITY_STUDIO_PREVIEW_SECRET || process.env.SANITY_PREVIEW_SECRET
            if (!secret || !document) return undefined
            const slug = (document as { slug?: { current?: string }; _type?: string })?._type === 'siteSettings'
                ? ''
                : (document as { slug?: { current?: string } })?.slug?.current ?? (document as { slug?: string })?.slug ?? (document as { _id?: string })?._id ?? ''
            const type = (document as { _type?: string })?._type ?? ''
            if (!type) return undefined
            const base = 'https://imi.ge'
            const params = new URLSearchParams({ secret, type })
            if (slug) params.set('slug', slug)
            return `${base}/api/preview?${params.toString()}`
        },
    },

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Content')
                    .items([
                        // Settings singleton at top
                        S.listItem()
                            .title('Settings')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings')
                            ),
                        S.divider(),
                        S.listItem()
                            .title('Pages')
                            .child(
                                S.list()
                                    .title('Pages')
                                    .items([
                                        S.listItem().title('Page (generic)').child(S.documentTypeList('page').title('Pages')),
                                        S.listItem().title('Legal Pages').child(S.documentTypeList('legalPage').title('Legal')),
                                        S.listItem().title('Route SEO').child(S.documentTypeList('routeSeo').title('Route SEO')),
                                    ])
                            ),
                        S.listItem()
                            .title('Blog')
                            .child(S.documentTypeList('blogPost').title('Blog Posts')),
                        S.listItem()
                            .title('Page Docs')
                            .child(S.documentTypeList('pageDoc').title('Page Docs')),
                        S.listItem()
                            .title('Services')
                            .child(S.documentTypeList('service').title('Services')),
                        S.listItem()
                            .title('Portfolio')
                            .child(S.documentTypeList('portfolioProject').title('Portfolio')),
                        S.listItem()
                            .title('FAQ')
                            .child(S.documentTypeList('faqItem').title('FAQ')),
                        S.listItem()
                            .title('Authors')
                            .child(S.documentTypeList('author').title('Authors')),
                        S.listItem()
                            .title('Navigation (legacy)')
                            .child(S.documentTypeList('navigation').title('Navigation')),
                        S.listItem()
                            .title('Media')
                            .child(S.documentTypeList('sanity.imageAsset').title('Media')),
                    ]),
        }),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})
