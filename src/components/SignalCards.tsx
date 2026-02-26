"use client";

import { useRef } from "react";
import { tokens } from "@/lib/tokens";
import { Text, Card } from "@/components/ui";

interface Signal {
  name: string;
  description: string;
  example: string;
  source: string;
  verticals: string[];
}

const signals: Signal[] = [
  {
    name: "Growth Without Coverage",
    description: "Fleet expansion outpacing insurance and compliance updates — a gap that creates urgency.",
    example: "Carrier in MO — power units up 40%, no coverage update filed in 14 months",
    source: "FMCSA",
    verticals: ["Insurance", "Staffing", "Lending"],
  },
  {
    name: "Compliance Failure",
    description: "Safety scores degrading or violations accumulating — signals operational stress.",
    example: "OH carrier BASIC scores crossed threshold, 3 violations in 60 days",
    source: "FMCSA",
    verticals: ["Insurance", "Staffing", "Consulting"],
  },
  {
    name: "Hiring Surge",
    description: "Rapid headcount growth indicates expansion mode and new vendor needs.",
    example: "TX logistics company posted 12 driver roles in 2 weeks, up from 0",
    source: "Job Boards",
    verticals: ["Staffing", "Insurance", "SaaS"],
  },
  {
    name: "Driver Attrition",
    description: "Headcount drops signal churn problems — often preceding coverage gaps or staffing needs.",
    example: "FL carrier driver count down 18% in 90 days, no fleet reduction filed",
    source: "FMCSA",
    verticals: ["Staffing", "Recruiting", "Insurance"],
  },
  {
    name: "Authority Milestone",
    description: "New operating authority or interstate expansion — a company ready to scale.",
    example: "New authority filed in 3 states (CA, AZ, NV) — first interstate expansion",
    source: "FMCSA",
    verticals: ["Insurance", "Lending", "Consulting"],
  },
  {
    name: "Permit Volume Spike",
    description: "Unusual permit activity suggests new routes, contracts, or operational changes.",
    example: "Carrier pulled 47 trip permits in March vs. 12 avg — new contract likely",
    source: "State DOT",
    verticals: ["Insurance", "Lending", "SaaS"],
  },
];

function SourceBadge({ source }: { source: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: tokens.spacing[2], flexShrink: 0 }}>
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: tokens.colors.accent.success,
          opacity: 0.8,
        }}
      />
      <Text
        variant="label"
        color="muted"
        as="span"
        style={{ fontSize: "10px", letterSpacing: "0.05em" }}
      >
        {source}
      </Text>
    </div>
  );
}

function VerticalTag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: "10px",
        fontFamily: tokens.typography.fonts.mono,
        color: tokens.colors.fg.muted,
        background: tokens.colors.bg.elevated,
        padding: `${tokens.spacing[1]} ${tokens.spacing[3]}`,
        borderRadius: tokens.radii.full,
        border: `1px solid ${tokens.colors.border.subtle}`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function SignalCard({ signal }: { signal: Signal }) {
  return (
    <Card
      padding="none"
      style={{
        minWidth: 340,
        maxWidth: 340,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: tokens.spacing[6],
          display: "flex",
          flexDirection: "column",
          gap: tokens.spacing[4],
          flex: 1,
        }}
      >
        {/* Header: name + source */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: tokens.spacing[3] }}>
          <Text variant="title" as="h3" style={{ fontSize: "16px", margin: 0 }}>
            {signal.name}
          </Text>
          <SourceBadge source={signal.source} />
        </div>

        {/* Description */}
        <Text variant="body" color="secondary" style={{ fontSize: "13px", lineHeight: 1.5 }}>
          {signal.description}
        </Text>

        {/* Example quote */}
        <div
          style={{
            background: tokens.colors.bg.primary,
            border: `1px solid ${tokens.colors.border.subtle}`,
            borderRadius: tokens.radii.md,
            padding: tokens.spacing[4],
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Text
            variant="caption"
            color="secondary"
            as="span"
            style={{ fontSize: "12px", fontFamily: tokens.typography.fonts.mono }}
          >
            {signal.example}
          </Text>
        </div>

        {/* Vertical tags */}
        <div style={{ display: "flex", gap: tokens.spacing[2], flexWrap: "wrap" }}>
          {signal.verticals.map((v) => (
            <VerticalTag key={v} label={v} />
          ))}
        </div>
      </div>
    </Card>
  );
}

export function SignalCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: tokens.spacing[4],
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingBottom: tokens.spacing[2],
        }}
      >
        {signals.map((signal) => (
          <div key={signal.name} style={{ scrollSnapAlign: "start", display: "flex" }}>
            <SignalCard signal={signal} />
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      {(["left", "right"] as const).map((dir) => (
        <button
          key={dir}
          onClick={() => scroll(dir)}
          style={{
            position: "absolute",
            [dir === "left" ? "left" : "right"]: -20,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: tokens.colors.bg.elevated,
            border: `1px solid ${tokens.colors.border.default}`,
            color: tokens.colors.fg.secondary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          {dir === "left" ? "←" : "→"}
        </button>
      ))}

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
