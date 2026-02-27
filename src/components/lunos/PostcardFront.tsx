import { LumosCompanyData } from "./types";

interface PostcardFrontProps {
  company: LumosCompanyData;
}

export function PostcardFront({ company: c }: PostcardFrontProps) {
  return (
    <div style={{
      width: 660,
      minHeight: 420,
      background: "#0f1419",
      borderRadius: 12,
      padding: "44px 48px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      {/* Subtle top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #34d399, #06b6d4)" }} />

      {/* Top row with logo and badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        {/* Logo */}
        <div style={{ fontSize: 18, fontWeight: 700, color: "#34d399", letterSpacing: "-0.02em" }}>Lunos</div>

        {/* Company badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(52, 211, 153, 0.1)",
          border: "1px solid rgba(52, 211, 153, 0.3)",
          borderRadius: 100,
          padding: "8px 16px",
        }}>
          <span style={{ color: "#34d399", fontSize: 12 }}>★</span>
          <span style={{ color: "#34d399", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.company}</span>
        </div>
      </div>

      {/* Headline */}
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#e6edf3", margin: "0 0 32px", lineHeight: 1.2 }}>
        Late payments are costing<br />your business <span style={{ color: "#34d399" }}>{c.annualCost}/yr</span>
      </h2>

      {/* Data cards */}
      <div style={{ display: "flex", gap: 2, background: "#1b2332", borderRadius: 10, overflow: "hidden", marginBottom: 32 }}>
        {[
          { label: "YOUR EST. DSO", value: c.avgDSO, color: "#f87171" },
          { label: "INDUSTRY AVG", value: c.industryAvgDSO, color: "#34d399" },
          { label: "MONTHLY INVOICES", value: c.invoiceVolume, color: "#e6edf3" },
          { label: "ANNUAL REVENUE", value: c.revenue, color: "#e6edf3" },
        ].map((d, i) => (
          <div key={i} style={{ flex: 1, background: "#0f1419", padding: "16px 18px" }}>
            <div style={{ fontSize: 9, color: "#484f58", letterSpacing: "0.1em", fontWeight: 600, marginBottom: 6 }}>{d.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: d.color, fontFamily: "'DM Sans', sans-serif" }}>{d.value}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 12,
        padding: "16px 24px",
      }}>
        <p style={{ fontSize: 14, color: "#c9d1d9", margin: 0, whiteSpace: "nowrap" }}>Curious to know more? See for yourself →</p>
        <div style={{ background: "linear-gradient(135deg, #34d399, #06b6d4)", borderRadius: 8, padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#0f1419", whiteSpace: "nowrap" }}>
          Lunos.ai/review/{c.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
        </div>
      </div>
    </div>
  );
}
