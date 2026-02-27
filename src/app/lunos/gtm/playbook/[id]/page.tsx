"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface GTMBrief {
  overview: string;
  market_position: string;
  relevance_and_readiness: string;
  recommended_approach: string;
  takeaway: string;
}

interface AlumniLead {
  id: string;
  lead_name: string;
  lead_title: string;
  company_name: string;
  priority: number;
  past_employer_name: string;
  past_job_title: string;
  person_linkedin_url: string;
  has_gtm_brief: boolean;
  gtm_brief?: GTMBrief;
}

interface DashboardData {
  alumni_leads: AlumniLead[];
}

export default function LunosPlaybookPage() {
  const params = useParams();
  const [lead, setLead] = useState<AlumniLead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.revenueinfra.com/read/lunos/targets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const json: DashboardData = await res.json();
        const found = json.alumni_leads.find((l) => l.id === params.id);
        setLead(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ background: "#000", color: "#666", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!lead || !lead.gtm_brief) {
    return (
      <div style={{ background: "#000", color: "#666", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        Not found
      </div>
    );
  }

  const brief = lead.gtm_brief;

  return (
    <div style={{ background: "#000", color: "#e5e5e5", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px" }}>

        {/* Back link */}
        <Link
          href="/lunos/gtm"
          style={{ fontSize: 13, color: "#666", textDecoration: "none", display: "inline-block", marginBottom: 32 }}
        >
          ← Back to alumni leads
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, color: "#fff", margin: 0 }}>{lead.lead_name}</h1>
          <p style={{ fontSize: 16, color: "#888", margin: "8px 0 0" }}>
            {lead.lead_title} at {lead.company_name}
          </p>
          <p style={{ fontSize: 14, color: "#fde047", margin: "4px 0 0" }}>
            Previously {lead.past_job_title} at {lead.past_employer_name}
          </p>
        </div>

        {/* Memo sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {[
            { label: "Overview", text: brief.overview },
            { label: "Market Position", text: brief.market_position },
            { label: "Relevance & Readiness", text: brief.relevance_and_readiness },
            { label: "Recommended Approach", text: brief.recommended_approach },
            { label: "Takeaway", text: brief.takeaway },
          ].map((section) => (
            <div key={section.label}>
              <h2 style={{ fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.05em", margin: "0 0 12px", textTransform: "uppercase" }}>
                {section.label}
              </h2>
              <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.8, margin: 0 }}>
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* LinkedIn link */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #222" }}>
          <a
            href={lead.person_linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, color: "#60a5fa", textDecoration: "none" }}
          >
            View on LinkedIn →
          </a>
        </div>

      </div>
    </div>
  );
}
