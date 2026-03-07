POST /v1/alumni-gtm/leads

Request body:

{
  "origin_company_domain": "nostra.ai",
  "gtm_fit": true,
  "icp_fit": "YES",
  "limit": 500,
  "offset": 0
}

gtm_fit and icp_fit are optional. Omit both to get all people. Pass one or both to filter.
gtm_fit: true or false
icp_fit: "YES" or "NO"
Response now includes:

funnel — always returned regardless of filters:
"funnel": {
  "total_people": 426,
  "gtm_fit_true": 200,
  "gtm_fit_true_and_icp_fit_yes": 86
}

Each lead's person object now includes icp_fit (e.g. "YES", "NO", or null)
Each lead's prior_company object already has gtm_fit (bool)