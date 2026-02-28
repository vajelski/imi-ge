import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_READ_TOKEN

let clientInstance: ReturnType<typeof createClient> | null = null
let previewClientInstance: ReturnType<typeof createClient> | null = null

function buildClient(preview = false) {
    if (!projectId) {
        throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
    }

    return createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token,
        ...(preview ? { perspective: 'previewDrafts' as const } : {}),
    })
}

// Helper to get the right client based on preview mode.
// Uses lazy initialization so builds don't fail when Sanity env vars are absent.
export function getClient(preview = false) {
    if (preview) {
        previewClientInstance ??= buildClient(true)
        return previewClientInstance
    }
    clientInstance ??= buildClient(false)
    return clientInstance
}
