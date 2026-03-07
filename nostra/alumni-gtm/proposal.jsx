"use client";

import { useRef, useState, useEffect } from "react";

export default function NostraProposal() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = 150;
    }
  };

  const getCtx = () => canvasRef.current?.getContext("2d");

  const startDrawing = (x, y) => {
    setDrawing(true);
    setHasSigned(true);
    const ctx = getCtx();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (x, y) => {
    if (!drawing) return;
    const ctx = getCtx();
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#e8e8e8";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  };

  const stopDrawing = () => setDrawing(false);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) startDrawing(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!drawing) return;
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) draw(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const clearSig = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSigned(false);
    }
  };

  const submitSig = async () => {
    if (!hasSigned || !firstName || !lastName || !email) {
      alert("Please fill in all fields and sign the agreement.");
      return;
    }

    setIsSubmitting(true);

    const canvas = canvasRef.current;
    const signatureData = canvas?.toDataURL("image/png") || "";
    const signerName = `${firstName} ${lastName}`.trim();

    const proposalId = "nostra-alumnigtm-001";
    const payload = {
      signature: signatureData,
      signer_name: signerName,
      signer_email: email,
    };

    try {
      const response = await fetch(`https://api.serviceengine.xyz/api/public/proposals/${proposalId}/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deliverables = [
    { title: "Contact data", description: "Work email, mobile phone, and LinkedIn for every match." },
    { title: "Current role details", description: "Title, company, start date, and time in seat." },
    { title: "Employment history", description: "Previous role at your customer, tenure, and departure timing." },
    { title: "Company intelligence", description: "Headcount, headcount growth, industry, HQ location, funding stage, total raised, and tech stack." },
    { title: "Ecommerce signals", description: "Shopify and Shopify Plus identification where applicable." },
    { title: "Meta Ads intelligence", description: "Active campaigns, estimated monthly spend, creative samples, landing page URLs, and days running." },
    { title: "Google Ads intelligence", description: "Active campaigns, estimated spend, top keywords, and ad copy." },
    { title: "GTM briefing", description: "Per-lead memo summarizing who they are, what their company does, why they're a fit, and angles for outreach." },
    { title: "Full data export", description: "CSV export of all leads and enrichment data." },
  ];

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

  if (submitted) {
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
              <span style={{ color: "#777", fontSize: 14 }}>Bank</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>JPMorgan Chase Bank, N.A.</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e1e1e" }}>
              <span style={{ color: "#777", fontSize: 14 }}>Account Name</span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Benjamin Jay Crane</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e1e1e" }}>
              <span style={{ color: "#777", fontSize: 14 }}>Routing Number</span>
              <span style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                021000021
                <button id="copyRouting" className="copy-btn" onClick={() => copyText("021000021", "copyRouting")}>Copy</button>
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
              <span style={{ color: "#777", fontSize: 14 }}>Account Number</span>
              <span style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono', monospace" }}>
                777879669
                <button id="copyAccount" className="copy-btn" onClick={() => copyText("777879669", "copyAccount")}>Copy</button>
              </span>
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

          <p style={{ textAlign: "center", fontSize: 13, color: "#777", marginTop: 20 }}>
            This information has also been sent to {email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] p-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@500&family=Fraunces:ital,wght@0,600;0,700;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: 640, margin: "0 auto", animation: "fadeUp 0.6s ease both" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", padding: "48px 0 40px", borderBottom: "1px solid #1e1e1e", marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 8 }}>
            AlumniGTM Intelligence
          </h1>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: "#777", fontStyle: "italic", marginTop: 6, marginBottom: 4 }}>
            Prepared for Nostra
          </p>
          <p style={{ color: "#777", fontSize: 15 }}>Service Agreement</p>
          <div style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 4,
            marginTop: 20,
            background: "#141414",
            border: "1px solid #1e1e1e",
            padding: "12px 28px",
            borderRadius: 100,
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 36, fontWeight: 500 }}>$10,000</span>
            <span style={{ fontSize: 13, color: "#777", marginLeft: 8 }}>one-time</span>
          </div>
        </div>

        {/* OVERVIEW */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#555", fontWeight: 600, marginBottom: 16 }}>Overview</div>
          <p style={{ fontSize: 15, color: "#777", lineHeight: 1.75 }}>
            This agreement covers the <strong style={{ color: "#e8e8e8", fontWeight: 600 }}>full build and delivery</strong> of one Alumni GTM Intelligence system. Client provides customer list (up to 500 accounts) and target job titles. Payment of $10,000 is due upon signature. Dashboard and data are hosted on provider infrastructure for up to one year. 30 days of priority support included post-delivery.
          </p>
        </div>

        {/* DELIVERABLE CARD */}
        <div style={{ marginBottom: 36 }}>
          <div style={{
            background: "#141414",
            border: "1px solid #1e1e1e",
            borderRadius: 16,
            padding: 28,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                background: "rgba(106,173,207,0.15)",
              }}>
                📊
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 700 }}>GTM Intelligence Dashboard</div>
            </div>
            <p style={{ fontSize: 14, color: "#777", marginBottom: 20, lineHeight: 1.6 }}>
              A pipeline of people who already know your product—used it at a previous company—and are now in decision-making roles at companies that fit your ICP. Full contact and company intelligence on every qualified match.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {deliverables.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: "8px 0",
                    fontSize: 14,
                    color: "#777",
                    borderBottom: i < deliverables.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                  }}
                >
                  <span style={{ color: "#22c55e", fontSize: 15, marginTop: 1, minWidth: 18 }}>✓</span>
                  <span>
                    <strong style={{ color: "#e8e8e8", fontWeight: 500 }}>{item.title}</strong>
                    <br />
                    <span style={{ fontSize: 13, color: "#555", fontWeight: 400, marginTop: 2, display: "inline-block" }}>
                      {item.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DISCLOSURE */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#555", fontWeight: 600, marginBottom: 16 }}>Disclosure</div>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.75 }}>
            Deliverables listed above represent the intended scope and may be adjusted by the provider based on data availability and technical feasibility. The final system may differ from what is described. Lead volume depends on the size and profile of the customer list provided.
          </p>
        </div>

        {/* SIGNATURES */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid #1e1e1e" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#555", fontWeight: 600, marginBottom: 16 }}>Signature</div>

          <div style={{
            background: "#141414",
            border: "1px solid #1e1e1e",
            borderRadius: 16,
            padding: 28,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#555", fontWeight: 600, marginBottom: 12 }}>Your details</div>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #1e1e1e",
                  borderRadius: 8,
                  padding: "12px 14px",
                  color: "#e8e8e8",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #1e1e1e",
                  borderRadius: 8,
                  padding: "12px 14px",
                  color: "#e8e8e8",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  outline: "none",
                }}
              />
            </div>
            <input
              type="text"
              placeholder="Title (e.g., CEO, Head of Growth)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid #1e1e1e",
                borderRadius: 8,
                padding: "12px 14px",
                color: "#e8e8e8",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                outline: "none",
                marginBottom: 12,
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid #1e1e1e",
                borderRadius: 8,
                padding: "12px 14px",
                color: "#e8e8e8",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                outline: "none",
              }}
            />
            <p style={{ fontSize: 12, color: "#555", marginTop: 10 }}>A copy of this signed agreement will be sent to the email provided.</p>
          </div>

          <div style={{
            background: "#141414",
            border: "1px solid #1e1e1e",
            borderRadius: 16,
            padding: 28,
            marginBottom: 16,
          }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", color: "#555", fontWeight: 600, marginBottom: 12 }}>Sign below</div>
            <div style={{
              border: "1px solid #1e1e1e",
              borderRadius: 10,
              overflow: "hidden",
              position: "relative",
              marginBottom: 12,
            }}>
              <canvas
                ref={canvasRef}
                style={{ display: "block", width: "100%", height: 150, cursor: "crosshair" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={stopDrawing}
              />
              {!hasSigned && (
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#555",
                  fontSize: 15,
                  pointerEvents: "none",
                }}>
                  Sign here
                </div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                onClick={clearSig}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                Clear
              </button>
              <button
                onClick={submitSig}
                disabled={isSubmitting || !firstName || !lastName || !email || !hasSigned}
                style={{
                  background: "#333",
                  border: "none",
                  color: "#e8e8e8",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "12px 28px",
                  borderRadius: 10,
                  cursor: (!firstName || !lastName || !email || !hasSigned) ? "not-allowed" : "pointer",
                  opacity: (isSubmitting || !firstName || !lastName || !email || !hasSigned) ? 0.4 : 1,
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: 14, color: "#777", marginTop: 20, marginBottom: 40 }}>
            Payment instructions will be sent upon signature.
          </p>
        </div>

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
