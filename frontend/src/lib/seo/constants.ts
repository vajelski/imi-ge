/**
 * On-Page SEO constants for 2025–2026 best practices
 * @see https://developers.google.com/search/docs
 */

export const SITE_URL = 'https://imi.ge' as const;
export const SITE_NAME = 'IMI.GE' as const;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png` as const;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/** Optimal lengths for 2025–2026 (Google may show up to ~60 chars title, ~160 desc) */
export const TITLE_MAX_LENGTH = 60;
export const DESCRIPTION_MAX_LENGTH = 160;

export const LOCALES = ['ka', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** Keywords for Georgian tech/AI market */
export const DEFAULT_KEYWORDS = [
  'IMI.GE',
  'AI საქართველო',
  'ხელოვნური ინტელექტი',
  'ვებ-დეველოპმენტი',
  'AI ინტეგრაცია',
  'SEO საქართველო',
  'ტექნოლოგიური კონსულტაცია',
];
