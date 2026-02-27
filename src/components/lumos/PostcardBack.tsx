import { LumosCompanyData } from "./types";

interface PostcardBackProps {
  company: LumosCompanyData;
}

export function PostcardBack({ company: c }: PostcardBackProps) {
  const dsoDiff = parseInt(c.avgDSO) - parseInt(c.industryAvgDSO);

  return (
    <div style={{
      width: 660,
      minHeight: 420,
      background: "#faf8f5",
      borderRadius: 12,
      padding: "44px 48px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
      display: "flex",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      {/* Left side - message */}
      <div style={{ flex: 1, paddingRight: 40, borderRight: "1px solid #e0dbd5" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#34d399", marginBottom: 24 }}>lunos</div>

        <p style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 16px" }}>
          <strong>{c.company}</strong> processes an estimated ~{c.invoiceVolume}/mo invoices monthly. At a {c.avgDSO} average collection cycle, that&apos;s {dsoDiff} days slower than the industry average.
        </p>

        <p style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 16px" }}>
          Those extra {dsoDiff} days tie up cash that could be fueling growth, reducing your dependence on factoring, or simply sitting in your account earning interest.
        </p>

        <p style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 24px" }}>
          Lumos is an AI partner that handles AR follow-ups, payment reminders, and collections conversations — 24/7, in your tone, without adding headcount.
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

      </div>
    </div>
  );
}
