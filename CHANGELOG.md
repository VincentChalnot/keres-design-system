# Changelog

## 0.6.0 - 2026-10-12
- **Buttons**: icons always take the text colour; a thin bar separates icon and label (`--btn-gap` on each side of it, none on icon-only buttons);
  the label is nudged down (`--btn-nudge`, in `em`) so capitals look vertically centred.
- **Tokens**: only `--k-radius-md` is defined; `--k-radius-sm` (½×) and `--k-radius-lg` (2×) are derived from it.
- Dev: `npm run styleguide` rebuilds `styleguide/keres.css` on every change in `src/`. Sources reformatted (4-space indent); multi-value `transition-[…]` utilities replaced by plain `transition:` declarations.

## 0.5.0 - 2026-10-12
- **Tokens (breaking for direct CSS users)**: `--k-primary-hover|hi|lo`, `--k-secondary-hover|hi|lo`, `--k-line`, `--k-line-hi|lo`,
  `--k-surface`, `--k-surface-hover`, `--k-sunken`, `--k-inactive`, `--k-panel`, `--k-popover`, `--k-edge`, `--k-muted`,
  `--k-subtle`, `--k-brand`, `--k-danger-text|deep|ink`, `--k-turn-text` are no longer RGB triplets but full CSS colours
  derived from the base colours (`--k-primary`, `--k-canvas`, `--k-fg`…). Use `var(--k-x)` instead of `rgb(var(--k-x))`, and
  `rgb(from var(--k-x) r g b / .4)` for an alpha. `--edge-hi` / `--edge-lo` now take full colours.
  Tailwind class names are unchanged. Re-theme by overriding the base tokens only. See README "Token model".
- Requires relative colour syntax + `color-mix` (Chrome/Edge 119, Safari 16.4, Firefox 128).
- Styleguide: colour pickers only on base swatches, derived swatches follow.
- Dev dependency: `postcss-import` 17 (Node >= 22). Tailwind stays on 3.4 (4.x is a migration: CSS-first config, plugin/preset changes).

## 0.4.1
- Package renamed `@vchalnot/keres-design-system`, published from CI (npm Trusted Publishing).

## 0.4.0
- `.btn` wraps by default (`btn--nowrap` opts out), collapsible side menu, admin/lobby/settings styleguide samples.
