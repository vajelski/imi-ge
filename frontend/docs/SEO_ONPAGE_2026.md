# On-Page SEO 2026 — IMI.GE

## რა განხორციელდა

### 1. Meta Tags
- **Title template**: `%s | IMI.GE` (ნაგულისხმევი: IMI.GE | AI & Tech Solutions Georgia)
- **Description**: ოპტიმიზებული 150–160 სიმბოლოზე
- **Keywords**: IMi.GE, AI საქართველო, ხელოვნური ინტელექტი, ვებ-დეველოპმენტი, SEO, ტექნოლოგიური კონსულტაცია
- **Canonical + hreflang**: კანონიკური URL და ენობრივი ალტერნატივები ყველა გვერდზე

### 2. Open Graph (Facebook, LinkedIn)
- `og:title`, `og:description`, `og:url`, `og:image` (1200×630)
- `og:type` (website / article ბლოგისთვის)
- `og:locale` (ka_GE, en_US, ru_GE)
- `article:publishedTime`, `article:modifiedTime` ბლოგზე

### 3. Twitter Card
- `summary_large_image`
- `twitter:title`, `twitter:description`, `twitter:image`

### 4. Structured Data (JSON-LD)
- **Organization**: @id, contactPoint, logo, sameAs
- **WebSite**: SearchAction (Sitelinks Search Box) Google-სთვის
- **Article**: ბლოგის პოსტებისთვის
- **BreadcrumbList**: შიდა გვერდები (მაგ. ბლოგი → პოსტი)

### 5. Sitemap
- ყველა სტატიკური გვერდი (ka, en, ru)
- **ბლოგის პოსტები** — დინამიურად Sanity-დან
- `lastModified`, `changeFrequency`, `priority`
- `alternates.languages` — hreflang საიტმაპისთვის

### 6. robots.txt
- Allow: /
- Disallow: /api/, /cms-preview, /auth
- Sitemap: https://imi.ge/sitemap.xml
- Host: https://imi.ge

### 7. Technical
- `metadataBase` — ყველა URL აბსოლუტური
- `formatDetection: false` — email/phone არ ავტოლინკდება მობილურზე
- `themeColor` + `viewport` — generateViewport-ით

---

## ფაილების სტრუქტურა

| ფაილი | დანიშნულება |
|-------|--------------|
| `lib/seo/constants.ts` | SITE_URL, OG ზომები, keywords |
| `lib/sanity/metadata.ts` | getHomeMetadata, getRouteMetadata, buildLegalMetadata |
| `components/WebSiteStructuredData.tsx` | WebSite + SearchAction schema |
| `components/ArticleStructuredData.tsx` | Article schema ბლოგისთვის |
| `components/BreadcrumbStructuredData.tsx` | BreadcrumbList schema |
| `app/sitemap.ts` | დინამიური საიტმაპი |
| `app/robots.ts` | robots.txt |

---

## შემოწმება

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Lighthouse SEO სკორი

---

## რეკომენდაციები

1. **OG Image**: `public/og-image.png` — 1200×630 px
2. **Blog images**: Sanity mainImage მინიმუმ 1200×630 რეკომენდირებულია
3. **CMS Route SEO**: Sanity Studio-ში შეავსეთ meta title/description ყველა გვერდისთვის
