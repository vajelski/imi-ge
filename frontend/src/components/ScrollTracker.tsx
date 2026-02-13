'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Fires scroll_75 once per session when user scrolls past 75% of the page.
 */
export default function ScrollTracker() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = (window.scrollY / scrollHeight) * 100;
      if (pct >= 75) {
        fired.current = true;
        trackEvent('scroll_75');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
