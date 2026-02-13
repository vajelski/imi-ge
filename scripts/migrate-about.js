#!/usr/bin/env node
/**
 * Migration script to import About page content from JSON to Sanity
 * 
 * Usage:
 * 1. Set environment variables in frontend/.env.local
 * 2. Run: node scripts/migrate-about.js
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
    console.error('❌ Missing required environment variables:')
    console.error('   NEXT_PUBLIC_SANITY_PROJECT_ID')
    console.error('   SANITY_WRITE_TOKEN')
    process.exit(1)
}

// Create Sanity client
const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
})

// Load translation files
const messagesDir = path.join(__dirname, '../frontend/src/messages')
const ka = JSON.parse(fs.readFileSync(path.join(messagesDir, 'ka.json'), 'utf-8'))
const en = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf-8'))
const ru = JSON.parse(fs.readFileSync(path.join(messagesDir, 'ru.json'), 'utf-8'))

console.log('📚 Loaded translation files')

// Build About page document
const aboutPage = {
    _type: 'page',
    _id: 'page-about', // Explicit ID for singleton behavior
    slug: {
        _type: 'slug',
        current: 'about'
    },
    title: {
        ka: ka.about.badge,
        en: en.about.badge,
        ru: ru.about.badge
    },
    seo: {
        metaTitle: {
            ka: `${ka.about.badge} — IMI.GE`,
            en: `${en.about.badge} — IMI.GE`,
            ru: `${ru.about.badge} — IMI.GE`
        },
        metaDescription: {
            ka: ka.about.description,
            en: en.about.description,
            ru: ru.about.description
        },
        noindex: false
    },
    sections: [
        // Hero Section
        {
            _type: 'hero',
            _key: 'hero',
            badge: {
                ka: ka.about.badge,
                en: en.about.badge,
                ru: ru.about.badge
            },
            title: {
                ka: `${ka.about.titlePrefix} ${ka.about.titleHighlight} ${ka.about.titleSuffix}`,
                en: `${en.about.titlePrefix} ${en.about.titleHighlight} ${en.about.titleSuffix}`,
                ru: `${ru.about.titlePrefix} ${ru.about.titleHighlight} ${ru.about.titleSuffix}`
            },
            description: {
                ka: ka.about.description,
                en: en.about.description,
                ru: ru.about.description
            }
        },
        // Values Grid
        {
            _type: 'valuesGrid',
            _key: 'values',
            items: ka.about.values.map((value, index) => ({
                _key: `value-${index}`,
                icon: value.icon,
                title: {
                    ka: ka.about.values[index].title,
                    en: en.about.values[index].title,
                    ru: ru.about.values[index].title
                },
                description: {
                    ka: ka.about.values[index].desc,
                    en: en.about.values[index].desc,
                    ru: ru.about.values[index].desc
                }
            }))
        },
        // Vision Section
        {
            _type: 'textBlock',
            _key: 'vision',
            title: {
                ka: ka.about.visionTitle,
                en: en.about.visionTitle,
                ru: ru.about.visionTitle
            },
            content: {
                ka: [
                    {
                        _type: 'block',
                        _key: 'vision-ka',
                        style: 'normal',
                        children: [
                            {
                                _type: 'span',
                                text: ka.about.visionDesc
                            }
                        ]
                    }
                ],
                en: [
                    {
                        _type: 'block',
                        _key: 'vision-en',
                        style: 'normal',
                        children: [
                            {
                                _type: 'span',
                                text: en.about.visionDesc
                            }
                        ]
                    }
                ],
                ru: [
                    {
                        _type: 'block',
                        _key: 'vision-ru',
                        style: 'normal',
                        children: [
                            {
                                _type: 'span',
                                text: ru.about.visionDesc
                            }
                        ]
                    }
                ]
            }
        },
        // Vision Points Grid
        {
            _type: 'valuesGrid',
            _key: 'visionPoints',
            items: ka.about.visionPoints.map((point, index) => ({
                _key: `visionPoint-${index}`,
                icon: point.icon,
                title: {
                    ka: ka.about.visionPoints[index].title,
                    en: en.about.visionPoints[index].title,
                    ru: ru.about.visionPoints[index].title
                },
                description: {
                    ka: ka.about.visionPoints[index].desc,
                    en: en.about.visionPoints[index].desc,
                    ru: ru.about.visionPoints[index].desc
                }
            }))
        }
    ]
}

// Upload to Sanity
async function migrate() {
    try {
        console.log('🚀 Starting migration...')

        // Create or replace the About page
        const result = await client.createOrReplace(aboutPage)

        console.log('✅ About page migrated successfully!')
        console.log(`   Document ID: ${result._id}`)
        console.log(`   Revision: ${result._rev}`)
        console.log('')
        console.log('📝 Content summary:')
        console.log(`   - Hero section with badge, title, description`)
        console.log(`   - ${aboutPage.sections[1].items.length} core values`)
        console.log(`   - Vision section with description`)
        console.log(`   - ${aboutPage.sections[3].items.length} vision points`)
        console.log('')
        console.log('🎉 Migration complete! You can now view the content in Sanity Studio.')

    } catch (error) {
        console.error('❌ Migration failed:', error)
        process.exit(1)
    }
}

migrate()
