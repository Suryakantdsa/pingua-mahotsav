"use client";

import React, { useState } from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";
import BloodDonorFormViewModal from "@/components/admin/BloodDonorFormViewModal";

const bloodDonorFields: CrudFormField[] = [
  {
    key: "registrationNo",
    heading: "Reg. No",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "name",
    heading: "Donor Full Name",
    type: "text",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "bloodGroup",
    heading: "Blood Group",
    type: "select",
    required: true,
    options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    shouldShowInTable: true,
  },
  {
    key: "gender",
    heading: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    shouldShowInTable: true,
  },
  {
    key: "age",
    heading: "Age",
    type: "number",
    required: true,
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
    key: "district",
    heading: "District",
    type: "text",
    shouldShowInTable: true,
  },
  {
    key: "guardianName",
    heading: "Father / Guardian",
    type: "text",
    shouldShowInTable: false,
  },
  {
    key: "weight",
    heading: "Weight (kg)",
    type: "text",
    shouldShowInTable: false,
  },
  {
    key: "previousDonations",
    heading: "Previous Donations",
    type: "text",
    shouldShowInTable: false,
  },
  {
    key: "pledgeOrganDonation",
    heading: "Organ Pledge",
    type: "checkbox",
    shouldShowInTable: true,
  },
  {
    key: "createdAt",
    heading: "Registered On",
    type: "date",
    shouldShowInTable: true,
  },
];

export default function BloodDonorsTable() {
  const [selectedDonor, setSelectedDonor] = useState<any>(null);

  return (
    <>
      <TanStackCrudTable
        apiEndpoint={ApiRoutes.bloodDonor}
        fields={bloodDonorFields}
        title="Voluntary Blood Donation Registrations (IRCS & Pingua Mahotsav)"
        searchableFields={["registrationNo", "name", "bloodGroup", "phone", "district"]}
        statusFilterField="bloodGroup"
        statusFilterOptions={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
        shouldAdd={true}
        shouldEdit={true}
        shouldDelete={true}
        shouldView={true}
        onView={(item) => setSelectedDonor(item)}
      />

      {selectedDonor && (
        <BloodDonorFormViewModal
          donor={selectedDonor}
          onClose={() => setSelectedDonor(null)}
        />
      )}
    </>
  );
}
