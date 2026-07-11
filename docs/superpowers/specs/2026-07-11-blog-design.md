# Blog Insightfy — Design Spec

**Date:** 2026-07-11  
**Status:** Approved (pending user review of this document)  
**Approach:** A — Hub editorial dark (SEO + inbound)

---

## 1. Goals and constraints

### Primary goal

**SEO + inbound:** attract founders/companies via organic search with practical content on AI agents, then convert to diagnostic conversations.

### Decisions locked

| Decision | Choice |
|----------|--------|
| Goal | SEO + inbound |
| Publishing | MDX in the repository |
| Scope | Essential SEO (list, post, categories, meta/OG, reading time, related, CTAs, i18n) |
| Themes | IA & agentes |
| Visual approach | Hub editorial dark (Approach A), not LP-clone terminal demo |

### Explicit non-goals (v1)

- CMS / headless editor
- Comments, search, newsletter
- Analytics
- Sticky table of contents
- Author bio pages
- Share bar
- Blog block on the homepage (optional follow-up)
- Contact form backend (still stub; CTAs link to existing `#contato` / schedule flow)

---

## 2. Architecture and routes

### Routes

| Route | Purpose |
|-------|---------|
| `/{locale}/blog` | Index: hero, category chips, featured post, grid |
| `/{locale}/blog/[slug]` | Article page |
| `/{locale}/blog/categoria/[category]` | Category filter page |

Locales: `pt` (default) and `en`, consistent with existing i18n.

### Content storage

```text
apps/web/content/blog/
  pt/
    o-que-e-agente-de-ia.mdx
    primeiro-processo-para-automatizar.mdx
    atendimento-com-agente.mdx
  en/
    what-is-an-ai-agent.mdx
    first-process-to-automate.mdx
    agent-powered-support.mdx
```

### Frontmatter schema

```ts
type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO date YYYY-MM-DD
  updated?: string;
  category: "agentes" | "automacao" | "casos-ia";
  tags: string[];
  cover?: string; // path under /public if present
  draft?: boolean; // default false; excluded from prod listings/sitemap
  featured?: boolean; // at most one featured per locale preferred
  translationKey?: string; // pairs pt/en for hreflang
};
```

### i18n split

- **Chrome UI** (nav label, hero, chips labels, CTA copy, empty states): existing dictionaries `pt.ts` / `en.ts` under a new `blog` key.
- **Post body:** separate MDX per locale (not machine-translated at runtime).

### Navigation integration

- Nav: add **Blog** link to `/{locale}/blog` (alongside existing section anchors).
- Footer: add Blog under Empresa (or equivalent column).

---

## 3. UX — Listing

### Hero (compact editorial)

- Eyebrow mono: `// Blog`
- Display title focused on IA & agentes
- One-line value subtitle (learn + apply)
- **No** terminal animation from the LP (reading surface, not product demo)

### Category chips

- Horizontal: All | Agentes | Automação | Casos IA  
- Active: cyan accent border/text  
- Inactive: muted  
- Navigation: dedicated category route

### Featured post

- When a post has `featured: true`
- Wide card (full width mobile; larger span desktop)
- Category + date + reading time
- Large title + excerpt
- Hover: subtle accent border (same language as Cases cards)

### Post grid

- 1 / 2 / 3 columns (mobile / tablet / desktop)
- Card hierarchy: category (mono) → title → 2-line excerpt → meta (`date · N min`)
- No decorative icon grids; hierarchy via type and meta only

### Empty / draft rules

- `draft: true` never appears in production listings, category pages, related, or sitemap
- Empty category: short message + link back to all posts

---

## 4. UX — Post

### Article header

- Breadcrumb: Blog / Category / Title (truncate long titles)
- Category chip + date + reading time
- Single H1 (display font)
- Description as lead (muted, 1–2 lines)

### Body

- Measure ~65–72ch, centered
- Body: Satoshi; headings: Clash Display; code: Martian Mono
- Code blocks: surface panel, thin border (aligned with design system)
- Images: content-column width, subtle radius
- Links: accent color; underline on hover

### Conversion CTAs (inbound)

1. **Mid-article** — MDX component `<CtaInline />` (author places after ~40–50% of content):  
   prompt toward applying agents to their process → primary CTA to schedule diagnostic / `#contato`
2. **End of article** — surface card with primary Button (same system as LP)

### Related posts

- 2–3 posts, same category preferred; else tag overlap
- Compact cards below end CTA

### Accessibility and motion

- Visible focus on chips and cards
- Respect `prefers-reduced-motion` (no translate-in if reduced)
- Keep existing dark contrast tokens (text / muted / accent)

---

## 5. SEO

| Item | Behavior |
|------|----------|
| `generateMetadata` | Per list, category, and post: title, description, canonical, Open Graph, Twitter |
| JSON-LD | `BlogPosting` on posts; `Blog` or `CollectionPage` on index/category |
| Canonical | Absolute URLs using site origin (env or config constant) |
| `sitemap.ts` | Home + blog index + published posts + non-empty categories |
| `robots.ts` | Index allowed for public routes; drafts never listed |
| Headings | Exactly one H1 per page; MDX uses h2/h3 |
| hreflang | When `translationKey` pairs exist across locales |
| Rendering | Static generation via `generateStaticParams` for slugs/categories |

---

## 6. Technical design

### Preferred stack (v1)

- `gray-matter` for frontmatter
- `next-mdx-remote/rsc` (or equivalent RSC MDX compile) for body
- Simple word-count reading time (or `reading-time` package)
- One syntax highlighter only (`rehype-pretty-code` + Shiki **or** Shiki alone)

Avoid Contentlayer (maintenance risk) unless already required by the monorepo.

### Module map

```text
apps/web/
  app/[locale]/blog/
    page.tsx
    [slug]/page.tsx
    categoria/[category]/page.tsx
  components/blog/
    BlogHero.tsx
    CategoryChips.tsx
    FeaturedPost.tsx
    PostCard.tsx
    PostHeader.tsx
    PostBody.tsx
    CtaInline.tsx
    CtaEnd.tsx
    RelatedPosts.tsx
  lib/blog/
    types.ts
    posts.ts      # list, getBySlug, byCategory, related, readingTime
    mdx.ts        # compile + MDX component map
  content/blog/{pt,en}/*.mdx
```

### Reuse from design system

- `@insightfy/ui`: `Container`, `Card`, `Button`, `SectionHeading`
- Tokens: `bg-base`, `surface`, `border`, `text`, `muted`, `accent`
- Typography: `font-display`, `font-sans`, `font-mono`
- Prose styles: extend `globals.css` with a scoped `.prose-blog` (or similar) for MDX

### Dictionary keys (sketch)

```ts
blog: {
  navLabel: string;
  hero: { eyebrow: string; title: string; subtitle: string };
  categories: { all: string; agentes: string; automacao: string; "casos-ia": string };
  readingTime: string; // e.g. "{n} min de leitura"
  related: string;
  ctaInline: { title: string; body: string; cta: string };
  ctaEnd: { title: string; body: string; cta: string };
  empty: string;
  backToBlog: string;
  featuredLabel?: string;
}
```

---

## 7. Seed content (3 posts × 2 locales)

| # | Role | Category | PT angle | EN angle |
|---|------|----------|----------|----------|
| 1 | **Featured** | agentes | O que é um agente de IA (de verdade) vs chatbot com marketing | What a real AI agent is vs chatbot marketing |
| 2 | Grid | automacao | Como escolher o primeiro processo para automatizar com agentes | Choosing the first process to automate with agents |
| 3 | Grid | casos-ia | Atendimento com agente: ticket → resposta em segundos (sem perder o humano) | Agent-powered support without losing the human |

Each seed post should:

- Target a searchable intent (definition, how-to, use-case)
- Include one mid-article `<CtaInline />`
- Use real structure (h2s), not lorem ipsum
- Stay on-brand: technical, accessible, confident (SPEC voice)

---

## 8. Visual system notes (blog-specific)

Aligned with existing SPEC design system; blog differs only in **emphasis**:

- Same dark base and cyan accent
- More **editorial measure** and quieter chrome than the LP
- Mono reserved for meta, paths, code, eyebrows — not long paragraphs
- Cards: thin border, surface, optional hover lift (existing Cases pattern)
- Absolute bans from design quality bar still apply: no gradient text, no side-stripe accent cards, no glassmorphism by default, no identical icon+title+text card grids

---

## 9. Success criteria

1. `/pt/blog` and `/en/blog` render hero, chips, featured (if any), and grid from MDX.
2. Post pages render MDX with correct typography, mid + end CTAs, related posts.
3. Category routes filter correctly; empty state works.
4. Drafts excluded from UI and sitemap in production.
5. Metadata + JSON-LD present on list and posts.
6. Nav and Footer expose Blog; i18n complete for UI chrome.
7. Lighthouse-oriented: static HTML for posts, no client-only content body.
8. Visual consistency with LP tokens without copying terminal hero.

---

## 10. Implementation order (for planning skill)

1. Types + `lib/blog/posts.ts` loaders  
2. Seed MDX (pt/en)  
3. Blog index page + components  
4. Post page + MDX pipeline + CTAs  
5. Category page  
6. Dictionary + Nav/Footer links  
7. SEO (metadata, JSON-LD, sitemap, robots, hreflang)  
8. Prose CSS polish + reduced-motion  
9. Manual QA both locales  

---

## Appendix — UI/UX critique of current LP (context for blog fit)

Observations used to shape the blog (not a full redesign of the LP):

| Area | Observation | Blog implication |
|------|-------------|------------------|
| Identity | Strong terminal/dev brand, cyan accent, display+mono | Keep tokens; dial mono down in long-form |
| Hierarchy | SectionHeading + cards work | Reuse patterns; avoid repeating LP demo density |
| Conversion | Single primary path to `#contato` | Blog CTAs must feed the same path |
| i18n | Dictionary-driven, solid | Extend dictionaries; posts are separate files |
| Content depth | LP is shallow by design | Blog is the long-form authority surface for SEO |

---

*End of design spec.*
