"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchCarrierDetail, CarrierDetail as CarrierDetailType } from "@/lib/api";

const personaConfig = {
  Aggressive: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "#7f1d1d" },
  Active: { color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "#92400e" },
  Stable: { color: "#94a3b8", bg: "rgba(148,163,184,0.06)", border: "#334155" },
  Locked: { color: "#475569", bg: "rgba(71,85,105,0.06)", border: "#1e293b" },
};

type PersonaKey = keyof typeof personaConfig;

function formatCoverage(amount: string | null): string {
  if (!amount) return "—";
  const raw = parseFloat(amount);
  if (isNaN(raw)) return amount;
  const num = raw * 1_000;
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toLocaleString()}`;
}

function ScoreRing({ score, size = 140 }: { score: number | null; size?: number }) {
  const s = score ?? 0;
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (s / 100) * circumference;

  // Color based on score
  const getColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#84cc16";
    if (score >= 40) return "#fbbf24";
    return "#f87171";
  };

  const color = getColor(s);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1b2332"
          strokeWidth={8}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 700, color: "#e6edf3", lineHeight: 1 }}>
          {score ?? "—"}
        </div>
        <div style={{ fontSize: 10, color: "#484f58", letterSpacing: "0.1em", marginTop: 4 }}>
          SCORE
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, subtext }: { label: string; value: string; color?: string; subtext?: string }) {
  return (
    <div
      style={{
        background: "#0d1117",
        border: "1px solid #1b2332",
        borderRadius: 10,
        padding: "18px 20px",
        flex: 1,
      }}
    >
      <div style={{ fontSize: 10, color: "#484f58", letterSpacing: "0.08em", marginBottom: 8 }}>
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: color || "#e6edf3", lineHeight: 1.1 }}>
        {value}
      </div>
      {subtext && (
        <div style={{ fontSize: 11, color: "#484f58", marginTop: 4 }}>{subtext}</div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#6b7280",
          letterSpacing: "0.08em",
          marginBottom: 14,
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid #1b2332",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, highlight }: { label: string; value: string | number | null | undefined; highlight?: string | null }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #1b2332",
      }}
    >
      <span style={{ fontSize: 12, color: "#6b7280" }}>{label}</span>
      <span
        style={{
          fontSize: 13,
          color: highlight || "#e6edf3",
          fontWeight: highlight ? 600 : 500,
        }}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}

export function CarrierDetail({ dotNumber }: { dotNumber: string }) {
  const router = useRouter();
  const [carrier, setCarrier] = useState<CarrierDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    async function loadCarrier() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCarrierDetail(dotNumber);
        setCarrier(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch carrier");
      } finally {
        setLoading(false);
      }
    }
    loadCarrier();
  }, [dotNumber]);

  if (loading) {
    return (
      <div
        suppressHydrationWarning
        style={{
          fontFamily: "var(--font-jetbrains), 'SF Mono', monospace",
          background: "#0d1117",
          color: "#c9d1d9",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 13, color: "#484f58" }}>Loading carrier...</span>
      </div>
    );
  }

  if (error || !carrier) {
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
        <div style={{ padding: "16px 40px", borderBottom: "1px solid #1b2332" }}>
          <span
            style={{ fontSize: 12, color: "#484f58", cursor: "pointer" }}
            onClick={() => router.push("/wc/carriers")}
          >
            ← Back to list
          </span>
        </div>
        <div style={{ padding: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              padding: "20px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid #7f1d1d",
              borderRadius: 10,
              color: "#f87171",
              fontSize: 13,
            }}
          >
            {error || "Carrier not found"}
          </div>
        </div>
      </div>
    );
  }

  const c = carrier;
  const pc = personaConfig[c.persona as PersonaKey] || personaConfig.Stable;
  const switchRateYears = c.switch_rate && c.switch_rate > 0 ? (1 / c.switch_rate).toFixed(1) : null;

  return (
    <div
      suppressHydrationWarning
      style={{
        fontFamily: "var(--font-jetbrains), 'SF Mono', monospace",
        background: "#0d1117",
        color: "#c9d1d9",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Top bar */}
        <div className="cd-padded" style={{ padding: "16px 40px", borderBottom: "1px solid #1b2332" }}>
          <span
            style={{ fontSize: 12, color: "#484f58", cursor: "pointer" }}
            onClick={() => router.push("/wc/carriers")}
          >
            ← Back to list
          </span>
        </div>

        {/* Hero Section - Score centered with company info */}
        <div className="cd-padded" style={{ padding: "40px 40px 32px" }}>
          <div
            className="cd-hero"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 48,
            }}
          >
            {/* Company Info */}
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 600,
                  color: "#e6edf3",
                  marginBottom: 8,
                }}
              >
                {c.legal_name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: "#6b7280" }}>
                  DOT {c.dot_number}
                </span>
                <span style={{ color: "#2d3748" }}>·</span>
                <span style={{ fontSize: 13, color: "#6b7280" }}>
                  {c.city}, {c.state}
                </span>
                <span style={{ color: "#2d3748" }}>·</span>
                <span style={{ fontSize: 13, color: "#6b7280" }}>
                  {c.power_units} power units
                </span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {c.hazmat && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#fbbf24",
                      background: "rgba(251,191,36,0.12)",
                      border: "1px solid rgba(251,191,36,0.3)",
                      borderRadius: 6,
                      padding: "4px 10px",
                    }}
                  >
                    Hazmat
                  </span>
                )}
                {c.safety_rating === "S" && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#22c55e",
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: 6,
                      padding: "4px 10px",
                    }}
                  >
                    Satisfactory
                  </span>
                )}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: pc.color,
                    background: pc.bg,
                    border: `1px solid ${pc.border}`,
                    borderRadius: 6,
                    padding: "4px 10px",
                  }}
                >
                  {c.persona || "Unknown"}
                </span>
              </div>
            </div>

            {/* Score Ring */}
            <ScoreRing score={c.score} size={140} />
          </div>

          {/* Key Metrics Row */}
          <div className="cd-stats" style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <StatCard
              label="Coverage"
              value={formatCoverage(c.coverage_amount)}
            />
            <StatCard
              label="Switch Rate"
              value={switchRateYears ? `~${switchRateYears} yr` : "—"}
              subtext="avg time between insurers"
            />
            <StatCard
              label="Est. Renewal"
              value={c.renewal_days != null ? `${c.renewal_days}` : "—"}
              subtext="days"
              color={
                c.renewal_days != null && c.renewal_days <= 90
                  ? "#f87171"
                  : c.renewal_days != null && c.renewal_days <= 180
                  ? "#fbbf24"
                  : "#e6edf3"
              }
            />
            <StatCard
              label="Insurers"
              value={String(c.num_insurers ?? "—")}
              subtext="on record"
            />
          </div>
        </div>

        {/* Tab nav */}
        <div
          className="cd-padded cd-tabs"
          style={{
            padding: "0 40px",
            borderBottom: "1px solid #1b2332",
            display: "flex",
            gap: 0,
          }}
        >
          {["overview", "insurance history", "policies"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none",
                border: "none",
                borderBottom: tab === t ? "2px solid #22c55e" : "2px solid transparent",
                padding: "14px 24px",
                fontSize: 12,
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: 600,
                color: tab === t ? "#e6edf3" : "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "color 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content — fixed container, no layout shift between tabs */}
        <div
          className="cd-content"
          style={{
            margin: "0 40px 40px",
            border: "1px solid #1b2332",
            borderRadius: 10,
            overflow: "hidden",
            minHeight: 420,
          }}
        >
          {tab === "overview" && (
            <div className="cd-overview-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ padding: "24px 28px", borderRight: "1px solid #1b2332" }}>
                <Section title="Contact Information">
                  <Field label="Officer 1" value={c.contact1} />
                  <Field label="Officer 2" value={c.contact2} />
                  <Field label="Phone" value={c.phone} />
                  <Field label="Email" value={c.email} />
                </Section>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <Section title="Fleet Details">
                  <Field label="Power Units" value={c.power_units} />
                  <Field label="Drivers" value={c.drivers} />
                  <Field label="Annual Mileage" value={c.mileage?.toLocaleString()} />
                  <Field label="Hazmat" value={c.hazmat ? "Yes" : "No"} highlight={c.hazmat ? "#fbbf24" : null} />
                </Section>
              </div>
              <div style={{ padding: "0 28px 24px", borderRight: "1px solid #1b2332", borderTop: "1px solid #1b2332" }}>
                <div style={{ paddingTop: 24 }}>
                  <Section title="Address">
                    <Field label="Street" value={c.street} />
                    <Field label="City, State" value={`${c.city}, ${c.state} ${c.zip || ""}`} />
                  </Section>
                </div>
              </div>
              <div style={{ padding: "0 28px 24px", borderTop: "1px solid #1b2332" }}>
                <div style={{ paddingTop: 24 }}>
                  <Section title="Safety & Coverage">
                    <Field
                      label="Safety Rating"
                      value={c.safety_rating === "S" ? "Satisfactory" : "Unrated"}
                      highlight={c.safety_rating === "S" ? "#22c55e" : null}
                    />
                    <Field label="Max Coverage" value={formatCoverage(c.coverage_amount)} highlight="#e6edf3" />
                  </Section>
                </div>
              </div>
            </div>
          )}

          {tab === "insurance history" && (
            <div style={{ padding: "24px 28px" }}>
              <Section title={`${c.num_insurers ?? 0} insurers on record`}>
                {c.insurers && c.insurers.length > 0 ? (
                  c.insurers.map((ins, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: "1px solid #1b2332",
                      }}
                    >
                      <span style={{ fontSize: 13, color: "#e6edf3" }}>{ins.name}</span>
                      <span style={{ fontSize: 12, color: "#6b7280" }}>
                        {ins.periods} {ins.periods === 1 ? "policy" : "policies"}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 13, color: "#6b7280", padding: "16px 0" }}>
                    No insurance history available
                  </div>
                )}
              </Section>
            </div>
          )}

          {tab === "policies" && (
            <div>
              <div style={{ padding: "24px 28px 0" }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#6b7280",
                    letterSpacing: "0.1em",
                    marginBottom: 16,
                    textTransform: "uppercase",
                  }}
                >
                  Policy Timeline
                </div>
              </div>
              {c.policies && c.policies.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Insurer", "Type", "Effective", "Cancelled", "Method"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 28px",
                            textAlign: "left",
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#6b7280",
                            letterSpacing: "0.08em",
                            borderBottom: "1px solid #1b2332",
                            textTransform: "uppercase",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.policies.map((p, i) => (
                      <tr key={i}>
                        <td style={{ padding: "12px 28px", fontSize: 13, color: "#e6edf3", borderBottom: "1px solid #1b2332" }}>
                          {p.insurer}
                        </td>
                        <td style={{ padding: "12px 28px", fontSize: 12, color: "#9ca3af", borderBottom: "1px solid #1b2332" }}>
                          {p.type}
                        </td>
                        <td style={{ padding: "12px 28px", fontSize: 12, color: "#9ca3af", borderBottom: "1px solid #1b2332" }}>
                          {p.effective}
                        </td>
                        <td style={{ padding: "12px 28px", fontSize: 12, color: "#9ca3af", borderBottom: "1px solid #1b2332" }}>
                          {p.cancelled}
                        </td>
                        <td style={{ padding: "12px 28px", fontSize: 11, color: "#6b7280", borderBottom: "1px solid #1b2332" }}>
                          {p.method}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ fontSize: 13, color: "#6b7280", padding: "0 28px 24px" }}>
                  No policy records available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
