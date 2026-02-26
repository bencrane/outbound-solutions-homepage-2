import { CSSProperties, ReactNode } from "react";

type TextVariant = "display" | "headline" | "title" | "body" | "label" | "caption";
type TextColor = "primary" | "secondary" | "muted";

interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const variantStyles: Record<TextVariant, CSSProperties> = {
  display: {
    fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
    fontSize: "var(--text-8xl)",
    lineHeight: "var(--leading-none)",
    letterSpacing: "var(--tracking-tight)",
  },
  headline: {
    fontFamily: "var(--font-serif), 'Instrument Serif', Georgia, serif",
    fontSize: "var(--text-4xl)",
    lineHeight: "var(--leading-snug)",
  },
  title: {
    fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
    fontSize: "var(--text-xl)",
    lineHeight: "var(--leading-snug)",
  },
  body: {
    fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
    fontSize: "var(--text-base)",
    lineHeight: "var(--leading-relaxed)",
  },
  label: {
    fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
    fontSize: "var(--text-xs)",
    lineHeight: "var(--leading-normal)",
    letterSpacing: "var(--tracking-wider)",
    textTransform: "uppercase" as const,
  },
  caption: {
    fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
    fontSize: "var(--text-sm)",
    lineHeight: "var(--leading-normal)",
  },
};

const colorStyles: Record<TextColor, CSSProperties> = {
  primary: { color: "var(--color-fg-primary)" },
  secondary: { color: "var(--color-fg-secondary)" },
  muted: { color: "var(--color-fg-muted)" },
};

export function Text({
  variant = "body",
  color = "primary",
  as: Component = "p",
  children,
  className,
  style,
}: TextProps) {
  return (
    <Component
      className={className}
      style={{
        ...variantStyles[variant],
        ...colorStyles[color],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
