import { expect, test } from '@playwright/test';
import { articleSlug, docSlug, expectHealthyPage, expectSeoBasics, locales, routePath, smokeRoutes } from './utils';

test.describe('Wave 4 route and SEO smoke coverage', () => {
  test('public routes render with a visible H1 and no obvious 404 state', async ({ page }) => {
    for (const locale of locales) {
      for (const path of smokeRoutes) {
        await expectHealthyPage(page, path, locale);
      }
    }
  });

  test('public route metadata is present, localized, and unique', async ({ page }) => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const canonicals = new Set<string>();
    for (const locale of locales) {
      for (const path of smokeRoutes) {
        await expectHealthyPage(page, path, locale);
        const metadata = await expectSeoBasics(page, path, locale);
        titles.add(metadata.title);
        descriptions.add(metadata.description);
        canonicals.add(metadata.canonical);
      }
    }
    expect(titles.size).toBe(locales.length * smokeRoutes.length);
    expect(descriptions.size).toBe(locales.length * smokeRoutes.length);
    expect(canonicals.size).toBe(locales.length * smokeRoutes.length);
  });

  test('Russian URLs permanently redirect to the Georgian route family', async ({ request, baseURL }) => {
    for (const [from, to] of [['/ru', '/ka'], ['/ru/blog', '/ka/blog']] as const) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(new URL(response.headers().location, baseURL ?? 'http://127.0.0.1:3003').pathname).toBe(to);
    }
  });
});

test.describe('Wave 4 visual and interaction checks', () => {
  test('homepage exposes the workflow visual and both locale links', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.workflow-diagram')).toBeVisible();
    await expect(page.locator('.workflow-diagram__stage')).toHaveCount(4);
    await expect(page.locator('.language-switcher').first().getByRole('link', { name: 'KA' })).toHaveAttribute('href', '/ka');
    await expect(page.locator('.language-switcher').first().getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en');
  });

  test('mobile navigation opens and language switching remains available', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/ka', { waitUntil: 'domcontentloaded' });
    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    await menuButton.click();
    const mobileNavigation = page.locator('#mobile-navigation');
    await expect(mobileNavigation).toBeVisible();
    await expect(mobileNavigation.locator('.language-switcher a')).toHaveCount(2);
    await mobileNavigation.getByRole('link', { name: 'EN' }).click();
    await expect(page).toHaveURL(/\/en$/);
  });

  test('mobile routes do not create horizontal viewport overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const path of ['/en', '/en/services', `/en/blog/${articleSlug}`, `/en/docs/${docSlug}`]) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} horizontal overflow`).toBeLessThanOrEqual(1);
    }
  });

  test('keyboard navigation exposes a visible focus ring', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    let foundFocusRing = false;
    for (let index = 0; index < 30 && !foundFocusRing; index += 1) {
      await page.keyboard.press('Tab');
      foundFocusRing = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active?.closest('.site-header')) return false;
        const style = getComputedStyle(active);
        return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0;
      });
    }
    expect(foundFocusRing).toBe(true);
  });

  test('theme toggles synchronize across the header and footer', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      window.dispatchEvent(new Event('imi-theme-change'));
    });
    await page.locator('.theme-toggle').first().click();
    await expect.poll(() => page.evaluate(() => localStorage.getItem('theme'))).toBe('light');
    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('dark'))).toBe(false);
    await expect.poll(async () => {
      const buttonIcons = await page.locator('.theme-toggle').evaluateAll((buttons) => buttons.map((button) => button.innerHTML));
      return new Set(buttonIcons).size;
    }).toBe(1);
  });

  test('served CSS includes the reduced-motion accessibility rule', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    const hasReducedMotionRule = await page.evaluate(async () => {
      const stylesheets = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
      const css = await Promise.all(stylesheets.map(async (stylesheet) => {
        try {
          return await (await fetch(stylesheet.href)).text();
        } catch {
          return '';
        }
      }));
      return css.some((text) => text.includes('prefers-reduced-motion'));
    });
    expect(hasReducedMotionRule).toBe(true);
  });
});

test.describe('Wave 4 safely mocked API contracts', () => {
  test('contact form accepts the success response shape', async ({ page }) => {
    let requestBody: Record<string, unknown> | undefined;
    await page.route('**/api/contact', async (route) => {
      requestBody = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
      });
    });
    await page.goto('/en/consultation', { waitUntil: 'domcontentloaded' });
    await page.locator('#contact-email').fill('qa@example.com');
    await page.locator('#contact-message').fill('A sufficiently detailed QA message.');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByRole('button', { name: 'Sent' })).toBeVisible();
    expect(requestBody).toMatchObject({ email: 'qa@example.com', message: 'A sufficiently detailed QA message.', website: '' });
  });

  test('assistant accepts the message response shape', async ({ page }) => {
    let requestBody: { locale?: string; messages?: Array<{ role: string; content: string }> } | undefined;
    await page.route('**/api/assistant', async (route) => {
      requestBody = route.request().postDataJSON() as typeof requestBody;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Mocked assistant response' }),
      });
    });
    await page.goto('/en/assistant', { waitUntil: 'domcontentloaded' });
    const input = page.locator('textarea').last();
    await input.fill('Which service should we start with?');
    await input.press('Enter');
    await expect(page.getByText('Mocked assistant response')).toBeVisible();
    expect(requestBody?.locale).toBe('en');
    expect(requestBody?.messages?.at(-1)).toEqual({ role: 'user', content: 'Which service should we start with?' });
  });
});
