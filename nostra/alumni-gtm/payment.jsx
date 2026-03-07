"use client";

export default function NostraPayment() {
  const copyText = (text, btnId) => {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.textContent = "Copied";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 2000);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans flex items-center justify-center p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@500&family=Fraunces:ital,wght@0,600;0,700;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .copy-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #777;
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>
      <div style={{ maxWidth: 480, width: "100%", animation: "fadeUp 0.6s ease both" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#6C3AED",
            color: "white",
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.5px",
            padding: "8px 18px",
            borderRadius: 100,
            marginBottom: 20,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            ACH TRANSFER
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Payment Instructions</h1>
          <p style={{ color: "#777", fontSize: 15 }}>Complete your payment via ACH bank transfer</p>
        </div>

        <div style={{
          background: "#141414",
          border: "1px solid #1e1e1e",
          borderRadius: 16,
          padding: 28,
          textAlign: "center",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 8 }}>Amount Due</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 48, fontWeight: 500, letterSpacing: "-1px" }}>$10,000</div>
        </div>

        <div style={{
          background: "#141414",
          border: "1px solid #1e1e1e",
          borderRadius: 16,
          padding: 24,
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 13, color: "#777", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, marginBottom: 16 }}>Account Details</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e1e1e" }}>
            <span style={{ color: "#777", fontSize: 14 }}>Account Name</span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Benjamin Jay Crane</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e1e1e" }}>
            <span style={{ color: "#777", fontSize: 14 }}>Account Number</span>
            <span style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              777879669
              <button id="copyAccount" className="copy-btn" onClick={() => copyText("777879669", "copyAccount")}>Copy</button>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e1e1e" }}>
            <span style={{ color: "#777", fontSize: 14 }}>Routing Number</span>
            <span style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace" }}>
              021000021
              <button id="copyRouting" className="copy-btn" onClick={() => copyText("021000021", "copyRouting")}>Copy</button>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e1e1e" }}>
            <span style={{ color: "#777", fontSize: 14 }}>Bank</span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>JPMorgan Chase Bank, N.A.</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
            <span style={{ color: "#777", fontSize: 14 }}>Address</span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>383 Madison Avenue, New York, NY 10179</span>
          </div>
        </div>

        <div style={{
          background: "rgba(34,197,94,0.1)",
          border: "1px solid rgba(34,197,94,0.15)",
          borderRadius: 12,
          padding: "16px 20px",
          fontSize: 13,
          color: "rgba(34,197,94,0.85)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          lineHeight: 1.5,
        }}>
          <svg style={{ minWidth: 18 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ACH transfers typically arrive within 1-3 business days.
        </div>
      </div>
    </div>
  );
}
