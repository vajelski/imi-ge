import type { NextConfig } from "next";

// Backend URL for API rewrites. The local backend defaults to port 3004.
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3004';

const nextConfig: NextConfig = {
    trailingSlash: false, // Explicit URL policy: no trailing slashes
    async rewrites() {
        return [
            { source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` },
        ];
    },
    experimental: {
        externalDir: true, // Allow resolving modules from parent directory (workspace setup)
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
        ],
    },
    // Add security + cache headers
    async headers() {
        return [
            // Long cache for fonts (immutable assets)
            {
                source: '/fonts/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            // Long cache for images
            {
                source: '/images/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
                ],
            },
            // Cache manifest and favicon
            {
                source: '/manifest.json',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400' },
                ],
            },
            {
                source: '/favicon.svg',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=604800' },
                ],
            },
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                        // HSTS: მხოლოდ HTTPS-ის იძახება 1 წელი — კონტენტს არ კეშავს!
                    },
                    {
                        key: 'Content-Security-Policy',
                         value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://cdn.sanity.io https://cdn.undraw.co https://picsum.photos https://ui-avatars.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.api.sanity.io https://apicdn.sanity.io https://www.google-analytics.com https://region1.google-analytics.com; frame-src 'none'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';",
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl(nextConfig);
