"use client";

import React from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";

const orgMemberFields: CrudFormField[] = [
  {
    key: "image",
    heading: "Profile Photo",
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
    key: "position",
    heading: "Designation / Position",
    type: "text",
    required: true,
    placeholder: "e.g. Festival President",
    shouldShowInTable: true,
  },
  {
    key: "message",
    heading: "Message / Statement",
    type: "textarea",
    required: true,
    gridSpan: 2,
    placeholder: "Enter voice/message for the festival",
    shouldShowInTable: false,
  },
  {
    key: "order",
    heading: "Display Order",
    type: "number",
    placeholder: "1, 2, 3...",
    shouldShowInTable: true,
  },
  {
    key: "isActive",
    heading: "Active Member",
    type: "checkbox",
    shouldShowInTable: true,
  },
];

export default function OrgMembersTable() {
  return (
    <TanStackCrudTable
      apiEndpoint={ApiRoutes.orgMember}
      fields={orgMemberFields}
      title="Festival Organizers & Voices"
      searchableFields={["name", "position", "message"]}
      shouldAdd={true}
      shouldEdit={true}
      shouldDelete={true}
      shouldView={true}
    />
  );
}
