import { LumosCompanyData } from "./types";

interface EnvelopeProps {
  company: LumosCompanyData;
}

export function Envelope({ company: c }: EnvelopeProps) {
  return (
    <div style={{
      width: 890,
      height: 410,
      background: "#faf8f5",
      borderRadius: 4,
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      {/* Left accent stripe */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(180deg, #34d399, #06b6d4)" }} />

      {/* Return address */}
      <div style={{ position: "absolute", top: 32, left: 40, fontSize: 12, color: "#666", lineHeight: 1.5 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399", marginBottom: 8 }}>lunos</div>
        Lunos, Inc.<br />
        548 Market St #72834<br />
        San Francisco, CA 94104
      </div>

      {/* Teaser text */}
      <div style={{
        position: "absolute",
        top: 32,
        right: 40,
        textAlign: "right",
      }}>
        <div style={{ fontSize: 11, color: "#999", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>Time-sensitive</div>
        <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>Your AR costs analysis enclosed</div>
      </div>

      {/* Recipient address - centered */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 15, color: "#1a1a1a", lineHeight: 1.6 }}>
          <strong>Finance Department</strong><br />
          {c.company}<br />
          {c.city}, {c.state}
        </div>
      </div>

      {/* Bottom teaser */}
      <div style={{
        position: "absolute",
        bottom: 32,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}>
        <div style={{ fontSize: 13, color: "#666" }}>
          <span style={{ color: "#f87171", fontWeight: 600 }}>{c.annualCost}/yr</span> — estimated cost of slow collections
        </div>
        <div style={{ fontSize: 11, color: "#999" }}>
          Personalized analysis inside →
        </div>
      </div>
    </div>
  );
}
