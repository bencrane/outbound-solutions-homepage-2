import { LumosCompanyData } from "./types";

interface PostcardBack2Props {
  company: LumosCompanyData;
}

export function PostcardBack2({ company: c }: PostcardBack2Props) {
  return (
    <div style={{
      width: 720,
      height: 480,
      background: "#fafaf9",
      borderRadius: 6,
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    }}>
      {/* Left side */}
      <div style={{
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px dashed #d4d4d4",
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>
            lumos<span style={{ color: "#3b82f6" }}>.ai</span>
          </div>

          <div style={{
            background: "rgba(245, 158, 11, 0.1)",
            border: "1px solid rgba(245, 158, 11, 0.25)",
            color: "#b45309",
            fontSize: 10,
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: 4,
            display: "inline-block",
            marginBottom: 16,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}>
            Personalized for your company
          </div>

          <h3 style={{
            fontFamily: "'Instrument Serif', 'DM Serif Display', serif",
            fontSize: 22,
            color: "#0f172a",
            lineHeight: 1.3,
            marginBottom: 16,
          }}>
            Your collections data suggests you&apos;re leaving money on the table.
          </h3>

          <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.65, marginBottom: 20 }}>
            We reviewed public financial signals and compared your payment cycle
            against 2,400+ companies of similar size in your industry. Based on your
            revenue profile and sector benchmarks, we&apos;ve estimated what late payments
            may be costing your business annually.
          </p>
        </div>

        <div>
          {/* Stats row */}
          <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
            {[
              { value: c.revenue, label: "Est. Annual Revenue" },
              { value: c.industryAvgDSO, label: "Industry Avg DSO" },
              { value: c.state, label: "Home State" },
            ].map((stat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.5px" }}>{stat.value}</div>
                <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{
              background: "#0f172a",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              padding: "10px 20px",
              borderRadius: 6,
            }}>
              lumos.ai/reveal
            </div>
            <div style={{ color: "#94a3b8", fontSize: 11 }}>
              Guess your number →<br />Everyone wins a gift.
            </div>
          </div>

          {/* Fine print */}
          <div style={{ fontSize: 9, color: "#94a3b8", lineHeight: 1.5 }}>
            No purchase necessary. All participants receive a minimum $10 digital gift card upon submission.
            See lumos.ai/reveal/rules for full terms.
          </div>
        </div>
      </div>

      {/* Right side */}
      <div style={{
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Postage */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{
            width: 64,
            height: 72,
            border: "2px solid #d4d4d4",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: 1,
            textAlign: "center",
            lineHeight: 1.3,
          }}>
            First<br />Class<br />Postage
          </div>
        </div>

        {/* Recipient */}
        <div style={{ paddingTop: 40 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Sarah Mitchell</div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>VP of Finance</div>
          <div style={{ width: 40, height: 2, background: "#e2e8f0", marginBottom: 12 }} />
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>{c.company}</div>
          <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
            3847 Commerce Drive<br />
            {c.city}, {c.state} 62704
          </div>
        </div>
      </div>
    </div>
  );
}
