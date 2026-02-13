/**
 * GA4 event helpers. Only fires when NEXT_PUBLIC_GA_ID is set.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined' || !GA_ID || !window.gtag) return;
  window.gtag('event', eventName, params);
}
