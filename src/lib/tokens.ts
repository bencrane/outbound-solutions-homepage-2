/**
 * Design Tokens — typed references to CSS custom properties.
 * Actual values live in globals.css; this module provides
 * type-safe accessors for use in inline styles.
 */

function v(name: string) {
  return `var(${name})`;
}

export const tokens = {
  colors: {
    bg: {
      primary: v("--color-bg-primary"),
      primaryTranslucent: v("--color-bg-primary-translucent"),
      secondary: v("--color-bg-secondary"),
      elevated: v("--color-bg-elevated"),
    },
    fg: {
      primary: v("--color-fg-primary"),
      secondary: v("--color-fg-secondary"),
      muted: v("--color-fg-muted"),
    },
    border: {
      subtle: v("--color-border-subtle"),
      default: v("--color-border-default"),
      strong: v("--color-border-strong"),
    },
    accent: {
      primary: v("--color-accent-primary"),
      success: v("--color-accent-success"),
      warning: v("--color-accent-warning"),
      error: v("--color-accent-error"),
    },
  },

  spacing: {
    0: v("--space-0"),
    1: v("--space-1"),
    2: v("--space-2"),
    3: v("--space-3"),
    4: v("--space-4"),
    5: v("--space-5"),
    6: v("--space-6"),
    8: v("--space-8"),
    10: v("--space-10"),
    12: v("--space-12"),
    16: v("--space-16"),
    20: v("--space-20"),
    24: v("--space-24"),
    32: v("--space-32"),
  },

  typography: {
    fonts: {
      serif: "var(--font-serif), 'Instrument Serif', Georgia, serif",
      mono: "var(--font-mono), 'IBM Plex Mono', ui-monospace, monospace",
    },
    sizes: {
      xs: v("--text-xs"),
      sm: v("--text-sm"),
      base: v("--text-base"),
      lg: v("--text-lg"),
      xl: v("--text-xl"),
      "2xl": v("--text-2xl"),
      "3xl": v("--text-3xl"),
      "4xl": v("--text-4xl"),
      "5xl": v("--text-5xl"),
      "6xl": v("--text-6xl"),
      "7xl": v("--text-7xl"),
      "8xl": v("--text-8xl"),
    },
    lineHeights: {
      none: v("--leading-none"),
      tight: v("--leading-tight"),
      snug: v("--leading-snug"),
      normal: v("--leading-normal"),
      relaxed: v("--leading-relaxed"),
    },
    letterSpacing: {
      tight: v("--tracking-tight"),
      normal: v("--tracking-normal"),
      wide: v("--tracking-wide"),
      wider: v("--tracking-wider"),
      widest: v("--tracking-widest"),
    },
  },

  radii: {
    none: v("--radius-none"),
    sm: v("--radius-sm"),
    md: v("--radius-md"),
    lg: v("--radius-lg"),
    full: v("--radius-full"),
  },

  transitions: {
    fast: v("--transition-fast"),
    default: v("--transition-default"),
    slow: v("--transition-slow"),
  },

  grid: {
    size: v("--grid-size"),
  },
} as const;

export type Spacing = keyof typeof tokens.spacing;
export type Color = typeof tokens.colors;
export type Typography = typeof tokens.typography;
