"use client";

import React, { useState, useEffect } from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";
import TeamMemberViewModal from "@/components/admin/TeamMemberViewModal";

const teamMemberFields: CrudFormField[] = [
  {
    key: "image",
    heading: "Profile Photo",
    type: "image",
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
    key: "designation",
    heading: "Designation / Title",
    type: "text",
    required: true,
    placeholder: "e.g. Event Coordinator, IT Lead",
    shouldShowInTable: true,
  },
  {
    key: "role",
    heading: "Access Role",
    type: "select",
    required: true,
    options: ["super_admin", "admin", "coordinator", "volunteer", "member"],
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
    key: "phone",
    heading: "Contact Phone",
    type: "phone",
    required: true,
    shouldShowInTable: true,
  },
  {
    key: "password",
    heading: "Temporary Password",
    type: "password",
    placeholder: "Leave empty to auto-generate or set temp password...",
    shouldShowInTable: false,
  },
  {
    key: "isActive",
    heading: "Active Member",
    type: "checkbox",
    shouldShowInTable: true,
  },
];

export default function TeamTable() {
  const [currentUserRole, setCurrentUserRole] = useState<string>("super_admin");
  const [selectedMember, setSelectedMember] = useState<Record<string, any> | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const adminObj = parsed.admin || parsed.user;
        if (adminObj?.role) {
          setCurrentUserRole(String(adminObj.role));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const isSuperAdmin = currentUserRole === "super_admin";

  const handleView = (member: Record<string, any>) => {
    setSelectedMember(member);
    setIsViewOpen(true);
  };

  return (
    <>
      <TanStackCrudTable
        apiEndpoint={ApiRoutes.teamMember}
        fields={teamMemberFields}
        title="Festival Team Management"
        searchableFields={["name", "email", "phone", "designation", "role"]}
        statusFilterField="role"
        statusFilterOptions={["super_admin", "admin", "coordinator", "volunteer", "member"]}
        onView={handleView}
        shouldAdd={isSuperAdmin}
        shouldEdit={isSuperAdmin}
        shouldDelete={isSuperAdmin}
        shouldView={true}
      />

      <TeamMemberViewModal
        member={selectedMember}
        isOpen={isViewOpen}
        onClose={() => {
          setIsViewOpen(false);
          setSelectedMember(null);
        }}
        currentUserRole={currentUserRole}
      />
    </>
  );
}
