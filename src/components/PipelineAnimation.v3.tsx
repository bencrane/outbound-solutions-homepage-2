"use client";

import { useEffect, useState } from "react";
import { tokens } from "@/lib/tokens";
import { Text } from "@/components/ui";

export function PipelineAnimation() {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        padding: tokens.spacing[6],
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
      }}
    >
      {/* Stage indicators */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
          alignItems: "center",
          marginBottom: tokens.spacing[5],
          padding: `0 ${tokens.spacing[2]}`,
        }}
      >
        <Text variant="label" color="muted" style={{ fontSize: "9px", textAlign: "center" }}>EXTRACT</Text>
        <span style={{ color: "#4a8c6f", opacity: 0.4, fontSize: "10px" }}>→</span>
        <Text variant="label" color="muted" style={{ fontSize: "9px", textAlign: "center" }}>TRANSFORM</Text>
        <span style={{ color: "#4a8c6f", opacity: 0.4, fontSize: "10px" }}>→</span>
        <Text variant="label" color="muted" style={{ fontSize: "9px", textAlign: "center" }}>LOAD</Text>
        <span style={{ color: "#4a8c6f", opacity: 0.4, fontSize: "10px" }}>→</span>
        <Text variant="label" style={{ fontSize: "9px", textAlign: "center", color: "#4a8c6f" }}>REVENUE</Text>
      </div>

      {/* Pipeline rows */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
        {[0, 1, 2, 3, 4].map((row) => {
          const isActive = row === activeRow;
          const isPast = row < activeRow;

          return (
            <div
              key={row}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr",
                alignItems: "center",
                padding: `${tokens.spacing[2]} ${tokens.spacing[2]}`,
                background: isActive ? "rgba(74, 140, 111, 0.08)" : "transparent",
                borderRadius: tokens.radii.sm,
                transition: "all 0.5s ease",
              }}
            >
              {/* Raw data */}
              <div
                style={{
                  padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
                  background: tokens.colors.bg.primary,
                  borderRadius: tokens.radii.sm,
                  border: `1px solid ${isActive ? "rgba(74, 140, 111, 0.3)" : tokens.colors.border.subtle}`,
                  opacity: isPast ? 0.3 : 1,
                  transition: "all 0.5s ease",
                }}
              >
                <div style={{ color: "#666", fontSize: "9px" }}>row_{row + 1}</div>
                <div style={{ color: isActive ? "#4a8c6f" : "#888", fontSize: "10px" }}>
                  {["FMCSA", "OSHA", "permits", "census", "filings"][row]}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ padding: "0 4px", color: isActive ? "#4a8c6f" : "#333", transition: "color 0.5s" }}>→</div>

              {/* Transform */}
              <div
                style={{
                  padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
                  background: tokens.colors.bg.primary,
                  borderRadius: tokens.radii.sm,
                  border: `1px solid ${isActive ? "rgba(74, 140, 111, 0.3)" : tokens.colors.border.subtle}`,
                  opacity: isPast ? 0.3 : 1,
                  transition: "all 0.5s ease",
                }}
              >
                <div style={{ color: isActive ? "#4a8c6f" : "#555", fontSize: "10px" }}>
                  {isActive ? "qualifying..." : isPast ? "qualified" : "—"}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ padding: "0 4px", color: isActive ? "#4a8c6f" : "#333", transition: "color 0.5s" }}>→</div>

              {/* Load to pipeline */}
              <div
                style={{
                  padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
                  background: tokens.colors.bg.primary,
                  borderRadius: tokens.radii.sm,
                  border: `1px solid ${isActive ? "rgba(74, 140, 111, 0.3)" : tokens.colors.border.subtle}`,
                  opacity: isPast ? 0.3 : 1,
                  transition: "all 0.5s ease",
                }}
              >
                <div style={{ color: isActive ? "#4a8c6f" : "#555", fontSize: "10px" }}>
                  {isPast ? "sent" : isActive ? "loading..." : "—"}
                </div>
              </div>

              {/* Arrow */}
              <div style={{ padding: "0 4px", color: isPast ? "#4a8c6f" : "#333", transition: "color 0.5s" }}>→</div>

              {/* Revenue */}
              <div
                style={{
                  padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
                  background: isPast ? "rgba(74, 140, 111, 0.1)" : tokens.colors.bg.primary,
                  borderRadius: tokens.radii.sm,
                  border: `1px solid ${isPast ? "rgba(74, 140, 111, 0.3)" : tokens.colors.border.subtle}`,
                  textAlign: "right",
                  transition: "all 0.5s ease",
                }}
              >
                <div
                  style={{
                    color: isPast ? "#4a8c6f" : "#333",
                    fontSize: "11px",
                    fontWeight: isPast ? 500 : 400,
                    fontFamily: "var(--font-serif)",
                    transition: "all 0.5s ease",
                  }}
                >
                  {isPast ? ["$12k", "$8k", "$24k", "$6k", "$18k"][row] : "—"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div
        style={{
          marginTop: tokens.spacing[4],
          paddingTop: tokens.spacing[4],
          borderTop: `1px solid ${tokens.colors.border.subtle}`,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "baseline",
          gap: tokens.spacing[3],
        }}
      >
        <Text variant="label" color="muted" style={{ fontSize: "9px" }}>PIPELINE</Text>
        <Text variant="display" style={{ fontSize: "28px", color: "#4a8c6f" }}>
          ${(68 + activeRow * 12).toLocaleString()}k
        </Text>
      </div>
    </div>
  );
}
