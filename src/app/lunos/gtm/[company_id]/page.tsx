"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Target {
  company_id: number;
  company_name: string;
  company_description: string;
  primary_industry: string;
  company_size: string;
  company_location: string;
  domain: string;
  company_linkedin_url: string;
  annual_estimated_revenue: string;
  total_sales_hires: number;
  total_finance_hires: number;
  sales_hires_within_6_months: number;
  finance_hires_within_6_months: number;
  contact_id: number;
  contact_full_name: string;
  contact_raw_job_title: string;
  contact_normalized_job_title: string;
  contact_linkedin_url: string;
}

interface DashboardData {
  success: boolean;
  total: number;
  data: Target[];
}

function computeMetrics(t: Target) {
  const { total_sales_hires, total_finance_hires, sales_hires_within_6_months, finance_hires_within_6_months } = t;

  const stf_ratio_now = total_finance_hires > 0 ? total_sales_hires / total_finance_hires : null;

  const sales_then = total_sales_hires - sales_hires_within_6_months;
  const finance_then = total_finance_hires - finance_hires_within_6_months;
  const stf_ratio_then = finance_then > 0 ? sales_then / finance_then : null;

  const sales_growth_pct = sales_then > 0 ? (sales_hires_within_6_months / sales_then) * 100 : 0;
  const finance_growth_pct = finance_then > 0 ? (finance_hires_within_6_months / finance_then) * 100 : 0;

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

function getProfileClosing(profile: string): string {
  switch (profile) {
    case "Crisis & Ignoring It":
      return "That means they're in crisis and not acting on it.";
    case "Crisis & Hiring Through It":
      return "That means they're in crisis and trying to hire their way out.";
    case "Resolved Through Hiring":
      return "That means they just got out of crisis territory by increasing finance headcount.";
    case "Early Warning":
      return "That means they're trending toward a staffing imbalance.";
    case "Balanced":
      return "That means their finance team has kept pace with sales. No action.";
    default:
      return "";
  }
}

export default function LunosCompanyPage() {
  const params = useParams();
  const [company, setCompany] = useState<Target | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.revenueinfra.com/read/lunos/targets");
        if (!res.ok) throw new Error("Failed to fetch");
        const json: DashboardData = await res.json();
        const found = json.data.find((t) => t.company_id === Number(params.company_id));
        setCompany(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.company_id]);

  if (loading) {
    return (
      <div style={{ background: "#000", color: "#666", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (!company) {
    return (
      <div style={{ background: "#000", color: "#666", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        Not found
      </div>
    );
  }

  const m = computeMetrics(company);
  const salaryEstimate = company.finance_hires_within_6_months * 75000;

  const descriptionLine1 = `${company.company_name} has ${company.total_sales_hires} salespeople and ${company.total_finance_hires} finance people. Each finance employee is currently supporting ${m.stf_ratio_now !== null ? m.stf_ratio_now.toFixed(1) : "N/A"} salespeople.`;

  const descriptionLine2 = `Six months ago each finance employee was supporting ${m.stf_ratio_then !== null ? m.stf_ratio_then.toFixed(1) : "N/A"} salespeople. In that period they added ${company.sales_hires_within_6_months} salespeople and ${company.finance_hires_within_6_months} finance people.${company.finance_hires_within_6_months > 0 ? ` That's an estimated $${salaryEstimate.toLocaleString()} in annual salary to close the gap.` : ""}`;

  const descriptionLine3 = getProfileClosing(m.profile);

  return (
    <div style={{ background: "#000", color: "#e5e5e5", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px" }}>

        {/* Back link */}
        <Link
          href="/lunos/gtm"
          style={{ fontSize: 13, color: "#666", textDecoration: "none", display: "inline-block", marginBottom: 32 }}
        >
          ← Back to targets
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 600, color: "#fff", margin: 0 }}>{company.company_name}</h1>
          <p style={{ fontSize: 14, color: "#888", margin: "8px 0 0" }}>
            {company.primary_industry} · {company.company_size} · {company.annual_estimated_revenue}
          </p>
          <p style={{ fontSize: 14, color: "#666", margin: "4px 0 0" }}>
            {company.company_location}
          </p>
        </div>

        {/* Urgency Profile */}
        <div style={{ marginBottom: 32, padding: "16px 20px", background: "#111", border: "1px solid #222", borderRadius: 8 }}>
          <div style={{ fontSize: 11, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Urgency Profile</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: m.profile === "Crisis & Ignoring It" ? "#ef4444" : m.profile === "Crisis & Hiring Through It" ? "#f97316" : "#999" }}>
            {m.profile}
          </div>
        </div>

        {/* GTM Analysis */}
        <div style={{ marginBottom: 32, padding: "16px 20px", background: "#111", border: "1px solid #222", borderRadius: 8 }}>
          <h2 style={{ fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.05em", margin: "0 0 12px", textTransform: "uppercase" }}>
            GTM Analysis
          </h2>
          <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.8, margin: "0 0 12px" }}>
            {descriptionLine1}
          </p>
          <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.8, margin: "0 0 12px" }}>
            {descriptionLine2}
          </p>
          <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.8, margin: 0 }}>
            {descriptionLine3}
          </p>
        </div>

        {/* Key Metrics */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.05em", margin: "0 0 16px", textTransform: "uppercase" }}>
            Key Metrics
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ padding: "12px 16px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Sales Team % Change (6mo)</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>{m.sales_growth_pct > 0 ? "+" : ""}{m.sales_growth_pct.toFixed(0)}%</div>
            </div>
            <div style={{ padding: "12px 16px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Finance Team % Change (6mo)</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>{m.finance_growth_pct > 0 ? "+" : ""}{m.finance_growth_pct.toFixed(0)}%</div>
            </div>
            <div style={{ padding: "12px 16px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Salespeople per Finance Employee (Now)</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>{m.stf_ratio_now !== null ? m.stf_ratio_now.toFixed(1) : "—"}</div>
            </div>
            <div style={{ padding: "12px 16px", background: "#0a0a0a", border: "1px solid #222", borderRadius: 6 }}>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 4 }}>Salespeople per Finance Employee (6mo Ago)</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#fff" }}>{m.stf_ratio_then !== null ? m.stf_ratio_then.toFixed(1) : "—"}</div>
            </div>
          </div>
        </div>

        {/* Company Website */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #222" }}>
          <a
            href={`https://${company.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 14, color: "#60a5fa", textDecoration: "none" }}
          >
            Visit {company.domain} →
          </a>
        </div>

      </div>
    </div>
  );
}
