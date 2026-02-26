"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { fetchCarriers, Carrier } from "@/lib/api";

const personaConfig = {
  Aggressive: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "#7f1d1d" },
  Active: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "#92400e" },
  Stable: { color: "#94a3b8", bg: "rgba(148,163,184,0.06)", border: "#334155" },
  Locked: { color: "#475569", bg: "rgba(71,85,105,0.06)", border: "#1e293b" },
};

type PersonaKey = keyof typeof personaConfig;

const tabs = [
  { key: "all", label: "All" },
  { key: "Aggressive", label: "Aggressive" },
  { key: "Active", label: "Active" },
  { key: "Stable", label: "Stable" },
  { key: "Locked", label: "Locked" },
] as const;

function formatCoverage(amount: string | null): string {
  if (!amount) return "—";
  const num = parseFloat(amount);
  if (isNaN(num)) return amount;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num}`;
}

function formatSwitchRate(rate: number | null): { value: string; suffix: string } | null {
  if (rate == null || rate <= 0) return null;
  return { value: `~${(1 / rate).toFixed(1)}`, suffix: "yr" };
}

export function CarriersDashboard() {
  const router = useRouter();
  const [personaFilter, setPersonaFilter] = useState<string>("all");
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [personaCounts, setPersonaCounts] = useState<Record<string, number>>({});
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  // Fetch carriers when filters change
  useEffect(() => {
    async function loadCarriers() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchCarriers({
          persona: personaFilter !== "all" ? personaFilter : undefined,
          limit: 100,
        });
        setCarriers(response.carriers);
        setTotalCount(response.total);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch carriers");
        setCarriers([]);
      } finally {
        setLoading(false);
      }
    }

    loadCarriers();
  }, [personaFilter]);

  // Fetch counts for all personas on initial load
  useEffect(() => {
    async function loadCounts() {
      try {
        // Fetch total count
        const allResponse = await fetchCarriers({ limit: 1 });
        const counts: Record<string, number> = { all: allResponse.total };

        // Fetch counts for each persona
        await Promise.all(
          ["Aggressive", "Active", "Stable", "Locked"].map(async (persona) => {
            const response = await fetchCarriers({ persona, limit: 1 });
            counts[persona] = response.total;
          })
        );

        setPersonaCounts(counts);
      } catch (err) {
        console.error("Failed to fetch persona counts:", err);
      }
    }

    loadCounts();
  }, []);

  const count = useCallback(
    (key: string) => personaCounts[key] ?? 0,
    [personaCounts]
  );

  return (
    <div
      suppressHydrationWarning
      style={{
        fontFamily: "var(--font-jetbrains), 'SF Mono', monospace",
        background: "#0d1117",
        color: "#c9d1d9",
        minHeight: "100vh",
      }}
    >

      {/* Header */}
      <div
        style={{
          paddingTop: 28,
          paddingRight: 40,
          paddingBottom: 20,
          paddingLeft: 40,
          borderBottom: "1px solid #1b2332",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 600,
                color: "#e6edf3",
              }}
            >
              WithCoverage
            </h1>
            <p
              style={{
                marginTop: 12,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
                fontSize: 14,
                color: "#8b949e",
                lineHeight: 1.7,
                maxWidth: 640,
              }}
            >
              These are active interstate freight carriers operating 10–100 power
              units with federally mandated liability insurance. Every carrier on
              this list has an annual policy renewal that represents a sales
              opportunity.
            </p>
          </div>
                  </div>
      </div>

      <div style={{ paddingTop: 20, paddingRight: 40, paddingBottom: 20, paddingLeft: 40 }}>
        {/* Filter row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            {tabs.map((tab) => {
              const pc = personaConfig[tab.key as PersonaKey];
              const active = personaFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setPersonaFilter(tab.key)}
                  style={{
                    background: active
                      ? pc
                        ? pc.bg
                        : "rgba(187,247,127,0.12)"
                      : "transparent",
                    border: `1px solid ${
                      active ? (pc ? pc.border : "#3d5a1e") : "#1b2332"
                    }`,
                    borderRadius: 20,
                    padding: "5px 13px",
                    fontSize: 11,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    fontWeight: 500,
                    color: active ? (pc ? pc.color : "#bbf77f") : "#484f58",
                  }}
                >
                  {tab.label}{" "}
                  <span style={{ opacity: 0.5, marginLeft: 3 }}>
                    {count(tab.key)}
                  </span>
                </button>
              );
            })}
          </div>
          <span style={{ fontSize: 11, color: "#484f58" }}>
            {carriers.length} of {totalCount} carriers
          </span>
        </div>

        {/* Error state */}
        {error && (
          <div
            style={{
              padding: "20px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid #7f1d1d",
              borderRadius: 10,
              marginBottom: 20,
              color: "#f87171",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#484f58",
              fontSize: 13,
            }}
          >
            Loading carriers...
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div
            style={{
              border: "1px solid #1b2332",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {[
                    { label: "CARRIER", w: "24%" },
                    { label: "FLEET", w: "14%" },
                    { label: "COVERAGE", w: "10%" },
                    { label: "SWITCH RATE", w: "12%" },
                    { label: "PERSONA", w: "12%" },
                    { label: "EST. RENEWAL", w: "12%" },
                    { label: "SCORE", w: "8%" },
                    { label: "INTEL", w: "8%" },
                  ].map((col) => (
                    <th
                      key={col.label}
                      style={{
                        padding: "14px 14px",
                        textAlign: "left",
                        fontSize: 10,
                        fontWeight: 500,
                        color: "#484f58",
                        letterSpacing: "0.08em",
                        borderBottom: "1px solid #1b2332",
                        width: col.w,
                      }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {carriers.map((c) => {
                  const pc =
                    personaConfig[c.persona as PersonaKey] || personaConfig.Stable;
                  const isHovered = hoveredDot === c.dot_number;
                  const switchRate = formatSwitchRate(c.switch_rate);

                  return (
                    <tr
                      key={c.dot_number}
                      style={{
                        borderBottom: "1px solid #141a23",
                        cursor: "pointer",
                        background: isHovered ? "#161b22" : "transparent",
                      }}
                      onMouseEnter={() => setHoveredDot(c.dot_number)}
                      onMouseLeave={() => setHoveredDot(null)}
                      onClick={() => router.push(`/wc/carriers/${c.dot_number}`)}
                    >
                      <td style={{ padding: "14px 14px" }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#e6edf3",
                          }}
                        >
                          {c.legal_name}
                        </div>
                        <div
                          style={{ fontSize: 10, color: "#484f58", marginTop: 2 }}
                        >
                          DOT {c.dot_number}
                        </div>
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            flexWrap: "wrap",
                          }}
                        >
                          <span style={{ fontSize: 12, color: "#c9d1d9" }}>
                            {c.power_units} units
                          </span>
                          {c.hazmat && (
                            <span
                              style={{
                                fontSize: 10,
                                color: "#fbbf24",
                                background: "rgba(251,191,36,0.1)",
                                border: "1px solid #92400e",
                                borderRadius: 4,
                                padding: "1px 5px",
                              }}
                            >
                              Hazmat
                            </span>
                          )}
                          {c.safety_rating === "S" && (
                            <span
                              style={{
                                fontSize: 10,
                                color: "#6ee7b7",
                                background: "rgba(110,231,183,0.08)",
                                border: "1px solid #065f46",
                                borderRadius: 4,
                                padding: "1px 5px",
                              }}
                            >
                              Satisfactory
                            </span>
                          )}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "14px 14px",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#e6edf3",
                        }}
                      >
                        {formatCoverage(c.coverage_amount)}
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        {switchRate ? (
                          <>
                            <span style={{ fontSize: 13, color: "#c9d1d9" }}>
                              {switchRate.value}
                            </span>
                            <span
                              style={{
                                fontSize: 10,
                                color: "#484f58",
                                marginLeft: 2,
                              }}
                            >
                              {switchRate.suffix}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: "#30363d", fontSize: 11 }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        {c.persona ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              background: pc.bg,
                              border: `1px solid ${pc.border}`,
                              borderRadius: 20,
                              padding: "3px 10px",
                              fontSize: 11,
                              fontWeight: 500,
                              color: pc.color,
                            }}
                          >
                            {c.persona}
                          </span>
                        ) : (
                          <span style={{ color: "#30363d", fontSize: 11 }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        {c.renewal_days != null ? (
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color:
                                c.renewal_days <= 90
                                  ? "#f87171"
                                  : c.renewal_days <= 180
                                  ? "#fbbf24"
                                  : "#7d8590",
                            }}
                          >
                            {c.renewal_days}d
                          </span>
                        ) : (
                          <span style={{ color: "#30363d", fontSize: 11 }}>
                            Unknown
                          </span>
                        )}
                      </td>
                      <td
                        style={{
                          padding: "14px 14px",
                          fontSize: 15,
                          fontWeight: 600,
                          color:
                            (c.score ?? 0) >= 80
                              ? "#bbf77f"
                              : (c.score ?? 0) >= 60
                              ? "#c9d1d9"
                              : "#484f58",
                        }}
                      >
                        {c.score ?? "—"}
                      </td>
                      <td style={{ padding: "14px 14px" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/wc/carriers/${c.dot_number}`);
                          }}
                          style={{
                            background: "transparent",
                            border: "1px solid #1b2332",
                            borderRadius: 4,
                            padding: "5px 10px",
                            color: "#7d8590",
                            fontSize: 11,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        {!loading && !error && (
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "#30363d",
            }}
          >
            <span>
              Showing {carriers.length} of {totalCount}
            </span>
            <span>Source: FMCSA Census + Insurance History</span>
          </div>
        )}
      </div>
    </div>
  );
}
