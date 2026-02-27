"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Target {
  company_id: number;
  company_name: string;
  company_description: string;
  primary_industry: string;
  company_size: string;
  company_type: string;
  company_location: string;
  company_country: string;
  domain: string;
  company_linkedin_url: string;
  annual_estimated_revenue: string;
  total_sales_hires: number;
  total_finance_hires: number;
  sales_hires_within_6_months: number;
  finance_hires_within_6_months: number;
  contact_id: number;
  contact_first_name: string;
  contact_last_name: string;
  contact_full_name: string;
  contact_raw_job_title: string;
  contact_normalized_job_title: string;
  contact_location: string;
  contact_linkedin_url: string;
}

interface DashboardData {
  success: boolean;
  total: number;
  data: Target[];
}

const JOB_TITLE_MAP: Record<string, string> = {
  ceo: "CEO",
  chiefExecutiveOfficer: "CEO",
  coo: "COO",
  cfo: "CFO",
  vpOfRevenue: "VP of Revenue",
  vpFinance: "VP of Finance",
  accountsReceivable: "Accounts Receivable",
  accountsReceivableManager: "Accounts Receivable Manager",
  treasurer: "Treasurer",
  directorOfAccounting: "Director of Accounting",
  headOfFinance: "Head of Finance",
  headOfAR: "Head of AR",
  vpOfAccounting: "VP of Accounting",
};

function formatJobTitle(normalized: string): string {
  return JOB_TITLE_MAP[normalized] || normalized;
}

function getPriority(profile: string): { label: string; color: string } {
  switch (profile) {
    case "Crisis & Ignoring It":
      return { label: "High", color: "#4ade80" };
    case "Crisis & Hiring Through It":
      return { label: "High", color: "#4ade80" };
    case "Early Warning":
      return { label: "Medium", color: "#6b9b7a" };
    case "Resolved Through Hiring":
      return { label: "Low", color: "#3d4a40" };
    case "Balanced":
      return { label: "Low", color: "#3d4a40" };
    default:
      return { label: "", color: "#999" };
  }
}

function cleanContactName(name: string): string {
  return name
    .replace(/, CPA/gi, "")
    .replace(/, MBA/gi, "")
    .replace(/, LSSGB/gi, "")
    .replace(/MBA, LSSGB/gi, "")
    .trim();
}

function computeMetrics(t: Target) {
  const { total_sales_hires, total_finance_hires, sales_hires_within_6_months, finance_hires_within_6_months } = t;

  // stf_ratio_now = total_sales_hires / total_finance_hires
  const stf_ratio_now = total_finance_hires > 0 ? total_sales_hires / total_finance_hires : null;

  // stf_ratio_then = (total_sales - recent_sales) / (total_finance - recent_finance)
  const sales_then = total_sales_hires - sales_hires_within_6_months;
  const finance_then = total_finance_hires - finance_hires_within_6_months;
  const stf_ratio_then = finance_then > 0 ? sales_then / finance_then : null;

  // sales_growth_pct = (recent_sales / sales_then) * 100
  const sales_growth_pct = sales_then > 0 ? (sales_hires_within_6_months / sales_then) * 100 : 0;

  // finance_growth_pct = (recent_finance / finance_then) * 100
  const finance_growth_pct = finance_then > 0 ? (finance_hires_within_6_months / finance_then) * 100 : 0;

  // profile logic
  let profile = "";
  if (stf_ratio_now !== null && stf_ratio_then !== null) {
    if (stf_ratio_now >= 3 && stf_ratio_then >= 3 && finance_hires_within_6_months === 0) {
      profile = "Crisis & Ignoring It";
    } else if (stf_ratio_now >= 3 && stf_ratio_then >= 3 && finance_hires_within_6_months > 0) {
      profile = "Crisis & Hiring Through It";
    } else if (stf_ratio_now < 3 && stf_ratio_then >= 3) {
      profile = "Resolved Through Hiring";
    } else if (stf_ratio_now < 3 && stf_ratio_then < 3 && stf_ratio_now > stf_ratio_then) {
      profile = "Early Warning";
    } else if (stf_ratio_now < 3 && stf_ratio_then < 3 && stf_ratio_now <= stf_ratio_then) {
      profile = "Balanced";
    }
  }

  return { stf_ratio_now, stf_ratio_then, sales_growth_pct, finance_growth_pct, profile };
}

export function LunosGTMDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.revenueinfra.com/read/lunos/targets");
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        console.log("Lunos API response:", json);
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

  const targets = data.data
    .filter((t) => t.total_sales_hires >= 20 && t.total_finance_hires > 0)
    .sort((a, b) => a.contact_full_name.localeCompare(b.contact_full_name));

  return (
    <div style={{ background: "#000", color: "#e5e5e5", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ margin: "0 auto", padding: "48px 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, color: "#fff", margin: 0 }}>Lunos Targets</h1>
          <p style={{ fontSize: 14, color: "#888", margin: "12px 0 0", maxWidth: 900, lineHeight: 1.6 }}>
            This dashboard scores logistics companies based on how stretched their finance team is relative to their sales organization. The core metric — Salespeople per Finance Employee (STF) — shows how many salespeople each finance person is currently supporting. A higher number means fewer finance people handling the AR workload generated by a larger sales team.
          </p>
          <p style={{ fontSize: 14, color: "#888", margin: "12px 0 0", maxWidth: 900, lineHeight: 1.6 }}>
            Companies above the crisis threshold of 3.0 are either ignoring the imbalance or trying to hire their way out of it, both of which represent opportunities for Lunos. The STF Then column shows where this metric was 6 months ago, so you can see whether the situation is getting better, getting worse, or staying the same.
          </p>
          <p style={{ fontSize: 13, color: "#555", margin: "16px 0 0" }}>
            {targets.length} targets
          </p>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", border: "1px solid #222", borderRadius: 8, WebkitOverflowScrolling: "touch" }}>
          <table style={{ minWidth: 1100, borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #222", background: "#0a0a0a" }}>
                {[
                  { label: "Contact", width: 180, center: false },
                  { label: "Job Title", width: 160, center: false },
                  { label: "Company", width: 200, center: false },
                  { label: "Revenue", width: 100, center: false },
                  { label: "STF 6mo Ago", width: 90, center: true },
                  { label: "STF Now", width: 70, center: true },
                  { label: "Urgency Profile", width: 180, center: false },
                  { label: "Priority", width: 80, center: false },
                  { label: "GTM Analysis", width: 100, center: true },
                ].map((h) => (
                  <th key={h.label} style={{ padding: "12px 16px", textAlign: h.center ? "center" : "left", fontWeight: 500, color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", minWidth: h.width, whiteSpace: "nowrap" }}>{h.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {targets.map((t) => {
                const m = computeMetrics(t);
                return (
                  <tr key={`${t.company_id}-${t.contact_id}`} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                      <a href={t.contact_linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>
                        {cleanContactName(t.contact_full_name)}
                      </a>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#999" }}>{formatJobTitle(t.contact_normalized_job_title)}</td>
                    <td style={{ padding: "14px 16px", color: "#999" }}>
                      <a href={`https://${t.domain}`} target="_blank" rel="noopener noreferrer" style={{ color: "#999", textDecoration: "none" }}>
                        {t.company_name}
                      </a>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#666" }}>{t.annual_estimated_revenue}</td>
                    <td style={{ padding: "14px 16px", color: "#999", textAlign: "center" }}>{m.stf_ratio_then !== null ? m.stf_ratio_then.toFixed(1) : ""}</td>
                    <td style={{ padding: "14px 16px", textAlign: "center", color: m.stf_ratio_now !== null && m.stf_ratio_then !== null ? (m.stf_ratio_now < m.stf_ratio_then ? "#4ade80" : m.stf_ratio_now > m.stf_ratio_then ? "#ef4444" : "#999") : "#999" }}>{m.stf_ratio_now !== null ? m.stf_ratio_now.toFixed(1) : ""}</td>
                    <td style={{ padding: "14px 16px", color: m.profile === "Crisis & Ignoring It" ? "#ef4444" : m.profile === "Crisis & Hiring Through It" ? "#f97316" : "#999" }}>{m.profile}</td>
                    <td style={{ padding: "14px 16px", color: getPriority(m.profile).color }}>{getPriority(m.profile).label}</td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <Link
                        href={`/lunos/gtm/${t.company_id}`}
                        style={{ background: "transparent", border: "1px solid #333", borderRadius: 4, padding: "6px 12px", color: "#888", fontSize: 12, cursor: "pointer", textDecoration: "none", display: "inline-block" }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
