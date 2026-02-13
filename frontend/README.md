# იმი.ჯი (Imi.ge) - Frontend

თანამედროვე ვებ-პლატფორმა AI სერვისებისთვის.

## 🚀 პროექტის გაშვება

1.  **დააინსტალირეთ დამოკიდებულებები:**
    ```bash
    npm install
    ```

2.  **გაუშვით დეველოპმენტ სერვერი:**
    ```bash
    npm start
    ```

3.  **Build პროდაქშენისთვის:**
    ```bash
    npm run build
    ```

---

## 🔐 უსაფრთხოება და API ინტეგრაცია

ეს პროექტი იყენებს Google Gemini API-ს. უსაფრთხოების მაქსიმალური დაცვისთვის, გაითვალისწინეთ შემდეგი:

### 1. API გასაღების დაცვა (Backend Proxy)
**კრიტიკული:** არასდროს შეინახოთ `API_KEY` პირდაპირ Frontend კოდში პროდაქშენზე!

**რეკომენდირებული არქიტექტურა:**
1.  შექმენით მარტივი Backend (Node.js/Express, Python/FastAPI, ან Next.js API Routes).
2.  Frontend აგზავნის მოთხოვნას თქვენს Backend-ზე (მაგ: `/api/chat`).
3.  Backend ინახავს `API_KEY`-ს გარემოს ცვლადებში (`.env`).
4.  Backend უკავშირდება Google Gemini-ს და აბრუნებს პასუხს.

**მაგალითი (Node.js Express):**
```javascript
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  res.json({ response: result.response.text() });
});
```

### 2. Rate Limiting
დაუწესეთ ლიმიტები თქვენს API-ს (მაგ: 10 მოთხოვნა წუთში ერთ IP-ზე), რათა თავიდან აიცილოთ ბოროტად გამოყენება და ზედმეტი ხარჯები.

### 3. CORS პოლიტიკა
დააკონფიგურირეთ CORS ისე, რომ თქვენს API-სთან წვდომა ჰქონდეს მხოლოდ `imi.ge` დომენს.

---

## 📝 CMS ინტეგრაცია (შინაარსის მართვა)

იმისათვის, რომ საიტის ტექსტები და სერვისები მართოთ კოდის წერის გარეშე, რეკომენდირებულია Headless CMS-ის გამოყენება.

**რეკომენდირებული CMS-ები:**
*   **Strapi:** (Self-hosted, უფასო) - საუკეთესოა სრული კონტროლისთვის.
*   **Sanity:** (Cloud, უფასო Tier) - ძალიან მოქნილი და სწრაფი.
*   **Contentful:** (Cloud) - Enterprise დონის გადაწყვეტილება.

### ინტეგრაციის ნაბიჯები (Master Prompt აგენტისთვის):

გამოიყენეთ ეს პრომპტი AI აგენტთან (მაგ: Cursor), რათა დააკავშიროთ CMS:

```text
**Role:** Senior Frontend Architect
**Task:** Connect this React app to a Headless CMS (e.g., Strapi).

**Steps:**
1.  **Create API Service:** Create `services/cms.ts` to fetch data.
2.  **Define Models:**
    -   `Service`: title, description, icon (string), price.
    -   `Project`: title, category, image (url), tags.
3.  **Fetch Data:**
    -   In `Services.tsx`, replace the static `services` array with data fetched from `cms.ts`.
    -   Use `useEffect` to load data on mount.
    -   Add a loading state (skeleton or spinner).
4.  **Error Handling:** If CMS is down, fallback to the hardcoded data currently in the file.
```

---

## 🎨 დიზაინი და ფონტები

*   **ფონტები:** პროექტი იყენებს `BPG Mrgvlovani` (ძირითადი ტექსტი) და `BPG Mrgvlovani Caps` (სათაურები).
*   **სტილი:** Tailwind CSS. ყველა ფერი და კონფიგურაცია გაწერილია `index.html`-ის `tailwind.config`-ში.
*   **ანიმაციები:** გამოყენებულია სტანდარტული CSS ანიმაციები და Tailwind-ის კლასები (`animate-pulse`, `hover:scale`, etc.).

---

## 🛠 ტექნიკური სტეკი

*   **Frontend:** React 18, TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React
*   **AI Integration:** Google Gemini API (`@google/genai`)
*   **Routing:** React Router DOM
