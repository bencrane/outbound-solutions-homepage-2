"use client";

import dynamic from "next/dynamic";

const CarriersDashboard = dynamic(
  () => import("@/components/CarriersDashboard").then((mod) => mod.CarriersDashboard),
  { ssr: false }
);

export default function CarriersPage() {
  return <CarriersDashboard />;
}
