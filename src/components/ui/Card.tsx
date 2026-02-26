import { CSSProperties, ReactNode } from "react";
import { tokens } from "@/lib/tokens";

interface CardProps {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  as?: "div" | "article" | "aside";
}

const paddingSizes = {
  none: undefined,
  sm: tokens.spacing[8],
  md: tokens.spacing[12],
  lg: tokens.spacing[16],
};

export function Card({
  children,
  padding = "lg",
  className,
  style,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={className}
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        padding: paddingSizes[padding],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
