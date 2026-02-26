"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { tokens } from "@/lib/tokens";
import { Text, Card } from "@/components/ui";
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
        {/* Signal name — small uppercase label */}
        <Text
          variant="label"
          color="muted"
          as="div"
          style={{ fontSize: "10px", letterSpacing: "0.08em" }}
        >
          {signal.name}
        </Text>

        {/* Example — main headline, largest text */}
        <Text
          variant="body"
          as="div"
          style={{
            fontSize: "15px",
            lineHeight: 1.45,
            fontWeight: 500,
            color: tokens.colors.fg.primary,
            flex: 1,
          }}
        >
          {signal.example}
        </Text>

        {/* Divider + bridge */}
        <div>
          <div
            style={{
              height: 1,
              background: tokens.colors.border.subtle,
              marginBottom: tokens.spacing[3],
            }}
          />
          <Text
            variant="caption"
            color="secondary"
            as="div"
            style={{ fontSize: "12px", lineHeight: 1.4 }}
          >
            {signal.bridge}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export function SignalCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVertical, setActiveVertical] = useState<string>(verticals[0]);

  const filtered = useMemo(() => {
    return signals.filter((s) => s.verticals.includes(activeVertical));
  }, [activeVertical]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0 });
    }
  }, [activeVertical]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Filter row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginBottom: tokens.spacing[6],
          flexWrap: "wrap",
        }}
      >
        <Text
          variant="caption"
          color="muted"
          as="span"
          style={{ fontSize: "12px", flexShrink: 0 }}
        >
          Selling to:
        </Text>
        {verticals.map((v) => (
          <button
            key={v}
            onClick={() => setActiveVertical(v)}
            style={{
              fontFamily: tokens.typography.fonts.mono,
              fontSize: "11px",
              padding: "5px 14px",
              borderRadius: tokens.radii.full,
              border: `1px solid ${activeVertical === v ? tokens.colors.border.strong : tokens.colors.border.subtle}`,
              background: activeVertical === v ? tokens.colors.bg.elevated : "transparent",
              color: activeVertical === v ? tokens.colors.fg.primary : tokens.colors.fg.muted,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Cards carousel */}
      <div style={{ position: "relative", margin: "0 -24px", padding: "0 24px" }}>
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
          {filtered.map((signal, i) => (
            <div key={`${signal.name}-${i}`} style={{ scrollSnapAlign: "start", display: "flex" }}>
              <SignalCard signal={signal} />
            </div>
          ))}
        </div>

        {filtered.length > 3 && (
          <>
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                style={{
                  position: "absolute",
                  [dir === "left" ? "left" : "right"]: 0,
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
          </>
        )}

        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
      </div>
    </div>
  );
}
