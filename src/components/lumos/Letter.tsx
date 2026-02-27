import { LumosCompanyData } from "./types";

interface LetterProps {
  company: LumosCompanyData;
}

export function Letter({ company: c }: LetterProps) {
  const dsoDiff = parseInt(c.avgDSO) - parseInt(c.industryAvgDSO);
  const personalizedUrl = `lunos.ai/review/${c.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`;

  return (
    <div style={{
      width: 680,
      background: "#fff",
      borderRadius: 4,
      padding: "56px 64px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      {/* Letterhead */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#34d399" }}>lunos</div>
        <div style={{ fontSize: 11, color: "#999", textAlign: "right", lineHeight: 1.5 }}>
          Lunos, Inc.<br />
          548 Market St #72834<br />
          San Francisco, CA 94104
        </div>
      </div>

      {/* Date & recipient */}
      <div style={{ fontSize: 13, color: "#666", marginBottom: 32, lineHeight: 1.6 }}>
        <div style={{ marginBottom: 16 }}>February 2025</div>
        <div>
          Finance Department<br />
          {c.company}<br />
          {c.city}, {c.state}
        </div>
      </div>

      {/* Headline callout */}
      <div style={{
        background: "#0f1419",
        borderRadius: 10,
        padding: "24px 28px",
        marginBottom: 32,
      }}>
        <div style={{ fontSize: 12, color: "#34d399", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>
          Your AR Analysis
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Est. DSO", value: c.avgDSO, color: "#f87171" },
            { label: "Industry Avg", value: c.industryAvgDSO, color: "#34d399" },
            { label: "Gap", value: `${dsoDiff} days`, color: "#fbbf24" },
            { label: "Annual Cost", value: c.annualCost, color: "#f87171" },
          ].map((d, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ fontSize: 9, color: "#7d8590", letterSpacing: "0.08em", marginBottom: 4 }}>{d.label.toUpperCase()}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: d.color }}>{d.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Letter body */}
      <div style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.8, marginBottom: 32 }}>
        <p style={{ margin: "0 0 16px" }}>
          <strong>{c.company}</strong> processes an estimated {c.invoiceVolume} invoices monthly with annual revenue of {c.revenue}.
        </p>
        <p style={{ margin: "0 0 16px" }}>
          Based on industry data for freight companies your size, your collections cycle is approximately <strong>{dsoDiff} days slower</strong> than the industry average. That gap is costing you an estimated <strong style={{ color: "#f87171" }}>{c.annualCost} per year</strong> in delayed cash flow.
        </p>
        <p style={{ margin: "0 0 16px" }}>
          Lunos is an AI partner that handles AR follow-ups, payment reminders, and collections conversations — 24/7, in your tone, without adding headcount.
        </p>
        <p style={{ margin: 0 }}>
          See your personalized savings estimate:
        </p>
      </div>

      {/* CTA */}
      <div style={{
        background: "linear-gradient(135deg, #34d399, #06b6d4)",
        borderRadius: 8,
        padding: "16px 24px",
        display: "inline-block",
        marginBottom: 40,
      }}>
        <div style={{ fontSize: 11, color: "rgba(15,20,25,0.6)", marginBottom: 2 }}>Visit your personalized page</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#0f1419" }}>{personalizedUrl}</div>
      </div>

      {/* Signature */}
      <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
        <div>
          The Lunos Team<br />
          <span style={{ color: "#34d399" }}>lunos.ai</span>
        </div>
      </div>
    </div>
  );
}
