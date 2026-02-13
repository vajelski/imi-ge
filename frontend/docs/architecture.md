# Architectural Decisions - IMI.GE Next.js Migration

This document outlines the key architectural decisions made during the migration of the IMI.GE frontend from Vite to Next.js App Router.

## 1. Framevork: Next.js App Router
We chose the Next.js App Router to leverage:
- **Server Components (RSC)**: By default, components are rendered on the server, reducing the JavaScript bundle sent to the client. This significantly improves Core Web Vitals (LCP, FCP).
- **Localized Routing**: Built-in support for internationalized pathnames via middleware.
- **Metadata API**: Dynamic generation of SEO tags, OpenGraph, and Twitter cards per route.

## 2. Internationalization (i18n): `next-intl`
`next-intl` was selected for its deep integration with the App Router:
- **Server-Side Translations**: Translations are fetched and resolved on the server, eliminating the need for client-side context for basic content.
- **Link & Navigation Wrappers**: Standardized locale handling in links.

## 3. SEO Strategy
- **Dynamic Sitemaps**: `sitemap.ts` generates fresh sitemaps for all supported locales.
- **Robots.txt**: `robots.ts` manages crawler access.
- **Structured Data (JSON-LD)**: Reusable components for Organization and Website schema.
- **Hreflang Implementation**: Next.js automatically handles `hreflang` alternates when configured in metadata.

## 4. Component Architecture
- **Server Components**: Used for static or data-heavy content (Hero, Services, Pricing, About).
- **Client Components**: Reserved for interactivity (Navbar menu, Theme toggle, Forms). These are marked with `'use client'`.

## 5. Security
- **Security Headers**: Configured via `next.config.ts` (X-Frame-Options, CSP-ready structure).
- **Zod Validation**: Used for all client-side and API input validation.

## 6. Performance
- **Image Optimization**: Using `next/image` for automatic resizing, lazy loading, and WebP conversion.
- **Font Optimization**: Google Fonts integrated via `next/font`.
- **Code Splitting**: Automatic at the route level.

---
*Date: February 2025*
