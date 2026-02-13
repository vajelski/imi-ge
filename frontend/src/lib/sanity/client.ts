import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
    useCdn: false, // Set to true for production with CDN
    token: process.env.SANITY_READ_TOKEN, // Only used server-side
})

// Client for preview mode (uses token)
export const previewClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_READ_TOKEN,
    perspective: 'previewDrafts',
})

// Helper to get the right client based on preview mode
export function getClient(preview = false) {
    return preview ? previewClient : client
}
