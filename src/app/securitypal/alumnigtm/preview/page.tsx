import type { Metadata } from "next";
import AlumniGTMPreview from "../../../../../nostra/alumni-gtm/preview";

export const metadata: Metadata = {
  title: "AlumniGTM Intelligence | SecurityPal",
  description: "Pipeline of people who already know your product and are now in decision-making roles at companies that fit your ICP.",
  openGraph: {
    title: "AlumniGTM Intelligence | SecurityPal",
    description: "Pipeline of people who already know your product and are now in decision-making roles at companies that fit your ICP.",
  },
};

export default function Page() {
  return <AlumniGTMPreview domain="securitypalhq.com" />;
}
