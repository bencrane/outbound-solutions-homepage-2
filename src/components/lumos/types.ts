export interface LumosCompanyData {
  company: string;
  city: string;
  state: string;
  revenue: string;
  avgDSO: string;
  industryAvgDSO: string;
  annualCost: string;
  invoiceVolume: string;
}

export const defaultCompany: LumosCompanyData = {
  company: "Choice Logistics",
  city: "Columbus",
  state: "OH",
  revenue: "$8.2M",
  avgDSO: "47 days",
  industryAvgDSO: "34 days",
  annualCost: "$127,000",
  invoiceVolume: "320",
};
