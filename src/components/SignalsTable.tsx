"use client";

import { useState, useMemo } from "react";
import { Text, Stack } from "@/components/ui";
import { tokens } from "@/lib/tokens";
import signalsData from "@/data/signals.json";

interface Signal {
  name: string;
  example: string;
  bridge: string;
  verticals: string[];
}

const signals: Signal[] = signalsData;

// Get unique verticals from the data
const verticals = [
  "Trucking",
  "Construction",
  "SMB",
  "Software",
  "Healthcare",
  "Manufacturing",
] as const;

type Vertical = (typeof verticals)[number];


const cellStyle = {
  padding: `${tokens.spacing[5]} ${tokens.spacing[4]}`,
  borderBottom: `1px solid ${tokens.colors.border.subtle}`,
};

const thStyle = {
  ...cellStyle,
  fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
  fontSize: "11px",
  fontWeight: 500 as const,
  letterSpacing: tokens.typography.letterSpacing.wide,
  color: tokens.colors.fg.muted,
  textTransform: "uppercase" as const,
};

function TableRow({ signal, index, isHovered, onHover, onLeave }: {
  signal: Signal;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <tr
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: isHovered ? tokens.colors.bg.elevated : "transparent",
        cursor: "pointer",
        transition: tokens.transitions.fast,
      }}
    >
      <td style={cellStyle}>
        <Text variant="label" color="muted" style={{ fontSize: "11px" }}>
          {signal.name.toUpperCase()}
        </Text>
      </td>
      <td style={cellStyle}>
        <Stack gap={1}>
          <Text variant="body" color="primary" style={{ fontSize: "14px" }}>
            {signal.example}
          </Text>
          <Text variant="caption" color="secondary" style={{ fontSize: "13px" }}>
            {signal.bridge}
          </Text>
        </Stack>
      </td>
    </tr>
  );
}

function VerticalTab({ label, isActive, onClick }: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: `${tokens.spacing[3]} ${tokens.spacing[5]}`,
        background: isActive ? tokens.colors.bg.elevated : "transparent",
        border: "none",
        borderBottom: isActive ? `2px solid ${tokens.colors.fg.primary}` : "2px solid transparent",
        cursor: "pointer",
        transition: tokens.transitions.default,
        fontFamily: "var(--font-mono), 'IBM Plex Mono', monospace",
        fontSize: "12px",
        letterSpacing: tokens.typography.letterSpacing.wide,
        color: isActive ? tokens.colors.fg.primary : tokens.colors.fg.muted,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = tokens.colors.fg.secondary;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = tokens.colors.fg.muted;
        }
      }}
    >
      {label}
    </button>
  );
}

export function SignalsTable() {
  const [activeVertical, setActiveVertical] = useState<Vertical>("Trucking");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const filteredSignals = useMemo(() => {
    return signals.filter((s) => s.verticals.includes(activeVertical)).slice(0, 6);
  }, [activeVertical]);

  return (
    <div
      style={{
        background: tokens.colors.bg.primary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: `${tokens.spacing[6]} ${tokens.spacing[6]} ${tokens.spacing[4]}`,
          borderBottom: `1px solid ${tokens.colors.border.subtle}`,
        }}
      >
        <Text variant="body" color="muted" style={{ marginBottom: tokens.spacing[6] }}>
          Every vertical has signals. Select yours to see what we detect.
        </Text>

        <div
          style={{
            display: "flex",
            gap: tokens.spacing[1],
            borderBottom: `1px solid ${tokens.colors.border.subtle}`,
            marginLeft: `-${tokens.spacing[2]}`,
          }}
        >
          {verticals.map((vertical) => (
            <VerticalTab
              key={vertical}
              label={vertical}
              isActive={activeVertical === vertical}
              onClick={() => setActiveVertical(vertical)}
            />
          ))}
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.colors.border.default}` }}>
              <th style={{ ...thStyle, width: "180px", textAlign: "left" }}>
                Signal
              </th>
              <th style={{ ...thStyle, textAlign: "left" }}>
                What We See → Why It Matters
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSignals.map((signal, i) => (
              <TableRow
                key={`${signal.name}-${i}`}
                signal={signal}
                index={i}
                isHovered={hoveredRow === i}
                onHover={() => setHoveredRow(i)}
                onLeave={() => setHoveredRow(null)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
          borderTop: `1px solid ${tokens.colors.border.subtle}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text variant="caption" color="muted">
          {filteredSignals.length} signals for {activeVertical}
        </Text>
        <Text variant="caption" color="muted">
          +{signals.filter((s) => s.verticals.includes(activeVertical)).length - filteredSignals.length} more
        </Text>
      </div>
    </div>
  );
}
