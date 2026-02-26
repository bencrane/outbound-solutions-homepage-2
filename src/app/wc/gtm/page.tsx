"use client";

import dynamic from "next/dynamic";

const GTMDashboard = dynamic(
  () => import("@/components/GTMDashboard").then((mod) => mod.GTMDashboard),
  { ssr: false }
);

export default function GTMPage() {
  return <GTMDashboard />;
}
