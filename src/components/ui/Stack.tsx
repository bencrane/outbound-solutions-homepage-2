import { CSSProperties, ReactNode } from "react";
import { tokens, Spacing } from "@/lib/tokens";

interface StackProps {
  direction?: "horizontal" | "vertical";
  gap?: Spacing;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "nav" | "header" | "footer" | "main" | "article";
}

export function Stack({
  direction = "vertical",
  gap = 4,
  align,
  justify,
  children,
  className,
  style,
  as: Component = "div",
}: StackProps) {
  return (
    <Component
      className={className}
      style={{
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        gap: tokens.spacing[gap],
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
