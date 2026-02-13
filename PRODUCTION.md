# imi.ge

## Development

```bash
npm run dev          # Frontend (3000) + Backend (3003)
npm run dev:full     # + CMS Studio (3333)
```

## Deploy

```bash
./deploy.sh
```

Post-deploy: **Cloudflare Purge Everything** + **Ctrl+Shift+R**

---

## პირველადი Setup

### 1. Dependencies

```bash
cd /home/fullimi/imi_extracted
npm install
```

### 2. Backend env

```bash
cp backend/.env.example backend/.env.local
# SMTP, PSI_API_KEY, GOOGLE_CLOUD_*
```

### 3. PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

### 4. Nginx + SSL

```bash
sudo cp nginx-imi.ge.conf /etc/nginx/sites-available/imi.ge
sudo ln -sf /etc/nginx/sites-available/imi.ge /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo certbot --nginx -d imi.ge -d www.imi.ge
```

certbot-ის შემდეგ: `sudo nginx -T | grep -A2 "_next/static"` — უნდა ჩანდეს 443 block-ში.

---

## არქიტექტურა

```
Browser → Cloudflare → Nginx (80/443)
                         ├─ /_next/static/* → disk (სწორი MIME)
                         └─ /* → Next.js (3003) → /api/* → Backend (3004)
```

| კომპონენტი | პორტი | აღწერა |
|------------|-------|--------|
| Nginx | 80, 443 | რევერსული პროქსი + სტატიკა |
| Frontend | 3003 | Next.js |
| Backend | 3004 | Express API |

---

## დებაგირება

**ChunkLoadError / 500 / MIME text/plain:**
```bash
sudo cp nginx-imi.ge.conf /etc/nginx/sites-available/imi.ge
sudo nginx -t && sudo systemctl restart nginx
# + Cloudflare Purge + Ctrl+Shift+R
```

**Backend/Frontend:**
```bash
pm2 logs imi-backend
pm2 logs imi-frontend
pm2 restart all
```
