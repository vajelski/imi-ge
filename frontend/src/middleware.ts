import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    const res = intlMiddleware(req);
    // cms-preview და სხვა დინამიური გვერდები — ქეშის გარეშე (404 არ იკეშება)
    const path = req.nextUrl.pathname;
    if (path.includes('cms-preview')) {
        const response = res instanceof NextResponse ? res : NextResponse.next();
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        return response;
    }
    return res;
}

export const config = {
    matcher: ['/', '/(ka|en|ru)/:path*', '/cms-preview']
};
