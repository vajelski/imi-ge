#!/usr/bin/env node
/**
 * Seeds all existing pages into Sanity CMS:
 * - Route SEO (home, services, blog, contact, portfolio, demos, etc.)
 * - Page (about)
 * - Legal Page (privacy, terms, cookies)
 * - Site Settings
 *
 * Run: cd cms && node scripts/seed-pages.mjs
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

function ptBlock(text, style = 'normal') {
  return {
    _type: 'block',
    _key: `block-${Math.random().toString(36).slice(2, 11)}`,
    style,
    children: [{ _type: 'span', _key: 's1', text, marks: [] }],
    markDefs: [],
  };
}

async function mutate(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function seed() {
  if (!TOKEN) {
    console.error('Error: SANITY_WRITE_TOKEN required in cms/.env');
    process.exit(1);
  }

  const mutations = [];

  // --- Route SEO ---
  const routeSeoList = [
    { route: 'home', metaTitle: { ka: 'IMI.GE | AI & ტექნოლოგიები საქართველოში', en: 'IMI.GE | AI & Tech Solutions Georgia', ru: 'IMI.GE | AI и технологии в Грузии' }, metaDescription: { ka: 'ვაერთიანებთ კრეატიულ დიზაინს, უახლეს ტექნოლოგიებს და ხელოვნურ ინტელექტს თქვენი ბიზნესის ზრდისთვის.', en: 'We combine creative design, cutting-edge tech and AI for your business growth.', ru: 'Объединяем дизайн, технологии и ИИ для роста вашего бизнеса.' } },
    { route: 'services', metaTitle: { ka: 'სერვისები | IMI.GE', en: 'Services | IMI.GE', ru: 'Услуги | IMI.GE' }, metaDescription: { ka: 'ვებ-დეველოპმენტი, AI ინტეგრაცია, SEO აუდიტი, მობილური აპლიკაციები და ტექნოლოგიური კონსულტაცია.', en: 'Web development, AI integration, SEO audit, mobile apps and tech consulting.', ru: 'Веб-разработка, интеграция ИИ, SEO аудит, мобильные приложения.' } },
    { route: 'services/seo', metaTitle: { ka: 'SEO & მარკეტინგი | IMI.GE', en: 'SEO & Marketing | IMI.GE', ru: 'SEO и маркетинг | IMI.GE' }, metaDescription: { ka: 'გაზარდეთ ხილვადობა Google-ში. მონაცემებზე დაფუძნებული SEO სტრატეგიები.', en: 'Increase visibility in Google. Data-driven SEO strategies.', ru: 'Повысьте видимость в Google. SEO-стратегии на данных.' } },
    { route: 'services/builder', metaTitle: { ka: 'AI ვებ-მშენებელი | IMI.GE', en: 'AI Web Builder | IMI.GE', ru: 'AI Веб-конструктор | IMI.GE' }, metaDescription: { ka: 'იდეიდან მზა კოდამდე. AI წერს React + Tailwind კოდს თქვენი აღწერილობის მიხედვით.', en: 'From idea to ready code. AI writes React + Tailwind based on your description.', ru: 'От идеи к готовому коду. ИИ пишет React + Tailwind по вашему описанию.' } },
    { route: 'services/audit', metaTitle: { ka: 'ვებ-აუდიტი AI-ით | IMI.GE', en: 'Website Audit with AI | IMI.GE', ru: 'Аудит сайта с ИИ | IMI.GE' }, metaDescription: { ka: 'სრული ტექნიკური და SEO ანალიზი ხელოვნური ინტელექტის გამოყენებით.', en: 'Full technical and SEO analysis using artificial intelligence.', ru: 'Полный технический и SEO анализ с помощью ИИ.' } },
    { route: 'blog', metaTitle: { ka: 'ბლოგი & სიახლეები | IMI.GE', en: 'Blog & News | IMI.GE', ru: 'Блог и новости | IMI.GE' }, metaDescription: { ka: 'ტექნოლოგიური სიახლეები, AI ტენდენციები და რჩევები ბიზნესისთვის.', en: 'Tech news, AI trends and tips for business.', ru: 'Новости технологий, тренды ИИ и советы для бизнеса.' } },
    { route: 'contact', metaTitle: { ka: 'კონტაქტი | IMI.GE', en: 'Contact | IMI.GE', ru: 'Контакты | IMI.GE' }, metaDescription: { ka: 'დაგვიკავშირდით პროექტის განსახილველად. უფასო კონსულტაცია.', en: 'Contact us for a project discussion. Free consultation.', ru: 'Свяжитесь с нами для обсуждения проекта. Бесплатная консультация.' } },
    { route: 'portfolio', metaTitle: { ka: 'პორტფოლიო | IMI.GE', en: 'Portfolio | IMI.GE', ru: 'Портфолио | IMI.GE' }, metaDescription: { ka: 'ჩვენი რეალიზებული პროექტები: ვებ-საიტები, AI ინტეგრაცია, მობილური აპლიკაციები.', en: 'Our completed projects: websites, AI integration, mobile apps.', ru: 'Наши проекты: сайты, интеграция ИИ, мобильные приложения.' } },
    { route: 'demos', metaTitle: { ka: 'დემოები | IMI.GE', en: 'Demos | IMI.GE', ru: 'Демо | IMI.GE' }, metaDescription: { ka: 'ქართული AI ასისტენტების და ჩატბოტების ცოცხალი დემონსტრაციები.', en: 'Live demos of Georgian AI assistants and chatbots.', ru: 'Живые демо грузинских ИИ ассистентов и чат-ботов.' } },
  ];

  for (const item of routeSeoList) {
    mutations.push({
      createOrReplace: {
        _id: `routeSeo-${item.route.replace(/\//g, '-')}`,
        _type: 'routeSeo',
        route: item.route,
        seo: {
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
        },
      },
    });
  }

  // --- Page (about) ---
  mutations.push({
    createOrReplace: {
      _id: 'page-about',
      _type: 'page',
      slug: { _type: 'slug', current: 'about' },
      title: { ka: 'ჩვენს შესახებ', en: 'About Us', ru: 'О нас' },
      seo: {
        metaTitle: { ka: 'ჩვენს შესახებ | IMI.GE', en: 'About Us | IMI.GE', ru: 'О нас | IMI.GE' },
        metaDescription: {
          ka: 'IMI.GE არის წამყვანი ციფრული სააგენტო საქართველოში, ორიენტირებული ინოვაციებზე, AI და ბიზნესის ტრანსფორმაციაზე.',
          en: 'IMI.GE is a leading digital agency in Georgia, focused on innovation, AI and business transformation.',
          ru: 'IMI.GE — ведущее digital агентство в Грузии, ориентированное на инновации, ИИ и трансформацию бизнеса.',
        },
      },
      sections: [
        {
          _type: 'hero',
          _key: 'hero1',
          badge: { ka: 'ჩვენს შესახებ', en: 'About Us', ru: 'О нас' },
          title: {
            ka: 'ვინ ვართ ჩვენ და რას ვაკეთებთ',
            en: 'Who We Are & What We Do',
            ru: 'Кто мы и чем занимаемся',
          },
          description: {
            ka: 'IMI.GE არის წამყვანი ციფრული სააგენტო საქართველოში, რომელიც ორიენტირებულია ინოვაციებზე, ხელოვნურ ინტელექტსა და თქვენი ბიზნესის ტრანსფორმაციაზე.',
            en: 'IMI.GE is a leading digital agency in Georgia, focused on innovation, artificial intelligence, and transforming your business.',
            ru: 'IMI.GE — ведущее цифровое агентство в Грузии, ориентированное на инновации, искусственный интеллект и трансформацию вашего бизнеса.',
          },
        },
        {
          _type: 'valuesGrid',
          _key: 'values1',
          items: [
            { icon: 'Lightbulb', title: { ka: 'ინოვაცია', en: 'Innovation', ru: 'Инновации' }, description: { ka: 'მუდმივად ვსწავლობთ და ვნერგავთ უახლეს AI ტექნოლოგიებს.', en: 'Constantly learning and implementing the latest AI technologies.', ru: 'Постоянно изучаем и внедряем новейшие технологии ИИ.' } },
            { icon: 'Target', title: { ka: 'ხარისხი', en: 'Quality', ru: 'Качество' }, description: { ka: 'ვწერთ სუფთა, ოპტიმიზირებულ და მასშტაბირებად კოდს.', en: 'Writing clean, optimized and scalable code.', ru: 'Пишем чистый, оптимизированный и масштабируемый код.' } },
            { icon: 'Users', title: { ka: 'გუნდი', en: 'Team', ru: 'Команда' }, description: { ka: 'გვჯერა, რომ საუკეთესო შედეგი კოლაბორაციით მიიღწევა.', en: 'We believe the best results come through collaboration.', ru: 'Верим, что лучшие результаты достигаются коллаборацией.' } },
            { icon: 'Award', title: { ka: 'შედეგი', en: 'Results', ru: 'Результат' }, description: { ka: 'ჩვენი წარმატება თქვენი ბიზნესის ზრდით იზომება.', en: 'Our success is measured by your business growth.', ru: 'Наш успех измеряется ростом вашего бизнеса.' } },
          ],
        },
      ],
    },
  });

  // --- Legal Pages: privacy, terms, cookies ---
  const legalContent = (ka, en, ru) => ({
    ka: [ptBlock(ka)],
    en: [ptBlock(en)],
    ru: [ptBlock(ru)],
  });

  mutations.push({
    createOrReplace: {
      _id: 'legal-privacy',
      _type: 'legalPage',
      slug: { _type: 'slug', current: 'privacy' },
      title: { ka: 'კონფიდენციალურობის პოლიტიკა', en: 'Privacy Policy', ru: 'Политика конфиденциальности' },
      content: legalContent(
        'IMI.GE იცავს თქვენს პირად მონაცემებს. ჩვენ ვაგროვებთ მხოლოდ საჭირო ინფორმაციას საიტის მუშაობისთვის და მომსახურების გასაუმჯობესებლად. თქვენი მონაცემები არასოდეს ვყიდით მესამე მხარეს.',
        'IMI.GE protects your personal data. We collect only necessary information for the site operation and service improvement. We never sell your data to third parties.',
        'IMI.GE защищает ваши персональные данные. Мы собираем только необходимую информацию для работы сайта и улучшения сервиса. Никогда не продаем ваши данные третьим лицам.'
      ),
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: { ka: 'კონფიდენციალურობა | IMI.GE', en: 'Privacy Policy | IMI.GE', ru: 'Конфиденциальность | IMI.GE' },
        metaDescription: { ka: 'ჩვენი პოლიტიკა პირად მონაცემთა დაცვისა და გამოყენების შესახებ.', en: 'Our policy on data protection and usage.', ru: 'Наша политика защиты и использования данных.' },
        noindex: false,
      },
    },
  });

  mutations.push({
    createOrReplace: {
      _id: 'legal-terms',
      _type: 'legalPage',
      slug: { _type: 'slug', current: 'terms' },
      title: { ka: 'წესები და პირობები', en: 'Terms & Conditions', ru: 'Условия использования' },
      content: legalContent(
        'ვებ-საიტის გამოყენებით თქვენ ეთანხმებით ჩვენს წესებსა და პირობებს. სერვისების გამოყენება შესაძლებელია მხოლოდ კანონიერ მიზნებში.',
        'By using this website you agree to our terms and conditions. Services may only be used for lawful purposes.',
        'Используя сайт, вы соглашаетесь с нашими правилами и условиями. Услуги могут использоваться только в законных целях.'
      ),
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: { ka: 'წესები და პირობები | IMI.GE', en: 'Terms & Conditions | IMI.GE', ru: 'Условия | IMI.GE' },
        metaDescription: { ka: 'ჩვენი წესები და პირობები სერვისების გამოყენებისთვის.', en: 'Our terms and conditions for using our services.', ru: 'Наши правила и условия использования сервисов.' },
        noindex: false,
      },
    },
  });

  mutations.push({
    createOrReplace: {
      _id: 'legal-cookies',
      _type: 'legalPage',
      slug: { _type: 'slug', current: 'cookies' },
      title: { ka: 'ქუქი-ფაილების პოლიტიკა', en: 'Cookie Policy', ru: 'Политика использования Cookie' },
      content: legalContent(
        'ჩვენ ვიყენებთ ქუქი-ფაილებს საიტის მუშაობისთვის, ანალიტიკისთვის და გამოცდილების გასაუმჯობესებლად. თქვენ შეგიძლიათ მართოთ ქუქი-ფაილების მიღება საიტის პარამეტრებიდან.',
        'We use cookies for site operation, analytics and to improve your experience. You can manage cookie acceptance from site settings.',
        'Мы используем cookie для работы сайта, аналитики и улучшения опыта. Вы можете управлять cookie в настройках сайта.'
      ),
      lastUpdated: new Date().toISOString(),
      seo: {
        metaTitle: { ka: 'ქუქი-ფაილები | IMI.GE', en: 'Cookies | IMI.GE', ru: 'Cookie | IMI.GE' },
        metaDescription: { ka: 'ჩვენი პოლიტიკა ქუქი-ფაილების გამოყენების შესახებ.', en: 'Our policy on cookie usage.', ru: 'Наша политика использования cookie.' },
        noindex: false,
      },
    },
  });

  // --- Site Settings ---
  mutations.push({
    createOrReplace: {
      _id: 'siteSettings',
      _type: 'siteSettings',
      siteName: { ka: 'IMI.GE', en: 'IMI.GE', ru: 'IMI.GE' },
      defaultSeo: {
        title: { ka: 'IMI.GE | AI & ტექნოლოგიები საქართველოში', en: 'IMI.GE | AI & Tech Solutions Georgia', ru: 'IMI.GE | AI и технологии в Грузии' },
        description: {
          ka: 'ვაერთიანებთ კრეატიულ დიზაინს, უახლეს ტექნოლოგიებს და ხელოვნურ ინტელექტს თქვენი ბიზნესის ზრდისთვის.',
          en: 'We combine creative design, cutting-edge tech and AI for your business growth.',
          ru: 'Объединяем дизайн, технологии и ИИ для роста вашего бизнеса.',
        },
      },
      social: {
        facebook: 'https://facebook.com/imi.ge',
        linkedin: 'https://linkedin.com/company/imi-ge',
        twitter: '',
        instagram: '',
      },
      contact: {
        email: 'info@imi.ge',
        phone: '+995 555 123 456',
        address: { ka: 'თბილისი, საქართველო', en: 'Tbilisi, Georgia', ru: 'Тбилиси, Грузия' },
      },
    },
  });

  console.log('Seeding Route SEO, Page (about), Legal Pages, Site Settings...');
  await mutate(mutations);
  console.log('✅ All pages seeded successfully!');
  console.log('   - Route SEO: home, services, blog, contact, portfolio, demos + sub-routes');
  console.log('   - Page: about');
  console.log('   - Legal: privacy, terms, cookies');
  console.log('   - Site Settings');
}

seed().catch((e) => {
  console.error('❌ Seed failed:', e.message);
  process.exit(1);
});
