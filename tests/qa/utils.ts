import { expect, type Page } from '@playwright/test';

export const locales = ['ka', 'en'] as const;
export const articleSlug = 'rag-system-before-chatbot';
export const docSlug = 'ai-readiness';

export const smokeRoutes = [
  '/',
  '/about',
  '/blog',
  `/blog/${articleSlug}`,
  '/services',
  '/services/ai-native-web',
  '/use-cases',
  '/projects',
  '/projects/urbania',
  '/solutions/ai-operator',
  '/solutions/social-commerce-ai',
  '/ai-readiness',
  '/implementation',
  '/consultation',
  '/assistant',
  '/faq',
  '/docs',
  `/docs/${docSlug}`,
  '/privacy',
  '/terms',
  '/cookies',
] as const;

export const routePath = (locale: (typeof locales)[number], path: string) => path === '/' ? `/${locale}` : `/${locale}${path}`;

export async function expectHealthyPage(page: Page, path: string, locale: (typeof locales)[number]) {
  const response = await page.goto(routePath(locale, path), { waitUntil: 'domcontentloaded' });
  expect(response?.status(), `${routePath(locale, path)} response`).toBe(200);
  await expect(page.locator('h1').first()).toBeVisible();
  const bodyText = await page.locator('body').innerText();
  expect(bodyText).not.toMatch(/(?:page )?not found|ვერ მოიძებნა|error 404|\b404\b/i);
}

export async function expectSeoBasics(page: Page, path: string, locale: (typeof locales)[number]) {
  const expected = `https://imi.ge/${locale}${path === '/' ? '' : path}`;
  const title = await page.title();
  expect(title.trim()).not.toBe('');
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(description).toMatch(/\S+/);
  expect(canonical).toBe(expected);
  for (const language of ['ka', 'en', 'x-default']) {
    await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute('href', /https:\/\/imi\.ge\//);
  }
  return { title, description: description!, canonical: canonical! };
}
