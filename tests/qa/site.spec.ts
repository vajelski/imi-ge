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

  test('legacy commercial URLs redirect to the current taxonomy', async ({ request, baseURL }) => {
    const redirects = [
      ['/en/contact', '/en/consultation'],
      ['/en/portfolio', '/en/projects'],
      ['/en/services/audit', '/en/ai-readiness'],
      ['/en/services/builder', '/en/services/ai-native-web'],
      ['/en/services/seo', '/en/services/ai-native-web'],
      ['/en/demos', '/en/assistant'],
    ] as const;
    for (const [from, to] of redirects) {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status(), from).toBe(308);
      expect(new URL(response.headers().location, baseURL ?? 'http://127.0.0.1:3003').pathname).toBe(to);
    }
  });

  test('English key routes contain no Georgian-script body text', async ({ page }) => {
    const routes = ['/en', '/en/services/ai-native-web', '/en/projects/urbania', '/en/solutions/ai-operator', '/en/solutions/social-commerce-ai', '/en/ai-readiness', '/en/implementation', '/en/assistant', '/en/privacy', '/en/terms', '/en/cookies'];
    for (const route of routes) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const bodyText = await page.locator('body').innerText();
      expect(bodyText, `${route} contains Georgian body text`).not.toMatch(/[\u10A0-\u10FF]/);
    }
  });

  test('canonical links remain self-referential for current routes', async ({ page }) => {
    for (const route of ['/en/services/ai-native-web', '/en/projects/urbania', '/en/consultation', '/en/privacy']) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://imi.ge${route}`);
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
    await expect(page.locator('[data-navigation-ready="true"]')).toBeVisible();
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

  test('mobile footer contact content stays within the viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    const bounds = await page.locator('.site-footer').evaluate((footer) => {
      const rect = footer.getBoundingClientRect();
      const contacts = [...footer.querySelectorAll('.footer-contact')].map((element) => element.getBoundingClientRect().right);
      return { footerRight: rect.right, contactRight: Math.max(...contacts) };
    });
    expect(bounds.footerRight).toBeLessThanOrEqual(375);
    expect(bounds.contactRight).toBeLessThanOrEqual(375);
  });

  test('localized child 404 uses the locale not-found page', async ({ page }) => {
    const response = await page.goto('/en/does-not-exist/deeper', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('გვერდი ვერ მოიძებნა');
  });

  test('ROI output is deterministic and locale-independent', async ({ page }) => {
    await page.goto('/en/solutions/ai-operator', { waitUntil: 'domcontentloaded' });
    const first = await page.locator('output').first().innerText();
    const result = await page.locator('text=1,452').first().innerText();
    await page.reload({ waitUntil: 'domcontentloaded' });
    expect(first).toBe('1,200');
    expect(result).toContain('1,452');
    await expect(page.locator('output').first()).toHaveText('1,200');
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
    await expect(page.locator('[data-theme-toggle-ready="true"]').first()).toBeVisible();
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
    await expect(page.locator('[data-contact-form-ready="true"]')).toBeVisible();
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
    await expect(page.locator('[data-assistant-ready="true"]')).toBeVisible();
    const input = page.locator('textarea').last();
    await input.fill('Which service should we start with?');
    await input.press('Enter');
    await expect(page.getByText('Mocked assistant response')).toBeVisible();
    expect(requestBody?.locale).toBe('en');
    expect(requestBody?.messages?.at(-1)).toEqual({ role: 'user', content: 'Which service should we start with?' });
  });
});
