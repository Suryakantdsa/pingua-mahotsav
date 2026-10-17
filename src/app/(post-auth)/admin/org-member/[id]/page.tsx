import React from "react";
import OrgMembersTable from "@/components/table/OrgMembersTable";

export async function generateStaticParams() {
  return [];
}

export default function OrgMemberDetailPage() {
  return <OrgMembersTable />;
}
