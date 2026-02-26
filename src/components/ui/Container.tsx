import { CSSProperties, ReactNode } from "react";
import { tokens, Spacing } from "@/lib/tokens";

interface ContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: Spacing;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "main" | "article";
}

const maxWidths = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  full: "100%",
};

export function Container({
  children,
  maxWidth = "xl",
  padding = 6,
  className,
  style,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={className}
      style={{
        width: "100%",
        maxWidth: maxWidths[maxWidth],
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: tokens.spacing[padding],
        paddingRight: tokens.spacing[padding],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
