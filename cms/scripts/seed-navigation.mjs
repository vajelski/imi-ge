#!/usr/bin/env node
/**
 * Seeds the navigation document in Sanity CMS with the default menu items.
 * Run from cms/: node scripts/seed-navigation.mjs
 * Loads .env from cms/ (NEXT_PUBLIC_SANITY_*, SANITY_WRITE_TOKEN)
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  }
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'd9x8a9z8';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const TOKEN = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

const NAV_ITEMS = [
  { label: { ka: 'მთავარი', en: 'Home', ru: 'Главная' }, href: '/', order: 0 },
  { label: { ka: 'ჩვენს შესახებ', en: 'About Us', ru: 'О нас' }, href: '/about', order: 1 },
  { label: { ka: 'სერვისები', en: 'Services', ru: 'Услуги' }, href: '/services', order: 2 },
  { label: { ka: 'პორტფოლიო', en: 'Portfolio', ru: 'Портфолио' }, href: '/portfolio', order: 3 },
  { label: { ka: 'ბლოგი', en: 'Blog', ru: 'Блог' }, href: '/blog', order: 4 },
  { label: { ka: 'დემოები', en: 'Demos', ru: 'Демо' }, href: '/demos', order: 5 },
  { label: { ka: 'კონტაქტი', en: 'Contact', ru: 'Контакт' }, href: '/contact', order: 6 },
];

async function seed() {
  if (!TOKEN) {
    console.error('Error: SANITY_WRITE_TOKEN or SANITY_API_TOKEN required in cms/.env');
    process.exit(1);
  }

  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const body = {
    mutations: [
      {
        createOrReplace: {
          _id: 'navigation',
          _type: 'navigation',
          items: NAV_ITEMS,
        },
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('❌ Seed failed:', res.status, err);
    process.exit(1);
  }

  console.log('✅ Navigation seeded:', NAV_ITEMS.map((i) => i.href).join(', '));
}

seed();
