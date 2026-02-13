#!/usr/bin/env node
/**
 * Full content seed: siteSettings, pageDocs, routeSeo, legal, services, FAQ, blog, portfolio.
 * Safe: createIfNotExists for content docs; createOrReplace only for routeSeo/legal (idempotent).
 * Run: cd cms && node scripts/ensure-siteSettings.mjs && node scripts/seed-content.mjs
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

function ptBlock(text, style = 'normal') {
  return { _type: 'block', _key: `b-${Math.random().toString(36).slice(2, 11)}`, style, children: [{ _type: 'span', _key: 's1', text: String(text), marks: [] }], markDefs: [] };
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

async function run() {
  if (!TOKEN) {
    console.error('SANITY_WRITE_TOKEN required in cms/.env');
    process.exit(1);
  }
  const mutations = [];

  const pageDocSlugs = ['home', 'services', 'portfolio', 'blog', 'about', 'contact', 'demos'];
  for (const slug of pageDocSlugs) {
    mutations.push({
      createIfNotExists: {
        _id: `pageDoc-${slug}`,
        _type: 'pageDoc',
        slug,
        enabled: true,
        sections: [],
        seo: {},
      },
    });
  }

  const routeSeoList = [
    { route: 'home', metaTitle: { ka: 'IMI.GE | AI & ტექნოლოგიები საქართველოში', en: 'IMI.GE | AI & Tech Solutions Georgia', ru: 'IMI.GE | AI и технологии в Грузии' }, metaDescription: { ka: 'ვაერთიანებთ კრეატიულ დიზაინს, უახლეს ტექნოლოგიებს და AI-ს.', en: 'We combine creative design, cutting-edge tech and AI.', ru: 'Объединяем дизайн, технологии и ИИ.' } },
    { route: 'services', metaTitle: { ka: 'სერვისები | IMI.GE', en: 'Services | IMI.GE', ru: 'Услуги | IMI.GE' }, metaDescription: { ka: 'ვებ-დეველოპმენტი, AI ინტეგრაცია, SEO აუდიტი.', en: 'Web development, AI integration, SEO audit.', ru: 'Веб-разработка, интеграция ИИ, SEO аудит.' } },
    { route: 'services/seo', metaTitle: { ka: 'SEO | IMI.GE', en: 'SEO | IMI.GE', ru: 'SEO | IMI.GE' }, metaDescription: { ka: 'მონაცემებზე დაფუძნებული SEO.', en: 'Data-driven SEO.', ru: 'SEO на данных.' } },
    { route: 'services/builder', metaTitle: { ka: 'AI ვებ-მშენებელი | IMI.GE', en: 'AI Web Builder | IMI.GE', ru: 'AI Веб-конструктор | IMI.GE' }, metaDescription: { ka: 'იდეიდან მზა კოდამდე.', en: 'From idea to code.', ru: 'От идеи к коду.' } },
    { route: 'services/audit', metaTitle: { ka: 'ვებ-აუდიტი AI-ით | IMI.GE', en: 'Website Audit with AI | IMI.GE', ru: 'Аудит сайта с ИИ | IMI.GE' }, metaDescription: { ka: 'სრული ტექნიკური და SEO ანალიზი.', en: 'Full technical and SEO analysis.', ru: 'Полный технический и SEO анализ.' } },
    { route: 'blog', metaTitle: { ka: 'ბლოგი | IMI.GE', en: 'Blog | IMI.GE', ru: 'Блог | IMI.GE' }, metaDescription: { ka: 'ტექნოლოგიური სიახლეები და რჩევები.', en: 'Tech news and tips.', ru: 'Новости и советы.' } },
    { route: 'contact', metaTitle: { ka: 'კონტაქტი | IMI.GE', en: 'Contact | IMI.GE', ru: 'Контакты | IMI.GE' }, metaDescription: { ka: 'დაგვიკავშირდით. უფასო კონსულტაცია.', en: 'Contact us. Free consultation.', ru: 'Свяжитесь с нами. Бесплатная консультация.' } },
    { route: 'portfolio', metaTitle: { ka: 'პორტფოლიო | IMI.GE', en: 'Portfolio | IMI.GE', ru: 'Портфолио | IMI.GE' }, metaDescription: { ka: 'ჩვენი პროექტები.', en: 'Our projects.', ru: 'Наши проекты.' } },
    { route: 'demos', metaTitle: { ka: 'დემოები | IMI.GE', en: 'Demos | IMI.GE', ru: 'Демо | IMI.GE' }, metaDescription: { ka: 'ქართული AI ასისტენტების დემოები.', en: 'Georgian AI assistant demos.', ru: 'Демо грузинских ИИ ассистентов.' } },
  ];
  for (const item of routeSeoList) {
    mutations.push({
      createOrReplace: {
        _id: `routeSeo-${item.route.replace(/\//g, '-')}`,
        _type: 'routeSeo',
        route: item.route,
        seo: { metaTitle: item.metaTitle, metaDescription: item.metaDescription },
      },
    });
  }

  const legalContent = (ka, en, ru) => ({ ka: [ptBlock(ka)], en: [ptBlock(en)], ru: [ptBlock(ru)] });
  const legalPages = [
    { id: 'legal-privacy', slug: 'privacy', title: { ka: 'კონფიდენციალურობის პოლიტიკა', en: 'Privacy Policy', ru: 'Политика конфиденциальности' }, content: legalContent('IMI.GE იცავს თქვენს პირად მონაცემებს.', 'IMI.GE protects your personal data.', 'IMI.GE защищает ваши данные.') },
    { id: 'legal-terms', slug: 'terms', title: { ka: 'წესები და პირობები', en: 'Terms & Conditions', ru: 'Условия использования' }, content: legalContent('ვებ-საიტის გამოყენებით თქვენ ეთანხმებით ჩვენს წესებს.', 'By using this site you agree to our terms.', 'Используя сайт, вы соглашаетесь с нашими условиями.') },
    { id: 'legal-cookies', slug: 'cookies', title: { ka: 'ქუქი-ფაილების პოლიტიკა', en: 'Cookie Policy', ru: 'Политика Cookie' }, content: legalContent('ჩვენ ვიყენებთ ქუქი-ფაილებს საიტის მუშაობისთვის.', 'We use cookies for site operation.', 'Мы используем cookie для работы сайта.') },
  ];
  for (const p of legalPages) {
    mutations.push({
      createOrReplace: {
        _id: p.id,
        _type: 'legalPage',
        slug: { _type: 'slug', current: p.slug },
        title: p.title,
        content: p.content,
        lastUpdated: new Date().toISOString(),
        seo: { metaTitle: p.title, metaDescription: p.title, noindex: false },
      },
    });
  }

  const services = [
    { id: 'service-ai-audit', slug: 'ai-audit', title: { ka: 'AI საიტის აუდიტი', en: 'AI Website Audit', ru: 'Аудит сайта с ИИ' }, desc: { ka: 'სრული ტექნიკური და SEO ანალიზი ხელოვნური ინტელექტის გამოყენებით.', en: 'Full technical and SEO analysis using AI.', ru: 'Полный технический и SEO анализ с помощью ИИ.' } },
    { id: 'service-website-dev', slug: 'website-development', title: { ka: 'ვებ-დეველოპმენტი', en: 'Website Development', ru: 'Веб-разработка' }, desc: { ka: 'თანამედროვე ვებ-საიტები და აპლიკაციები React-ზე და Next.js-ზე.', en: 'Modern websites and apps with React and Next.js.', ru: 'Современные сайты и приложения на React и Next.js.' } },
    { id: 'service-ai-assistants', slug: 'ai-assistants', title: { ka: 'ქართული AI ასისტენტები', en: 'Georgian AI Assistants', ru: 'Грузинские ИИ ассистенты' }, desc: { ka: 'ბიზნესისთვის მორგებული ჩატბოტები და ასისტენტები ქართულ ენაზე.', en: 'Business chatbots and assistants in Georgian.', ru: 'Чат-боты и ассистенты на грузинском для бизнеса.' } },
  ];
  for (const s of services) {
    mutations.push({
      createIfNotExists: {
        _id: s.id,
        _type: 'service',
        slug: { _type: 'slug', current: s.slug },
        enabled: true,
        title: s.title,
        description: s.desc,
        seo: {},
      },
    });
  }

  const faqItems = [
    { q: { ka: 'რა არის AI საიტის აუდიტი?', en: 'What is an AI website audit?', ru: 'Что такое AI-аудит сайта?' }, a: { ka: 'სრული ტექნიკური და SEO ანალიზი ხელოვნური ინტელექტის გამოყენებით.', en: 'Full technical and SEO analysis using AI.', ru: 'Полный технический и SEO анализ с помощью ИИ.' } },
    { q: { ka: 'როგორ მუშაობს უფასო კონსულტაცია?', en: 'How does free consultation work?', ru: 'Как работает бесплатная консультация?' }, a: { ka: 'დაგვიკავშირდით და განვიხილავთ თქვენს საჭიროებებს.', en: 'Contact us and we will discuss your needs.', ru: 'Свяжитесь с нами, и мы обсудим ваши потребности.' } },
    { q: { ka: 'რა ენებზე მუშაობთ?', en: 'What languages do you support?', ru: 'На каких языках вы работаете?' }, a: { ka: 'ქართული, ინგლისური და რუსული.', en: 'Georgian, English and Russian.', ru: 'Грузинский, английский и русский.' } },
    { q: { ka: 'რამდენი დრო სჭირდება პროექტს?', en: 'How long does a project take?', ru: 'Сколько времени занимает проект?' }, a: { ka: 'დამოკიდებულია პროექტის მასშტაბზე; ინდივიდუალურად ვეთანხმებით.', en: 'Depends on project scope; we agree individually.', ru: 'Зависит от масштаба; договариваемся индивидуально.' } },
    { q: { ka: 'შეგიძლიათ არსებული საიტის გაუმჯობესება?', en: 'Can you improve an existing website?', ru: 'Можете ли вы улучшить существующий сайт?' }, a: { ka: 'დიახ, ვაკეთებთ აუდიტს და ოპტიმიზაციას.', en: 'Yes, we do audit and optimization.', ru: 'Да, делаем аудит и оптимизацию.' } },
    { q: { ka: 'რა არის ქართული AI ასისტენტი?', en: 'What is a Georgian AI assistant?', ru: 'Что такое грузинский ИИ ассистент?' }, a: { ka: 'ჩატბოტი ან ასისტენტი, რომელიც საუბრობს ქართულად.', en: 'A chatbot or assistant that speaks Georgian.', ru: 'Чат-бот или ассистент, говорящий по-грузински.' } },
    { q: { ka: 'გაქვთ პორტფოლიო?', en: 'Do you have a portfolio?', ru: 'Есть ли у вас портфолио?' }, a: { ka: 'დიახ, ჩვენი პროექტები ხელმისაწვდომია პორტფოლიო გვერდზე.', en: 'Yes, our projects are on the portfolio page.', ru: 'Да, наши проекты на странице портфолио.' } },
    { q: { ka: 'რა ტექნოლოგიებს იყენებთ?', en: 'What technologies do you use?', ru: 'Какие технологии вы используете?' }, a: { ka: 'React, Next.js, Node.js, Sanity CMS და სხვა თანამედროვე ინსტრუმენტები.', en: 'React, Next.js, Node.js, Sanity CMS and other modern tools.', ru: 'React, Next.js, Node.js, Sanity CMS и другие современные инструменты.' } },
    { q: { ka: 'მუშაობთ საერთაშორისო კლიენტებთან?', en: 'Do you work with international clients?', ru: 'Работаете ли вы с международными клиентами?' }, a: { ka: 'დიახ, ვმუშაობთ საქართველოსა და მის ფარგლებს გარეთ.', en: 'Yes, we work in Georgia and internationally.', ru: 'Да, работаем в Грузии и за рубежом.' } },
    { q: { ka: 'როგორ დავიწყო?', en: 'How do I get started?', ru: 'Как начать?' }, a: { ka: 'დაგვიკავშირდით კონტაქტის გვერდიდან ან ელფოსტით.', en: 'Contact us from the contact page or by email.', ru: 'Свяжитесь с нами со страницы контактов или по email.' } },
  ];
  faqItems.forEach((faq, i) => {
    mutations.push({
      createIfNotExists: {
        _id: `faq-${i + 1}`,
        _type: 'faqItem',
        enabled: true,
        question: faq.q,
        answer: faq.a,
        order: i + 1,
      },
    });
  });

  const blogPosts = [
    { id: 'blog-ai-audit-2026', slug: 'ai-audit-2026', title: { ka: 'AI საიტის აუდიტი 2026', en: 'AI Website Audit 2026', ru: 'Аудит сайта с ИИ 2026' }, excerpt: { ka: 'რატომ სჭირდება ბიზნესს AI-ზე დაფუძნებული ტექნიკური და SEO ანალიზი.', en: 'Why business needs AI-based technical and SEO analysis.', ru: 'Зачем бизнесу анализ на основе ИИ.' } },
    { id: 'blog-core-web-vitals', slug: 'core-web-vitals', title: { ka: 'Core Web Vitals და მომხმარებლის გამოცდილება', en: 'Core Web Vitals and User Experience', ru: 'Core Web Vitals и пользовательский опыт' }, excerpt: { ka: 'LCP, FID, CLS — როგორ გავაუმჯობესოთ მეტრიკები.', en: 'LCP, FID, CLS — how to improve metrics.', ru: 'LCP, FID, CLS — как улучшить метрики.' } },
    { id: 'blog-seo-2026', slug: 'seo-2026', title: { ka: 'SEO 2026: ტენდენციები და რეკომენდაციები', en: 'SEO 2026: Trends and Recommendations', ru: 'SEO 2026: тренды и рекомендации' }, excerpt: { ka: 'რას ელის SEO სპეციალისტები მომავალ წელს.', en: 'What SEO experts expect next year.', ru: 'Чего ожидают SEO-специалисты в следующем году.' } },
    { id: 'blog-ai-assistants-business', slug: 'ai-assistants-for-business', title: { ka: 'AI ასისტენტები ბიზნესისთვის', en: 'AI Assistants for Business', ru: 'ИИ ассистенты для бизнеса' }, excerpt: { ka: 'ქართულენოვანი ჩატბოტები და ავტომატიზაცია.', en: 'Georgian-language chatbots and automation.', ru: 'Чат-боты на грузинском и автоматизация.' } },
    { id: 'blog-fast-ai-websites', slug: 'fast-ai-websites', title: { ka: 'სწრაფი ვებ-საიტები AI-ით', en: 'Fast AI-Powered Websites', ru: 'Быстрые сайты на базе ИИ' }, excerpt: { ka: 'როგორ ვაშენებთ სწრაფ და ჭკვიან ვებ-საიტებს.', en: 'How we build fast and smart websites.', ru: 'Как мы строим быстрые и умные сайты.' } },
  ];
  const now = new Date().toISOString();
  const oneBlock = (t) => [ptBlock(t)];
  for (const b of blogPosts) {
    mutations.push({
      createIfNotExists: {
        _id: b.id,
        _type: 'blogPost',
        enabled: true,
        slug: { _type: 'slug', current: b.slug },
        title: b.title,
        excerpt: b.excerpt,
        body: { ka: oneBlock(b.excerpt.ka), en: oneBlock(b.excerpt.en), ru: oneBlock(b.excerpt.ru) },
        publishedAt: null,
        category: { ka: 'ტექნოლოგია', en: 'Technology', ru: 'Технологии' },
        author: { ka: 'IMI.GE', en: 'IMI.GE', ru: 'IMI.GE' },
        seo: { metaTitle: b.title, metaDescription: b.excerpt },
      },
    });
  }

  const portfolioProjects = [
    { id: 'portfolio-1', slug: 'project-1', title: { ka: 'პროექტი 1', en: 'Project 1', ru: 'Проект 1' }, category: { ka: 'ვებ-საიტი', en: 'Website', ru: 'Веб-сайт' }, desc: { ka: 'აღწერა მალე დაემატება.', en: 'Description coming soon.', ru: 'Описание скоро будет.' } },
    { id: 'portfolio-2', slug: 'project-2', title: { ka: 'პროექტი 2', en: 'Project 2', ru: 'Проект 2' }, category: { ka: 'AI ინტეგრაცია', en: 'AI Integration', ru: 'Интеграция ИИ' }, desc: { ka: 'აღწერა მალე დაემატება.', en: 'Description coming soon.', ru: 'Описание скоро будет.' } },
    { id: 'portfolio-3', slug: 'project-3', title: { ka: 'პროექტი 3', en: 'Project 3', ru: 'Проект 3' }, category: { ka: 'მობილური აპი', en: 'Mobile App', ru: 'Мобильное приложение' }, desc: { ka: 'აღწერა მალე დაემატება.', en: 'Description coming soon.', ru: 'Описание скоро будет.' } },
  ];
  for (const p of portfolioProjects) {
    mutations.push({
      createIfNotExists: {
        _id: p.id,
        _type: 'portfolioProject',
        slug: { _type: 'slug', current: p.slug },
        enabled: true,
        title: p.title,
        category: p.category,
        description: p.desc,
        seo: {},
      },
    });
  }

  if (mutations.length === 0) {
    console.log('Nothing to seed.');
    return;
  }
  await mutate(mutations);
  console.log('Seed complete: pageDocs, routeSeo, legal, services(3), FAQ(10), blog(5), portfolio(3).');
}

run().catch((e) => { console.error(e); process.exit(1); });
