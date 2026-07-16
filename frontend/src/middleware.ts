import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
    // Russian was never fully localized; keep old links useful without exposing a third indexable locale.
    if (req.nextUrl.pathname === '/ru' || req.nextUrl.pathname.startsWith('/ru/')) {
        const url = req.nextUrl.clone();
        url.pathname = `/ka${req.nextUrl.pathname.slice(3)}` || '/ka';
        return NextResponse.redirect(url, 308);
    }
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
