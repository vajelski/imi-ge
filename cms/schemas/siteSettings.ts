/**
 * Singleton: Site Settings — single source of truth for contact, toggles, nav, branding, SEO, integrations.
 * Desk structure shows this as "Settings" at top (single document).
 */

const contactsFields = [
  { name: 'primaryEmail', title: 'Primary Email', type: 'string', validation: (Rule: any) => Rule.required() },
  { name: 'salesEmail', title: 'Sales Email (optional)', type: 'string' },
  { name: 'supportEmail', title: 'Support Email (optional)', type: 'string' },
  { name: 'primaryPhone', title: 'Primary Phone', type: 'string', validation: (Rule: any) => Rule.required() },
  { name: 'secondaryPhone', title: 'Secondary Phone (optional)', type: 'string' },
  { name: 'address', title: 'Address', type: 'localeString' },
  { name: 'workingHours', title: 'Working Hours', type: 'localeString' },
  {
    name: 'messengers',
    title: 'Messengers',
    type: 'object',
    fields: [
      { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string', description: 'e.g. +995555000000' },
      { name: 'telegramUsername', title: 'Telegram Username', type: 'string' },
      { name: 'messengerUrl', title: 'Messenger URL (optional)', type: 'url' },
    ],
  },
]

const togglesFields = [
  { name: 'enableBlog', title: 'Enable Blog', type: 'boolean', initialValue: true },
  { name: 'enablePortfolio', title: 'Enable Portfolio', type: 'boolean', initialValue: true },
  { name: 'enableDemos', title: 'Enable Demos', type: 'boolean', initialValue: true },
  { name: 'enablePricing', title: 'Enable Pricing', type: 'boolean', initialValue: true },
  { name: 'enableTestimonials', title: 'Enable Testimonials', type: 'boolean', initialValue: false },
  { name: 'enableLogos', title: 'Enable Logos', type: 'boolean', initialValue: false },
  { name: 'enableNewsletter', title: 'Enable Newsletter', type: 'boolean', initialValue: false },
  { name: 'enableWhatsApp', title: 'Enable WhatsApp', type: 'boolean', initialValue: false },
  { name: 'enableTelegram', title: 'Enable Telegram', type: 'boolean', initialValue: false },
  { name: 'enableContactForm', title: 'Enable Contact Form', type: 'boolean', initialValue: true },
  { name: 'enableLeadCapturePopup', title: 'Enable Lead Capture Popup', type: 'boolean', initialValue: false },
  { name: 'enableCookieBanner', title: 'Enable Cookie Banner', type: 'boolean', initialValue: true },
  { name: 'enableAnalytics', title: 'Enable Analytics', type: 'boolean', initialValue: true },
]

const pageTogglesFields = [
  { name: 'homeEnabled', title: 'Home', type: 'boolean', initialValue: true },
  { name: 'servicesEnabled', title: 'Services', type: 'boolean', initialValue: true },
  { name: 'portfolioEnabled', title: 'Portfolio', type: 'boolean', initialValue: true },
  { name: 'blogEnabled', title: 'Blog', type: 'boolean', initialValue: true },
  { name: 'aboutEnabled', title: 'About', type: 'boolean', initialValue: true },
  { name: 'contactEnabled', title: 'Contact', type: 'boolean', initialValue: true },
  { name: 'termsEnabled', title: 'Terms', type: 'boolean', initialValue: true },
  { name: 'privacyEnabled', title: 'Privacy', type: 'boolean', initialValue: true },
  { name: 'cookiesEnabled', title: 'Cookies', type: 'boolean', initialValue: true },
]

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    { name: 'contacts', title: 'Contacts', default: true },
    { name: 'toggles', title: 'Feature Toggles' },
    { name: 'pageToggles', title: 'Page Toggles' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'branding', title: 'Branding' },
    { name: 'seoDefaults', title: 'SEO Defaults' },
    { name: 'integrations', title: 'Integrations' },
    { name: 'legacy', title: 'Legacy (migration)' },
  ],
  fields: [
    // ——— A) Contacts ———
    {
      name: 'contacts',
      title: 'Contacts (single source of truth)',
      type: 'object',
      group: 'contacts',
      fields: contactsFields,
    },
    // ——— B) Feature Toggles ———
    {
      name: 'toggles',
      title: 'Feature Toggles',
      type: 'object',
      group: 'toggles',
      fields: togglesFields,
    },
    // ——— C) Page-level toggles ———
    {
      name: 'pageToggles',
      title: 'Page Toggles',
      type: 'object',
      group: 'pageToggles',
      fields: pageTogglesFields,
    },
    // ——— D) Navigation ———
    {
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      group: 'navigation',
      fields: [
        {
          name: 'headerLinks',
          title: 'Header Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'localeString' },
                { name: 'href', type: 'string', description: 'e.g. /about, /contact' },
                { name: 'enabled', type: 'boolean', initialValue: true },
              ],
            },
          ],
        },
        {
          name: 'footerColumns',
          title: 'Footer Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', type: 'localeString' },
                {
                  name: 'links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'label', type: 'localeString' },
                        { name: 'href', type: 'string' },
                        { name: 'enabled', type: 'boolean', initialValue: true },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'footerBottomLinks',
          title: 'Footer Bottom Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', type: 'localeString' },
                { name: 'href', type: 'string' },
                { name: 'enabled', type: 'boolean', initialValue: true },
              ],
            },
          ],
        },
      ],
    },
    // ——— E) Branding ———
    {
      name: 'branding',
      title: 'Branding',
      type: 'object',
      group: 'branding',
      fields: [
        { name: 'siteName', type: 'localeString', title: 'Site Name' },
        { name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } },
        { name: 'favicon', type: 'image', title: 'Favicon', options: { hotspot: true } },
        {
          name: 'primaryCTA',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'localeString' },
            { name: 'href', type: 'string', description: 'e.g. /contact' },
            { name: 'enabled', type: 'boolean', initialValue: true },
          ],
        },
        {
          name: 'secondaryCTA',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'localeString' },
            { name: 'href', type: 'string' },
            { name: 'enabled', type: 'boolean', initialValue: true },
          ],
        },
      ],
    },
    // ——— F) SEO Defaults ———
    {
      name: 'seoDefaults',
      title: 'SEO Defaults',
      type: 'object',
      group: 'seoDefaults',
      fields: [
        {
          name: 'metaTitle',
          type: 'localeString',
          title: 'Default Meta Title',
          description: 'Max ~60 chars per locale',
        },
        {
          name: 'metaDescription',
          type: 'localeText',
          title: 'Default Meta Description',
          description: 'Max ~160 chars per locale',
        },
        { name: 'ogImage', type: 'image', title: 'Default OG Image', options: { hotspot: true } },
        {
          name: 'twitterCard',
          type: 'string',
          title: 'Twitter Card',
          options: { list: ['summary', 'summary_large_image', 'app', 'player'] },
          initialValue: 'summary_large_image',
        },
        { name: 'robotsIndexDefault', type: 'boolean', title: 'Index by default', initialValue: true },
        { name: 'robotsFollowDefault', type: 'boolean', title: 'Follow by default', initialValue: true },
        { name: 'canonicalBaseUrl', type: 'string', title: 'Canonical Base URL', description: 'e.g. https://imi.ge', initialValue: 'https://imi.ge' },
      ],
    },
    // ——— G) Integrations (public IDs only) ———
    {
      name: 'integrations',
      title: 'Integrations',
      type: 'object',
      group: 'integrations',
      fields: [
        { name: 'ga4MeasurementId', title: 'GA4 Measurement ID', type: 'string', description: 'e.g. G-XXXXXXXXXX (only if Enable Analytics)' },
        { name: 'gtmId', title: 'GTM ID (optional)', type: 'string' },
        { name: 'hotjarId', title: 'Hotjar ID (optional)', type: 'string' },
      ],
    },
    // ——— Legacy: keep for migration compatibility ———
    {
      name: 'siteName',
      title: 'Site Name (legacy)',
      type: 'object',
      group: 'legacy',
      hidden: ({ document }: any) => !!document?.branding?.siteName,
      fields: [
        { name: 'ka', type: 'string' },
        { name: 'en', type: 'string' },
        { name: 'ru', type: 'string' },
      ],
    },
    {
      name: 'defaultSeo',
      title: 'Default SEO (legacy)',
      type: 'object',
      group: 'legacy',
      hidden: ({ document }: any) => !!document?.seoDefaults?.metaTitle,
      fields: [
        { name: 'title', type: 'object', fields: [{ name: 'ka', type: 'string' }, { name: 'en', type: 'string' }, { name: 'ru', type: 'string' }] },
        { name: 'description', type: 'object', fields: [{ name: 'ka', type: 'text' }, { name: 'en', type: 'text' }, { name: 'ru', type: 'text' }] },
        { name: 'ogImage', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'social',
      title: 'Social (legacy)',
      type: 'object',
      group: 'legacy',
      fields: [
        { name: 'facebook', type: 'url' },
        { name: 'linkedin', type: 'url' },
        { name: 'twitter', type: 'url' },
        { name: 'instagram', type: 'url' },
      ],
    },
    {
      name: 'contact',
      title: 'Contact (legacy)',
      type: 'object',
      group: 'legacy',
      hidden: ({ document }: any) => !!document?.contacts?.primaryEmail,
      fields: [
        { name: 'email', type: 'string' },
        { name: 'phone', type: 'string' },
        {
          name: 'address',
          type: 'object',
          fields: [
            { name: 'ka', type: 'text' },
            { name: 'en', type: 'text' },
            { name: 'ru', type: 'text' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare() {
      return { title: 'Site Settings' }
    },
  },
}
