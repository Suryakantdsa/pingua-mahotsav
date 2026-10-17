"use client";

import React from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";

const sponsorFields: CrudFormField[] = [
  {
    key: "name",
    heading: "Sponsor / Organization Name",
    type: "text",
    required: true,
    gridSpan: 2,
    shouldShowInTable: true,
  },
  {
    key: "type",
    heading: "Sponsorship Tier",
    type: "select",
    required: true,
    options: ["platinum", "gold", "silver", "bronze", "supporter"],
    shouldShowInTable: true,
  },
  {
    key: "phone",
    heading: "Contact Phone",
    type: "phone",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "email",
    heading: "Email Address",
    type: "email",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "message",
    heading: "Notes / Message",
    type: "textarea",
    gridSpan: 2,
    shouldShowInTable: false,
  },
];

export default function SponsorsTable() {
  return (
    <TanStackCrudTable
      apiEndpoint={ApiRoutes.sponsor}
      fields={sponsorFields}
      title="Sponsors & Festival Partners"
      searchableFields={["name", "type", "email", "phone"]}
      statusFilterField="type"
      statusFilterOptions={["platinum", "gold", "silver", "bronze", "supporter"]}
      shouldAdd={true}
      shouldEdit={true}
      shouldDelete={true}
      shouldView={true}
    />
  );
}
