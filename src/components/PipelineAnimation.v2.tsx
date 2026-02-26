"use client";

import { useEffect, useState } from "react";
import { tokens } from "@/lib/tokens";
import { Text } from "@/components/ui";

const examples = [
  { signal: "Fleet grew from 18 → 31 units", output: "Coverage gap identified" },
  { signal: "BASIC scores improved YoY", output: "Renewal timing optimized" },
  { signal: "New authority filed in 3 states", output: "Expansion opportunity flagged" },
  { signal: "Driver count down 12 in 60 days", output: "Staffing need detected" },
];

export function PipelineAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<"signal" | "processing" | "output">("signal");

  useEffect(() => {
    const phases: Array<"signal" | "processing" | "output"> = ["signal", "processing", "output"];
    let phaseIndex = 0;

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex >= phases.length) {
        phaseIndex = 0;
        setCurrentIndex((prev) => (prev + 1) % examples.length);
      }
      setPhase(phases[phaseIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const current = examples[currentIndex];

  return (
    <div
      style={{
        background: tokens.colors.bg.secondary,
        border: `1px solid ${tokens.colors.border.subtle}`,
        borderRadius: tokens.radii.lg,
        padding: tokens.spacing[10],
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* The transformation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: tokens.spacing[6],
        }}
      >
        {/* Signal side */}
        <div
          style={{
            flex: 1,
            padding: tokens.spacing[6],
            background: phase === "signal" ? "rgba(74, 140, 111, 0.06)" : tokens.colors.bg.primary,
            border: `1px solid ${phase === "signal" ? "rgba(74, 140, 111, 0.2)" : tokens.colors.border.subtle}`,
            borderRadius: tokens.radii.md,
            transition: "all 0.5s ease",
          }}
        >
          <Text variant="label" color="muted" style={{ fontSize: "9px", marginBottom: tokens.spacing[3] }}>
            SIGNAL DETECTED
          </Text>
          <Text
            variant="body"
            color={phase === "signal" ? "primary" : "muted"}
            style={{
              fontSize: "14px",
              transition: "color 0.5s ease",
            }}
          >
            {current.signal}
          </Text>
        </div>

        {/* Arrow / Processing indicator */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: tokens.spacing[2],
            minWidth: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: phase === "processing" ? "#4a8c6f" : tokens.colors.border.default,
                  transition: "background 0.3s ease",
                  transitionDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
          <Text variant="label" color="muted" style={{ fontSize: "8px" }}>
            {phase === "processing" ? "PROCESSING" : ""}
          </Text>
        </div>

        {/* Output side */}
        <div
          style={{
            flex: 1,
            padding: tokens.spacing[6],
            background: phase === "output" ? "rgba(74, 140, 111, 0.06)" : tokens.colors.bg.primary,
            border: `1px solid ${phase === "output" ? "rgba(74, 140, 111, 0.2)" : tokens.colors.border.subtle}`,
            borderRadius: tokens.radii.md,
            transition: "all 0.5s ease",
          }}
        >
          <Text variant="label" color="muted" style={{ fontSize: "9px", marginBottom: tokens.spacing[3] }}>
            ACTION TRIGGERED
          </Text>
          <Text
            variant="body"
            color={phase === "output" ? "primary" : "muted"}
            style={{
              fontSize: "14px",
              transition: "color 0.5s ease",
            }}
          >
            {current.output}
          </Text>
        </div>
      </div>

      {/* Dots indicator for which example */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: tokens.spacing[2],
          marginTop: tokens.spacing[8],
        }}
      >
        {examples.map((_, i) => (
          <div
            key={i}
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: i === currentIndex ? "#4a8c6f" : tokens.colors.border.default,
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
