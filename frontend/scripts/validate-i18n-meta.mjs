#!/usr/bin/env node
/**
 * Validate i18n meta: for each locale, fetch key pages and assert
 * title + description exist and (optionally) match expected script.
 * Usage: BASE_URL=http://localhost:3003 node scripts/validate-i18n-meta.mjs
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3003';
const LOCALES = ['ka', 'en', 'ru'];
const PATHS = ['', '/about', '/contact', '/services'];

function hasGeorgianScript(s) {
    return /[\u10A0-\u10FF]/.test(s);
}
function hasCyrillicScript(s) {
    return /[\u0400-\u04FF]/.test(s);
}
function hasLatinScript(s) {
    return /[a-zA-Z]/.test(s);
}

async function fetchMeta(locale, path) {
    const url = `${BASE_URL}/${locale}${path}`;
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`${url} ${res.status}`);
    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
        || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    return {
        url,
        title: titleMatch ? titleMatch[1].trim() : null,
        description: descMatch ? descMatch[1].trim() : null,
    };
}

function assertScript(locale, title, description) {
    const t = title || '';
    const d = description || '';
    const combined = `${t} ${d}`;
    if (locale === 'ka' && !hasGeorgianScript(combined)) return { ok: false, reason: 'Expected Georgian script in ka meta' };
    if (locale === 'ru' && !hasCyrillicScript(combined)) return { ok: false, reason: 'Expected Cyrillic script in ru meta' };
    if (locale === 'en' && !hasLatinScript(combined)) return { ok: false, reason: 'Expected Latin script in en meta' };
    return { ok: true };
}

async function main() {
    let failed = 0;
    for (const locale of LOCALES) {
        for (const path of PATHS) {
            try {
                const { url, title, description } = await fetchMeta(locale, path);
                if (!title) {
                    console.error(`FAIL ${url}: missing <title>`);
                    failed++;
                } else if (!description) {
                    console.error(`FAIL ${url}: missing meta description`);
                    failed++;
                } else {
                    const scriptCheck = assertScript(locale, title, description);
                    if (!scriptCheck.ok) {
                        console.error(`FAIL ${url}: ${scriptCheck.reason}`);
                        failed++;
                    } else {
                        console.log(`OK ${url}`);
                    }
                }
            } catch (e) {
                console.error(`FAIL ${locale}${path}: ${e.message}`);
                failed++;
            }
        }
    }
    process.exit(failed > 0 ? 1 : 0);
}

main();
