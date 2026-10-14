# Changelog

## 0.8.0 - 2026-10-14
- **Buttons**: grunge texture overlay (`styleguide/images/scratches-texture-seamless-2011.webp`, served from `/images/`) on every `.btn` except `--text`/`--static`, drawn on `::after` with a blend mode per fill (screen on dark, soft-light on coloured, multiply on `--light`) and a per-variant flip so neighbours differ. Tune with `--btn-grunge-opacity` / `--btn-grunge-blend` / `--grunge-flip`, opt out with `.btn--no-grunge` (or `--btn-grunge-opacity: 0`). Skipped while `.is-loading`.
- **Surfaces**: `.bot-card` (`__avatar`, `__body`, `__head`, `__name`): a card's content as a big gold-ringed round portrait (a `<button>`/`<a>` wrapping an `<img>` or an icon, golden filter on hover/focus) beside the title, a name + action row and help text.

## 0.7.0 - 2026-10-12
- **Game**: `.move-eval.is-loss` / `.is-blunder` (what a move did to the evaluation, for the side that played it); `.eval-graph` and its parts
  (`__area`, `__mid`, `__cursor`), a full-width `graph` area under the board in the stacked, mid and wide arrangements (only while the graph is shown;
  the wide arrangement's fixed height grows by `--graph-extra`).
- **Game**: `.eval-bar` and `.material-piece` opt out of the browsers' forced dark modes (`color-scheme: only light`): Brave/Android inverted them.
- **Tutorial**: new `tutorial.css` (`.tutorial-slide`, `.tutorial-slide__figure`, `.tutorial-progress`, `.tutorial-board`, `.tutorial-caption`, `.tutorial-message`).

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
