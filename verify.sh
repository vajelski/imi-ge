#!/bin/bash
# imi.ge — ვერიფიკაცია (Cloudflare + SSL)
# გამოყენება: ./verify.sh [https://imi.ge]
set -e
SITE="${1:-https://imi.ge}"
echo "=== Verifying $SITE ==="

check() { curl -sL --max-time 10 -o /dev/null -w "%{http_code}" "$1"; }

for url in "$SITE" "$SITE/ka" "$SITE/en/contact" "$SITE/ka/services/audit" "$SITE/api/content"; do
  s=$(check "$url")
  [ "$s" = "200" ] && echo "✓ $url — $s" || { echo "✗ $url — $s"; exit 1; }
done
echo "=== OK ==="
