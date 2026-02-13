# SEO კონტროლი CMS-ში

ყველა მთავარი გვერდის meta title, description და სხვა SEO პარამეტრები ახლა მართვადია Sanity CMS-ში.

## სად რედაქტირება

### 1. Route SEO (სტატიკური გვერდები)

Sanity Studio → **Route SEO** დოკუმენტები:

| Route | გვერდი |
|-------|--------|
| home | მთავარი (/) |
| services | სერვისები |
| services/seo | SEO სერვისი |
| services/builder | Builder |
| services/audit | Audit |
| blog | ბლოგი |
| contact | კონტაქტი |
| portfolio | პორტფოლიო |
| demos | დემოები |

თითოეულ Route SEO დოკუმენტში:
- **Meta Title** — ka, en, ru
- **Meta Description** — ka, en, ru
- **OG Image** — Open Graph სურათი
- **No Index** — თუ ჩართულია, გვერდი არ მოხვდება საძიებოში

### 2. Site Settings → Default SEO

მთავარი გვერდის ნაგულისხმევი SEO (თუ Route SEO "home" არ არსებობს):
- Title, Description, OG Image — სამივე ენაზე

### 3. Page (დინამიური გვერდები)

**Page** დოკუმენტები (მაგ: About) — თითოეულს აქვს **SEO Settings**:
- Meta Title, Meta Description, OG Image, No Index

### 4. Legal Page (პრივატულობა, წესები, ქუქი)

**Legal Page** დოკუმენტებში (privacy, terms, cookies) ახალი **SEO** ბლოკი:
- Meta Title, Meta Description, No Index

### 5. Blog Post

თითოეულ **Blog Post**-ს აქვს **SEO** ბლოკი — meta title და description სამივე ენაზე.

---

## Fallback

თუ CMS-ში არ არის შევსებული, გამოიყენება JSON თარგმანები (messages) ან ნაგულისხმევი მნიშვნელობები.
