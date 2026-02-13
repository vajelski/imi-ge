#!/usr/bin/env node
/**
 * Ensures siteSettings document exists with required fields.
 * Idempotent: createIfNotExists or patch missing fields only.
 * Run: cd cms && node scripts/ensure-siteSettings.mjs
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
  const q = encodeURIComponent('*[_type == "siteSettings"][0]');
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const json = await res.json();
  return json?.result || null;
}

async function mutate(mutations) {
  const res = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

const defaultContacts = { primaryEmail: 'info@imi.ge', primaryPhone: '+995 555 123 456' };
const defaultNav = {
  headerLinks: [
    { label: { ka: 'მთავარი', en: 'Home', ru: 'Главная' }, href: '/', enabled: true },
    { label: { ka: 'ჩვენს შესახებ', en: 'About Us', ru: 'О нас' }, href: '/about', enabled: true },
    { label: { ka: 'სერვისები', en: 'Services', ru: 'Услуги' }, href: '/services', enabled: true },
    { label: { ka: 'პორტფოლიო', en: 'Portfolio', ru: 'Портфолио' }, href: '/portfolio', enabled: true },
    { label: { ka: 'ბლოგი', en: 'Blog', ru: 'Блог' }, href: '/blog', enabled: true },
    { label: { ka: 'დემოები', en: 'Demos', ru: 'Демо' }, href: '/demos', enabled: true },
    { label: { ka: 'კონტაქტი', en: 'Contact', ru: 'Контакт' }, href: '/contact', enabled: true },
  ],
};
const defaultSeo = {
  metaTitle: { ka: 'IMI.GE | AI და ტექნოლოგიური გადაწყვეტილებები', en: 'IMI.GE | AI & Tech Solutions Georgia', ru: 'IMI.GE | AI и технологические решения' },
  metaDescription: { ka: 'ვაერთიანებთ კრეატიულ დიზაინს, უახლეს ტექნოლოგიებს და AI-ს.', en: 'We combine creative design, cutting-edge tech and AI.', ru: 'Объединяем дизайн, технологии и ИИ.' },
  canonicalBaseUrl: 'https://imi.ge',
  robotsIndexDefault: true,
  robotsFollowDefault: true,
  twitterCard: 'summary_large_image',
};
const defaultToggles = { enableBlog: true, enablePortfolio: true, enableDemos: true, enablePricing: true, enableTestimonials: false, enableLogos: false, enableNewsletter: false, enableWhatsApp: false, enableTelegram: false, enableContactForm: true, enableLeadCapturePopup: false, enableCookieBanner: true, enableAnalytics: true };
const defaultPageToggles = { homeEnabled: true, servicesEnabled: true, portfolioEnabled: true, blogEnabled: true, aboutEnabled: true, contactEnabled: true, termsEnabled: true, privacyEnabled: true, cookiesEnabled: true };

async function ensure() {
  if (!TOKEN) {
    console.error('SANITY_WRITE_TOKEN or SANITY_API_TOKEN required in cms/.env');
    process.exit(1);
  }
  const existing = await fetchExisting();
  const mutations = [];
  if (!existing) {
    mutations.push({
      createIfNotExists: {
        _id: 'siteSettings',
        _type: 'siteSettings',
        contacts: defaultContacts,
        toggles: defaultToggles,
        pageToggles: defaultPageToggles,
        navigation: defaultNav,
        seoDefaults: defaultSeo,
        branding: { siteName: { ka: 'IMI.GE', en: 'IMI.GE', ru: 'IMI.GE' }, primaryCTA: { label: { ka: 'უფასო კონსულტაცია', en: 'Free Consultation', ru: 'Бесплатная консультация' }, href: '/contact', enabled: true }, secondaryCTA: { label: { ka: 'გჭირდებათ დახმარება?', en: 'Need Help?', ru: 'Нужна помощь?' }, href: '/contact', enabled: true } },
        integrations: {},
      },
    });
  } else {
    const set = {};
    if (!existing.contacts?.primaryEmail) set['contacts.primaryEmail'] = defaultContacts.primaryEmail;
    if (!existing.contacts?.primaryPhone) set['contacts.primaryPhone'] = defaultContacts.primaryPhone;
    if (!existing.seoDefaults?.canonicalBaseUrl) set['seoDefaults.canonicalBaseUrl'] = defaultSeo.canonicalBaseUrl;
    if (!existing.toggles) set.toggles = defaultToggles;
    if (!existing.pageToggles) set.pageToggles = defaultPageToggles;
    if (!existing.navigation?.headerLinks?.length) set.navigation = defaultNav;
    if (!existing.seoDefaults?.metaTitle) set.seoDefaults = defaultSeo;
    if (Object.keys(set).length) mutations.push({ patch: { id: 'siteSettings', set } });
  }
  if (mutations.length) await mutate(mutations);
  console.log('siteSettings ensured.');
}

ensure().catch((e) => { console.error(e); process.exit(1); });
