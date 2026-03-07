import type { Metadata } from "next";
import NostraProposal from "../../../../../nostra/alumni-gtm/proposal";

export const metadata: Metadata = {
  title: "AlumniGTM Service Agreement | Nostra",
  description: "AlumniGTM Intelligence service agreement prepared for Nostra.",
  openGraph: {
    title: "AlumniGTM Service Agreement | Nostra",
    description: "AlumniGTM Intelligence service agreement prepared for Nostra.",
  },
};

export default function Page() {
  return <NostraProposal />;
}
