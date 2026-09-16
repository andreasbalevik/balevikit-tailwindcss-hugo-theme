# AGENTS.md

Kort bruksguide for AI-agenter som jobber med `balevikit-tailwindcss-hugo-theme`.

- Designprinsipper og praksis: `.github/copilot-instruction.md`
- Full setup og dokumentasjon: `README.md`

## Slik bruker et prosjekt theme

Theme legges til som git-submodul i `themes/balevikit-tailwindcss-hugo-theme`.

### Prosjektet trenger

- `config.toml` med `theme = 'balevikit-tailwindcss-hugo-theme'` og `[build]` (buildStats + cachebusters)
- `package.json` med `install`-skript som kjører `npm install` i theme-mappen, og `tailwindcss` + `@tailwindcss/cli` som devDependencies (Hugo kjører Tailwind-klienten fra prosjektets `node_modules`)
- `content/_index.md`

### Styling

- Brand tokens i prosjektets `assets/css/custom.css` via `@theme`. Theme importer den automatisk; prosjektets fil vinner over theme sin tomme placeholder.
- Tailwind utility-klasser i templates; ikke egne CSS-klasser eller `<style>`-blokker.

### Lokale templates

- Lokale layouts definerer bare `{{ define "main" }}`. Theme eier `baseof.html`, header og footer.
- Ikke lag lokal `baseof.html`, header eller footer.

### Lokale partials

- Nye prosjektspesifikke partials under `layouts/partials/components/`.
- Overstyr en theme-partial ved å legge en fil med samme relative sti i prosjektets `layouts/partials/` (Hugo foretrekker prosjektet). Eksempler: `utils/js.html`, `custom-script.html`, `seo/json-ld/_localbusiness.html`.

### SEO / structured data

- `[Params]` i `config.toml` driver JSON-LD (kontakt, adresse, social, `schema.localBusiness`).
- `blog_section` og `product_section` peker på prosjektets seksjoner for BlogPosting/Product.

### Verifisering

- `hugo --minify` må bygge uten feil.
