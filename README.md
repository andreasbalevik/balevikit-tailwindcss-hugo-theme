# Balevikit Tailwind CSS Hugo Theme

Et Hugo-tema for enkle, raske og rolige nettsider bygget med Tailwind CSS.

## Kort sagt

For et helt nytt prosjekt trenger du i praksis bare:

- `package.json`
- `hugo.toml`
- `content/_index.md`
- `themes/balevikit-tailwindcss-hugo-theme` som git submodule

Valgfritt:

- `assets/css/custom.css` hvis du vil overstyre primærfargen

## Opprett et nytt prosjekt

### 1. Lag et nytt Hugo-prosjekt

```bash
hugo new site mitt-prosjekt
cd mitt-prosjekt
git init
git submodule add https://github.com/andreasbalevik/balevikit-tailwindcss-hugo-theme.git themes/balevikit-tailwindcss-hugo-theme
```

### 2. Legg til `package.json`

Temaet trenger kun at avhengighetene i temaet installeres. En enkel `package.json` i prosjektroten holder:

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

Kjør deretter:

```bash
npm install
```

### 3. Sett opp `hugo.toml`

Dette er et godt minimumsoppsett:

```toml
baseURL = 'https://eksempel.no/'
languageCode = 'nb-NO'
title = 'Mitt nettsted'
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
  description = 'Kort beskrivelse av virksomheten.'
  email = 'post@eksempel.no'
  phone = '+47 900 00 000'
  orgnr = '123 456 789'
  logo = '/favicon/logo.png'
  brand_image = '/favicon/logo.png'
  ogimage = '/images/og-image.jpg'
```

`build`- og `module`-oppsettet over er nødvendig for Tailwind/Hugo-pipelinen i temaet.

### 4. Lag forsideinnhold

Opprett `content/_index.md`:

```yaml
---
title: "Mitt nettsted"
description: "Kort beskrivelse av hva dere tilbyr."
---
```

Det holder for å komme i gang.

### 5. Verifiser oppsettet

Kjør:

```bash
hugo --minify
```

Hvis bygget går gjennom uten feil, er prosjektet satt opp riktig.

## Nødvendige lokale overstyringer

Hold prosjektet så enkelt som mulig. Start med disse filene:

- `hugo.toml` for tittel, baseURL, menyer og params
- `content/_index.md` for innhold på forsiden
- `assets/css/custom.css` hvis du vil overstyre primærfargen

Eksempel på `assets/css/custom.css`:

```css
@theme {
  --color-primary: oklch(44% 0.11 244);
}
```

Temaet importerer denne filen automatisk. Du trenger ikke egne CSS-filer utover dette.

## Dette skal du vanligvis ikke opprette

Hvis du setter opp et nytt prosjekt med dette temaet, skal du normalt ikke lage:

- `layouts/`
- egne partials
- egen header eller footer
- ekstra CSS-filer
- lokale Tailwind-oppsett

Lag bare lokale overstyringer når prosjektet faktisk trenger det.

## Ikke overstyr mer enn nødvendig

Temaet leverer allerede:

- header og footer
- Tailwind-oppsett
- SEO-partials
- bildepartials
- container og grunnleggende typografi

Unngå lokale `layouts/`, partials og ekstra CSS før du faktisk trenger det.

## Minimumsstruktur

Et nytt prosjekt kan se slik ut:

```text
mitt-prosjekt/
├── content/
│   └── _index.md
├── themes/
│   └── balevikit-tailwindcss-hugo-theme/
├── hugo.toml
└── package.json
```

Hvis du vil overstyre primærfargen, legger du til:

```text
assets/
└── css/
    └── custom.css
```

## For AI og agenter

Hvis du setter opp prosjektet automatisk, følg denne rekkefølgen:

1. Opprett et nytt Hugo-prosjekt.
2. Legg til temaet som git submodule.
3. Opprett `package.json` i prosjektroten.
4. Opprett `hugo.toml` med `theme`, `build` og `module`.
5. Opprett `content/_index.md`.
6. Kjør `npm install`.
7. Kjør `hugo --minify`.
8. Ikke opprett lokale `layouts/` eller CSS-overstyringer uten at du trenger dem.

Det tryggeste standardvalget er å bruke temaet som det er først, og heller legge til små overstyringer etterpå.

## Templates: standard bruk av `baseof`

Temaet eier `layouts/_default/baseof.html`. Det betyr at prosjektet normalt ikke skal lage sin egen `baseof.html`.

Hvis du trenger en lokal template i prosjektet, skal den som hovedregel bare definere innholdet i `main`:

```go-html-template
{{ define "main" }}
<section class="bg-white">
  <div class="container">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.2] tracking-[-0.015em] text-balance mt-0 mb-6">
      Hello world
    </h1>
    <p class="text-xl leading-relaxed text-pretty">
      Dette innholdet rendres inni temaets base layout.
    </p>
  </div>
</section>
{{ end }}
```

Eksempel for forside:

```text
layouts/
└── index.html
```

Innhold i `layouts/index.html`:

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

Dette gir deg fortsatt header, footer, SEO, CSS og scripts fra temaet.

### Standardregel

- Ikke opprett lokal `baseof.html` uten en svært god grunn
- Ikke kopier header eller footer inn i prosjektet
- Bruk `{{ define "main" }}` i lokale templates
- La temaet håndtere resten

## Start utvikling

```bash
npm run dev
```

## Bygg nettstedet

```bash
npm run build
```
