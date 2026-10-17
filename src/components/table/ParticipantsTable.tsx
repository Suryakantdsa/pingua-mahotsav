"use client";

import React, { useState } from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";
import ParticipantFormViewModal from "@/components/admin/ParticipantFormViewModal";

const participantFields: CrudFormField[] = [
  {
    key: "registrationNo",
    heading: "Reg. No",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "name",
    heading: "Group / Artist Name",
    type: "text",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "leaderName",
    heading: "Leader / Coordinator",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "phone",
    heading: "Contact Number",
    type: "phone",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "whatsappNumber",
    heading: "WhatsApp",
    type: "phone",
    shouldShowInTable: true,
  },
  {
    key: "district",
    heading: "District",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "programTitle",
    heading: "Programme Title",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "participantsCount",
    heading: "No. of Participants",
    type: "number",
    shouldShowInTable: true,
  },
  {
    key: "duration",
    heading: "Duration (Mins)",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "description",
    heading: "Programme Description",
    type: "textarea",
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "specialRequirements",
    heading: "Technical / Special Requirements",
    type: "textarea",
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "signatureName",
    heading: "Signature / Signee",
    type: "text",
    shouldShowInTable: false,
  },
  {
    key: "remarks",
    heading: "Committee Remarks",
    type: "text",
    shouldShowInTable: true,
  },
];

export default function ParticipantsTable() {
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  return (
    <>
      <TanStackCrudTable
        apiEndpoint={ApiRoutes.participant}
        fields={participantFields}
        title="Cultural Programme Registrations (14th Pingua Mahotsav 2026)"
        searchableFields={["registrationNo", "name", "leaderName", "phone", "district", "programTitle"]}
        statusFilterField="district"
        statusFilterOptions={["Dhenkanal", "Cuttack", "Bhubaneswar", "Angul", "Jajpur", "Other"]}
        shouldAdd={true}
        shouldEdit={true}
        shouldDelete={true}
        shouldView={true}
        onView={(item) => setSelectedParticipant(item)}
      />

      {selectedParticipant && (
        <ParticipantFormViewModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
        />
      )}
    </>
  );
}
