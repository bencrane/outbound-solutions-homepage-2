export interface CarrierData {
  carrierName: string;
  dotNumber: string;
  mcNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  powerUnits: number;
  drivers: number;
  authorityAge: string;
  homeState: string;
  personalizedUrl: string;
}

export const defaultCarrier: CarrierData = {
  carrierName: "Midwest Express Freight LLC",
  dotNumber: "3847291",
  mcNumber: "1284750",
  address: {
    street: "2847 Commerce Drive",
    city: "Springfield",
    state: "IL",
    zip: "62704",
  },
  powerUnits: 23,
  drivers: 28,
  authorityAge: "4.2yr",
  homeState: "IL",
  personalizedUrl: "withcoverage.com/3847291",
};
