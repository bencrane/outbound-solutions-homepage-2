"use client";

import { useState, useMemo } from "react";

interface Company {
  name: string;
  domain: string;
  industry: string;
  employees: number;
  locations: number;
  segment: string;
  cardRevenue12m: number;
  yoyGrowth: number;
  refundRate: number;
  avgTx12m: number;
  avgTx1m: number;
  peakMonth: number;
  monthsUntilPeak: number;
  hiringVelocity: number;
  hasRiskHire: boolean;
  tags: string[];
}

const tagColors: Record<string, { bg: string; border: string; text: string }> = {
  "Revenue Decelerating": { bg: "#1C1017", border: "#3B1C2C", text: "#E8798A" },
  "Refund Rate Spiking": { bg: "#1A1410", border: "#3B2E1C", text: "#E8B068" },
  "Discounting to Survive": { bg: "#131118", border: "#2A2040", text: "#A78BDB" },
  "Peak Month Exposure": { bg: "#0F1619", border: "#1C3040", text: "#6AADCF" },
  "Scaling Without Coverage": { bg: "#101912", border: "#1E3524", text: "#6ECF7A" },
};

const tagDescs: Record<string, string> = {
  "Revenue Decelerating": "Growth slowing QoQ — trajectory bending, costs getting cut, coverage gaps emerging",
  "Refund Rate Spiking": "Product quality or fulfillment issues — leading indicator of liability claims",
  "Discounting to Survive": "Transaction size declining while volume holds — margin compression, likely underinsured",
  "Peak Month Exposure": "Approaching highest revenue month with potentially stale coverage — max risk, min protection",
  "Scaling Without Coverage": "Rapid growth, no risk/legal hire — day-one policies not updated for 10x revenue and headcount",
};

const companies: Company[] = [
  { name: "Blank Street", domain: "blankstreet.com", industry: "Food & Beverage", employees: 820, locations: 45, segment: "Multi-location", cardRevenue12m: 28400000, yoyGrowth: 0.42, refundRate: 0.011, avgTx12m: 15.03, avgTx1m: 16.22, peakMonth: 12, monthsUntilPeak: 9, hiringVelocity: 1.8, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Graza", domain: "graza.co", industry: "Food & Beverage", employees: 85, locations: 1, segment: "DTC", cardRevenue12m: 41000000, yoyGrowth: 0.88, refundRate: 0.022, avgTx12m: 66.13, avgTx1m: 70.69, peakMonth: 11, monthsUntilPeak: 8, hiringVelocity: 3.5, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Just Salad", domain: "justsalad.com", industry: "Restaurants", employees: 1200, locations: 88, segment: "Multi-location", cardRevenue12m: 95000000, yoyGrowth: 0.18, refundRate: 0.004, avgTx12m: 22.62, avgTx1m: 21.82, peakMonth: 6, monthsUntilPeak: 3, hiringVelocity: 1.9, hasRiskHire: false, tags: ["Peak Month Exposure", "Scaling Without Coverage"] },
  { name: "Liquid Death", domain: "liquiddeath.com", industry: "Food & Beverage", employees: 350, locations: 1, segment: "DTC", cardRevenue12m: 263000000, yoyGrowth: 0.21, refundRate: 0.016, avgTx12m: 29.55, avgTx1m: 26.76, peakMonth: 7, monthsUntilPeak: 4, hiringVelocity: 0.7, hasRiskHire: false, tags: ["Discounting to Survive"] },
  { name: "Dave's Hot Chicken", domain: "daveshotchicken.com", industry: "Restaurants", employees: 4800, locations: 230, segment: "Multi-location", cardRevenue12m: 406000000, yoyGrowth: 0.67, refundRate: 0.004, avgTx12m: 14.50, avgTx1m: 15.00, peakMonth: 3, monthsUntilPeak: 0, hiringVelocity: 2.4, hasRiskHire: false, tags: ["Peak Month Exposure", "Scaling Without Coverage"] },
  { name: "Magnolia Bakery", domain: "magnoliabakery.com", industry: "Food & Beverage", employees: 480, locations: 12, segment: "Multi-location", cardRevenue12m: 52000000, yoyGrowth: 0.09, refundRate: 0.007, avgTx12m: 24.76, avgTx1m: 28.72, peakMonth: 12, monthsUntilPeak: 9, hiringVelocity: 0.6, hasRiskHire: false, tags: ["Revenue Decelerating"] },
  { name: "Saatva", domain: "saatva.com", industry: "General Retail", employees: 1100, locations: 28, segment: "DTC", cardRevenue12m: 580000000, yoyGrowth: 0.11, refundRate: 0.031, avgTx12m: 651.69, avgTx1m: 617.65, peakMonth: 11, monthsUntilPeak: 8, hiringVelocity: 0.6, hasRiskHire: true, tags: ["Revenue Decelerating", "Discounting to Survive"] },
  { name: "CAVA", domain: "cava.com", industry: "Restaurants", employees: 9200, locations: 352, segment: "Multi-location", cardRevenue12m: 880000000, yoyGrowth: 0.35, refundRate: 0.002, avgTx12m: 20.95, avgTx1m: 21.58, peakMonth: 8, monthsUntilPeak: 5, hiringVelocity: 2.3, hasRiskHire: true, tags: [] },
  { name: "Dutch Bros", domain: "dutchbros.com", industry: "Food & Beverage", employees: 14000, locations: 982, segment: "Multi-location", cardRevenue12m: 1200000000, yoyGrowth: 0.26, refundRate: 0.003, avgTx12m: 13.48, avgTx1m: 13.85, peakMonth: 7, monthsUntilPeak: 4, hiringVelocity: 1.7, hasRiskHire: true, tags: [] },
  { name: "Fossil Farms", domain: "fossilfarms.com", industry: "Food & Beverage", employees: 65, locations: 1, segment: "DTC", cardRevenue12m: 12000000, yoyGrowth: 0.31, refundRate: 0.035, avgTx12m: 66.67, avgTx1m: 57.78, peakMonth: 12, monthsUntilPeak: 9, hiringVelocity: 3.0, hasRiskHire: false, tags: ["Refund Rate Spiking", "Discounting to Survive", "Scaling Without Coverage"] },
  { name: "Fresh Clean Tees", domain: "freshcleantees.com", industry: "Retail Apparel", employees: 120, locations: 1, segment: "DTC", cardRevenue12m: 38000000, yoyGrowth: 0.14, refundRate: 0.050, avgTx12m: 73.08, avgTx1m: 65.79, peakMonth: 11, monthsUntilPeak: 8, hiringVelocity: 0.5, hasRiskHire: false, tags: ["Refund Rate Spiking", "Discounting to Survive", "Revenue Decelerating"] },
  { name: "Puttshack", domain: "puttshack.com", industry: "Hospitality", employees: 1800, locations: 14, segment: "Multi-location", cardRevenue12m: 120000000, yoyGrowth: 0.52, refundRate: 0.007, avgTx12m: 66.67, avgTx1m: 70.99, peakMonth: 7, monthsUntilPeak: 4, hiringVelocity: 2.3, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Le Pain Quotidien", domain: "lepainquotidien.com", industry: "Restaurants", employees: 2200, locations: 62, segment: "Multi-location", cardRevenue12m: 78000000, yoyGrowth: -0.04, refundRate: 0.007, avgTx12m: 20.53, avgTx1m: 20.00, peakMonth: 10, monthsUntilPeak: 7, hiringVelocity: 0.4, hasRiskHire: false, tags: ["Revenue Decelerating"] },
  { name: "Raising Cane's", domain: "raisingcanes.com", industry: "Restaurants", employees: 58000, locations: 850, segment: "Multi-location", cardRevenue12m: 4200000000, yoyGrowth: 0.33, refundRate: 0.002, avgTx12m: 15.00, avgTx1m: 16.25, peakMonth: 6, monthsUntilPeak: 3, hiringVelocity: 1.6, hasRiskHire: true, tags: ["Peak Month Exposure"] },
  { name: "First Watch", domain: "firstwatch.com", industry: "Restaurants", employees: 12000, locations: 560, segment: "Multi-location", cardRevenue12m: 920000000, yoyGrowth: 0.19, refundRate: 0.003, avgTx12m: 24.21, avgTx1m: 25.63, peakMonth: 3, monthsUntilPeak: 0, hiringVelocity: 1.5, hasRiskHire: true, tags: ["Peak Month Exposure"] },
  { name: "Zero Acre", domain: "zeroacre.com", industry: "Food & Beverage", employees: 55, locations: 1, segment: "DTC", cardRevenue12m: 6200000, yoyGrowth: 1.4, refundRate: 0.029, avgTx12m: 129.17, avgTx1m: 157.69, peakMonth: 1, monthsUntilPeak: 10, hiringVelocity: 3.7, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Three Wishes", domain: "threewishescereal.com", industry: "Food & Beverage", employees: 45, locations: 1, segment: "DTC", cardRevenue12m: 22000000, yoyGrowth: 0.08, refundRate: 0.045, avgTx12m: 70.97, avgTx1m: 66.67, peakMonth: 1, monthsUntilPeak: 10, hiringVelocity: 0.5, hasRiskHire: false, tags: ["Refund Rate Spiking", "Revenue Decelerating", "Discounting to Survive"] },
  { name: "Marley Spoon", domain: "marleyspoon.com", industry: "Food & Beverage", employees: 1600, locations: 8, segment: "DTC", cardRevenue12m: 210000000, yoyGrowth: -0.12, refundRate: 0.061, avgTx12m: 50.00, avgTx1m: 46.77, peakMonth: 1, monthsUntilPeak: 10, hiringVelocity: 0.4, hasRiskHire: false, tags: ["Revenue Decelerating", "Refund Rate Spiking", "Discounting to Survive"] },
  { name: "Mendocino Farms", domain: "mendocinofarms.com", industry: "Restaurants", employees: 2800, locations: 72, segment: "Multi-location", cardRevenue12m: 185000000, yoyGrowth: 0.24, refundRate: 0.003, avgTx12m: 27.21, avgTx1m: 27.93, peakMonth: 5, monthsUntilPeak: 2, hiringVelocity: 2.3, hasRiskHire: false, tags: ["Peak Month Exposure", "Scaling Without Coverage"] },
  { name: "Heyday Skincare", domain: "heydayskincare.com", industry: "Personal Care", employees: 210, locations: 14, segment: "Multi-location", cardRevenue12m: 32000000, yoyGrowth: 0.28, refundRate: 0.015, avgTx12m: 76.19, avgTx1m: 77.78, peakMonth: 12, monthsUntilPeak: 9, hiringVelocity: 2.5, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Maman", domain: "mamannyc.com", industry: "Food & Beverage", employees: 380, locations: 18, segment: "Multi-location", cardRevenue12m: 42000000, yoyGrowth: 0.38, refundRate: 0.005, avgTx12m: 25.00, avgTx1m: 26.35, peakMonth: 12, monthsUntilPeak: 9, hiringVelocity: 2.4, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Danessa Myricks", domain: "danessamyricksbeauty.com", industry: "Personal Care", employees: 75, locations: 1, segment: "DTC", cardRevenue12m: 18000000, yoyGrowth: 0.45, refundRate: 0.029, avgTx12m: 64.29, avgTx1m: 73.08, peakMonth: 11, monthsUntilPeak: 8, hiringVelocity: 3.0, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Lalo Spirits", domain: "lalospirits.com", industry: "Food & Beverage", employees: 52, locations: 1, segment: "DTC", cardRevenue12m: 14000000, yoyGrowth: 0.62, refundRate: 0.013, avgTx12m: 116.67, avgTx1m: 142.86, peakMonth: 5, monthsUntilPeak: 2, hiringVelocity: 2.5, hasRiskHire: false, tags: ["Peak Month Exposure", "Scaling Without Coverage"] },
  { name: "Little Spoon", domain: "littlespoon.com", industry: "Food & Beverage", employees: 140, locations: 1, segment: "DTC", cardRevenue12m: 48000000, yoyGrowth: 0.06, refundRate: 0.050, avgTx12m: 70.59, avgTx1m: 66.67, peakMonth: 9, monthsUntilPeak: 6, hiringVelocity: 0.5, hasRiskHire: false, tags: ["Revenue Decelerating", "Refund Rate Spiking", "Discounting to Survive"] },
  { name: "Tacombi", domain: "tacombi.com", industry: "Restaurants", employees: 650, locations: 18, segment: "Multi-location", cardRevenue12m: 58000000, yoyGrowth: 0.29, refundRate: 0.005, avgTx12m: 24.17, avgTx1m: 25.71, peakMonth: 8, monthsUntilPeak: 5, hiringVelocity: 2.3, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Franco Mfg", domain: "francomfg.com", industry: "Manufacturing", employees: 580, locations: 4, segment: "Multi-location", cardRevenue12m: 42000000, yoyGrowth: -0.08, refundRate: 0.029, avgTx12m: 807.69, avgTx1m: 789.47, peakMonth: 8, monthsUntilPeak: 5, hiringVelocity: 0.3, hasRiskHire: false, tags: ["Revenue Decelerating"] },
  { name: "Convive Brands", domain: "convivebrands.com", industry: "Restaurants", employees: 420, locations: 22, segment: "Multi-location", cardRevenue12m: 36000000, yoyGrowth: 0.15, refundRate: 0.009, avgTx12m: 24.00, avgTx1m: 22.03, peakMonth: 12, monthsUntilPeak: 9, hiringVelocity: 2.3, hasRiskHire: false, tags: ["Scaling Without Coverage"] },
  { name: "Carvertise", domain: "carvertise.com", industry: "Manufacturing", employees: 95, locations: 3, segment: "Multi-location", cardRevenue12m: 8500000, yoyGrowth: 0.22, refundRate: 0.025, avgTx12m: 202.38, avgTx1m: 181.25, peakMonth: 9, monthsUntilPeak: 6, hiringVelocity: 1.6, hasRiskHire: false, tags: ["Discounting to Survive"] },
];

const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmt(n: number) {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(0) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

export default function Dashboard() {
  const [selected, setSelected] = useState<Company | null>(null);
  const [filterTag, setFilterTag] = useState("ALL");

  const sorted = useMemo(() => {
    let list = [...companies];
    if (filterTag !== "ALL") list = list.filter(c => c.tags.includes(filterTag));
    list.sort((a, b) => b.tags.length - a.tags.length || b.cardRevenue12m - a.cardRevenue12m);
    return list;
  }, [filterTag]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.keys(tagColors).forEach(t => counts[t] = 0);
    companies.forEach(c => c.tags.forEach(t => counts[t]++));
    return counts;
  }, []);

  if (selected) {
    const c = selected;
    return (
      <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#0A0A0B", minHeight: "100vh", color: "#A1A1AA" }}>
        <div style={{ borderBottom: "1px solid #141416", padding: "14px 32px" }}>
          <span onClick={() => setSelected(null)} style={{ cursor: "pointer", color: "#52525B", fontSize: 12, padding: "4px 12px", border: "1px solid #1E1E22", borderRadius: 3 }}>Back</span>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 32px" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: "#ECECEE", margin: "0 0 4px" }}>{c.name}</h1>
          <div style={{ fontSize: 12, color: "#3F3F46", marginBottom: 28 }}>{c.domain} · {c.industry} · {c.employees.toLocaleString()} employees · {c.segment === "DTC" ? "DTC" : c.locations + " locations"}</div>

          {c.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
              {c.tags.map((tag, i) => {
                const color = tagColors[tag];
                return (
                  <div key={i} style={{ background: color.bg, border: `1px solid ${color.border}`, borderRadius: 4, padding: "8px 14px" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: color.text, marginBottom: 3 }}>{tag}</div>
                    <div style={{ fontSize: 11, color: "#52525B", lineHeight: 1.5 }}>{tagDescs[tag]}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#2A2A2E", textTransform: "uppercase", marginBottom: 12 }}>Transaction Data</div>
              {[
                ["12m Revenue", fmt(c.cardRevenue12m)],
                ["YoY Growth", (c.yoyGrowth >= 0 ? "+" : "") + (c.yoyGrowth * 100).toFixed(0) + "%"],
                ["Refund Rate", (c.refundRate * 100).toFixed(1) + "%"],
                ["Avg Tx (12m)", "$" + c.avgTx12m.toFixed(2)],
                ["Avg Tx (1m)", "$" + c.avgTx1m.toFixed(2)],
              ].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #111113", fontSize: 12 }}>
                  <span style={{ color: "#3F3F46" }}>{l}</span><span style={{ color: "#A1A1AA" }}>{v}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#2A2A2E", textTransform: "uppercase", marginBottom: 12 }}>Operational</div>
              {[
                ["Peak Month", monthNames[c.peakMonth - 1]],
                ["Until Peak", c.monthsUntilPeak === 0 ? "NOW" : c.monthsUntilPeak + " months"],
                ["Hiring Velocity", c.hiringVelocity.toFixed(1) + "x"],
                ["Risk/Legal Hire", c.hasRiskHire ? "Yes" : "No"],
                ["Locations", c.segment === "DTC" ? "n/a" : c.locations.toString()],
              ].map(([l, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #111113", fontSize: 12 }}>
                  <span style={{ color: "#3F3F46" }}>{l}</span><span style={{ color: "#A1A1AA" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#0A0A0B", minHeight: "100vh", color: "#A1A1AA" }}>
      <div style={{ borderBottom: "1px solid #141416", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#2A2A2E", textTransform: "uppercase" }}>GTM Intelligence</div>
        <div style={{ fontSize: 11, color: "#1E1E22" }}>{sorted.length} companies</div>
      </div>

      <div style={{ padding: "20px 32px" }}>
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          <div onClick={() => setFilterTag("ALL")} style={{
            cursor: "pointer", padding: "5px 12px", borderRadius: 3, fontSize: 11,
            border: filterTag === "ALL" ? "1px solid #3F3F46" : "1px solid #141416",
            color: filterTag === "ALL" ? "#A1A1AA" : "#3F3F46"
          }}>All ({companies.length})</div>
          {Object.keys(tagColors).map(tag => {
            const c = tagColors[tag];
            return (
              <div key={tag} onClick={() => setFilterTag(filterTag === tag ? "ALL" : tag)} style={{
                cursor: "pointer", padding: "5px 12px", borderRadius: 3, fontSize: 11,
                border: `1px solid ${filterTag === tag ? c.border : "#141416"}`,
                color: filterTag === tag ? c.text : "#3F3F46",
                background: filterTag === tag ? c.bg : "transparent"
              }}>{tag} ({tagCounts[tag]})</div>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1E1E22" }}>
                {["Company", "Revenue", "YoY", "Refund %", "Avg Tx", "Peak", "Hiring", "Locations", "Signals"].map((h, i) => (
                  <th key={i} style={{
                    textAlign: i === 8 ? "left" : i >= 1 ? "right" : "left",
                    padding: "10px 10px",
                    fontSize: 10, letterSpacing: 2, color: "#2A2A2E", textTransform: "uppercase", fontWeight: 600
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => (
                <tr key={i} onClick={() => setSelected(c)} style={{ cursor: "pointer", borderBottom: "1px solid #111113" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#0E0E10"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ fontSize: 13, color: "#ECECEE", fontWeight: 500 }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: "#2A2A2E", marginTop: 1 }}>{c.industry}</div>
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: "#52525B" }}>{fmt(c.cardRevenue12m)}</td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: c.yoyGrowth < 0 ? "#E8798A" : "#52525B" }}>
                    {(c.yoyGrowth >= 0 ? "+" : "") + (c.yoyGrowth * 100).toFixed(0)}%
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: c.refundRate > 0.035 ? "#E8B068" : "#52525B" }}>
                    {(c.refundRate * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: c.avgTx1m < c.avgTx12m * 0.92 ? "#A78BDB" : "#52525B" }}>
                    ${c.avgTx1m.toFixed(0)}
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: (c.monthsUntilPeak <= 3) ? "#6AADCF" : "#2A2A2E" }}>
                    {monthNames[c.peakMonth - 1]}
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: c.hiringVelocity > 1.5 && !c.hasRiskHire ? "#6ECF7A" : "#2A2A2E" }}>
                    {c.hiringVelocity.toFixed(1)}x
                  </td>
                  <td style={{ padding: "12px 10px", fontSize: 12, textAlign: "right", color: "#2A2A2E" }}>
                    {c.segment === "DTC" ? "n/a" : c.locations}
                  </td>
                  <td style={{ padding: "12px 10px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {c.tags.length === 0 ? (
                        <span style={{ fontSize: 10, color: "#1E1E22" }}>—</span>
                      ) : c.tags.map((tag, j) => {
                        const col = tagColors[tag];
                        return (
                          <span key={j} style={{
                            fontSize: 10, padding: "2px 7px", borderRadius: 2,
                            background: col.bg, border: `1px solid ${col.border}`, color: col.text,
                            whiteSpace: "nowrap"
                          }}>{tag}</span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
