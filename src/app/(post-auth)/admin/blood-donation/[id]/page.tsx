import React from "react";
import BloodDonorsTable from "@/components/table/BloodDonorsTable";

export async function generateStaticParams() {
  return [];
}

export default function BloodDonationDetailPage() {
  return <BloodDonorsTable />;
}
