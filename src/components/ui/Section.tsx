import { CSSProperties, ReactNode } from "react";
import { tokens, Spacing } from "@/lib/tokens";

interface SectionProps {
  children: ReactNode;
  contained?: boolean;
  padding?: Spacing;
  border?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
  as?: "section" | "div" | "footer" | "header";
}

export function Section({
  children,
  contained = false,
  padding = 24,
  border = true,
  className,
  style,
  id,
  as: Component = "section",
}: SectionProps) {
  const innerContent = contained ? (
    <div
      style={{
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: tokens.spacing[12],
        paddingRight: tokens.spacing[12],
      }}
    >
      {children}
    </div>
  ) : (
    children
  );

  return (
    <Component
      id={id}
      className={className}
      style={{
        paddingTop: tokens.spacing[padding],
        paddingBottom: tokens.spacing[padding],
        borderTop: border ? "1px solid rgba(255,255,255,0.08)" : "none",
        ...style,
      }}
    >
      {innerContent}
    </Component>
  );
}
