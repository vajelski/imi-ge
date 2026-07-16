# Wave 4 Manual QA Checklist

Use this checklist when Playwright browsers are not available locally. Run the production-equivalent frontend and verify each item in Chrome or Safari at desktop and mobile widths.

- [ ] `/ka` and `/en` homepage, blog, article, services, and docs routes return content with a visible H1.
- [ ] `/ru` and `/ru/blog` redirect permanently to `/ka` and `/ka/blog`; no Russian route remains indexable.
- [ ] Each checked route has one meaningful title, description, canonical URL, and `ka`, `en`, and `x-default` alternate links.
- [ ] No checked route shows a 404 or not-found state, and article/document detail links open successfully.
- [ ] Homepage workflow visual is visible with four stages and remains readable on mobile.
- [ ] Mobile navigation opens, closes, and exposes both KA and EN language links.
- [ ] At 375px wide, the homepage, services, article, and document pages have no horizontal scrolling.
- [ ] Tabbing through the header produces a visible focus ring on links and controls.
- [ ] Header and footer theme toggles stay synchronized after either toggle is used.
- [ ] With reduced motion enabled in the browser, CSS animation and transition motion is reduced or disabled.
- [ ] Consultation form success state is shown after a valid response; assistant renders a returned `message` response.
