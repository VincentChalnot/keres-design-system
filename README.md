# keres-design-system

Tailwind 3 design system shared by the Keres website (Hugo) and platform (Symfony + Vite): tokens (`src/tokens.css`),
a preset (`tailwind.preset.js`) and components (`src/components/*.css`). The style guide (`styleguide/`) shows the
markup of every component; `npm run styleguide` serves it on http://localhost:4173.

## Consuming it

From npm (once published) or, before that, as a git dependency pinned to a tag (`github:VincentChalnot/keres-design-system#vX.Y.Z`; npm then needs `git`):

```json
"dependencies": { "@vchalnot/keres-design-system": "^0.4.0" },
"devDependencies": { "tailwindcss": "^3.4.17", "@tailwindcss/typography": "^0.5.15", "postcss": "^8", "autoprefixer": "^10" }
```

```js
// tailwind.config.js
presets: [require('@vchalnot/keres-design-system/tailwind.preset')],
content: [/* your templates */, './node_modules/@vchalnot/keres-design-system/src/**/*.css'],  // keeps every component class
```

```css
/* your entry CSS, compiled by Tailwind (PostCSS) so the utilities come from your own templates */
@import "@vchalnot/keres-design-system/keres.css";
```

The package ships `tailwind.preset.js`, `src/` and `styleguide/fonts` (the CSS refers to `/fonts/*`: serve them there).
`dist/keres.css` (`npm run build`) is a precompiled bundle for consumers that do not run Tailwind; it is not committed.
The platform's integration notes live in its `docs/design-system.md`.

## Releasing

1. Change `src/…` and the matching `styleguide/index.html` section.
2. Bump `version` in `package.json` (+ `package-lock.json`), commit (conventional commits), `git tag -a vX.Y.Z -m …`.
3. `git push origin main --follow-tags`, then bump the `#vX.Y.Z` in the consumers.

## Token model (`src/tokens.css`)

**Base colours** are the only colour definitions: `--k-canvas`, `--k-fg`, `--k-soft`, `--k-ink`, `--k-primary`,
`--k-secondary`, `--k-success`, `--k-danger`, `--k-warning`, `--k-info`, `--k-turn` (plus the theme-independent board and
game colours: `--k-tile-*`, `--k-piece-*`, `--k-track`, `--k-eval-*`, `--k-danger-strong`). They are RGB **triplets**
(`--k-primary: 196 147 74`), so `rgb(var(--k-primary) / .2)` and Tailwind's `bg-primary/20` work.

**Derived colours** are full CSS colours computed from them in `tokens.css`; never write them by hand:

| Family | Rule |
|---|---|
| `primary-hover/hi/lo`, `secondary-hover/hi/lo`, `danger-text/deep/ink`, `turn-text`, `line-hi/lo` | `oklch(from <base> calc(l + ΔL) calc(c * k) calc(h + Δh))`: a lightness offset, a chroma factor and a small hue offset, fitted per hue (the old palette was hand-tuned per hue, hence different numbers for each) |
| `panel`, `sunken`, `inactive`, `surface`, `popover`, `surface-hover`, `edge` | `color-mix(in oklab, canvas, fg N%)`: the canvas lifted towards the text colour (2.7 → 18.8 %) |
| `muted`, `subtle` | `color-mix(in oklab, fg, canvas N%)`: the text colour faded into the canvas (31 %, 50 %) |
| `brand`, `line` | `color-mix(in oklab, primary, canvas N%)`: the gold sunk into the canvas (68 %, 40 %) |

Changing `--k-primary` (or `--k-canvas`, `--k-fg`…) on `:root` re-themes everything: try it in the style guide (colour
pickers on the base swatches). Deltas against the former static palette are ΔE(oklab)×100 ≤ 1.0 (≤ 0.25 for the shade
families; at most 5/255 on a single sRGB channel, for `edge` and `muted`).

How to use them:
- **CSS**: a base token as `rgb(var(--k-primary) / .4)`; a derived one as `var(--k-primary-hi)`, with alpha
  `rgb(from var(--k-primary-hi) r g b / .4)`. `--edge-hi` / `--edge-lo` (the lit edge of `.edged`) take full colours.
- **Tailwind**: the same names for both kinds (`bg-primary-hi/30`); the preset emits `rgb(from var(--k-x) r g b / α)` for
  derived ones (a function in `tailwind.preset.js`, so Tailwind never parses the `from` syntax itself).
- **JS** that needs a concrete colour (Chart.js…): resolve the token through an element (`getComputedStyle(el).backgroundColor`,
  drawn on a canvas if the library cannot parse `color(srgb …)`); reading `--k-surface` directly gives the unresolved formula.

Trade-offs: needs relative colour syntax and `color-mix` (Chrome/Edge 119, Safari 16.4, Firefox 128; the DS already
needs Chrome 139 for the bevels, older browsers fall back to rounded corners but would lose derived colours). Derived
tokens are computed where they are declared (`:root`), so retheme on `:root`; a scoped override (`.x { --k-primary: … }`)
changes the base only for direct `rgb(var(--k-primary))` uses, not for the derived ones: redeclare them in that scope.

## License

Proprietary with a conditional AGPL-3.0 grant, identical to the Keres platform: see [`LICENSE`](LICENSE).

## Publishing to npm

`package.json` is publish-ready (`@vchalnot/keres-design-system`, `files`, `exports`, `publishConfig.access: public`; provenance is added by the CI workflow only).
See [RELEASING.md](RELEASING.md) for the release steps. `.github/workflows/publish.yaml` publishes on a pushed `vX.Y.Z` tag using npm Trusted Publishing (GitHub OIDC, no
token or secret): it checks the tag equals `version`, builds, then `npm publish --provenance --access public`. The
package must first be linked to this repo and workflow in its npm settings (Trusted Publisher). Check the tarball
locally with `npm pack --dry-run`.
