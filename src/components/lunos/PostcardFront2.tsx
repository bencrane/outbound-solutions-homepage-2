import { LumosCompanyData } from "./types";

interface PostcardFront2Props {
  company: LumosCompanyData;
}

export function PostcardFront2({ company: c }: PostcardFront2Props) {
  return (
    <div style={{
      width: 720,
      height: 480,
      background: "linear-gradient(135deg, #0a0f1a 0%, #0d1929 40%, #0a1628 100%)",
      borderRadius: 6,
      padding: "44px 48px",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      {/* Background glows */}
      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: -50,
        left: -50,
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
          Lunos<span style={{ color: "#3b82f6" }}>.ai</span>
        </div>
        <div style={{
          background: "rgba(16, 185, 129, 0.12)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
          color: "#10b981",
          fontSize: 11,
          fontWeight: 600,
          padding: "6px 14px",
          borderRadius: 100,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}>
          ★ Choice Logistics
        </div>
      </div>

      {/* Center content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'Instrument Serif', 'DM Serif Display', serif",
          fontSize: 42,
          color: "#fff",
          lineHeight: 1.15,
          marginBottom: 16,
          maxWidth: 520,
        }}>
          Late payments are costing<br />you <em style={{ color: "#f59e0b", fontStyle: "italic" }}>how much?</em>
        </h2>

        <div style={{
          display: "inline-flex",
          alignItems: "baseline",
          gap: 4,
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))",
          border: "1px solid rgba(245, 158, 11, 0.2)",
          padding: "6px 16px",
          borderRadius: 8,
          marginBottom: 20,
        }}>
          <span style={{ fontSize: 24, color: "#f59e0b", fontWeight: 700 }}>$</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, color: "#f59e0b", letterSpacing: 3 }}>■■,■■■</span>
          <span style={{ fontSize: 14, color: "#f59e0b", opacity: 0.7 }}>/yr</span>
        </div>
      </div>

      {/* Bottom CTA bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 12,
        padding: "12px 12px 12px 24px",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>
            Guess correctly and win up to <span style={{ color: "#10b981", fontWeight: 700 }}>$500</span>
          </span>
          <span style={{ color: "#64748b", fontSize: 16 }}>→</span>
        </div>
        <div style={{
          background: "#10b981",
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          padding: "10px 20px",
          borderRadius: 8,
        }}>
          Lunos.ai/reveal/choice-logistics
        </div>
      </div>
    </div>
  );
}
