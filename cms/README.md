# IMI.GE CMS (Sanity Studio)

Headless CMS ვებსაიტის კონტენტის მართვისთვის.

## სწრაფი დაწყება

### 1. Sanity პროექტი

თუ ჯერ არ გაქვთ Sanity პროექტი:

1. გადახედეთ [sanity.io](https://sanity.io) და შექმენით ანგარიში
2. [manage.sanity.io](https://manage.sanity.io) – შექმენით ახალი პროექტი
3. ჩაიწერეთ **Project ID** და **Dataset** (ჩვეულებრივ `production`)

### 2. ცვლადები — ერთი ფაილი

ყველა Sanity ცვლადი ინახება `cms/.env`-ში. Frontend იყენებს იმავე ფაილს (სიმბოლური ბმული `frontend/.env.local` → `cms/.env`).

შექმენით `cms/.env`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_READ_TOKEN=your_read_token
SANITY_PREVIEW_SECRET=your_preview_secret
```

**SANITY_READ_TOKEN:** [manage.sanity.io](https://manage.sanity.io) → Project → API → Tokens — Viewer უფლებით.
**SANITY_WRITE_TOKEN:** Editor უფლებით — საჭიროა `npm run seed:navigation`-სთვის.

### 3. ნავიგაციის მონაცემების შევსება

თუ ნავიგაცია ცარიელია ან გაფუჭებული, გაუშვით:

```bash
cd cms && npm run seed:navigation
```

ეს დააყენებს სტანდარტულ მენიუს: მთავარი, ჩვენს შესახებ, სერვისები, პორტფოლიო, ბლოგი, დემოები, კონტაქტი.

### 3.1 ყველა გვერდის შევსება

არსებული გვერდების (Route SEO, About, Privacy, Terms, Cookies, Site Settings) CMS-ში შესავსებად:

```bash
cd cms && npm run seed:pages
```

ან ყველაფერი ერთდროულად (ნავიგაცია + გვერდები):

```bash
cd cms && npm run seed
```

### 4. გაშვება

```bash
# მხოლოდ CMS
npm run dev-cms

# ყველა სერვისი ერთად
npm run dev:full
```

- **Production:** https://imi-ge.sanity.studio/
- **ლოკალური:** http://localhost:3333

## სქემები (Content Types)

| ტიპი | აღწერა |
|------|--------|
| **page** | გვერდები (about, services) – Hero, Text Block, Values Grid სექციებით |
| **siteSettings** | საიტის პარამეტრები, SEO, social ბმულები, საკონტაქტო ინფო |
| **navigation** | ნავიგაციის ნივთები |
| **blogPost** | ბლოგის პოსტები – title, excerpt, body, mainImage, category, author |
| **legalPage** | კონფიდენციალურობა, წესები, cookies – slug-ები: `privacy`, `terms`, `cookies` |

## როგორ შეიქმნას კონტენტი

1. გაუშვით Studio (`npm run dev-cms`)
2. **Navigation** – დაამატეთ ნავიგაციის ელემენტები (label ka/en/ru, href, order)
3. **Site Settings** – შეავსეთ social ბმულები, contact
4. **Pages** – შექმენით `about` slug-ის გვერდი
5. **Blog Post** – დაამატეთ პოსტები slug-ით
6. **Legal Page** – შექმენით დოკუმენტები slug-ებით: privacy, terms, cookies

## Frontend ინტეგრაცია

- **About** – `/about` – იყენებს `page` slug-ით "about"
- **Blog** – `/blog` და `/blog/[slug]` – სია და ცალკეული პოსტები
- **Legal** – `/privacy`, `/terms`, `/cookies` – იყენებს `legalPage`-ს
- **Navbar** – ნავიგაცია `navigation` დოკუმენტიდან
- **Footer** – social ბმულები `siteSettings`-დან

თუ Sanity-ში კონტენტი არ არის, გამოიყენება fallback (ხაზგასმული კონტენტი / next-intl).
