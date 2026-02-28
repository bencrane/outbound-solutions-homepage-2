"use client";

import { useState, useEffect } from "react";
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

interface Customer {
  id: string;
  customer_name: string;
}

interface DashboardData {
  success: boolean;
  customers: Customer[];
  alumni_leads: AlumniLead[];
  leads_with_gtm_brief: number;
}

export function GTMDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.revenueinfra.com/read/gtm/dashboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain: "withcoverage.com" }),
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ background: "#000", color: "#666", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ background: "#000", color: "#f66", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        Error: {error}
      </div>
    );
  }

  const leads = data.alumni_leads.filter((l) => l.has_gtm_brief);
  const customers = [...new Set(leads.map((l) => l.past_employer_name))].sort();

  const filteredLeads = leads.filter((l) => {
    return customerFilter === "all" || l.past_employer_name === customerFilter;
  });

  const priorityLabel = (p: number) => p === 1 ? "High" : p === 2 ? "Medium" : "Low";
  const priorityColor = (p: number) => p === 1 ? "#4ade80" : p === 2 ? "#6b9b7a" : "#3d4a40";

  return (
    <div style={{ background: "#000", color: "#e5e5e5", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>

      
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#fff", margin: 0 }}>AlumniGTM for WithCoverage</h1>
          <p style={{ fontSize: 14, color: "#888", margin: "12px 0 0", maxWidth: 800, lineHeight: 1.6 }}>
            These are CFOs, Controllers, and VP-level operations leaders who previously worked at your current customers and now hold buying authority at companies with qualified complex insurance needs — multi-state operations, international supply chains, cold chain logistics, manufacturing, and franchise exposure. Every lead has been vetted on three dimensions: company fit, decision-making authority, and strength of the alumni connection.
          </p>
          <p style={{ fontSize: 13, color: "#555", margin: "16px 0 0" }}>
            {leads.length} leads from {customers.length} past customers
          </p>
        </div>

        {/* Filter button */}
        <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ background: "#111", border: "1px solid #333", borderRadius: 4, padding: "8px 14px", color: "#e5e5e5", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
          >
            <span>Filter by company</span>
            {customerFilter !== "all" && <span style={{ color: "#4ade80" }}>• {customerFilter}</span>}
          </button>
          {customerFilter !== "all" && (
            <button
              onClick={() => setCustomerFilter("all")}
              style={{ background: "transparent", border: "none", color: "#666", fontSize: 12, cursor: "pointer" }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Drawer */}
        {drawerOpen && (
          <div style={{ marginBottom: 24, background: "#0a0a0a", border: "1px solid #222", borderRadius: 8, padding: 16 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                onClick={() => { setCustomerFilter("all"); setDrawerOpen(false); }}
                style={{
                  background: customerFilter === "all" ? "#222" : "transparent",
                  border: "1px solid #333",
                  borderRadius: 4,
                  padding: "6px 12px",
                  color: customerFilter === "all" ? "#fff" : "#888",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                All ({leads.length})
              </button>
              {customers.map((c) => {
                const count = leads.filter(l => l.past_employer_name === c).length;
                const isActive = customerFilter === c;
                return (
                  <button
                    key={c}
                    onClick={() => { setCustomerFilter(c); setDrawerOpen(false); }}
                    style={{
                      background: isActive ? "#222" : "transparent",
                      border: "1px solid #333",
                      borderRadius: 4,
                      padding: "6px 12px",
                      color: isActive ? "#4ade80" : "#888",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    {c} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: "auto", border: "1px solid #222", borderRadius: 8 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222", background: "#0a0a0a" }}>
                {[
                  { label: "Name", width: 180 },
                  { label: "Current Company", width: 200 },
                  { label: "Current Role", width: 180 },
                  { label: "Prior Company", width: 160 },
                  { label: "Prior Role", width: 200 },
                  { label: "Rank", width: 80 },
                  { label: "GTM Analysis", width: 100 },
                ].map((h) => (
                  <th key={h.label} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", minWidth: h.width, whiteSpace: "nowrap" }}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((l) => (
                <tr key={l.id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                  <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                    <a href={l.person_linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>
                      {l.lead_name}
                    </a>
                  </td>
                  <td style={{ padding: "14px 16px", color: "#666", whiteSpace: "nowrap" }}>{l.company_name}</td>
                  <td style={{ padding: "14px 16px", color: "#999" }}>{l.lead_title}</td>
                  <td style={{ padding: "14px 16px", color: "#4ade80" }}>{l.past_employer_name}</td>
                  <td style={{ padding: "14px 16px", color: "#999" }}>{l.past_job_title}</td>
                  <td style={{ padding: "14px 16px", color: priorityColor(l.priority), fontSize: 13 }}>
                    {priorityLabel(l.priority)}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <Link
                      href={`/wc/gtm/playbook/${l.id}`}
                      style={{ background: "transparent", border: "1px solid #333", borderRadius: 4, padding: "6px 12px", color: "#888", fontSize: 12, textDecoration: "none", display: "inline-block" }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
