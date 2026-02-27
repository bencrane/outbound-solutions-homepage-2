import { useState } from "react";

const SAMPLE = {
  company: "Apex Freight Solutions",
  city: "Columbus",
  state: "OH",
  revenue: "$8.2M",
  avgDSO: "47 days",
  industryAvgDSO: "34 days",
  annualCost: "$127,000",
  invoiceVolume: "~320/mo",
};

export default function LunosPostcard() {
  const [side, setSide] = useState("front");
  const c = SAMPLE;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#f5f0eb", minHeight: "100vh", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 700, width: "100%", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "DM Serif Display", fontSize: 28, color: "#1a1a1a", margin: "0 0 4px" }}>Lunos — Direct Mail Concept</h1>
        <p style={{ fontSize: 14, color: "#666", margin: 0 }}>Personalized AR cost postcard. Data from Enigma + industry benchmarks.</p>
      </div>

      {/* Side toggle */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
        <button onClick={() => setSide("front")} style={{ padding: "8px 20px", fontSize: 13, fontFamily: "DM Sans", fontWeight: 600, border: "none", borderRadius: 20, cursor: "pointer", background: side === "front" ? "#1a1a1a" : "#e0dbd5", color: side === "front" ? "#fff" : "#666" }}>Front</button>
        <button onClick={() => setSide("back")} style={{ padding: "8px 20px", fontSize: 13, fontFamily: "DM Sans", fontWeight: 600, border: "none", borderRadius: 20, cursor: "pointer", background: side === "back" ? "#1a1a1a" : "#e0dbd5", color: side === "back" ? "#fff" : "#666" }}>Back</button>
      </div>

      {/* Postcard */}
      {side === "front" ? (
        <div style={{ width: 660, minHeight: 420, background: "#0f1419", borderRadius: 12, padding: "44px 48px", position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
          {/* Subtle top accent */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #34d399, #06b6d4)" }} />

          {/* Logo */}
          <div style={{ fontSize: 18, fontWeight: 700, color: "#34d399", letterSpacing: "-0.02em", marginBottom: 32 }}>lunos</div>

          {/* Greeting */}
          <p style={{ fontSize: 13, color: "#34d399", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>{c.company}</p>

          {/* Headline */}
          <h2 style={{ fontFamily: "DM Serif Display", fontSize: 32, color: "#e6edf3", margin: "0 0 8px", lineHeight: 1.2 }}>
            Late payments are costing<br />your business <span style={{ color: "#34d399" }}>{c.annualCost}/yr</span>
          </h2>

          <p style={{ fontSize: 14, color: "#7d8590", margin: "0 0 32px", lineHeight: 1.6, maxWidth: 460 }}>
            We analyzed public data for freight companies your size in {c.state}. Here's what we found:
          </p>

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
                <div style={{ fontSize: 22, fontWeight: 700, color: d.color, fontFamily: "DM Sans" }}>{d.value}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 14, color: "#c9d1d9", margin: "0 0 4px" }}>See what faster collections could look like for {c.company}.</p>
              <p style={{ fontSize: 12, color: "#484f58", margin: 0 }}>Free — takes 2 minutes. No credit card required.</p>
            </div>
            <div style={{ background: "linear-gradient(135deg, #34d399, #06b6d4)", borderRadius: 8, padding: "12px 24px", fontSize: 14, fontWeight: 600, color: "#0f1419", whiteSpace: "nowrap" }}>
              lunos.ai/review/{c.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: 660, minHeight: 420, background: "#faf8f5", borderRadius: 12, padding: "44px 48px", position: "relative", overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.1)", display: "flex" }}>
          {/* Left side - message */}
          <div style={{ flex: 1, paddingRight: 40, borderRight: "1px solid #e0dbd5" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#34d399", marginBottom: 24 }}>lunos</div>

            <p style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 16px" }}>
              <strong>{c.company}</strong> processes an estimated {c.invoiceVolume} invoices monthly. At a {c.avgDSO} average collection cycle, that's {String(parseInt(c.avgDSO) - parseInt(c.industryAvgDSO))} days slower than the industry average.
            </p>

            <p style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 16px" }}>
              Those extra days tie up cash that could be fueling growth, reducing your dependence on factoring, or simply sitting in your account earning interest.
            </p>

            <p style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 24px" }}>
              Lunos is an AI partner that handles AR follow-ups, payment reminders, and collections conversations — 24/7, in your tone, without adding headcount.
            </p>

            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>
              See your personalized savings estimate at:
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>
              lunos.ai/review/{c.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
            </p>
          </div>

          {/* Right side - address block */}
          <div style={{ flex: "0 0 220px", paddingLeft: 40, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 12, color: "#999", margin: "0 0 4px" }}>FROM</p>
              <p style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.5, margin: "0 0 32px" }}>
                Lunos, Inc.<br />
                548 Market St #72834<br />
                San Francisco, CA 94104
              </p>

              <p style={{ fontSize: 12, color: "#999", margin: "0 0 4px" }}>TO</p>
              <p style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.5, margin: 0 }}>
                Finance Department<br />
                {c.company}<br />
                {c.city}, {c.state}
              </p>
            </div>

            <div style={{ width: 80, height: 80, border: "2px solid #e0dbd5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#999", textAlign: "center" }}>
              QR Code
            </div>
          </div>
        </div>
      )}

      {/* Annotation */}
      <div style={{ maxWidth: 660, width: "100%", marginTop: 24, fontSize: 12, color: "#999", lineHeight: 1.6 }}>
        <strong>Data sources:</strong> Revenue and invoice volume from Enigma transaction data. DSO estimated from industry benchmarks by company size and vertical. Annual cost calculated from (actual DSO − industry avg DSO) × (daily revenue). Personalized URL routes to a landing page with pre-filled company profile.
      </div>
    </div>
  );
}