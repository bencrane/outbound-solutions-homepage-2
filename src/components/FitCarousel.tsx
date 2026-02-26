"use client";

import { useState } from "react";
import { Text, Stack, Card } from "@/components/ui";
import { tokens } from "@/lib/tokens";

const icons = {
  revenue: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  ),
  team: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M17 14a4 4 0 014 4v2" />
    </svg>
  ),
  b2b: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="8" y="14" width="8" height="7" rx="1" />
      <path d="M6.5 10v4M17.5 10v4M12 10v4" />
    </svg>
  ),
  cycle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 12a9 9 0 11-9-9" />
      <path d="M21 3v6h-6" />
    </svg>
  ),
  committee: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </svg>
  ),
  acv: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5" />
    </svg>
  ),
};

const criteria = [
  { label: "$3M+ revenue", description: "You're past the figuring-it-out phase. You know what works — you need more of it.", icon: icons.revenue },
  { label: "5+ on the sales team", description: "You've already hired for growth. Now you need pipeline to match.", icon: icons.team },
  { label: "B2B", description: "Consumer brands, we can't help you. Nothing personal — it's a different game.", icon: icons.b2b },
  { label: "Complex sales cycle", description: "Your deals don't close on a demo. They close after multiple touches.", icon: icons.cycle },
  { label: "Multiple decision-makers", description: "Nobody signs off alone. You need to reach the whole buying committee.", icon: icons.committee },
  { label: "$30K+ ACV", description: "You don't discount to close. Your product is worth the price.", icon: icons.acv },
];

function ArrowButton({ direction, onClick, disabled }: { direction: "left" | "right"; onClick: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: `1px solid ${tokens.colors.border.default}`,
        background: tokens.colors.bg.elevated,
        color: disabled ? tokens.colors.fg.muted : tokens.colors.fg.primary,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s ease",
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
        {direction === "left" ? (
          <path d="M10 12L6 8L10 4" />
        ) : (
          <path d="M6 12L10 8L6 4" />
        )}
      </svg>
    </button>
  );
}

export function FitCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const cardWidth = 360;
  const gap = 16;

  const canGoLeft = startIndex > 0;
  const canGoRight = startIndex < criteria.length - visibleCount;

  const goLeft = () => {
    if (canGoLeft) setStartIndex(startIndex - 1);
  };

  const goRight = () => {
    if (canGoRight) setStartIndex(startIndex + 1);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: tokens.spacing[4] }}>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            transform: `translateX(-${startIndex * (cardWidth + gap)}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          {criteria.map((item) => (
            <div
              key={item.label}
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
              }}
            >
              <Card padding="md" style={{ height: "100%" }}>
                <Stack gap={3} align="center" style={{ textAlign: "center" }}>
                  <div style={{ color: tokens.colors.fg.muted }}>{item.icon}</div>
                  <Text variant="title" as="div" style={{ fontSize: "16px" }}>{item.label}</Text>
                  <Text variant="body" color="muted" style={{ fontSize: "13px", fontStyle: "italic" }}>
                    {item.description}
                  </Text>
                </Stack>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: tokens.spacing[3] }}>
        <ArrowButton direction="left" onClick={goLeft} disabled={!canGoLeft} />
        <ArrowButton direction="right" onClick={goRight} disabled={!canGoRight} />
      </div>
    </div>
  );
}
