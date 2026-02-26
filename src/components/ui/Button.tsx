import { CSSProperties, ReactNode, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const baseStyles: CSSProperties = {
  fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
  fontSize: "var(--text-xs)",
  letterSpacing: "var(--tracking-wider)",
  textTransform: "uppercase",
  border: "none",
  borderRadius: "var(--radius-sm)",
  cursor: "pointer",
  transition: "var(--transition-default)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: "var(--color-accent-primary)",
    color: "var(--color-bg-primary)",
  },
  secondary: {
    background: "transparent",
    color: "var(--color-fg-primary)",
    border: "1px solid var(--color-border-default)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-fg-secondary)",
  },
};

const sizeStyles: Record<ButtonSize, CSSProperties> = {
  sm: {
    padding: "var(--space-2) var(--space-4)",
  },
  md: {
    padding: "var(--space-3) var(--space-8)",
  },
  lg: {
    padding: "var(--space-4) var(--space-10)",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        ...baseStyles,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
