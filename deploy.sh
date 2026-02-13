#!/bin/bash
# imi.ge — სრული deploy: ბილდი, PM2, (ოფციონალურად) Nginx
set -e
cd "$(dirname "$0")"

echo "=== IMI.GE Deploy ==="

# 1. Frontend build
echo ""
echo "1. Frontend build..."
npm run build:prod

# 2. Verify build output
STATIC_DIR="frontend/.next/static/chunks"
if [ ! -d "$STATIC_DIR" ] || [ -z "$(ls -A $STATIC_DIR 2>/dev/null)" ]; then
    echo "ERROR: Build failed — $STATIC_DIR is empty or missing"
    exit 1
fi
echo "   ✓ Build OK ($(ls $STATIC_DIR | wc -l) chunks)"

# 3. PM2 restart (both frontend and backend)
echo ""
echo "2. PM2 restart..."
pm2 restart imi-frontend imi-backend 2>/dev/null || pm2 start ecosystem.config.cjs
pm2 save

# 4. Verify processes
sleep 2
if ! pm2 list | grep -q "imi-frontend.*online"; then
    echo "WARN: imi-frontend may not be online — check: pm2 logs imi-frontend"
fi
if ! pm2 list | grep -q "imi-backend.*online"; then
    echo "WARN: imi-backend may not be online — check: pm2 logs imi-backend"
fi

echo ""
echo "=== ✓ Deploy complete ==="
echo ""
echo "Post-deploy: Cloudflare Purge Everything + Ctrl+Shift+R"
echo ""
echo "თუ 500/MIME text/plain: sudo cp nginx-imi.ge.conf /etc/nginx/sites-available/imi.ge"
echo "                        sudo nginx -t && sudo systemctl reload nginx"
echo "                        ./nginx-check.sh"
echo ""
