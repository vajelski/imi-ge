import { groq } from 'next-sanity'
import { getClient } from './client'
import type { Page, SiteSettings, Navigation, LegalPage, BlogPost, Locale } from './types'

// GROQ Queries
const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noindex
    },
    sections[] {
      _type,
      _type == "hero" => {
        badge,
        title,
        description
      },
      _type == "textBlock" => {
        title,
        content
      },
      _type == "imageBlock" => {
        "imageUrl": image.asset->url,
        alt
      },
      _type == "valuesGrid" => {
        items[] {
          icon,
          title,
          description
        }
      }
    }
  }
`

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    defaultSeo {
      title,
      description,
      "ogImageUrl": ogImage.asset->url
    },
    social {
      facebook,
      linkedin,
      twitter,
      instagram
    },
    contact
  }
`

const navigationQuery = groq`
  *[_type == "navigation"][0] {
    items[] {
      label,
      href,
      order
    } | order(order asc)
  }
`

const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    slug,
    title,
    content,
    lastUpdated,
    seo {
      metaTitle,
      metaDescription,
      noindex
    }
  }
`

const routeSeoQuery = groq`
  *[_type == "routeSeo" && route == $route][0] {
    route,
    seo {
      metaTitle,
      metaDescription,
      "ogImageUrl": ogImage.asset->url,
      noindex
    }
  }
`

const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    slug,
    title,
    excerpt,
    category,
    author,
    publishedAt,
    "imageUrl": mainImage.asset->url
  }
`

const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    slug,
    title,
    excerpt,
    body,
    category,
    author,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    seo {
      metaTitle,
      metaDescription
    }
  }
`

function hasSanityConfig() {
    return typeof process !== 'undefined' && !!process.env?.NEXT_PUBLIC_SANITY_PROJECT_ID
}

// ISR: revalidate every hour (3600s) — dramatically reduces TTFB
const CACHE_REVALIDATE = 3600

// Fetch functions
export async function getPageBySlug(
    slug: string,
    preview = false
): Promise<Page | null> {
    if (!hasSanityConfig()) return null
    try {
        const client = getClient(preview)
        return await client.fetch(pageQuery, { slug }, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return null
    }
}

export async function getSiteSettings(
    preview = false
): Promise<SiteSettings | null> {
    if (!hasSanityConfig()) return null
    try {
        const client = getClient(preview)
        return await client.fetch(siteSettingsQuery, {}, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return null
    }
}

export async function getNavigation(
    preview = false
): Promise<Navigation | null> {
    if (!hasSanityConfig()) return null
    try {
        const client = getClient(preview)
        return await client.fetch(navigationQuery, {}, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return null
    }
}

export async function getLegalPage(
    slug: string,
    preview = false
): Promise<LegalPage | null> {
    if (!hasSanityConfig()) return null
    try {
        const client = getClient(preview)
        return await client.fetch(legalPageQuery, { slug }, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return null
    }
}

export async function getBlogPosts(
    preview = false
): Promise<BlogPost[]> {
    if (!hasSanityConfig()) return []
    try {
        const client = getClient(preview)
        return await client.fetch(blogPostsQuery, {}, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return []
    }
}

export async function getRouteSeo(
    route: string,
    preview = false
): Promise<{ seo?: { metaTitle?: any; metaDescription?: any; ogImageUrl?: string; noindex?: boolean } } | null> {
    if (!hasSanityConfig()) return null
    try {
        const client = getClient(preview)
        return await client.fetch(routeSeoQuery, { route }, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return null
    }
}

export async function getBlogPost(
    slug: string,
    preview = false
): Promise<BlogPost | null> {
    if (!hasSanityConfig()) return null
    try {
        const client = getClient(preview)
        return await client.fetch(blogPostQuery, { slug }, {
            next: { revalidate: preview ? 0 : CACHE_REVALIDATE }
        })
    } catch {
        return null
    }
}
