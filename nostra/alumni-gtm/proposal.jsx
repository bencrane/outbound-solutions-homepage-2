"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NostraProposal() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      router.push("/nostra/alumnigtm/proposal/payment");
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
            This agreement covers the <strong style={{ color: "#e8e8e8", fontWeight: 600 }}>full build and delivery</strong> of one Alumni GTM Intelligence system. Client provides customer list (up to 500 accounts) and target job titles. Dashboard and data are hosted on provider infrastructure for up to one year. 30 days of support included post-delivery. Payment of $10,000 is due upon signature.
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
            Deliverables listed above represent the intended scope and may be adjusted by the provider based on data availability and technical feasibility. Given that, the appearance of the final delivered product may differ from what is described above. Lead volume depends on the size and profile of the customer list provided.
          </p>
        </div>

        {/* SIGNATURES - HIDDEN FOR NOW
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
        */}

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
