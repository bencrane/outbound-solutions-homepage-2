"use client";

import { useState, useEffect, useMemo, useRef } from "react";

const COLORS = {
  bg: "#0A0A0B",
  bgElevated: "#0E0E10",
  border: "#1E1E22",
  borderSubtle: "#111113",
  text: "#A1A1AA",
  textMuted: "#52525B",
  textHighlight: "#ECECEE",
  accent: "#6AADCF",
  success: "#6ECF7A",
  error: "#E8798A",
};

export default function AlumniGTMPreview() {
  const [data, setData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [filterCompany, setFilterCompany] = useState("ALL");
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [gtmBrief, setGtmBrief] = useState(null);
  const [gtmBriefLoading, setGtmBriefLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("people");
  const [availableBriefs, setAvailableBriefs] = useState(new Set());
  const metaAdsRef = useRef(null);

  // Extract LinkedIn slug from URL
  const getLinkedInSlug = (url) => {
    if (!url) return null;
    const match = url.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };
  const googleAdsRef = useRef(null);

  // Format revenue range (e.g., "10m-50m" -> "$10M-$50M", or convert storeleads value to range)
  const formatRevenueRange = (range, storeleadsSales) => {
    // If we have the revenue_range from firmographics, format it
    if (range) {
      return range
        .replace(/(\d+)m/gi, (_, n) => `$${n}M`)
        .replace(/(\d+)b/gi, (_, n) => `$${n}B`)
        .replace(/over-/gi, "Over ")
        .replace(/-/g, "–");
    }
    // Fall back to storeleads estimated_sales_yearly, convert to range
    if (storeleadsSales) {
      const val = storeleadsSales;
      if (val >= 1000000000) return "Over $1B";
      if (val >= 500000000) return "$500M–$1B";
      if (val >= 200000000) return "$200M–$500M";
      if (val >= 100000000) return "$100M–$200M";
      if (val >= 50000000) return "$50M–$100M";
      if (val >= 10000000) return "$10M–$50M";
      if (val >= 5000000) return "$5M–$10M";
      if (val >= 1000000) return "$1M–$5M";
      if (val >= 500000) return "$500K–$1M";
      return "Under $500K";
    }
    return "—";
  };

  // Parse ad date (handles Unix timestamp or date string)
  const parseAdDate = (dateVal) => {
    if (!dateVal) return null;
    if (typeof dateVal === "string" && dateVal.includes("-")) {
      return new Date(dateVal).getTime();
    }
    return parseInt(dateVal, 10) * 1000;
  };

  // Calculate ad recency from most recent start_date
  const getAdRecency = (ads) => {
    if (!ads?.length) return null;
    const dates = ads.map(ad => parseAdDate(ad.start_date)).filter(Boolean);
    if (!dates.length) return null;
    const mostRecent = Math.max(...dates);
    const daysAgo = Math.floor((Date.now() - mostRecent) / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "Yesterday";
    if (daysAgo < 7) return `${daysAgo} days ago`;
    const weeks = Math.floor(daysAgo / 7);
    if (daysAgo < 30) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    const months = Math.floor(daysAgo / 30);
    if (daysAgo < 365) return `${months} month${months === 1 ? "" : "s"} ago`;
    const years = Math.floor(daysAgo / 365);
    return `${years} year${years === 1 ? "" : "s"} ago`;
  };

  // Get active ad count
  const getActiveAdCount = (ads) => {
    if (!ads?.length) return 0;
    return ads.filter(ad => ad.status === "active").length;
  };

  // Get time on platform (earliest start_date)
  const getTimeOnPlatform = (ads) => {
    if (!ads?.length) return null;
    const dates = ads.map(ad => parseAdDate(ad.start_date)).filter(Boolean);
    if (!dates.length) return null;
    const earliest = Math.min(...dates);
    const year = new Date(earliest).getFullYear();
    return `Since ${year}`;
  };

  // Get ad velocity (ads per month, bucketed)
  const getAdVelocity = (totalAds, ads) => {
    if (!ads?.length) return null;
    const dates = ads.map(ad => parseAdDate(ad.start_date)).filter(Boolean);
    if (!dates.length) return null;
    const earliest = Math.min(...dates);
    const months = Math.max(1, (Date.now() - earliest) / (1000 * 60 * 60 * 24 * 30));
    const adsPerMonth = totalAds / months;
    if (adsPerMonth >= 10) return "High";
    if (adsPerMonth >= 3) return "Medium";
    return "Low";
  };

  // Format size range compactly (e.g., "1,001-5,000 employees" -> "1k-5k")
  const formatSizeRange = (range) => {
    if (!range) return "—";
    const formatNum = (n) => {
      const num = parseInt(n.replace(/,/g, ""), 10);
      if (num >= 1000) return Math.round(num / 1000) + "k";
      return num.toString();
    };
    const match = range.match(/(\d[\d,]*)\s*[-–]\s*(\d[\d,]*)/);
    if (match) {
      return `${formatNum(match[1])}-${formatNum(match[2])}`;
    }
    return range.replace(/ employees?/i, "");
  };

  // Open GTM brief for a lead (from API or fallback to JSON file)
  const openGtmBrief = async (lead) => {
    // Use API data if available
    if (lead.gtm_brief) {
      setGtmBrief({ lead, data: lead.gtm_brief });
      return;
    }

    // Fallback to JSON file
    const slug = getLinkedInSlug(lead.person?.linkedin_url);
    if (!slug) return;

    setGtmBriefLoading(true);
    try {
      const res = await fetch(`/nostra_json/${slug}.json`);
      if (res.ok) {
        const json = await res.json();
        setGtmBrief({ lead, data: json.output });
      } else {
        setGtmBrief({ lead, data: null, error: "Brief not found" });
      }
    } catch (e) {
      setGtmBrief({ lead, data: null, error: e.message });
    } finally {
      setGtmBriefLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, customersRes] = await Promise.all([
          fetch("https://api.revenueinfra.com/v1/alumni-gtm/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ origin_company_domain: "nostra.ai" }),
          }),
          fetch("https://api.revenueinfra.com/read/gtm/dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ domain: "nostra.ai" }),
          }),
        ]);

        if (!leadsRes.ok) throw new Error("Failed to fetch leads");
        const leadsJson = await leadsRes.json();
        if (!leadsJson.success) throw new Error(leadsJson.error || "API error");
        setData(leadsJson);

        if (customersRes.ok) {
          const customersJson = await customersRes.json();
          if (customersJson.customers) {
            setCustomers(customersJson.customers);
          }
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Check which GTM brief files exist (for fallback)
  useEffect(() => {
    if (!data?.leads) return;
    const slugs = [...new Set(data.leads.map(l => getLinkedInSlug(l.person?.linkedin_url)).filter(Boolean))];

    Promise.all(
      slugs.map(async (slug) => {
        try {
          const res = await fetch(`/nostra_json/${slug}.json`, { method: "HEAD" });
          return res.ok ? slug : null;
        } catch {
          return null;
        }
      })
    ).then((results) => {
      setAvailableBriefs(new Set(results.filter(Boolean)));
    });
  }, [data]);

  const excludedCompanies = [
    "florida blue",
    "sage advocacy",
    "elisabeth morrow school",
    "priscilla & tiffany art",
    "details",
    "clinicas de salud del pueblo",
  ];

  const filtered = useMemo(() => {
    if (!data?.leads) return [];
    let list = [...data.leads];
    list = list.filter(l => l.prior_company?.gtm_fit);
    list = list.filter(l => !excludedCompanies.some(exc => l.current_company?.name?.toLowerCase().includes(exc)));
    if (filterCompany !== "ALL") {
      list = list.filter(l => l.prior_company?.name === filterCompany);
    }
    return list;
  }, [data, filterCompany]);

  const companies = useMemo(() => {
    if (!filtered.length) return [];
    const seen = new Map();
    filtered.forEach(l => {
      const domain = l.current_company?.domain;
      if (domain && !seen.has(domain)) {
        seen.set(domain, {
          name: l.current_company?.name,
          domain,
          industry: l.current_company?.name?.toLowerCase().includes("jupiter") ? "Wellness and Fitness" : l.current_company?.firmographics?.industry,
          employee_count: l.current_company?.firmographics?.employee_count,
          size_range: l.current_company?.firmographics?.size_range,
          platform: l.current_company?.storeleads?.platform,
          revenue_range: l.current_company?.revenue_range,
          estimated_sales: l.current_company?.storeleads?.estimated_sales_yearly,
          meta_ads_active: (l.current_company?.ads?.meta_ads_count || 0) > 0,
          google_ads_active: (l.current_company?.ads?.google_ads_count || 0) > 0,
          meta_ads_count: l.current_company?.ads?.meta_ads_count || 0,
          google_ads_count: l.current_company?.ads?.google_ads_count || 0,
          meta_ads: l.current_company?.ads?.meta_ads || [],
          google_ads: l.current_company?.ads?.google_ads || [],
          description: l.current_company?.firmographics?.description,
          leads: filtered.filter(f => f.current_company?.domain === domain),
        });
      }
    });
    return Array.from(seen.values()).sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  }, [filtered]);

  const customerCounts = useMemo(() => {
    if (!data?.leads || !customers.length) return [];
    const customerDomains = new Set(customers.map(c => c.customer_domain));
    const counts = {};
    data.leads.forEach(l => {
      const domain = l.prior_company?.domain;
      const name = l.prior_company?.name;
      if (domain && customerDomains.has(domain)) {
        if (!counts[name]) counts[name] = { name, domain, count: 0 };
        // Only count leads that match current GTM fit criteria if we want to show fit count
        // But if user wants to see companies even if fit count is 0, we need to handle that.
        // The user said: "No u did not... there are like 4 customer companies"
        // This implies my previous reversion (which used data.leads directly) FAILED to show them.
        // Why?
        // Maybe because `excludedCompanies` filtering was applied?
        // NO, `customerCounts` here uses `data.leads` directly.
        
        // Wait, look at the code I just read.
        // It has `gtmFitLeads` definition!
        // It has `const gtmFitLeads = useMemo...`
        // So my Revert in Turn 6 DID NOT HAPPEN for `gtmFitLeads`.
        // The `StrReplace` failed silently or I misread the output?
        // Ah, `customerCounts` uses `gtmFitLeads` in the file I just read!
        // Line 141: `const customerCounts = useMemo(() => { if (!gtmFitLeads.length ...`
        // So I DID NOT revert `customerCounts` to use `data.leads`.
        // I must have messed up the `StrReplace` arguments or something.
        
        // I will fix it now by replacing `gtmFitLeads` usage in `customerCounts` with `data.leads`.
        // AND I will change the logic to count GTM fit leads specifically, but iterate ALL leads to find companies.
        
        // Actually, if I iterate all leads, and increment count only if GTM fit, 
        // companies with 0 GTM fit leads will have count 0.
        // Should they be displayed?
        // User said "why did u get rid of all the customer companies".
        // This implies they want to see them.
        
        // So:
        // 1. Iterate `data.leads` (or `customers` list to be safe? but `data.leads` is what links people to companies).
        // 2. For each lead, find company.
        // 3. Increment count ONLY IF lead is gtm_fit.
        // 4. BUT ensure the company is added to `counts` object even if count is 0?
        //    If I iterate leads, and filter for fit, I miss non-fit leads' companies.
        //    If I iterate ALL leads, I see all companies. I can add them to `counts` with 0 if needed.
        
        if (!counts[name]) counts[name] = { name, domain, count: 0 };
        if (l.prior_company?.gtm_fit && !excludedCompanies.includes(l.current_company?.name?.toLowerCase())) {
             counts[name].count++;
        }
      }
    });
    return Object.values(counts).sort((a, b) => b.count - a.count);
  }, [data, customers]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0B] text-zinc-600 font-sans">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0B] text-red-400 font-sans">
        Error: {error}
      </div>
    );
  }

  if (gtmBrief) {
    const { lead, data: briefData, error: briefError } = gtmBrief;
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-zinc-400 font-sans">
        <div className="border-b border-[#141416] px-8 py-3.5">
          <button 
            onClick={() => setGtmBrief(null)} 
            className="text-zinc-400 text-xs px-3 py-1 border border-[#1E1E22] rounded hover:text-white transition-colors"
          >
            Back
          </button>
        </div>
        <div className="max-w-3xl mx-auto px-8 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-[#ECECEE] mb-1">GTM Brief: {lead.person?.full_name}</h1>
            <div className="text-sm text-zinc-600">{lead.current_company?.name} &middot; {lead.current_company?.cleaned_job_title || lead.current_company?.role}</div>
          </div>

          {briefError && (
            <div className="p-4 bg-[#1C1017] border border-[#3B1C2C] rounded text-red-400">
              {briefError}
            </div>
          )}

          {briefData && (
            <div className="flex flex-col gap-6">
              {Object.entries(briefData).map(([sectionKey, sectionValue]) => (
                <div key={sectionKey} className="bg-[#0E0E10] border border-[#1E1E22] rounded-md p-5">
                  <div className="text-[11px] tracking-widest text-[#6AADCF] uppercase font-semibold mb-3">
                    {sectionKey.replace(/_/g, " ")}
                  </div>
                  {typeof sectionValue === "string" ? (
                    <div className="text-sm text-zinc-300 leading-relaxed">{sectionValue}</div>
                  ) : typeof sectionValue === "object" && sectionValue !== null ? (
                    <div className="flex flex-col gap-3">
                      {Object.entries(sectionValue).map(([subKey, subValue]) => (
                        <div key={subKey}>
                          <div className="text-[10px] tracking-widest text-zinc-600 uppercase mb-1">
                            {subKey.replace(/_/g, " ")}
                          </div>
                          <div className="text-sm text-zinc-400 leading-relaxed">{String(subValue)}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-zinc-400">{String(sectionValue)}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selectedCompany) {
    const c = selectedCompany;
    return (
      <div className="min-h-screen bg-[#0A0A0B] text-zinc-400 font-sans">
        <div className="max-w-3xl mx-auto px-8 py-10">
          <button
            onClick={() => setSelectedCompany(null)}
            className="text-zinc-400 text-sm mb-8 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 border border-[#1E1E22] rounded hover:border-zinc-500"
          >
            ← Back to companies
          </button>
          <h1 className="text-2xl font-semibold text-[#ECECEE] mb-1">{c.name}</h1>
          <div className="text-xs text-zinc-500 font-mono mb-4">{c.domain}</div>

          {c.description && (
            <div className="bg-[#0E0E10] border border-[#1E1E22] rounded p-4 mb-8">
              <div className="text-[9px] tracking-wider text-[#52525B] uppercase font-semibold mb-2">About</div>
              <p className="text-sm text-zinc-400 leading-relaxed">{c.description}</p>
            </div>
          )}

          {c.leads?.length > 0 && (
            <div className="mb-8">
              <div className="text-[10px] tracking-[0.2em] text-[#52525B] uppercase mb-3 font-semibold">
                People at {c.name} ({c.leads.length})
              </div>
              <div className="bg-[#0E0E10] border border-[#1E1E22] rounded overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-5 gap-2 px-4 py-2 border-b border-[#1E1E22] bg-[#0A0A0B]">
                  <div className="text-[9px] tracking-wider text-[#52525B] uppercase font-semibold whitespace-nowrap">Name</div>
                  <div className="text-[9px] tracking-wider text-[#52525B] uppercase font-semibold whitespace-nowrap">Role</div>
                  <div className="text-[9px] tracking-wider text-[#52525B] uppercase font-semibold whitespace-nowrap">Past Co.</div>
                  <div className="text-[9px] tracking-wider text-[#52525B] uppercase font-semibold whitespace-nowrap">Past Role</div>
                  <div className="text-[9px] tracking-wider text-[#52525B] uppercase font-semibold whitespace-nowrap text-right">GTM Brief</div>
                </div>
                {/* Table rows */}
                {c.leads.map((lead, i) => {
                  const slug = getLinkedInSlug(lead.person?.linkedin_url);
                  const hasBrief = lead.gtm_brief || (slug && availableBriefs.has(slug));
                  return (
                    <div key={i} className="grid grid-cols-5 gap-2 px-4 py-3 border-b border-[#1E1E22] last:border-b-0 hover:bg-[#111] transition-colors">
                      <div className="text-sm text-[#ECECEE] font-medium truncate">{lead.person?.full_name}</div>
                      <div className="text-xs text-zinc-500 truncate">{lead.current_company?.cleaned_job_title || lead.current_company?.role}</div>
                      <div className="text-xs text-[#6AADCF] truncate">{lead.prior_company?.name}</div>
                      <div className="text-xs text-zinc-600 truncate">{lead.prior_company?.role}</div>
                      <div className="text-right">
                        {hasBrief ? (
                          <button
                            onClick={() => openGtmBrief(lead)}
                            className="text-[11px] px-2.5 py-1 rounded bg-[#101912] border border-[#1a3a1a] text-[#6ECF7A] hover:bg-[#162419] hover:border-[#6ECF7A] transition-colors"
                          >
                            View
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#E8798A]">N/A</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              ["Industry", c.industry],
              ["Platform", c.platform ? c.platform.charAt(0).toUpperCase() + c.platform.slice(1) : null],
              ["Size", formatSizeRange(c.size_range)],
              ["Revenue", formatRevenueRange(c.revenue_range, c.estimated_sales) !== "—" ? formatRevenueRange(c.revenue_range, c.estimated_sales) : null],
              ["Total Ads", (c.meta_ads_count || 0) + (c.google_ads_count || 0) || null],
              ["Ad Recency", getAdRecency(c.meta_ads) || getAdRecency(c.google_ads) || null],
            ].filter(([, v]) => v !== undefined && v !== null).map(([label, value], i) => (
              <div key={i} className="bg-[#0E0E10] border border-[#1E1E22] rounded p-4">
                <div className="text-[10px] tracking-widest text-zinc-600 uppercase mb-1">{label}</div>
                <div className={`text-lg font-medium ${
                  label === "Ad Recency" ? "text-[#6AADCF]" : "text-[#ECECEE]"
                }`}>{value}</div>
              </div>
            ))}
          </div>

          {/* Ads Intelligence Section */}
          {(c.meta_ads?.length > 0 || c.google_ads?.length > 0) && (
            <div className="mb-8">
              <div className="text-[10px] tracking-[0.2em] text-[#2A2A2E] uppercase mb-3 font-semibold">
                Ads Intelligence
              </div>

              {/* Ad Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-[#0E0E10] border border-[#1E1E22] rounded p-3">
                  <div className="text-[10px] text-zinc-600 uppercase mb-1">Meta Ads</div>
                  <div className="text-lg font-medium text-[#ECECEE]">{c.meta_ads_count}</div>
                </div>
                <div className="bg-[#0E0E10] border border-[#1E1E22] rounded p-3">
                  <div className="text-[10px] text-zinc-600 uppercase mb-1">Google Ads</div>
                  <div className="text-lg font-medium text-[#ECECEE]">{c.google_ads_count}</div>
                </div>
                <div className="bg-[#0E0E10] border border-[#1E1E22] rounded p-3">
                  <div className="text-[10px] text-zinc-600 uppercase mb-1">Last Meta Ad</div>
                  <div className="text-sm font-medium text-[#6AADCF]">{getAdRecency(c.meta_ads) || "—"}</div>
                </div>
                <div className="bg-[#0E0E10] border border-[#1E1E22] rounded p-3">
                  <div className="text-[10px] text-zinc-600 uppercase mb-1">Last Google Ad</div>
                  <div className="text-sm font-medium text-[#6AADCF]">{getAdRecency(c.google_ads) || "—"}</div>
                </div>
              </div>

              {/* Meta Ads Carousel */}
              {c.meta_ads?.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] text-zinc-600 uppercase">Recent Meta Ads</div>
                    <div className="flex gap-1">
                      <button onClick={() => metaAdsRef.current?.scrollBy({ left: -280, behavior: "smooth" })} className="w-6 h-6 flex items-center justify-center rounded bg-[#1E1E22] text-zinc-400 hover:text-white hover:bg-[#2a2a2e] transition-colors">
                        ←
                      </button>
                      <button onClick={() => metaAdsRef.current?.scrollBy({ left: 280, behavior: "smooth" })} className="w-6 h-6 flex items-center justify-center rounded bg-[#1E1E22] text-zinc-400 hover:text-white hover:bg-[#2a2a2e] transition-colors">
                        →
                      </button>
                    </div>
                  </div>
                  <div ref={metaAdsRef} className="flex gap-3 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {c.meta_ads.slice(0, 10).map((ad, i) => (
                      <div key={i} className="flex-shrink-0 w-64 bg-[#0E0E10] border border-[#1E1E22] rounded overflow-hidden">
                        <div className="h-32 bg-[#111] flex items-center justify-center overflow-hidden">
                          {ad.image_url ? (
                            <img
                              src={ad.image_url}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="text-[10px] text-zinc-600 text-center px-4">Ad Creative No Longer Available<br/><span class="text-zinc-700">in Meta Ads Library</span></div>';
                              }}
                            />
                          ) : (
                            <div className="text-[10px] text-zinc-600 text-center px-4">
                              Ad Creative No Longer Available<br/><span className="text-zinc-700">in Meta Ads Library</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1C3040] text-[#6AADCF]">
                              {ad.platform?.split(",")[0] || "Meta"}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${ad.status === "active" ? "bg-[#101912] text-[#6ECF7A]" : "bg-[#1a1a1a] text-zinc-500"}`}>
                              {ad.status || "—"}
                            </span>
                          </div>
                          {ad.ad_creative_link_title && !ad.ad_creative_link_title.includes("{{") && (
                            <div className="text-xs text-[#ECECEE] font-medium mb-1 line-clamp-1">{ad.ad_creative_link_title}</div>
                          )}
                          {ad.ad_creative_body && !ad.ad_creative_body.includes("{{") && (
                            <div className="text-[11px] text-zinc-500 line-clamp-2">{ad.ad_creative_body}</div>
                          )}
                          {ad.landing_page_url && (
                            <a href={ad.landing_page_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#6AADCF] hover:underline mt-2 block truncate">
                              {ad.landing_page_url.replace(/^https?:\/\//, "").split("/")[0]}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Google Ads */}
              {c.google_ads?.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] text-zinc-600 uppercase">Recent Google Ads</div>
                    <div className="flex gap-1">
                      <button onClick={() => googleAdsRef.current?.scrollBy({ left: -220, behavior: "smooth" })} className="w-6 h-6 flex items-center justify-center rounded bg-[#1E1E22] text-zinc-400 hover:text-white hover:bg-[#2a2a2e] transition-colors">
                        ←
                      </button>
                      <button onClick={() => googleAdsRef.current?.scrollBy({ left: 220, behavior: "smooth" })} className="w-6 h-6 flex items-center justify-center rounded bg-[#1E1E22] text-zinc-400 hover:text-white hover:bg-[#2a2a2e] transition-colors">
                        →
                      </button>
                    </div>
                  </div>
                  <div ref={googleAdsRef} className="flex gap-3 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {c.google_ads.slice(0, 10).map((ad, i) => (
                      <div key={i} className="flex-shrink-0 w-52 bg-[#0E0E10] border border-[#1E1E22] rounded p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1C3040] text-[#6AADCF]">
                            {ad.format || "Ad"}
                          </span>
                        </div>
                        <div className="text-xs text-[#ECECEE] font-medium mb-1 line-clamp-1">{ad.advertiser_name}</div>
                        <div className="text-[10px] text-zinc-600 mb-2">
                          {ad.start_date} → {ad.last_seen}
                        </div>
                        {ad.original_url && (
                          <a href={ad.original_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#6AADCF] hover:underline">
                            View in Transparency Center →
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

                  </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#A1A1AA] font-sans selection:bg-zinc-800 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-[28px] font-semibold text-white tracking-tight mb-4">AlumniGTM Intelligence for Nostra</h1>
          <div className="max-w-xl space-y-2">
            <p className="text-[13px] text-zinc-500 leading-normal">
              These are executives and senior operators who previously worked at Nostra's current customers — including Jolie, Boarderie, Forever 21, and others — and now hold buying authority at new companies.
            </p>
            <p className="text-[13px] text-zinc-500 leading-normal">
              Each lead held roles like CEO, Head of Growth, VP of Marketing, Director of Ecommerce, or Head of SEO — functions where site speed, attribution accuracy, and bot protection directly impact their numbers.
            </p>
            <p className="text-[13px] text-zinc-500 leading-normal">
              The target companies are ecommerce-native or have significant DTC presence — the exact profile where Nostra's edge platform drives measurable lift.
            </p>
          </div>
          <p className="text-[13px] text-zinc-600 mt-5 font-medium">
            {filtered.length} leads from {customerCounts.length} past customers
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="bg-[#0A0A0B] border border-[#1E1E22] rounded px-3.5 py-2 text-[13px] text-[#e5e5e5] hover:border-zinc-600 transition-colors flex items-center gap-2"
            >
              <span className="font-medium">Alumni Of</span>
            </button>
            {filterCompany !== "ALL" && (
              <button
                onClick={() => setFilterCompany("ALL")}
                className="text-xs text-zinc-600 hover:text-white transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>

          {drawerOpen && (
            <div className="w-full bg-[#0A0A0B] border border-[#1E1E22] rounded-lg p-4 shadow-2xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                <button
                  onClick={() => setFilterCompany("ALL")}
                  className={`px-3 py-2 rounded text-xs border transition-colors truncate ${
                    filterCompany === "ALL" 
                      ? "bg-[#1E1E22] border-[#333] text-white" 
                      : "bg-transparent border-[#1E1E22] text-zinc-500 hover:border-zinc-500"
                  }`}
                >
                  All ({data?.leads?.filter(l => l.prior_company?.gtm_fit && !excludedCompanies.some(exc => l.current_company?.name?.toLowerCase().includes(exc))).length || 0})
                </button>
                {customerCounts.map((c) => {
                  const isActive = filterCompany === c.name;
                  return (
                    <button
                      key={c.domain}
                      onClick={() => setFilterCompany(c.name)}
                      className={`px-3 py-2 rounded text-xs border transition-colors truncate ${
                        isActive 
                          ? "bg-[#1E1E22] border-[#333] text-[#6AADCF]" 
                          : "bg-transparent border-[#1E1E22] text-zinc-500 hover:border-zinc-500"
                      }`}
                      title={`${c.name} (${c.count})`}
                    >
                      {c.name} ({c.count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-6 border-b border-[#1E1E22]">
          {[
            { key: "companies", label: "Companies", count: companies.length },
            { key: "people", label: "People", count: filtered.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-[13px] font-medium border-b-2 transition-colors ${
                activeTab === tab.key 
                  ? "border-[#6AADCF] text-[#ECECEE]" 
                  : "border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {tab.label} <span className="text-zinc-600 ml-1">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto pb-20">
          {activeTab === "people" && (
            <table className="w-full border-collapse table-fixed" style={{ minWidth: 1100 }}>
              <colgroup>
                <col style={{ width: "12%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "18%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "32%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-[#1E1E22]">
                  {["Name", "Current Company", "Current Role", "Prior Company", "Prior Role", "GTM Brief"].map((h, i) => (
                    <th key={i} className={`py-3 px-3 text-[10px] tracking-widest text-[#52525B] uppercase font-semibold ${
                      i === 5 ? "text-right" : "text-left"
                    }`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#111113] hover:bg-[#0E0E10] transition-colors group"
                  >
                    <td className="py-4 px-3 align-top">
                      <div className="text-[13px] font-medium text-[#ECECEE] group-hover:text-white transition-colors">{l.person?.full_name}</div>
                    </td>
                    <td className="py-4 px-3 align-top">
                      <div className="text-[13px] text-[#A1A1AA] truncate max-w-[180px]" title={l.current_company?.name}>
                        {l.current_company?.name}
                      </div>
                    </td>
                    <td className="py-4 px-3 align-top">
                      <div className="text-[13px] text-[#52525B] truncate max-w-[200px]" title={l.current_company?.cleaned_job_title || l.current_company?.role}>
                        {l.current_company?.cleaned_job_title || l.current_company?.role}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-left align-top">
                      <div className="text-[13px] text-[#6AADCF] font-medium">{l.prior_company?.name}</div>
                    </td>
                    <td className="py-4 px-3 text-left align-top">
                      <div className="text-[12px] text-[#52525B]">
                        {l.prior_company?.cleaned_job_title || l.prior_company?.role}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-right align-top">
                      {(() => {
                        const slug = getLinkedInSlug(l.person?.linkedin_url);
                        const hasBrief = l.gtm_brief || (slug && availableBriefs.has(slug));
                        if (hasBrief) {
                          return (
                            <button
                              onClick={(e) => { e.stopPropagation(); openGtmBrief(l); }}
                              className="text-[11px] px-2.5 py-1 rounded bg-[#0F1619] border border-[#1C3040] text-[#6AADCF] hover:bg-[#162024] hover:border-[#6AADCF] transition-colors"
                            >
                              View
                            </button>
                          );
                        }
                        return <span className="text-[11px] text-[#E8798A]">N/A</span>;
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "companies" && (
            <table className="w-full border-collapse table-fixed" style={{ minWidth: 1100 }}>
              <colgroup>
                <col style={{ width: "18%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "9%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "10%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-[#1E1E22]">
                  {["Company", "Industry", "Platform", "Revenue", "Size", "Meta Ads", "Google Ads", "Profile"].map((h, i) => (
                    <th key={i} className={`py-3 px-3 text-[10px] tracking-widest text-[#52525B] uppercase font-semibold whitespace-nowrap ${
                      i >= 3 ? "text-right" : "text-left"
                    }`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {companies.map((c, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedCompany(c)}
                    className="border-b border-[#111113] hover:bg-[#0E0E10] transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-3">
                      <div className="text-[13px] font-medium text-[#ECECEE]">{c.name}</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="text-[12px] text-[#52525B] truncate max-w-[140px]">{c.industry}</div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="text-[12px] text-[#52525B] capitalize">{c.platform || "—"}</div>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="text-[12px] text-[#52525B]">
                        {formatRevenueRange(c.revenue_range, c.estimated_sales)}
                      </div>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <div className="text-[12px] text-[#52525B]">{formatSizeRange(c.size_range)}</div>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className={`text-[11px] px-2 py-0.5 rounded ${c.meta_ads_active ? "bg-[#101912] text-[#6ECF7A]" : "bg-[#1a1a1a] text-[#52525B]"}`}>
                        {c.meta_ads_active ? "Active" : "Not Detected"}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className={`text-[11px] px-2 py-0.5 rounded ${c.google_ads_active ? "bg-[#101912] text-[#6ECF7A]" : "bg-[#1a1a1a] text-[#52525B]"}`}>
                        {c.google_ads_active ? "Active" : "Not Detected"}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedCompany(c); }}
                        className="text-[11px] px-2.5 py-1 rounded bg-[#0F1619] border border-[#1C3040] text-[#6AADCF] hover:bg-[#162024] hover:border-[#6AADCF] transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
