"use client";

import { useState, useMemo } from "react";
import { tokens } from "@/lib/tokens";
import { Text } from "@/components/ui";
import signalsData from "@/data/signals.json";

interface Signal {
  name: string;
  example: string;
  bridge: string;
  verticals: string[];
}

const signals: Signal[] = signalsData;

const verticals = [
  "Trucking",
  "Construction",
  "SMB",
  "Software",
  "Ecommerce",
  "Healthcare",
  "Hospitality",
  "Restaurants",
  "Commercial Real Estate",
  "Manufacturing",
  "Consumer Goods",
  "Professional Services",
] as const;

function SignalCard({ signal, index }: { signal: Signal; index: number }) {
  return (
    <div
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
      }}
    >
      {/* Signal type label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "6px",
            background: tokens.colors.bg.elevated,
            border: `1px solid ${tokens.colors.border.default}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: 600,
            color: tokens.colors.fg.muted,
            fontFamily: tokens.typography.fonts.mono,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <Text
          variant="label"
          color="muted"
          as="div"
          style={{ fontSize: "11px", letterSpacing: "0.08em" }}
        >
          {signal.name.toUpperCase()}
        </Text>
      </div>

      {/* Example — the main content */}
      <Text
        variant="body"
        as="div"
        style={{
          fontSize: "20px",
          lineHeight: 1.4,
          fontWeight: 500,
          color: tokens.colors.fg.primary,
          flex: 1,
        }}
      >
        {signal.example}
      </Text>

      {/* Bridge — why this matters */}
      <div
        style={{
          paddingTop: "16px",
          borderTop: `1px solid ${tokens.colors.border.subtle}`,
        }}
      >
        <Text
          variant="caption"
          color="secondary"
          as="div"
          style={{ fontSize: "14px", lineHeight: 1.5 }}
        >
          {signal.bridge}
        </Text>
      </div>
    </div>
  );
}

export function SignalCards() {
  const [activeVertical, setActiveVertical] = useState<string>(verticals[0]);

  const filtered = useMemo(() => {
    return signals.filter((s) => s.verticals.includes(activeVertical));
  }, [activeVertical]);

  // Show first 6 signals in a grid
  const displayedSignals = filtered.slice(0, 6);

  return (
    <div>
      {/* Filter row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          rowGap: "10px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >
        <Text
          variant="caption"
          color="muted"
          as="span"
          style={{ fontSize: "13px", flexShrink: 0, marginRight: "8px" }}
        >
          Selling to:
        </Text>
        {verticals.map((v) => (
          <button
            key={v}
            onClick={() => setActiveVertical(v)}
            style={{
              fontFamily: tokens.typography.fonts.mono,
              fontSize: "12px",
              padding: "8px 16px",
              borderRadius: tokens.radii.full,
              border: `1px solid ${activeVertical === v ? tokens.colors.fg.primary : tokens.colors.border.subtle}`,
              background: activeVertical === v ? tokens.colors.fg.primary : "transparent",
              color: activeVertical === v ? tokens.colors.bg.primary : tokens.colors.fg.muted,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontWeight: activeVertical === v ? 600 : 400,
              transition: "all 0.15s ease",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {displayedSignals.map((signal, i) => (
          <SignalCard key={`${signal.name}-${i}`} signal={signal} index={i} />
        ))}
      </div>

      {/* Show more indicator */}
      {filtered.length > 6 && (
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          <Text variant="caption" color="muted" style={{ fontSize: "13px" }}>
            +{filtered.length - 6} more signals for {activeVertical}
          </Text>
        </div>
      )}
    </div>
  );
}
