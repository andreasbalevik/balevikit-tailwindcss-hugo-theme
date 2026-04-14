# Balevik IT theme

Denne filen er en kort arbeidsguide for Balevik IT & WEB-prosjekter som bruker `balevikit-tailwindcss-hugo-theme`.

Bruk den til beslutninger i kode. Bruk `README.md` for full setup og brukerrettet theme-dokumentasjon.

Les også:
- Hugo docs: `https://gohugo.io/documentation/`
- Templates: `https://gohugo.io/templates/`

---

## Theme

### Grunnprinsipp

Skill mellom:
- **Site** - Hugo-prosjektet som bruker theme
- **Theme** - gjenbrukbar struktur, partials og designsystem

Start med theme som det er. Overstyr lokalt bare når prosjektet faktisk trenger det.

### Hva theme eier

Theme skal som utgangspunkt eie:
- `baseof.html`, header og footer
- container og grunnleggende layout
- SEO-partials og structured data
- bildepartials
- Tailwind-oppsett og typography
- Lucide icons

Unngå lokale kopier av ting theme allerede dekker.

### Lokale overrides

Foretrekk denne rekkefolgen:
1. Finnes det allerede en temapartial? -> bruk den
2. Finnes det en prosjektpartial som nesten dekker behovet? -> utvid den
3. Trengs noe nytt? -> lag det gjenbrukbart

En ny partial i theme skal:
- gjøre en ting
- fungere i flere kontekster
- ta data via parametere, ikke hardkode sideinnhold
- være uavhengig av én spesifikk side

Hvis noe bare gjelder én side eller én kampanje, hører det som regel hjemme i prosjektet, ikke i theme.

### Filstruktur

```text
layouts/
  partials/
    components/   <- gjenbrukbare UI-byggeklosser
    sections/     <- sammensatte seksjonsmønstre
    seo/          <- meta og structured data
  _default/       <- list.html, single.html, baseof.html
  page/           <- sidetype-spesifikke layouts
```

### Prosjektoppsett

Bruk theme som standard før du bygger lokalt rundt det.

Typisk minimum:
- `hugo.toml`
- `content/_index.md`
- eventuelt `assets/css/custom.css` hvis primærfargen må overstyres

Ikke legg til lokale `layouts/`, egne header/footer, ekstra CSS-filer eller parallelle designsystemer uten tydelig grunn.

### Styling og farger

Arkitekturprinsipp:

> Endre `--color-primary`. Ingenting annet.

```css
@theme {
  --color-primary: oklch(/* L C H */);
}
```

Regler:
- bruk Tailwinds utility-klasser
- ikke lag egne CSS-klasser eller `@apply`-blokker
- ikke legg `<style>`-tagger i templates
- bruk `assets/css/custom.css` for delte tokens, ikke nye stilark
- bruk arbitrære verdier som `min-h-[600px]` heller enn egne CSS-variabler

Praktiske valg:
- alterner seksjonsbakgrunner med `bg-white` og `bg-primary/2-5`
- bruk primærtinter for border, hover og focus
- hold skygger moderate: `shadow-sm` eller `shadow`
- hold rundinger moderate og konsistente: `rounded-lg`
- hold overganger rolige: `transition-all duration-300`

Unngå:
- nesten bare hvite seksjoner
- `bg-stone-50`, `bg-gray-50` eller `bg-gray-100` som standard seksjonsbakgrunn
- grå knapper og grå border som hovedmønster
- Tailwinds øvrige paletter til strukturell styling

Unntak:
- metadata kan bruke `text-gray-700`
- statuser kan bruke `red-*` og `green-*`

`text-white` skal bare brukes på garantert mørk bakgrunn. Mørke seksjoner med lyse kort må sette tekstfarge på barnekomponenter eksplisitt.

### Typografi

Standard:
- font: Inter
- vekter: 400 for brødtekst, 500 for overskrifter, 600 for labels og knapper
- unngå `font-bold`, `text-justify` og `text-sm` for løpende tekst

Bruk prose-first:
- `.Content` -> `{{ partial "components/prose-content.html" . }}`
- H1, metadata og UI-komponenter holdes utenfor prose
- bruk `not-prose` bare rundt UI inni en prose-blokk

Heading-regler:
- bruk `font-medium`, `leading-[1.2]`, `tracking-[-0.015em]`, `text-balance`, `mt-0`, `mb-6`
- H1: `text-3xl md:text-4xl lg:text-5xl`
- H2: `text-2xl md:text-3xl lg:text-4xl`
- H3: `text-xl md:text-2xl`
- H4: `text-lg md:text-xl`
- ingress under heading på seksjonsnivå: `text-lg md:text-xl`
- kortinnhold: `text-base md:text-lg`

Ikke hopp over et Tailwind-steg mellom breakpoints. Hold lang tekst innenfor `max-w-*`.

Verifiser at heading er responsive og gir mening på mindre enheter. Hvor mye av viewport dekker teksten? er det for mye? er det for lite? Finn balansen.

### Spacing og komposisjon

Hold deg til en rolig skala:
- spacing: `1, 2, 3, 4, 6, 8, 12, 16`
- foretrekk `gap-6 md:gap-8`
- kortpadding: `p-6 md:p-8`
- kompakt: `p-4 md:p-6`
- stor: `p-8 md:p-12 lg:p-16`

Temaets `container` håndterer seksjonspacing. Ikke legg på ekstra `py-*` uten god grunn.

Hver seksjon skal ha én jobb:
- forside: orientering -> innganger -> utdyping -> tillit -> neste steg
- section-side: intro -> underinnhold -> videreføring
- single-side: H1 + metadata -> prose -> eventuell støtte

Bruk hero bare når siden trenger rask orientering og tydelig retning.

### Komponentmønstre

Kort:
- på `bg-white`, bruk kort med svak primærtint
- på `bg-primary/2-5`, bruk hvitt kort

Knapper:
- maks én primærhandling per seksjon
- sekundær og tertiær skal støtte, ikke konkurrere

Skjema:
- label skal alltid være synlig
- ikke deaktiver submit for validering
- bruk accessibility-vurdering ved komplekse skjema

Ikoner:
- bruk Lucide
- dekorative ikoner skal være `aria-hidden="true"`

Bilder:
- lagre bilder i `assets/images/`
- bruk theme sine bildepartials før rå `<img>`

---

## Praksiser

### Arbeidsflyt

- Løsningen er ikke ferdig før `hugo --minify` er uten feil
- Oppdater theme-dokumentasjon når du endrer noe som hører hjemme i `balevikit-tailwindcss-hugo-theme`
- Bygg først med eksisterende struktur; utvid deretter kun det som trengs

### Lesbar kode

Kode er kommunikasjon. Den skal være lett å lese uten ekstra forklaring.

Navngiving:
- partials: `hero-section.html`, ikke `section-1.html`
- variabler: `$serviceItems`, ikke `$items`
- CSS-tokens: `--color-primary`, ikke `--c1`
- content-filer følger prosjektspråket

Kommentarer:
- kommenter hvorfor, ikke hva
- legg bare til kommentarer når intensjonen ellers er uklar

Eksempel:

```html
{{/* Bruker prose-content for å få riktig typografi uten manuell styling */}}
{{ partial "components/prose-content.html" . }}
```

### Beslutningsregler

- gjenbruk før nybygg
- bygg små, sammensettbare deler fremfor engangskomponenter
- hold single-sider enklere enn landingssider
- hvis førsteinntrykk eller neste steg er uklart, forenkle

### Nye prosjekter

Ved ny side med Balevik-theme:
1. opprett Hugo-prosjekt
2. legg til theme
3. opprett minimum `hugo.toml`
4. lag `content/_index.md`
5. installer avhengigheter ved behov
6. verifiser med `hugo --minify`

Regler:
- bruk theme som utgangspunkt
- ikke lag lokale overrides uten klar grunn
- ikke legg til design eller funksjonalitet som ikke er bestilt
