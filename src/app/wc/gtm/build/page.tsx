"use client";

import { useState } from "react";

const industries = [
  "Food and Beverage Services",
  "General Manufacturing",
  "Retail Apparel and Fashion",
  "Hospitality",
  "Personal Care Product Manufacturing",
  "Wellness and Fitness Services",
  "Appliances, Electrical, and Electronics Manufacturing",
  "General Retail",
  "Hospitals and Health Care",
  "Restaurants"
];

const phases = [
  {
    num: "01",
    title: "Build TAM Company Dataset",
    steps: [
      {
        label: "Enrich Existing Customers",
        detail: "Every company in the customer database gets enriched for firmographics — employee count, funding, industry classification, location count, revenue signals."
      },
      {
        label: "Pull Full Industry Universe",
        detail: "The customer base spans 10+ LinkedIn industries. Industry self-reporting is unreliable — the same company can appear under completely different categories depending on how they set up their profile. The full universe gets pulled across all relevant categories."
      },
      {
        label: "Calibrate Scoring Prompt",
        detail: "AI classification prompt built against existing customers. Validated to >85% accuracy — if it correctly identifies current customers as fits, it finds new ones."
      },
      {
        label: "Score Full Market",
        detail: "Prompt runs against the full company universe. Surfaces companies with complex insurance needs. This filter determines which companies proceed to enrichment."
      }
    ]
  },
  {
    num: "02",
    title: "Build Contacts List",
    steps: [
      {
        label: "ICP Contact Discovery",
        detail: "Every person in the target roles at every qualified company. Verified work email, mobile, LinkedIn URL, personal email."
      },
      {
        label: "Alumni Overlap Mapping",
        detail: "Contacts who previously worked at current customers. Built-in brand familiarity — warm entry points at new companies."
      }
    ]
  },
  {
    num: "03",
    title: "Enrich Companies",
    themes: [
      {
        name: "Card Transaction Intelligence",
        source: "Enigma — 40% of US consumer card transactions",
        points: [
          "Card Revenue (1m, 3m, 12m averages)",
          "Transaction Volume (monthly counts)",
          "Revenue Growth (YoY)",
          "Transaction Stability",
          "Customer Count (avg daily unique)",
          "Refund Volume",
          "Avg Transaction Size",
        ],
        derived: [
          "Peak revenue month",
          "Seasonality pattern",
          "Revenue acceleration / deceleration",
          "Refund rate trending",
          "Transaction size trends"
        ]
      },
      {
        name: "Location Intelligence",
        source: "Included in base enrichment",
        points: ["Total business locations (current count)"],
        derived: []
      },
      {
        name: "Hiring Intelligence",
        source: "TheirStack — job postings across all major boards",
        points: [
          "Job postings 6–3 months ago (warehouse, driver, delivery, retail, store manager)",
          "Job postings 3 months – present (same roles)",
        ],
        derived: ["Hiring velocity — ratio of recent to historical window"]
      }
    ]
  },
  {
    num: "04",
    title: "Enrich People",
    steps: [
      {
        label: "Core Contact Data",
        detail: "Verified work email, mobile phone, LinkedIn URL, personal email for every ICP contact."
      },
      {
        label: "Alumni Detection",
        detail: "Flag every contact who previously worked at a current customer."
      }
    ]
  },
  {
    num: "05",
    title: "Crisis Scoring Model",
    isScoring: true
  },
  {
    num: "06",
    title: "Unify Dataset",
    steps: [
      {
        label: "Single Queryable Database",
        detail: "All enrichment data, contact data, alumni overlaps, and scores merged into one system."
      }
    ]
  },
  {
    num: "07",
    title: "GTM Brief",
    steps: [
      {
        label: "Tier-Mapped Outreach",
        detail: "Each urgency tier maps to outreach sequences, messaging angles, and timing."
      }
    ]
  }
];

const crisisSignals = [
  {
    signal: "Revenue Deceleration",
    meaning: "Growth slowing quarter-over-quarter. Company starts cutting costs — insurance is neglected first. Coverage gaps emerge.",
    inputs: ["Card Revenue (1m, 3m, 12m)", "Growth velocity (MoM trend)", "Revenue acceleration rate"]
  },
  {
    signal: "Refund Rate Spiking",
    meaning: "Product quality or fulfillment breakdown. Leading indicator of product liability claims, recalls, lawsuits.",
    inputs: ["Refund volume", "Card Revenue", "Refund rate = refunds ÷ revenue", "3-month trend"]
  },
  {
    signal: "Transaction Size Declining",
    meaning: "Discounting to maintain volume. Margin compression signals financial distress — likely underinsured or shopping for cheaper coverage.",
    inputs: ["Card Revenue ÷ Transaction Count", "Transaction size trend over time"]
  },
  {
    signal: "Approaching Peak Month",
    meaning: "Within 60–90 days of highest annual exposure period with potentially stale coverage. Maximum risk, minimum protection.",
    inputs: ["Card Revenue time series (monthly, back to 2017)", "Peak month identification", "Current date proximity"]
  },
  {
    signal: "Rapid Growth + No Risk Hire",
    meaning: "Scaling fast without mature operations. Day-one policies haven't been updated for 10x the revenue and headcount.",
    inputs: ["Revenue acceleration", "Hiring velocity (>1 = accelerating)", "Absence of risk/legal/compliance postings"]
  }
];

const tiers = [
  { name: "CRITICAL", signals: "3+", color: "#4ade80", action: "Immediate outreach — highest conversion probability" },
  { name: "HIGH", signals: "2", color: "#F59E0B", action: "Priority outreach — strong engagement angle" },
  { name: "MONITOR", signals: "1", color: "#6366F1", action: "Nurture sequence — watch for additional signals" },
  { name: "STABLE", signals: "0", color: "#4B5563", action: "Standard prospecting — no urgency trigger" },
];

export default function WithCoverageScope() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [expandedSignal, setExpandedSignal] = useState<number | null>(null);

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: "#09090B",
      minHeight: "100vh",
      color: "#E4E4E7"
    }}>
      {/* Header */}
      <div style={{ padding: "56px 48px 44px", borderBottom: "1px solid #1C1C22" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#52525B",
            marginBottom: 20
          }}>
            GTM Intelligence
          </div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 600,
            margin: "0 0 10px",
            lineHeight: 1.2,
            color: "#FAFAFA",
            letterSpacing: -0.5
          }}>
            Data Product Build
          </h1>
          <p style={{
            fontSize: 15,
            color: "#71717A",
            margin: 0,
            lineHeight: 1.6
          }}>
            Crisis-scored prospect database. Enriched contacts. Playbooks per urgency tier.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 48px 64px" }}>

        {/* Industries */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#3F3F46",
            marginBottom: 6
          }}>
            Target Industries
          </div>
          <div style={{ fontSize: 13, color: "#52525B", marginBottom: 16 }}>
            ~50,000 companies in the United States, 51+ employees
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {industries.map((ind, i) => (
              <div key={i} style={{
                background: "#18181B",
                border: "1px solid #27272A",
                borderRadius: 4,
                padding: "5px 12px",
                fontSize: 12,
                color: "#A1A1AA"
              }}>{ind}</div>
            ))}
          </div>
        </div>

        {/* Core thesis */}
        <div style={{
          borderLeft: "2px solid #4ade80",
          paddingLeft: 20,
          marginBottom: 56,
          fontSize: 15,
          lineHeight: 1.7,
          color: "#A1A1AA"
        }}>
          The best prospects are companies whose risk profile changed but their coverage didn&apos;t.
          Identified by stacking transaction, hiring, and operational signals into a composite score.
        </div>

        {/* Phases */}
        <div style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#3F3F46",
          marginBottom: 20
        }}>
          Process
        </div>

        {phases.map((phase, i) => (
          <div key={i} style={{
            borderBottom: "1px solid #18181B"
          }}>
            {phase.isScoring ? (
              <div
                onClick={() => {
                  const el = document.getElementById("crisis-scoring");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ padding: "20px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#3F3F46",
                  fontFamily: "monospace",
                  minWidth: 32
                }}>{phase.num}</div>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#FAFAFA" }}>{phase.title}</div>
              </div>
            ) : (
              <>
                <div
                  onClick={() => setExpandedPhase(expandedPhase === i ? null : i)}
                  style={{
                    padding: "20px 0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 16
                  }}
                >
                  <div style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#3F3F46",
                    fontFamily: "monospace",
                    minWidth: 32
                  }}>{phase.num}</div>
                  <div style={{ flex: 1, fontSize: 16, fontWeight: 500, color: "#FAFAFA" }}>{phase.title}</div>
                  <div style={{
                    fontSize: 14,
                    color: "#3F3F46",
                    transform: expandedPhase === i ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.15s"
                  }}>→</div>
                </div>

                {expandedPhase === i && (
                  <div style={{ paddingLeft: 48, paddingBottom: 24 }}>
                    {phase.steps && phase.steps.map((step, j) => (
                      <div key={j} style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#D4D4D8", marginBottom: 4 }}>{step.label}</div>
                        <div style={{ fontSize: 13, color: "#71717A", lineHeight: 1.6 }}>{step.detail}</div>
                      </div>
                    ))}
                    {phase.themes && phase.themes.map((theme, j) => (
                      <div key={j} style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#D4D4D8", marginBottom: 2 }}>{theme.name}</div>
                        <div style={{ fontSize: 11, color: "#52525B", marginBottom: 10 }}>{theme.source}</div>
                        <div style={{ marginBottom: 8 }}>
                          {theme.points.map((p, k) => (
                            <div key={k} style={{
                              fontSize: 12,
                              color: "#A1A1AA",
                              padding: "3px 0",
                              paddingLeft: 12,
                              borderLeft: "1px solid #27272A"
                            }}>{p}</div>
                          ))}
                        </div>
                        {theme.derived.length > 0 && (
                          <div style={{ fontSize: 12, color: "#52525B", paddingLeft: 12 }}>
                            <span style={{ color: "#71717A" }}>Derived: </span>
                            {theme.derived.join(" · ")}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* Crisis Scoring */}
        <div id="crisis-scoring" style={{ marginTop: 56, marginBottom: 48 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#3F3F46",
            marginBottom: 8
          }}>
            Crisis Scoring Model
          </div>
          <div style={{
            fontSize: 14,
            color: "#52525B",
            marginBottom: 32,
            lineHeight: 1.6
          }}>
            Five urgency signals derived from existential data points. Each identifies a company in an active pain window — their risk profile shifted but their coverage didn&apos;t. Signals stack.
          </div>

          {crisisSignals.map((s, i) => (
            <div key={i} style={{ borderBottom: "1px solid #18181B" }}>
              <div
                onClick={() => setExpandedSignal(expandedSignal === i ? null : i)}
                style={{
                  padding: "16px 0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16
                }}
              >
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#4ade80",
                  fontFamily: "monospace",
                  minWidth: 20,
                  marginTop: 2
                }}>{String(i + 1).padStart(2, "0")}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 500, color: "#FAFAFA" }}>{s.signal}</div>
                </div>
                <div style={{
                  fontSize: 14,
                  color: "#3F3F46",
                  transform: expandedSignal === i ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.15s"
                }}>→</div>
              </div>
              {expandedSignal === i && (
                <div style={{ paddingLeft: 36, paddingBottom: 20 }}>
                  <div style={{
                    fontSize: 13,
                    color: "#A1A1AA",
                    lineHeight: 1.7,
                    marginBottom: 14
                  }}>{s.meaning}</div>
                  <div style={{ fontSize: 12, color: "#52525B" }}>
                    {s.inputs.map((inp, j) => (
                      <div key={j} style={{
                        padding: "3px 0",
                        paddingLeft: 12,
                        borderLeft: "1px solid #27272A"
                      }}>{inp}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tiers */}
        <div style={{ marginBottom: 56 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#3F3F46",
            marginBottom: 20
          }}>
            Urgency Tiers
          </div>
          {tiers.map((t, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "14px 0",
              borderBottom: "1px solid #18181B"
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: t.color,
                flexShrink: 0
              }} />
              <div style={{
                fontWeight: 600,
                fontSize: 12,
                color: t.color,
                letterSpacing: 2,
                minWidth: 80
              }}>{t.name}</div>
              <div style={{
                fontSize: 13,
                color: "#71717A",
                minWidth: 56
              }}>{t.signals} signal{t.signals !== "1" ? "s" : ""}</div>
              <div style={{ fontSize: 13, color: "#A1A1AA" }}>{t.action}</div>
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <div style={{
          fontSize: 11,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#3F3F46",
          marginBottom: 20
        }}>
          Deliverables
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 64 }}>
          {[
            "Export in any format",
            "Assign leads to reps",
            "Filter & segment",
            "Query in natural language",
            "Crisis score dashboard",
            "Alumni overlap flags"
          ].map((item, i) => (
            <div key={i} style={{
              background: "#18181B",
              border: "1px solid #27272A",
              borderRadius: 4,
              padding: "7px 14px",
              fontSize: 12,
              color: "#A1A1AA"
            }}>{item}</div>
          ))}
        </div>

      </div>
    </div>
  );
}
