"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

// Historical data for DOT 461949 (Jomar Bulk Carriers) - Last 24 months
const carrierIntelData: Record<string, {
  name: string;
  dot: string;
  location: string;
  powerUnits: number;
  drivers: number;
  hazmat: boolean;
  safetyRating: string;
  oosRates: { type: string; rate: number; nationalAvg: number }[];
  history: {
    date: string;
    vehicleMaint: number;
    powerUnits: number;
    drivers: number;
    inspections: number;
  }[];
  analysis: {
    what_the_data_shows: string;
    fleet_trajectory: string;
    basics: {
      unsafe_driving: string;
      hos_compliance: string;
      driver_fitness: string;
      drugs_alcohol: string;
      vehicle_maintenance: string;
      hm_compliance: string;
      crash_indicator: string;
    };
    what_this_means: string;
    watch_items: string[];
  };
}> = {
  "461949": {
    name: "JOMAR BULK CARRIERS INC",
    dot: "461949",
    location: "Greenville, SC",
    powerUnits: 10,
    drivers: 11,
    hazmat: true,
    safetyRating: "Satisfactory",
    oosRates: [
      { type: "Vehicle", rate: 7.0, nationalAvg: 23.2 },
      { type: "Driver", rate: 0.0, nationalAvg: 6.4 },
      { type: "Hazmat", rate: 0.0, nationalAvg: 4.4 },
    ],
    history: [
      { date: "Jan 2024", vehicleMaint: 7.25, powerUnits: 8, drivers: 9, inspections: 58 },
      { date: "Mar 2024", vehicleMaint: 4.91, powerUnits: 10, drivers: 11, inspections: 61 },
      { date: "May 2024", vehicleMaint: 4.10, powerUnits: 10, drivers: 11, inspections: 63 },
      { date: "Jul 2024", vehicleMaint: 3.51, powerUnits: 10, drivers: 11, inspections: 64 },
      { date: "Sep 2024", vehicleMaint: 2.84, powerUnits: 10, drivers: 11, inspections: 68 },
      { date: "Nov 2024", vehicleMaint: 2.43, powerUnits: 10, drivers: 11, inspections: 66 },
      { date: "Jan 2025", vehicleMaint: 1.70, powerUnits: 10, drivers: 11, inspections: 67 },
    ],
    analysis: {
      what_the_data_shows: "This is a 100% hazmat carrier — every single load is placardable — with a zero hazmat out-of-service rate against a 4.4% national average. Zero crashes in the current 24-month window. Zero fatal, zero injury, zero towaway. 43 inspections on 10 trucks gives you ~2.15 inspections per power unit per year — that's a real sample size, not a carrier hiding from weigh stations. 31 of those 43 inspections (72%) came back completely clean. 0.0% driver OOS rate. No enforcement penalties in six years.",
      fleet_trajectory: "Started at 5 PUs, grew slowly to 6 → 7 → 8 over many years. Had an unusual spike to 18–20 PUs around 2019–2021, then dropped back to 8, and has now grown to 10 PUs with 11 drivers. The 18–20 PU period looks like a temporary expansion — possibly leased capacity or a subhauler arrangement — that was unwound. Current 10 PUs is the fleet's all-time organic high.",
      basics: {
        unsafe_driving: "Currently 0.00, and has been 0.00 for ~2 years. Brief low-level blips to 1.14–1.56 around 2017–2018 and 2022, but always returned to zero quickly. This carrier simply doesn't generate Unsafe Driving violations.",
        hos_compliance: "Currently 0.00, has been 0.00 since about 2015. Non-issue for a decade.",
        driver_fitness: "0.00 for the carrier's entire recorded history. Clean.",
        drugs_alcohol: "0.00 across the entire history. Clean.",
        vehicle_maintenance: "Historically the carrier's one weak spot — peaked at 9.92–11.72 in 2010–2011, ran in the 5–8 range for years, spiked again to 7.25 in early 2024. But since then it's been on a steady, unbroken decline: 7.25 → 4.91 → 4.10 → 3.51 → 2.84 → 2.43 → 1.70. That 1.70 is the lowest Vehicle Maintenance score in the carrier's 15-year recorded history. And the 7.0% vehicle OOS rate versus the 23.2% national average confirms this isn't a data artifact — the improvement is real. They did this while growing the fleet from 8 to 10 trucks. Scores getting better while adding capacity means the operation is actually tightening up.",
        hm_compliance: "Not Public — standard for carriers in this size range.",
        crash_indicator: "Not Public.",
      },
      what_this_means: "This is a clean, improving, small hazmat fleet that's probably overpaying for coverage relative to their actual risk profile. A carrier getting better this consistently across every BASIC — while growing — is a genuinely good risk to write. They may not even know how strong their position is when it comes to negotiating rates. That's the opening.",
      watch_items: [
        "Safety rating is Satisfactory but from 2004 — 21+ years stale. Not unusual for a small carrier, but worth noting.",
        "Vehicle Maintenance, while at its all-time low, has a history of spiking — that's the one BASIC to keep monitoring.",
        "The 18–20 PU anomaly period is unexplained; if it was a failed expansion, an underwriter might want context.",
      ],
    },
  },
};

function ScoreChart({ data, width = 600, height = 200 }: { data: { date: string; value: number }[]; width?: number; height?: number }) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const minVal = Math.min(...values) * 0.8;
  const maxVal = Math.max(...values) * 1.1;

  const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
  const yScale = (v: number) => padding.top + chartHeight - ((v - minVal) / (maxVal - minVal)) * chartHeight;

  const pathData = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d.value)}`).join(' ');

  // Area fill
  const areaData = `${pathData} L ${xScale(data.length - 1)} ${padding.top + chartHeight} L ${xScale(0)} ${padding.top + chartHeight} Z`;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
        const y = padding.top + chartHeight * (1 - pct);
        const val = minVal + (maxVal - minVal) * pct;
        return (
          <g key={i}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#1b2332" strokeWidth={1} />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize={10} fill="#484f58">
              {val.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Area fill */}
      <path d={areaData} fill="url(#gradient)" opacity={0.3} />

      {/* Line */}
      <path d={pathData} fill="none" stroke="#4ade80" strokeWidth={2} />

      {/* Points */}
      {data.map((d, i) => (
        <circle key={i} cx={xScale(i)} cy={yScale(d.value)} r={3} fill="#4ade80" />
      ))}

      {/* X-axis labels (every 4th) */}
      {data.filter((_, i) => i % 4 === 0 || i === data.length - 1).map((d, idx) => {
        const i = data.indexOf(d);
        return (
          <text key={i} x={xScale(i)} y={height - 10} textAnchor="middle" fontSize={10} fill="#484f58">
            {d.date.split(' ')[0]}
          </text>
        );
      })}

      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function CarrierIntelPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const dotNumber = params.dot_number as string;

  const tabParam = searchParams.get("tab");
  const [tab, setTab] = useState<"data" | "analysis">(
    tabParam === "analysis" ? "analysis" : "data"
  );

  useEffect(() => {
    const urlTab = searchParams.get("tab");
    if (urlTab === "analysis" || urlTab === "data") {
      setTab(urlTab);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: "data" | "analysis") => {
    setTab(newTab);
    router.push(`/wc/carriers/${dotNumber}/intel?tab=${newTab}`, { scroll: false });
  };

  const data = carrierIntelData[dotNumber];

  if (!data) {
    return (
      <div
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
            onClick={() => router.push(`/wc/carriers/${dotNumber}`)}
          >
            ← Back to carrier
          </span>
        </div>
        <div
          style={{
            padding: "80px 40px",
            textAlign: "center",
            color: "#484f58",
            fontSize: 14,
          }}
        >
          No intel data available for this carrier yet.
        </div>
      </div>
    );
  }

  const chartData = data.history.map(h => ({ date: h.date, value: h.vehicleMaint }));
  const latestScore = data.history[data.history.length - 1].vehicleMaint;
  const firstScore = data.history[0].vehicleMaint;
  const scoreDrop = firstScore - latestScore;
  const scoreDropPct = ((scoreDrop / firstScore) * 100).toFixed(0);

  return (
    <div
      style={{
        fontFamily: "var(--font-jetbrains), 'SF Mono', monospace",
        background: "#0d1117",
        color: "#c9d1d9",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 40px", borderBottom: "1px solid #1b2332" }}>
        <span
          style={{ fontSize: 12, color: "#484f58", cursor: "pointer" }}
          onClick={() => router.push(`/wc/carriers/${dotNumber}`)}
        >
          ← Back to carrier
        </span>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px" }}>
        {/* Title */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 600,
              color: "#e6edf3",
              marginBottom: 8,
            }}
          >
            {data.name}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>DOT {data.dot}</span>
            <span style={{ color: "#2d3748" }}>·</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{data.location}</span>
            <span style={{ color: "#2d3748" }}>·</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{data.powerUnits} Power Units</span>
            <span style={{ color: "#2d3748" }}>·</span>
            <span style={{ fontSize: 13, color: "#6b7280" }}>{data.drivers} Drivers</span>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {data.hazmat && (
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
              {data.safetyRating}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: "1px solid #1b2332",
            marginBottom: 32,
          }}
        >
          {(["data", "analysis"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              style={{
                background: "none",
                border: "none",
                borderBottom: tab === t ? "2px solid #4ade80" : "2px solid transparent",
                padding: "12px 24px",
                fontSize: 12,
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: 600,
                color: tab === t ? "#e6edf3" : "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {t === "data" ? "Safety Data" : "Analysis"}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === "data" && (
          <div>
            {/* OOS Rates */}
            <div style={{ marginBottom: 40 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                Out-of-Service Rates
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #1b2332",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Type", "Carrier OOS %", "National Avg %", "vs. Avg"].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 20px",
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
                    {data.oosRates.map((row, i) => {
                      const diff = row.rate - row.nationalAvg;
                      const isBetter = diff < 0;
                      return (
                        <tr key={i}>
                          <td style={{ padding: "14px 20px", fontSize: 13, color: "#e6edf3", borderBottom: "1px solid #1b2332", fontWeight: 500 }}>
                            {row.type}
                          </td>
                          <td style={{ padding: "14px 20px", fontSize: 14, color: isBetter ? "#4ade80" : "#f87171", borderBottom: "1px solid #1b2332", fontWeight: 600 }}>
                            {row.rate.toFixed(1)}%
                          </td>
                          <td style={{ padding: "14px 20px", fontSize: 13, color: "#6b7280", borderBottom: "1px solid #1b2332" }}>
                            {row.nationalAvg.toFixed(1)}%
                          </td>
                          <td style={{ padding: "14px 20px", fontSize: 12, color: isBetter ? "#4ade80" : "#f87171", borderBottom: "1px solid #1b2332", fontWeight: 500 }}>
                            {diff > 0 ? "+" : ""}{diff.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vehicle Maintenance Chart */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6b7280",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Vehicle Maintenance BASIC Score
                  </div>
                  <div style={{ fontSize: 12, color: "#484f58", marginTop: 4 }}>
                    Last 24 months · Lower is better
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#4ade80" }}>{latestScore.toFixed(2)}</div>
                  <div style={{ fontSize: 11, color: "#4ade80" }}>↓ {scoreDropPct}% from {firstScore.toFixed(2)}</div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #1b2332",
                  borderRadius: 10,
                  padding: "24px",
                  overflowX: "auto",
                }}
              >
                <ScoreChart data={chartData} width={880} height={220} />
              </div>
            </div>

            {/* Historical Data Table */}
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#6b7280",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                Monthly Snapshot (Last 12 Months)
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #1b2332",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                    <thead>
                      <tr>
                        {["Date", "Veh. Maint.", "Change", "Power Units", "Drivers", "Inspections"].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "12px 16px",
                              textAlign: h === "Date" ? "left" : "right",
                              fontSize: 10,
                              fontWeight: 600,
                              color: "#6b7280",
                              letterSpacing: "0.08em",
                              borderBottom: "1px solid #1b2332",
                              textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.history.slice(-12).reverse().map((row, i, arr) => {
                        const prev = i < arr.length - 1 ? arr[i + 1].vehicleMaint : null;
                        const change = prev !== null ? row.vehicleMaint - prev : null;
                        return (
                          <tr key={i}>
                            <td style={{ padding: "12px 16px", fontSize: 13, color: "#e6edf3", borderBottom: "1px solid #1b2332" }}>
                              {row.date}
                            </td>
                            <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: "#e6edf3", borderBottom: "1px solid #1b2332", textAlign: "right" }}>
                              {row.vehicleMaint.toFixed(2)}
                            </td>
                            <td style={{ padding: "12px 16px", fontSize: 12, fontWeight: 500, color: change !== null && change < 0 ? "#4ade80" : change !== null && change > 0 ? "#f87171" : "#6b7280", borderBottom: "1px solid #1b2332", textAlign: "right" }}>
                              {change !== null ? (change < 0 ? "" : "+") + change.toFixed(2) : "—"}
                            </td>
                            <td style={{ padding: "12px 16px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid #1b2332", textAlign: "right" }}>
                              {row.powerUnits}
                            </td>
                            <td style={{ padding: "12px 16px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid #1b2332", textAlign: "right" }}>
                              {row.drivers}
                            </td>
                            <td style={{ padding: "12px 16px", fontSize: 13, color: "#9ca3af", borderBottom: "1px solid #1b2332", textAlign: "right" }}>
                              {row.inspections}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: "#484f58" }}>
                Source: FMCSA Safety Measurement System · Updated monthly
              </div>
            </div>
          </div>
        )}

        {tab === "analysis" && (
          <div
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid #1b2332",
              borderRadius: 10,
              padding: "32px",
            }}
          >
            {/* What the data shows */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e6edf3", marginBottom: 12 }}>
                What the data shows:
              </div>
              <div style={{ fontSize: 14, color: "#c9d1d9", lineHeight: 1.8 }}>
                {data.analysis.what_the_data_shows}
              </div>
            </div>

            {/* Fleet Trajectory */}
            <div style={{ borderTop: "1px solid #1b2332", paddingTop: 28, marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e6edf3", marginBottom: 12 }}>
                Fleet Trajectory:
              </div>
              <div style={{ fontSize: 14, color: "#c9d1d9", lineHeight: 1.8 }}>
                {data.analysis.fleet_trajectory}
              </div>
            </div>

            {/* Individual BASICs */}
            <div style={{ borderTop: "1px solid #1b2332", paddingTop: 28, marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e6edf3", marginBottom: 16 }}>
                BASIC Breakdown:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Unsafe Driving", value: data.analysis.basics.unsafe_driving, color: "#4ade80" },
                  { label: "HOS Compliance", value: data.analysis.basics.hos_compliance, color: "#4ade80" },
                  { label: "Driver Fitness", value: data.analysis.basics.driver_fitness, color: "#4ade80" },
                  { label: "Drugs/Alcohol", value: data.analysis.basics.drugs_alcohol, color: "#4ade80" },
                  { label: "Vehicle Maintenance", value: data.analysis.basics.vehicle_maintenance, color: "#fbbf24" },
                  { label: "HM Compliance", value: data.analysis.basics.hm_compliance, color: "#6b7280" },
                  { label: "Crash Indicator", value: data.analysis.basics.crash_indicator, color: "#6b7280" },
                ].map((basic, i) => (
                  <div key={i} style={{ paddingLeft: 16, borderLeft: `3px solid ${basic.color}` }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", marginBottom: 4 }}>
                      {basic.label}
                    </div>
                    <div style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
                      {basic.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What this means */}
            <div style={{ borderTop: "1px solid #1b2332", paddingTop: 28, marginBottom: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#e6edf3", marginBottom: 12 }}>
                What this means:
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#c9d1d9",
                  lineHeight: 1.8,
                  background: "rgba(74,222,128,0.06)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  borderRadius: 8,
                  padding: "16px 20px",
                }}
              >
                {data.analysis.what_this_means}
              </div>
            </div>

            {/* Watch Items */}
            <div style={{ borderTop: "1px solid #1b2332", paddingTop: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#fbbf24", marginBottom: 16 }}>
                Watch Items:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {data.analysis.watch_items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      fontSize: 13,
                      color: "#9ca3af",
                      lineHeight: 1.7,
                    }}
                  >
                    <span style={{ color: "#fbbf24", flexShrink: 0 }}>⚠</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
