# keres-design-system

Tailwind 3 design system shared by the Keres website (Hugo) and platform (Symfony + Vite): tokens (`src/tokens.css`),
a preset (`tailwind.preset.js`) and components (`src/components/*.css`). The style guide (`styleguide/`) shows the
markup of every component; `npm run styleguide` serves it on http://localhost:4173.

## Consuming it

As a git dependency pinned to a tag (public repo, no token). npm shells out to `git`, so it must be installed:

```json
"dependencies": { "@keres/design-system": "github:VincentChalnot/keres-design-system#v0.2.0" },
"devDependencies": { "tailwindcss": "^3.4.17", "@tailwindcss/typography": "^0.5.15", "postcss": "^8", "autoprefixer": "^10" }
```

```js
// tailwind.config.js
presets: [require('@keres/design-system/tailwind.preset')],
content: [/* your templates */, './node_modules/@keres/design-system/src/**/*.css'],  // keeps every component class
```

```css
/* your entry CSS, compiled by Tailwind (PostCSS) so the utilities come from your own templates */
@import "@keres/design-system/keres.css";
```

The package ships `tailwind.preset.js`, `src/` and `styleguide/fonts` (the CSS refers to `/fonts/*`: serve them there).
`dist/keres.css` (`npm run build`) is a precompiled bundle for consumers that do not run Tailwind; it is not committed.
The platform's integration notes live in its `docs/design-system.md`.

## Releasing

1. Change `src/…` and the matching `styleguide/index.html` section.
2. Bump `version` in `package.json` (+ `package-lock.json`), commit (conventional commits), `git tag -a vX.Y.Z -m …`.
3. `git push origin main --follow-tags`, then bump the `#vX.Y.Z` in the consumers.
