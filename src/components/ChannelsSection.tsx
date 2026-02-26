"use client";

import { useState } from "react";
import { tokens } from "@/lib/tokens";
import { Text, Stack, Divider } from "@/components/ui";

const channels = [
  {
    id: "mail",
    label: "Mail",
    title: "Programmatic Direct Mail",
    description:
      "Every piece is generated from signal data — variable text, personalized URLs, QR codes that route to custom landing pages. Delivery confirmation and scan analytics tracked back to each recipient.",
    tags: ["VARIABLE DATA", "PERSONALIZED URLS", "QR TRACKING", "DELIVERY ANALYTICS", "SIGNAL-TRIGGERED"],
  },
  {
    id: "email",
    label: "Email",
    title: "Isolated Sending Infrastructure",
    description:
      "Single-tenant email clusters with dedicated IPs. Your deliverability is never affected by another engagement. Full authentication, ongoing warmup, and real-time inbox monitoring.",
    tags: ["DEDICATED IPS", "SINGLE-TENANT", "SPF/DKIM/DMARC", "WARMUP", "INBOX MONITORING"],
  },
  {
    id: "social",
    label: "Social",
    title: "Automated LinkedIn Sequences",
    description:
      "Connection requests, messages, and follow-ups sequenced with conditional logic. Which message fires depends on profile data, response behavior, and signal type. Activity synced to your CRM.",
    tags: ["AUTOMATED SEQUENCES", "CONDITIONAL BRANCHING", "PROFILE TARGETING", "CRM SYNC"],
  },
];

export function ChannelsSection() {
  const [activeChannel, setActiveChannel] = useState(channels[0].id);
  const channel = channels.find((c) => c.id === activeChannel)!;

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: `${tokens.spacing[16]} ${tokens.spacing[8]}`,
      }}
    >
      {/* Section header */}
      <Stack gap={3} style={{ marginBottom: tokens.spacing[10] }}>
        <Stack direction="horizontal" gap={4} align="center">
          <Divider orientation="horizontal" length="48px" color="default" />
          <Text variant="label" color="muted">THE CHANNELS</Text>
        </Stack>
        <Text variant="headline" as="h2" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          We reach them when it matters.
        </Text>
        <Text variant="body" color="secondary" style={{ fontSize: "15px", maxWidth: "560px" }}>
          Each channel is infrastructure we&apos;ve built — not tools we use. Signal data flows through, personalized messages flow out.
        </Text>
      </Stack>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: tokens.spacing[6],
          background: tokens.colors.bg.secondary,
          padding: "4px",
          borderRadius: tokens.radii.lg,
          width: "fit-content",
        }}
      >
        {channels.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveChannel(c.id)}
            style={{
              fontFamily: tokens.typography.fonts.mono,
              fontSize: "13px",
              fontWeight: 500,
              padding: "12px 28px",
              borderRadius: tokens.radii.md,
              border: "none",
              background: activeChannel === c.id ? tokens.colors.bg.elevated : "transparent",
              color: activeChannel === c.id ? tokens.colors.fg.primary : tokens.colors.fg.muted,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div
        style={{
          background: tokens.colors.bg.secondary,
          border: `1px solid ${tokens.colors.border.subtle}`,
          borderRadius: tokens.radii.lg,
          padding: "48px",
          minHeight: "320px",
        }}
      >
        {/* Number */}
        <Text
          variant="label"
          color="muted"
          as="div"
          style={{
            fontSize: "13px",
            marginBottom: tokens.spacing[4],
            fontFamily: tokens.typography.fonts.mono,
          }}
        >
          {String(channels.findIndex((c) => c.id === activeChannel) + 1).padStart(2, "0")}
        </Text>

        {/* Title */}
        <Text
          variant="headline"
          as="h3"
          style={{
            fontSize: "28px",
            marginBottom: tokens.spacing[5],
          }}
        >
          {channel.title}
        </Text>

        {/* Description */}
        <Text
          variant="body"
          color="secondary"
          as="p"
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "640px",
            marginBottom: tokens.spacing[8],
          }}
        >
          {channel.description}
        </Text>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {channel.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: tokens.typography.fonts.mono,
                fontSize: "11px",
                letterSpacing: "0.05em",
                padding: "8px 14px",
                borderRadius: tokens.radii.md,
                border: `1px solid ${tokens.colors.border.subtle}`,
                background: tokens.colors.bg.elevated,
                color: tokens.colors.fg.muted,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
