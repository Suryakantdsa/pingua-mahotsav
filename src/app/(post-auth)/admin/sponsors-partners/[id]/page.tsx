import React from "react";
import SponsorsTable from "@/components/table/SponsorsTable";

export async function generateStaticParams() {
  return [];
}

export default function SponsorsPartnersDetailPage() {
  return <SponsorsTable />;
}
