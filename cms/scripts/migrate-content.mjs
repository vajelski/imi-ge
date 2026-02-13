#!/usr/bin/env node
/**
 * Migrate content into Sanity: create/update siteSettings with new structure (contacts, toggles, nav, branding, seoDefaults).
 * Copies from existing siteSettings (legacy contact, defaultSeo, social) when present.
 * Run from cms/: node scripts/migrate-content.mjs
 * Requires: SANITY_WRITE_TOKEN or SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET in cms/.env
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'd9x8a9z8';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

async function fetchExisting() {
  const query = encodeURIComponent('*[_type == "siteSettings"][0]{ contact, defaultSeo, siteName, social }');
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${query}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  );
  const json = await res.json();
  return json?.result || null;
}

async function migrate() {
  if (!TOKEN) {
    console.error('SANITY_WRITE_TOKEN or SANITY_API_TOKEN required in cms/.env');
    process.exit(1);
  }
  const existing = await fetchExisting();
  const contact = existing?.contact || {};
  const defaultSeo = existing?.defaultSeo || {};
  const siteName = existing?.siteName || { ka: 'IMI.GE', en: 'IMI.GE', ru: 'IMI.GE' };

  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    contacts: {
      primaryEmail: contact.email || undefined,
      primaryPhone: contact.phone || undefined,
      address: contact.address || undefined,
    },
    toggles: {
      enableBlog: true,
      enablePortfolio: true,
      enableDemos: true,
      enablePricing: true,
      enableTestimonials: false,
      enableLogos: false,
      enableNewsletter: false,
      enableWhatsApp: false,
      enableTelegram: false,
      enableContactForm: true,
      enableLeadCapturePopup: false,
      enableCookieBanner: true,
      enableAnalytics: true,
    },
    pageToggles: {
      homeEnabled: true,
      servicesEnabled: true,
      portfolioEnabled: true,
      blogEnabled: true,
      aboutEnabled: true,
      contactEnabled: true,
      termsEnabled: true,
      privacyEnabled: true,
      cookiesEnabled: true,
    },
    navigation: {
      headerLinks: [
        { label: { ka: 'მთავარი', en: 'Home', ru: 'Главная' }, href: '/', enabled: true },
        { label: { ka: 'ჩვენს შესახებ', en: 'About Us', ru: 'О нас' }, href: '/about', enabled: true },
        { label: { ka: 'სერვისები', en: 'Services', ru: 'Услуги' }, href: '/services', enabled: true },
        { label: { ka: 'პორტფოლიო', en: 'Portfolio', ru: 'Портфолио' }, href: '/portfolio', enabled: true },
        { label: { ka: 'ბლოგი', en: 'Blog', ru: 'Блог' }, href: '/blog', enabled: true },
        { label: { ka: 'დემოები', en: 'Demos', ru: 'Демо' }, href: '/demos', enabled: true },
        { label: { ka: 'კონტაქტი', en: 'Contact', ru: 'Контакт' }, href: '/contact', enabled: true },
      ],
    },
    branding: {
      siteName,
      primaryCTA: { label: { ka: 'უფასო კონსულტაცია', en: 'Free Consultation', ru: 'Бесплатная консультация' }, href: '/contact', enabled: true },
      secondaryCTA: { label: { ka: 'გჭირდებათ დახმარება?', en: 'Need Help?', ru: 'Нужна помощь?' }, href: '/contact', enabled: true },
    },
    seoDefaults: {
      metaTitle: defaultSeo.title || { ka: 'IMI.GE | AI და ტექნოლოგიური გადაწყვეტილებები', en: 'IMI.GE | AI & Tech Solutions Georgia', ru: 'IMI.GE | AI и технологические решения' },
      metaDescription: defaultSeo.description,
      canonicalBaseUrl: 'https://imi.ge',
      robotsIndexDefault: true,
      robotsFollowDefault: true,
      twitterCard: 'summary_large_image',
    },
    integrations: {},
    siteName: existing?.siteName,
    defaultSeo: existing?.defaultSeo,
    social: existing?.social,
    contact: existing?.contact,
  };

  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations: [{ createOrReplace: doc }] }),
  });
  const result = await res.json();
  if (result?.results?.[0]?.id) {
    console.log('siteSettings created/updated:', result.results[0].id);
  } else {
    console.error('Mutation failed:', result);
    process.exit(1);
  }
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});
