# Balevikit Tailwind CSS Hugo Theme

A minimal, opinionated Hugo theme for business and service websites, built with [Tailwind CSS v4](https://tailwindcss.com/).

[![Hugo](https://img.shields.io/badge/Hugo-≥0.116-ff4088?style=flat-square&logo=hugo)](https://gohugo.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

The theme ships a complete page structure — header, footer, SEO, and structured data — so you can focus on content. A new project needs as few as three files:

```text
mitt-prosjekt/
├── content/_index.md
├── hugo.toml
└── package.json
```

## Features

- **Zero-config SEO** — meta tags, Open Graph, and 10 Schema.org JSON-LD types generated automatically
- **Tailwind CSS v4** — processed directly by Hugo, no PostCSS config required
- **Responsive header & footer** — fully configured via `hugo.toml`, no template work needed
- **Image pipeline** — automatic WebP conversion and resizing via Hugo's image processing
- **Multilingual** — built-in translations for English, German, and Norwegian Bokmål
- **Tailwind Typography** — beautiful prose styling for markdown content out of the box
- **Lucide icons** — icon set included, used throughout the theme

## Requirements

- Hugo **≥ 0.116** (extended version not required)
- Node.js (for installing Tailwind CSS dependencies)

## Getting Started

### 1. Create a new Hugo project

```bash
hugo new site mitt-prosjekt
cd mitt-prosjekt
git init
git submodule add https://github.com/andreasbalevik/balevikit-tailwindcss-hugo-theme.git themes/balevikit-tailwindcss-hugo-theme
```

### 2. Add `package.json`

The theme manages its own dependencies. A minimal `package.json` in the project root is enough:

```json
{
  "name": "mitt-prosjekt",
  "private": true,
  "scripts": {
    "dev": "hugo server --disableFastRender",
    "build": "hugo --minify",
    "install": "cd themes/balevikit-tailwindcss-hugo-theme && npm install"
  }
}
```

Then run:

```bash
npm install
```

### 3. Configure `hugo.toml`

A minimal working configuration:

```toml
baseURL = 'https://example.com/'
languageCode = 'en'
title = 'My Site'
theme = 'balevikit-tailwindcss-hugo-theme'

[build]
  [build.buildStats]
    enable = true
  [[build.cachebusters]]
    source = 'assets/notwatching/hugo_stats\.json'
    target = 'css'
  [[build.cachebusters]]
    source = '(postcss|tailwind)\.config\.js'
    target = 'css'

[module]
  [[module.mounts]]
    source = 'assets'
    target = 'assets'
  [[module.mounts]]
    disableWatch = true
    source = 'hugo_stats.json'
    target = 'assets/notwatching/hugo_stats.json'

[params]
  description = 'Short description of the business.'
  email = 'post@example.com'
  phone = '+47 900 00 000'
  orgnr = '123 456 789'
  logo = 'favicon/logo.png'
  logo_title = false
  brand_image = 'favicon/logo.png'
  ogimage = '/images/og-image.jpg'
  privacyUrl = '/privacy'
  theme_color = '#0369a1'   # browser chrome color — set to match your primary color

[params.social]
  youtube     = 'https://www.youtube.com/@example'
  instagram   = 'https://www.instagram.com/example/'
  facebook    = 'https://www.facebook.com/example'
  linkedin    = 'https://www.linkedin.com/company/example'
  twitter     = 'https://twitter.com/example'
  tripadvisor = 'https://www.tripadvisor.com/...'

[[menus.footer]]
  name   = 'Home'
  url    = '/'
  weight = 10
```

The `build` and `module` configuration above is required for the Tailwind/Hugo pipeline.

### 4. Create homepage content

Create `content/_index.md`:

```yaml
---
title: "My Site"
description: "Short description of what you offer."
---
```

That's enough to get started.

### 5. Verify the setup

Run:

```bash
hugo --minify
```

If the build completes without errors, the project is set up correctly.

## Configuration

Keep the project as simple as possible. Start with these files:

- `hugo.toml` — title, baseURL, menus, and params
- `content/_index.md` — homepage content
- `assets/css/custom.css` — optional, only if you need to override the primary color

### Customizing the primary color

Create `assets/css/custom.css`:

```css
@theme {
  --color-primary: oklch(44% 0.11 244);
}
```

The theme imports this file automatically. No other CSS files are needed.

## Header

The header is provided by the theme and configured entirely via `[params]` in `hugo.toml`.

### Logo

The logo must be placed in the `assets/` folder (not `static/`). The theme uses Hugo image processing to optimize it — this requires the file to be available as a Hugo resource.

```toml
[params]
  logo = 'favicon/logo.png'   # path relative to assets/
```

The logo is automatically processed to WebP at the correct size. Provide a source file at least 72 px tall.

### Logo with site title

By default only the logo is shown. Set `logo_title = true` to display the logo and the site title side by side:

```toml
[params]
  logo       = 'favicon/logo.png'
  logo_title = true
```

| `logo` | `logo_title` | Result |
|--------|-------------|--------|
| set | not set / `false` | logo only |
| set | `true` | logo + title |
| not set | — | title text only |

### Navigation

Header menu links are set via `[[menus.main]]`:

```toml
[[menus.main]]
  name   = 'About'
  url    = '/about/'
  weight = 10
```

---

## Footer

The footer is provided by the theme and configured entirely via `hugo.toml`.

### Contact info

Shown automatically when set:

```toml
[params]
  email   = 'post@example.com'
  phone   = '+47 900 00 000'
  address = 'Street 1, 5000 Bergen, Norway'
  orgnr   = '123 456 789'
```

### Social media

Use `[params.social]` with named keys. Supported platforms:

```toml
[params.social]
  youtube     = 'https://www.youtube.com/@example'
  instagram   = 'https://www.instagram.com/example/'
  facebook    = 'https://www.facebook.com/example'
  linkedin    = 'https://www.linkedin.com/company/example'
  twitter     = 'https://twitter.com/example'
  tripadvisor = 'https://www.tripadvisor.com/...'
```

Only platforms you specify are shown. The values are also used automatically in the JSON-LD `sameAs` field.

### Privacy link

```toml
[params]
  privacyUrl = '/privacy'
```

### Footer menu

Links in the info column of the footer are set via `[[menus.footer]]`:

```toml
[[menus.footer]]
  name   = 'Home'
  url    = '/'
  weight = 10

[[menus.footer]]
  name   = 'About'
  url    = '/about/'
  weight = 20
```

Footer columns are only rendered when they have content. A footer with only contact info automatically uses a centered single-column layout.

---

## Structured Data (JSON-LD)

The theme automatically generates Schema.org structured data, but only when the page and its data actually make sense for the schema type.


### Available schemas

| Schema | When rendered | Configuration |
|--------|--------------|---------------|
| `Organization` | Homepage only, when the site has org data (logo, contact info, address, social profile, or founder) | `title`, `baseURL` and relevant `[params]` |
| `WebSite` | Homepage only, when `title` and `baseURL` are set | `title`, `baseURL`, optional `params.description` |
| `LocalBusiness` | Homepage only, when `[params.schema].localBusiness = true` and business signals are present | `params.schema.localBusiness = true` + contact/business data |
| `FAQPage` | Pages with at least one `faq` item with both `question` and `answer` | `faq` in front matter |
| `WebPage` | Regular single pages outside `blog_section` and `product_section`, with `description` or `summary` | page front matter |
| `Article` | Single pages where article schema is explicitly enabled and the page has `description` or `summary` | `article: true` or `schema.article: true` |
| `BlogPosting` + Breadcrumb | Single pages in the section defined by `blog_section`, with `description` or `summary` | `blog_section` + description in front matter |
| `Product` + Breadcrumb | Single pages in the section defined by `product_section`, with `description` or `summary` | `product_section`, optional `product_info` |
| `ItemList` | Section and taxonomy pages that actually have child pages | no extra requirements |
| `VideoObject` | Pages where `video.thumbnailUrl` and either `video.contentUrl` or `video.embedUrl` are set | `video` in front matter |

### Params for JSON-LD

Add what you need to `[params]`:

```toml
[params]
  # Contact info (used in Organization and LocalBusiness)
  email   = "post@example.com"
  phone   = "+47 900 00 000"
  address = "Street 1, 5000 Bergen, Norway"

  # Address details for structured data
  addressLocality = "Bergen"
  addressRegion   = "Vestland"
  postalCode      = "5000"
  addressCountry  = "NO"

  # Geography
  latitude         = "60.3913"
  longitude        = "5.3221"
  areaServedRadius = "50000"

  # Business details
  founder    = "Your Name"
  author     = "Your Name"
  author_url = "https://example.com/about/"
  priceRange = "NOK 500-5000"
  hasMap     = "https://www.google.com/maps/place/..."
  currency   = "NOK"

  [params.schema]
    localBusiness = true

  # Social media — shown in footer and in the sameAs JSON-LD field
  # All keys are optional. Supported: youtube, instagram, facebook, linkedin, twitter, tripadvisor
  [params.social]
    instagram = "https://www.instagram.com/example/"
    facebook  = "https://www.facebook.com/example/"

  # Content sections — controls which sections get BlogPosting/Product schema
  blog_section    = "blog"       # default: "blog"
  product_section = "products"   # default: "products"
```

All params are optional. Missing data causes fields or entire schemas to be omitted.

### Front matter to activate schemas

#### FAQPage

Add `faq` directly to the page's front matter:


```yaml
---
title: "FAQ"
description: "Answers to common questions."
faq:
  - question: "What does it cost?"
    answer: "Prices start at NOK 2,500."
  - question: "How long does it take?"
    answer: "It depends on the scope and how quickly content is ready."
---
```

Only items with both `question` and `answer` are included in `FAQPage`.

#### Article

Use this on content pages that are genuinely articles, not on every subpage:

```yaml
---
title: "How to choose the right website"
description: "A practical guide for small businesses."
schema:
  article: true
---
```

You can also use `article: true` at the top level if you prefer a flat front matter structure.

#### BlogPosting

Blog posts get `BlogPosting` automatically when they are in the section defined as `blog_section` and have a `description` or enough content to generate a `summary`.

```toml
[params]
  blog_section = "blog"
```

#### Product

Product pages get `Product` automatically when they are in the section defined as `product_section` and have a `description` or `summary`.

```toml
[params]
  product_section = "products"
```

Optional product info:

```yaml
---
title: "Standard website"
description: "2–5 pages with custom design."
product_info:
  sku: "WEB-STD-01"
  priceValidUntil: "2027-12-31"
  prices:
    - price: "5000"
    - price: "9000"
aggregateRating:
  ratingValue: "4.9"
  reviewCount: "12"
---
```

For domain-specific types like `TouristTrip`, override `_product.html` locally in your project.

#### VideoObject

Video schema is only rendered when a thumbnail and at least one video URL are provided:

```yaml
---
title: "How we work"
description: "A short video about our process."
video:
  name: "How we work"
  description: "A short video about our process."
  thumbnailUrl: "https://example.com/images/video-thumb.jpg"
  embedUrl: "https://www.youtube.com/embed/abc123"
  duration: "PT1M30S"
  uploadDate: "2026-03-21T16:00:00+01:00"
---
```

Use `contentUrl` instead of `embedUrl` if you host the video file yourself.

#### WebPage

Regular single pages outside `blog_section` and `product_section` get `WebPage` automatically when they have a `description` or enough content to generate a `summary`.

#### ItemList

List pages and taxonomies get `ItemList` automatically when they have child pages to list.

### Overriding schemas per project

Place a file in `layouts/partials/seo/json-ld/` in your project to override a specific schema. Hugo prefers the project's file over the theme's.

```text
layouts/
└── partials/
    └── seo/
        └── json-ld/
            └── _localbusiness.html   ← overrides the theme's version
```

Typical use: projects with highly specific schemas (TouristDestination, FoodEstablishment, MedicalBusiness, etc.) that don't fit into generic params.

## What you typically should not create

When setting up a new project with this theme, you normally should not create:

- `layouts/`
- custom partials
- a custom header or footer
- extra CSS files
- local Tailwind configuration

Only add local overrides when the project actually requires them.

> [!NOTE]
> The theme already provides a header, footer, Tailwind setup, SEO partials, image partials, and container/typography defaults. Avoid local `layouts/`, partials, and extra CSS until you genuinely need them.


## Minimal project structure

A new project can look like this:

```text
mitt-prosjekt/
├── content/
│   └── _index.md
├── themes/
│   └── balevikit-tailwindcss-hugo-theme/
├── hugo.toml
└── package.json
```

If you want to override the primary color, add:

```text
assets/
└── css/
    └── custom.css
```

## For AI agents and automation

When setting up the project automatically, follow this order:

1. Create a new Hugo project.
2. Add the theme as a git submodule.
3. Create `package.json` in the project root.
4. Create `hugo.toml` with `theme`, `build`, and `module`.
5. Create `content/_index.md`.
6. Run `npm install`.
7. Run `hugo --minify`.
8. Do not create local `layouts/` or CSS overrides unless you need them.

The safest default is to use the theme as-is first, then add small overrides as needed.

## Custom templates

The theme owns `layouts/_default/baseof.html`. Your project should not create its own `baseof.html`.

When you need a local template, it should only define the `main` block:


```go-html-template
{{ define "main" }}
<section class="bg-white">
  <div class="container">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-[-0.015em] text-balance mt-0 mb-6">
      Hello world
    </h1>
    <p class="text-xl leading-relaxed text-pretty">
      This content is rendered inside the theme's base layout.
    </p>
  </div>
</section>
{{ end }}
```

For example, to override the homepage create `layouts/index.html`:

```go-html-template
{{ define "main" }}
<section class="bg-white">
  <div class="container">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-[-0.015em] text-balance mt-0 mb-6">
      Hello world
    </h1>
  </div>
</section>
{{ end }}
```

This still gives you the header, footer, SEO, CSS, and scripts from the theme.

**Rules:**
- Do not create a local `baseof.html` without a very good reason
- Do not copy the header or footer into your project
- Use `{{ define "main" }}` in local templates
- Let the theme handle the rest

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```
