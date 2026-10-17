"use client";

import React from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";

const webCreditFields: CrudFormField[] = [
  {
    key: "image",
    heading: "Member Photo",
    type: "image",
    required: true,
    gridSpan: 2,
    shouldShowInTable: true,
  },
  {
    key: "name",
    heading: "Full Name",
    type: "text",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "role",
    heading: "Role / Category",
    type: "text",
    required: true,
    placeholder: "e.g. Developer, Planning & Ideas",
    shouldShowInTable: true,
  },
  {
    key: "contribution",
    heading: "Contribution Details",
    type: "textarea",
    required: true,
    gridSpan: 2,
    placeholder: "Describe role in festival website development",
    shouldShowInTable: true,
  },
  {
    key: "order",
    heading: "Sort Order",
    type: "number",
    shouldShowInTable: true,
  },
];

export default function WebCreditsTable() {
  return (
    <TanStackCrudTable
      apiEndpoint={ApiRoutes.websiteCredit}
      fields={webCreditFields}
      title="Website Team Credits"
      searchableFields={["name", "role", "contribution"]}
      shouldAdd={true}
      shouldEdit={true}
      shouldDelete={true}
      shouldView={true}
    />
  );
}
