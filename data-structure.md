The core data structure (used by /v1/alumni-gtm/leads):

The concept is "alumni leads" — people who used to work at one of your customers and now work somewhere else. The join chain:

core.company_customers — your customer list. For nostra.ai, this has their customers (e.g., companies nostra.ai sells to). Keyed by origin_company_domain.

core.person_work_history — employment history for people. Joined to company_customers on company_domain = customer_domain with is_current IS NOT TRUE — so it finds people who previously worked at those customers.

core.people_targets — the people themselves, with their current company info. Joined on person_linkedin_url. This table has the icp_fit column (values like 'YES', etc.) which evaluates whether the person's current role/seniority matches your ideal customer profile.

core.company_targets — GTM fit evaluation for the person's current company. LEFT JOINed on target_company_domain = pt.domain (the person's current company domain) scoped to the same origin_company_domain. This table has gtm_fit (boolean) and reason.

The WHERE clause filters to only: ct.gtm_fit = true AND pt.icp_fit = 'YES'. So you only get people where both their current company passes GTM fit and the person individually passes ICP fit.

Then it enriches with firmographics, storeleads, revenue, ads, technologies, and GTM briefs — all for the person's current company (where they'd be your prospect).

The dashboard endpoint (/read/gtm/dashboard):

This is a completely different data path. It reads from public.alumni_leads — a separate, pre-populated table. It doesn't do the multi-table join at runtime. It queries that table where target_client_domain = $1 (the seller domain).

The alumni_leads table has its own columns: lead_name, lead_title, company_name, company_domain, priority, past_employer_name, past_employer_domain, person_linkedin_url, etc.

The dashboard then enriches those leads with:

extracted.company_firmographics (for the person's current company)
public.gtm_briefs (a separate GTM briefs table from the one the Parallel enrichment writes to, which is extracted.parallel_person_gtm_briefs)
It also returns the customer list from core.company_customers alongside the leads.

Key difference: The /v1/alumni-gtm/leads endpoint builds the alumni lead list dynamically from the core normalized tables with real-time filtering on gtm_fit and icp_fit. The /read/gtm/dashboard reads from a pre-built public.alumni_leads table that was populated separately — so those two can potentially be out of sync if the underlying core tables change but public.alumni_leads hasn't been refreshed.