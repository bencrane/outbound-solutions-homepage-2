"use client";

import dynamic from "next/dynamic";

const LunosGTMDashboard = dynamic(
  () => import("@/components/LunosGTMDashboard").then((mod) => mod.LunosGTMDashboard),
  { ssr: false }
);

export default function LunosGTMPage() {
  return <LunosGTMDashboard />;
}
