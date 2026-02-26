"use client";

import { useEffect, useState } from "react";
import { tokens } from "@/lib/tokens";
import { Text } from "@/components/ui";

const signals = [
  "FMCSA carrier growth detected",
  "Permit volume spike — FL",
  "New authority filed — OH",
  "Fleet expansion signal",
  "Compliance gap detected",
  "Hiring surge — 12 roles",
];

export function PipelineAnimation() {
  const [activeSignals, setActiveSignals] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSignal = Math.floor(Math.random() * signals.length);
      setActiveSignals((prev) => {
        const updated = [...prev, newSignal];
        if (updated.length > 3) updated.shift();
        return updated;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        padding: tokens.spacing[8],
        minHeight: "320px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing[6],
          paddingBottom: tokens.spacing[4],
          borderBottom: `1px solid ${tokens.colors.border.subtle}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: tokens.spacing[2] }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4a8c6f",
              animation: "pulse 2s infinite",
            }}
          />
          <Text variant="label" color="muted" style={{ fontSize: "10px" }}>
            PIPELINE ACTIVE
          </Text>
        </div>
        <Text variant="caption" color="muted" style={{ fontSize: "11px" }}>
          Live signal detection
        </Text>
      </div>

      {/* Pipeline visualization */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: tokens.spacing[3] }}>
        {/* Flow diagram */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr auto 1fr",
            alignItems: "center",
            gap: tokens.spacing[2],
            marginBottom: tokens.spacing[4],
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Text variant="label" color="muted" style={{ fontSize: "9px" }}>DATA IN</Text>
            <Text variant="caption" style={{ color: "#4a8c6f", fontSize: "18px", fontFamily: "var(--font-serif)" }}>342</Text>
          </div>
          <div style={{ color: "#4a8c6f", opacity: 0.4 }}>→</div>
          <div style={{ textAlign: "center" }}>
            <Text variant="label" color="muted" style={{ fontSize: "9px" }}>QUALIFIED</Text>
            <Text variant="caption" style={{ color: "#4a8c6f", fontSize: "18px", fontFamily: "var(--font-serif)" }}>84</Text>
          </div>
          <div style={{ color: "#4a8c6f", opacity: 0.4 }}>→</div>
          <div style={{ textAlign: "center" }}>
            <Text variant="label" color="muted" style={{ fontSize: "9px" }}>MEETINGS</Text>
            <Text variant="caption" style={{ color: "#4a8c6f", fontSize: "18px", fontFamily: "var(--font-serif)" }}>12</Text>
          </div>
        </div>

        {/* Live signals feed */}
        <div
          style={{
            flex: 1,
            background: tokens.colors.bg.primary,
            borderRadius: tokens.radii.sm,
            padding: tokens.spacing[4],
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacing[2] }}>
            {activeSignals.map((signalIndex, i) => (
              <div
                key={`${signalIndex}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: tokens.spacing[3],
                  padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
                  background: "rgba(74, 140, 111, 0.08)",
                  borderLeft: "2px solid #4a8c6f",
                  borderRadius: tokens.radii.sm,
                  animation: "slideIn 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#4a8c6f",
                  }}
                />
                <Text variant="caption" color="secondary" style={{ fontSize: "12px" }}>
                  {signals[signalIndex]}
                </Text>
              </div>
            ))}
            {activeSignals.length === 0 && (
              <Text variant="caption" color="muted" style={{ fontSize: "11px", opacity: 0.5 }}>
                Waiting for signals...
              </Text>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
