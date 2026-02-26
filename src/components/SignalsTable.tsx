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
  padding: `${tokens.spacing[5]} ${tokens.spacing[6]}`,
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

// Generate a pseudo-random timestamp based on signal name and vertical
function getTimestamp(signalName: string, vertical: string): string {
  const timestamps = ["12m ago", "34m ago", "1h ago", "2h ago", "4h ago", "6h ago", "Yesterday", "2d ago", "3d ago"];
  // Simple hash to get consistent but different values per signal+vertical combo
  const hash = (signalName + vertical).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return timestamps[hash % timestamps.length];
}

function TableRow({ signal, index, isHovered, onHover, onLeave, vertical }: {
  signal: Signal;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  vertical: string;
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
        <Stack direction="horizontal" gap={2} align="center">
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: tokens.colors.accent.success,
              boxShadow: `0 0 6px ${tokens.colors.accent.success}`,
              flexShrink: 0,
            }}
          />
          <Text variant="label" color="muted" style={{ fontSize: "11px" }}>
            {signal.name.toUpperCase()}
          </Text>
        </Stack>
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
      <td style={{ ...cellStyle, textAlign: "right", width: "100px" }}>
        <Text variant="caption" color="muted" style={{ fontSize: "12px", fontFamily: tokens.typography.fonts.mono }}>
          {getTimestamp(signal.name, vertical)}
        </Text>
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
    <div>
      {/* Vertical tabs with LIVE indicator */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: tokens.spacing[4],
        }}
      >
        <div style={{ display: "flex", gap: tokens.spacing[1] }}>
          {verticals.map((vertical) => (
            <VerticalTab
              key={vertical}
              label={vertical}
              isActive={activeVertical === vertical}
              onClick={() => setActiveVertical(vertical)}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: tokens.spacing[2],
            padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
            background: `${tokens.colors.accent.success}15`,
            borderRadius: tokens.radii.md,
            border: `1px solid ${tokens.colors.accent.success}30`,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: tokens.colors.accent.success,
              boxShadow: `0 0 8px ${tokens.colors.accent.success}`,
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: tokens.typography.fonts.mono,
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: tokens.colors.accent.success,
            }}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* Table container */}
      <div
        style={{
          background: tokens.colors.bg.primary,
          border: `1px solid ${tokens.colors.border.subtle}`,
          borderRadius: tokens.radii.lg,
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.colors.border.default}` }}>
              <th style={{ ...thStyle, width: "200px", textAlign: "left" }}>
                Signal
              </th>
              <th style={{ ...thStyle, textAlign: "left" }}>
                What We See → Why It Matters
              </th>
              <th style={{ ...thStyle, width: "100px", textAlign: "right" }}>
                Detected
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
                vertical={activeVertical}
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
    </div>
  );
}
