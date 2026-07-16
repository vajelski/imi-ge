import { isIP } from 'node:net';
import { NextRequest } from 'next/server';

const TRUSTED_CLIENT_IP_HEADER = 'x-imi-client-ip';
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const EVICTION_SCAN_LIMIT = 256;

type RateLimitEntry = { count: number; resetAt: number };

/**
 * Nginx overwrites this header after restoring the address from Cloudflare's
 * CF-Connecting-IP header. Keep the Node port private so clients cannot bypass
 * that overwrite. Never fall back to client-controlled X-Forwarded-For.
 */
export const getTrustedClientKey = (request: NextRequest) => {
  const value = request.headers.get(TRUSTED_CLIENT_IP_HEADER)?.trim();
  return value && !value.includes(',') && isIP(value) ? value : 'unknown';
};

export const createRateLimiter = (windowMs: number, maxRequests: number) => {
  const requestCounts = new Map<string, RateLimitEntry>();

  return (key: string) => {
    const now = Date.now();
    const current = requestCounts.get(key);

    if (current && current.resetAt > now) {
      if (current.count >= maxRequests) return false;
      current.count += 1;
      return true;
    }

    if (!current && requestCounts.size >= MAX_RATE_LIMIT_ENTRIES) {
      let scanned = 0;
      for (const [entryKey, entry] of requestCounts) {
        if (entry.resetAt <= now) requestCounts.delete(entryKey);
        scanned += 1;
        if (requestCounts.size < MAX_RATE_LIMIT_ENTRIES || scanned >= EVICTION_SCAN_LIMIT) break;
      }

      if (requestCounts.size >= MAX_RATE_LIMIT_ENTRIES) {
        const oldestKey = requestCounts.keys().next().value;
        if (typeof oldestKey === 'string') requestCounts.delete(oldestKey);
      }
    }

    requestCounts.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  };
};
