import { CSSProperties } from "react";
import { tokens, Spacing } from "@/lib/tokens";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  spacing?: Spacing;
  color?: "subtle" | "default" | "strong";
  length?: string;
}

export function Divider({
  orientation = "horizontal",
  spacing = 0,
  color = "subtle",
  length = "100%",
}: DividerProps) {
  const colors = {
    subtle: tokens.colors.border.subtle,
    default: tokens.colors.border.default,
    strong: tokens.colors.border.strong,
  };

  const style: CSSProperties =
    orientation === "horizontal"
      ? {
          width: length,
          height: "1px",
          background: colors[color],
          marginTop: tokens.spacing[spacing],
          marginBottom: tokens.spacing[spacing],
        }
      : {
          width: "1px",
          height: length,
          background: colors[color],
          marginLeft: tokens.spacing[spacing],
          marginRight: tokens.spacing[spacing],
        };

  return <div style={style} />;
}
