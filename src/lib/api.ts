const API_BASE_URL = "https://outbound-solutions-backend-api-production.up.railway.app";

export interface Carrier {
  dot_number: string;
  legal_name: string;
  city: string;
  state: string;
  power_units: number;
  hazmat: boolean;
  safety_rating: string | null;
  coverage_amount: string | null;
  num_insurers: number | null;
  switch_rate: number | null;
  persona: "Aggressive" | "Active" | "Stable" | "Locked" | null;
  renewal_days: number | null;
  score: number | null;
}

export interface Insurer {
  name: string;
  periods: number;
}

export interface Policy {
  insurer: string;
  type: string;
  effective: string;
  cancelled: string;
  method: string;
}

export interface CarrierDetail extends Carrier {
  street: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
  contact1: string | null;
  contact2: string | null;
  drivers: number | null;
  mileage: number | null;
  insurers: Insurer[];
  policies: Policy[];
}

export interface CarriersResponse {
  carriers: Carrier[];
  total: number;
  limit: number;
  offset: number;
}

export interface CarrierFilters {
  persona?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

interface RawCarrier {
  dot_number: string;
  legal_name: string;
  phy_city: string;
  phy_state: string;
  power_units: string | number;
  hm_ind: string | null;
  safety_rating: string | null;
  coverage_max: number | null;
  n_insurers: number | null;
  switch_rate: number | null;
  persona: "Aggressive" | "Active" | "Stable" | "Locked" | null;
  est_renewal_days: number | null;
  score: number | null;
}

function mapCarrier(raw: RawCarrier): Carrier {
  return {
    dot_number: raw.dot_number,
    legal_name: raw.legal_name,
    city: raw.phy_city,
    state: raw.phy_state,
    power_units: typeof raw.power_units === "string" ? parseInt(raw.power_units, 10) : raw.power_units,
    hazmat: raw.hm_ind === "Y",
    safety_rating: raw.safety_rating,
    coverage_amount: raw.coverage_max != null ? String(raw.coverage_max) : null,
    num_insurers: raw.n_insurers,
    switch_rate: raw.switch_rate,
    persona: raw.persona,
    renewal_days: raw.est_renewal_days,
    score: raw.score,
  };
}

export async function fetchCarriers(filters: CarrierFilters = {}): Promise<CarriersResponse> {
  const params = new URLSearchParams();

  if (filters.persona && filters.persona !== "all") {
    params.set("persona", filters.persona);
  }
  if (filters.search) {
    params.set("search", filters.search);
  }
  if (filters.limit) {
    params.set("limit", String(filters.limit));
  }
  if (filters.offset) {
    params.set("offset", String(filters.offset));
  }

  const url = `${API_BASE_URL}/api/carriers${params.toString() ? `?${params}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json = await response.json();

  return {
    carriers: (json.data ?? []).map(mapCarrier),
    total: json.pagination?.total ?? 0,
    limit: json.pagination?.limit ?? filters.limit ?? 100,
    offset: json.pagination?.offset ?? filters.offset ?? 0,
  };
}

export async function fetchCarrier(dotNumber: string): Promise<Carrier> {
  const response = await fetch(`${API_BASE_URL}/api/carriers/${dotNumber}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json = await response.json();
  const raw = json.carrier ?? json;
  return raw.phy_city ? mapCarrier(raw) : raw;
}

interface RawInsuranceRecord {
  name_company: string;
  ins_type_desc: string | null;
  effective_date: string | null;
  cancl_effective_date: string | null;
  cancl_method: string | null;
  cancl_method_gen: string | null;
}

export async function fetchCarrierDetail(dotNumber: string): Promise<CarrierDetail> {
  const response = await fetch(`${API_BASE_URL}/api/carriers/${dotNumber}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json = await response.json();
  const raw = json.carrier ?? json;
  const history: RawInsuranceRecord[] = json.insurance_history ?? [];

  const base = raw.phy_city ? mapCarrier(raw) : raw;

  const insurerMap = new Map<string, number>();
  for (const rec of history) {
    const name = rec.name_company;
    insurerMap.set(name, (insurerMap.get(name) ?? 0) + 1);
  }
  const insurers: Insurer[] = Array.from(insurerMap.entries())
    .map(([name, periods]) => ({ name, periods }))
    .sort((a, b) => b.periods - a.periods);

  const policies: Policy[] = history.map((rec) => ({
    insurer: rec.name_company,
    type: rec.ins_type_desc ?? "—",
    effective: rec.effective_date ?? "—",
    cancelled: rec.cancl_effective_date ?? "—",
    method: rec.cancl_method_gen ?? rec.cancl_method ?? "—",
  }));

  const mileage = raw.mcs150_mileage ? parseInt(raw.mcs150_mileage, 10) : null;
  const drivers = raw.total_drivers ? parseInt(raw.total_drivers, 10) : null;

  return {
    ...base,
    street: raw.phy_street ?? null,
    zip: raw.phy_zip ?? null,
    phone: raw.phone ?? null,
    email: raw.email_address ?? null,
    contact1: raw.company_officer_1 ?? null,
    contact2: raw.company_officer_2 ?? null,
    drivers: isNaN(drivers as number) ? null : drivers,
    mileage: isNaN(mileage as number) ? null : mileage,
    insurers,
    policies,
  };
}
