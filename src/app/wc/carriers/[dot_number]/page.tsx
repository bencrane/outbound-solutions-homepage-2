"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const CarrierDetail = dynamic(
  () => import("@/components/CarrierDetail").then((mod) => mod.CarrierDetail),
  { ssr: false }
);

export default function CarrierDetailPage() {
  const params = useParams();
  const dotNumber = params.dot_number as string;
  return <CarrierDetail dotNumber={dotNumber} />;
}
