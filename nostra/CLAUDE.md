# Nostra AlumniGTM Intelligence

## Overview
AlumniGTM intelligence dashboard for Nostra. Shows executives and senior operators who previously worked at Nostra's current customers and now hold buying authority at new companies.

## Pages

### `/nostra/alumni-gtm` - Main Dashboard
- **Companies Tab**: List of target companies with industry, platform, revenue, size, and ad activity
- **People Tab**: List of leads with current/past roles and GTM brief availability

### Company Detail View
- **About**: Company description in styled container
- **People Table**: Contacts at the company with columns:
  - Name
  - Role (current)
  - Past Co.
  - Past Role
  - GTM Brief (green "View" button if available, red "N/A" if not)
- **Firmographics**: Industry, Platform, Size, Revenue, Total Ads, Ad Recency
- **Ads Intelligence**: Meta and Google ad carousels with stats
  - Expired Meta ad images show "No longer available in Meta Ads Library"

### GTM Brief View
- Individual lead intelligence brief
- Sections rendered from JSON files in `/public/nostra_json/`

## Data Sources
- Leads API: `https://api.revenueinfra.com/v1/alumni-gtm/leads`
- Dashboard API: `https://api.revenueinfra.com/read/gtm/dashboard`
- GTM Briefs: `/public/nostra_json/{linkedin_slug}.json`

## Recent Updates (March 2026)
- Redesigned People table with proper column headers
- Moved People section above stats grid
- Added description container with "About" label
- Improved back button styling
- Added graceful fallback for expired Meta ad images
- Styled GTM Brief column (green View / red N/A)
