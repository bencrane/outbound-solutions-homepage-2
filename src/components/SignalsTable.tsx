"use client";

import { useState } from "react";
import { Text, Stack } from "@/components/ui";
import { tokens } from "@/lib/tokens";

const verticals = [
  "INSURANCE",
  "STAFFING",
  "LENDING",
  "SAAS",
  "RECRUITING",
  "CONSULTING",
] as const;

type Vertical = (typeof verticals)[number];

interface Signal {
  id: string;
  category: string;
  description: string;
  location: string;
  status: "active" | "pending" | "monitoring";
  timestamp: string;
}

const signalsData: Record<Vertical, Signal[]> = {
  INSURANCE: [
    { id: "ins-001", category: "SAFETY", description: "BASIC percentiles improved YoY, top 15% for fleet size", location: "Carrier in IL", status: "active", timestamp: "2m ago" },
    { id: "ins-002", category: "GROWTH", description: "Power unit count up 40%, no coverage update filed", location: "Carrier in MO", status: "active", timestamp: "5m ago" },
    { id: "ins-003", category: "COMPLIANCE", description: "Zero out-of-service orders, 4.2yr authority age", location: "Carrier in OH", status: "pending", timestamp: "12m ago" },
    { id: "ins-004", category: "MONITORING", description: "New authority filed, awaiting inspection history", location: "Carrier in KY", status: "monitoring", timestamp: "18m ago" },
    { id: "ins-005", category: "AUTHORITY", description: "5-year authority milestone, clean crash BASIC", location: "Carrier in WI", status: "active", timestamp: "24m ago" },
    { id: "ins-006", category: "EXPOSURE", description: "Fleet grew from 18 to 31 units, same policy on file", location: "Carrier in IN", status: "pending", timestamp: "31m ago" },
  ],
  STAFFING: [
    { id: "stf-001", category: "HIRING SURGE", description: "47 new job postings this week, up 340% MoM", location: "Tech company in TX", status: "active", timestamp: "1m ago" },
    { id: "stf-002", category: "EXPANSION", description: "Opened 2nd facility, no staffing partner on record", location: "Manufacturer in OH", status: "active", timestamp: "8m ago" },
    { id: "stf-003", category: "TURNOVER", description: "23% turnover rate detected via LinkedIn signals", location: "Distribution center in CA", status: "pending", timestamp: "15m ago" },
    { id: "stf-004", category: "SEASONAL", description: "Q4 seasonal hiring begins, 200+ temp roles needed", location: "Retailer in FL", status: "active", timestamp: "22m ago" },
    { id: "stf-005", category: "SCALING", description: "Series C closed, aggressive hiring roadmap announced", location: "Fintech in NY", status: "active", timestamp: "29m ago" },
  ],
  LENDING: [
    { id: "lnd-001", category: "EQUIPMENT", description: "New DOT filings suggest fleet expansion imminent", location: "Construction firm in AZ", status: "active", timestamp: "3m ago" },
    { id: "lnd-002", category: "GROWTH", description: "Revenue up 60% YoY, current credit line maxed", location: "Logistics company in GA", status: "pending", timestamp: "11m ago" },
    { id: "lnd-003", category: "REAL ESTATE", description: "Lease expiring Q2, expansion signals detected", location: "Medical practice in CO", status: "active", timestamp: "19m ago" },
    { id: "lnd-004", category: "REFINANCE", description: "18mo into high-rate loan, credit score improved", location: "Trucking company in PA", status: "pending", timestamp: "27m ago" },
    { id: "lnd-005", category: "WORKING CAPITAL", description: "Invoice aging increased 15 days, cash flow strain", location: "Manufacturing in MI", status: "monitoring", timestamp: "34m ago" },
  ],
  SAAS: [
    { id: "sas-001", category: "TECH STACK", description: "Legacy ERP detected, contract renewal Q3", location: "Mid-market retailer in WA", status: "active", timestamp: "2m ago" },
    { id: "sas-002", category: "FUNDING", description: "Closed Series B last month, scaling ops team", location: "Startup in NY", status: "active", timestamp: "9m ago" },
    { id: "sas-003", category: "GROWTH", description: "4x GMV growth, current tooling won't scale", location: "E-commerce brand in TX", status: "pending", timestamp: "16m ago" },
    { id: "sas-004", category: "MIGRATION", description: "Cloud migration initiative announced publicly", location: "Healthcare org in MA", status: "active", timestamp: "23m ago" },
    { id: "sas-005", category: "INTEGRATION", description: "Acquired competitor, tech stack consolidation needed", location: "Fintech in CA", status: "active", timestamp: "30m ago" },
  ],
  RECRUITING: [
    { id: "rec-001", category: "EXECUTIVE", description: "CEO departure announced, C-suite search likely", location: "PE-backed firm in IL", status: "active", timestamp: "4m ago" },
    { id: "rec-002", category: "TECHNICAL", description: "12 senior eng roles open for 60+ days", location: "Fintech in CA", status: "active", timestamp: "12m ago" },
    { id: "rec-003", category: "SCALING", description: "3 new enterprise clients announced, team undersized", location: "Agency in NY", status: "pending", timestamp: "20m ago" },
    { id: "rec-004", category: "LEADERSHIP", description: "VP Sales departed, internal promotion unlikely", location: "Manufacturer in MI", status: "active", timestamp: "28m ago" },
    { id: "rec-005", category: "BOARD", description: "New board member with operational focus added", location: "SaaS company in CO", status: "monitoring", timestamp: "35m ago" },
  ],
  CONSULTING: [
    { id: "con-001", category: "TRANSFORMATION", description: "Digital transformation announced, no partner selected", location: "Bank in NC", status: "active", timestamp: "1m ago" },
    { id: "con-002", category: "COMPLIANCE", description: "New regulations effective Q2, gap analysis needed", location: "Healthcare system in FL", status: "active", timestamp: "7m ago" },
    { id: "con-003", category: "M&A", description: "Integration challenges post-acquisition evident", location: "PE portfolio co in TX", status: "pending", timestamp: "14m ago" },
    { id: "con-004", category: "STRATEGY", description: "New CEO, strategic review initiated", location: "Retailer in OR", status: "active", timestamp: "21m ago" },
    { id: "con-005", category: "OPERATIONS", description: "Supply chain disruption, process overhaul needed", location: "Manufacturer in OH", status: "active", timestamp: "28m ago" },
  ],
};

const statusColors: Record<Signal["status"], string> = {
  active: tokens.colors.accent.success,
  pending: tokens.colors.accent.warning,
  monitoring: tokens.colors.fg.muted,
};

const statusLabels: Record<Signal["status"], string> = {
  active: "ACTIVE",
  pending: "PENDING",
  monitoring: "MONITORING",
};

function StatusIndicator({ status }: { status: Signal["status"] }) {
  return (
    <Stack direction="horizontal" gap={2} align="center">
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: statusColors[status],
          boxShadow: status === "active" ? `0 0 8px ${statusColors[status]}` : "none",
        }}
      />
      <Text variant="label" style={{ color: statusColors[status], fontSize: "11px" }}>
        {statusLabels[status]}
      </Text>
    </Stack>
  );
}

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

function TableRow({ signal, isHovered, onHover, onLeave }: {
  signal: Signal;
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
          {signal.category}
        </Text>
      </td>
      <td style={cellStyle}>
        <Stack gap={1}>
          <Text variant="body" color="primary" style={{ fontSize: "14px" }}>
            {signal.location}
          </Text>
          <Text variant="caption" color="secondary" style={{ fontSize: "13px" }}>
            {signal.description}
          </Text>
        </Stack>
      </td>
      <td style={{ ...cellStyle, textAlign: "right" }}>
        <Text variant="caption" color="muted" style={{ fontSize: "12px" }}>
          {signal.timestamp}
        </Text>
      </td>
      <td style={{ ...cellStyle, textAlign: "right" }}>
        <StatusIndicator status={signal.status} />
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
  const [activeVertical, setActiveVertical] = useState<Vertical>("INSURANCE");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const signals = signalsData[activeVertical];

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
          Select a vertical to see the signals our systems surface.
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
              <th style={{ ...thStyle, width: "140px", textAlign: "left" }}>
                Signal Type
              </th>
              <th style={{ ...thStyle, textAlign: "left" }}>
                Details
              </th>
              <th style={{ ...thStyle, width: "100px", textAlign: "right" }}>
                Time
              </th>
              <th style={{ ...thStyle, width: "120px", textAlign: "right" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {signals.map((signal) => (
              <TableRow
                key={signal.id}
                signal={signal}
                isHovered={hoveredRow === signal.id}
                onHover={() => setHoveredRow(signal.id)}
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
          Showing {signals.length} signals for {activeVertical.toLowerCase()}
        </Text>
        <Text variant="caption" color="muted" style={{ display: "flex", alignItems: "center", gap: tokens.spacing[2] }}>
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: tokens.colors.accent.success,
              animation: "pulse 2s infinite",
            }}
          />
          Live updates
        </Text>
      </div>
    </div>
  );
}
