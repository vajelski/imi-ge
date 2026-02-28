const DEMOS_PATHS = new Set(['/demos', '/ka/demos', '/en/demos', '/ru/demos']);

function normalizeHref(href: string): string {
  const trimmed = (href || '').trim();
  if (!trimmed) return '';

  const stripped = trimmed.split('?')[0]?.split('#')[0] ?? '';
  if (!stripped) return '';

  const withLeadingSlash = stripped.startsWith('/') ? stripped : `/${stripped}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, '/');
  if (collapsed !== '/' && collapsed.endsWith('/')) {
    return collapsed.slice(0, -1);
  }
  return collapsed;
}

export function isDemosHref(href: string): boolean {
  return DEMOS_PATHS.has(normalizeHref(href));
}
