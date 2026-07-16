import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const allowedLocales = new Set(['ka', 'en'])
const safeSegment = /^[a-z0-9-]+$/

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')
    const locale = searchParams.get('locale') || 'ka'

    if (secret !== process.env.SANITY_PREVIEW_SECRET) {
        return new Response('Invalid token', { status: 401 })
    }

    const type = searchParams.get('type') || ''

    if (!slug || !allowedLocales.has(locale) || !safeSegment.test(slug)) {
        return new Response('Missing slug', { status: 400 })
    }

    (await draftMode()).enable()

    if (type === 'blogPost') {
        redirect(`/${locale}/blog/${slug}`)
    }
    if (type && type !== 'page') {
        return new Response('Unsupported preview type', { status: 400 })
    }
    redirect(`/${locale}/${slug}`)
}
