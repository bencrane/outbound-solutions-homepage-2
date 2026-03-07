import type { Metadata } from "next";
import NostraPayment from "../../../../../../nostra/alumni-gtm/payment";

export const metadata: Metadata = {
  title: "Payment Instructions | AlumniGTM",
  description: "Complete your payment via ACH bank transfer.",
  openGraph: {
    title: "Payment Instructions | AlumniGTM",
    description: "Complete your payment via ACH bank transfer.",
  },
};

export default function Page() {
  return <NostraPayment />;
}
