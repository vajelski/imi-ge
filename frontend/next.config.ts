import type { NextConfig } from "next";

// Backend URL for API rewrites. Dev: 3003, Prod (start:prod): 3004
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3004';

const nextConfig: NextConfig = {
    trailingSlash: false, // Explicit URL policy: no trailing slashes
    async rewrites() {
        return [
            { source: '/api/:path*', destination: `${BACKEND_URL}/api/:path*` },
            { source: '/api-proxy', destination: `${BACKEND_URL}/api-proxy` },
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
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://apicdn.sanity.io https://cloudflareinsights.com https://*.cloudflareinsights.com; frame-ancestors 'none';",
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
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
