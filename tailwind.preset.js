/**
 * Keres Tailwind preset. Both the website and the platform load it:
 *
 *   presets: [require('@vchalnot/keres-design-system/tailwind.preset')]
 *
 * Every value points at a CSS variable from src/tokens.css, so changing a
 * token re-themes both apps. Do not add raw hex colours to components.
 */
// Base colours are RGB triplets: `rgb(var(--k-primary) / <alpha-value>)`.
const rgb = (name) => `rgb(var(--k-${name}) / <alpha-value>)`;
// Derived colours are full CSS colours computed in tokens.css (relative colour syntax / color-mix):
// `rgb(from <colour> r g b / alpha)` turns them back into something an alpha value can be applied to.
// A function (not an `<alpha-value>` string) so Tailwind never has to parse the `from` syntax itself.
const derived = (name) => ({ opacityValue, opacityVariable }) =>
  `rgb(from var(--k-${name}) r g b / ${opacityValue !== undefined ? opacityValue : `var(${opacityVariable}, 1)`})`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
    // Panels, badges, alerts and buttons are bevelled rather than rounded.
    // `bevel` can be @apply-ed by components; the base rule covers the
    // `rounded-*` utilities used directly in templates (not rounded-full).
    ({ addBase, addUtilities }) => {
      addBase({ '.rounded, .rounded-sm, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-game': { 'corner-shape': 'bevel' } });
      addUtilities({ '.bevel': { 'corner-shape': 'bevel' } });
    },
  ],
  theme: {
    extend: {
      colors: {
        canvas: rgb('canvas'),
        sunken: derived('sunken'),
        inactive: derived('inactive'),
        surface: { DEFAULT: derived('surface'), hover: derived('surface-hover') },
        line: { DEFAULT: derived('line'), hi: derived('line-hi'), lo: derived('line-lo') },
        edge: derived('edge'),
        fg: rgb('fg'),
        soft: rgb('soft'),
        muted: derived('muted'),
        subtle: derived('subtle'),
        ink: rgb('ink'),
        primary: { DEFAULT: rgb('primary'), hover: derived('primary-hover'), hi: derived('primary-hi'), lo: derived('primary-lo') },
        secondary: { DEFAULT: rgb('secondary'), hover: derived('secondary-hover'), hi: derived('secondary-hi'), lo: derived('secondary-lo') },
        brand: derived('brand'),
        success: rgb('success'),
        danger: { DEFAULT: rgb('danger'), text: derived('danger-text') },
        warning: rgb('warning'),
        info: rgb('info'),
        turn: { DEFAULT: rgb('turn'), text: derived('turn-text') },
        panel: derived('panel'),
        popover: derived('popover'),
        tile: { dark: rgb('tile-dark'), light: rgb('tile-light'), stroke: rgb('tile-stroke') },
        piece: { light: rgb('piece-light'), dark: rgb('piece-dark') },
        // Legacy aliases used by the Hugo templates (bg-keres-primary …).
        keres: {
          primary: rgb('primary'),
          secondary: rgb('soft'),
          light: rgb('fg'),
          dark: derived('brand'),
          bg: rgb('canvas'),
          surface: derived('surface'),
        },
      },
      fontFamily: {
        sans: 'var(--k-font-body)',
        body: 'var(--k-font-body)',
        display: 'var(--k-font-display)',
        title: 'var(--k-font-title)',
        mono: 'var(--k-font-mono)',
        // Legacy aliases.
        carolingia: 'var(--k-font-display)',
        roman: 'var(--k-font-title)',
      },
      fontSize: {
        h1: ['6rem', { lineHeight: '1.1' }],
        'h1-lg': ['8rem', { lineHeight: '1.1' }],
        h2: ['3rem', { lineHeight: '1.1' }],
        h3: ['2rem', { lineHeight: '1.1' }],
        h4: ['1.5rem', { lineHeight: '1.1' }],
        h5: ['1.2rem', { lineHeight: '1.1' }],
        // Legacy alias.
        'h1-sm': ['8rem', { lineHeight: '1.1' }],
      },
      borderRadius: {
        sm: 'var(--k-radius-sm)',
        game: 'var(--k-radius-game)',
        md: 'var(--k-radius-md)',
        lg: 'var(--k-radius-lg)',
        rounded: '9999px',
      },
      boxShadow: {
        raised: 'var(--k-shadow-raised)',
        modal: 'var(--k-shadow-modal)',
        cta: 'var(--k-shadow-cta)',
      },
      maxWidth: {
        container: 'var(--k-container)',
        section: 'var(--k-container-narrow)',
        hero: 'var(--k-hero-measure)',
      },
      height: { navbar: 'var(--k-navbar-h)' },
      spacing: { navbar: 'var(--k-navbar-h)' },
      zIndex: { navbar: '100', dropdown: '200', modal: '1000', lightbox: '9000' },
      keyframes: {
        'k-pop': { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        'k-indeterminate': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(250%)' } },
      },
      animation: { pop: 'k-pop 0.2s ease', indeterminate: 'k-indeterminate 1.4s ease-in-out infinite' },
    },
  },
};
