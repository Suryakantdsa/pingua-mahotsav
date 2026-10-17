"use client";

import React from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";

const eventFields: CrudFormField[] = [
  {
    key: "event",
    heading: "Event Title",
    type: "text",
    required: true,
    gridSpan: 2,
    shouldShowInTable: true,
  },
  {
    key: "date",
    heading: "Event Date",
    type: "text",
    required: true,
    placeholder: "e.g. 07-10-2026",
    shouldShowInTable: true,
  },
  {
    key: "day",
    heading: "Day",
    type: "text",
    required: true,
    placeholder: "e.g. Tuesday",
    shouldShowInTable: true,
  },
  {
    key: "time",
    heading: "Time Range",
    type: "text",
    required: true,
    placeholder: "e.g. 9:00 AM - 2:00 PM",
    shouldShowInTable: true,
  },
  {
    key: "type",
    heading: "Event Category",
    type: "select",
    required: true,
    options: ["opening", "closing", "social", "cultural", "local", "professional"],
    shouldShowInTable: true,
  },
  {
    key: "location",
    heading: "Venue / Stage",
    type: "text",
    required: true,
    placeholder: "Main Stage",
    shouldShowInTable: true,
  },
  {
    key: "duration",
    heading: "Duration",
    type: "text",
    required: true,
    placeholder: "e.g. 2 hours",
    shouldShowInTable: false,
  },
  {
    key: "description",
    heading: "Description",
    type: "textarea",
    required: true,
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "hasForm",
    heading: "Enable Blood Donation Form",
    type: "checkbox",
    shouldShowInTable: false,
  },
  {
    key: "participationOpen",
    heading: "Open for Public Participation",
    type: "checkbox",
    shouldShowInTable: false,
  },
  {
    key: "mukhyaAtithi",
    heading: "Chief Guest (ମୁଖ୍ୟ ଅତିଥି)",
    type: "text",
    placeholder: "Name & Designation",
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "mukhyaBakta",
    heading: "Chief Speaker (ମୁଖ୍ୟ ବକ୍ତା)",
    type: "text",
    placeholder: "Name & Designation",
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "sammanitaAtithi",
    heading: "Honored Guests (ସମ୍ମାନିତ ଅତିଥି)",
    type: "textarea",
    placeholder: "Comma-separated list of guests",
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "performers",
    heading: "Performers / Troupes",
    type: "text",
    gridSpan: 2,
    shouldShowInTable: false,
  },
  {
    key: "specialNote",
    heading: "Special Note / Highlights",
    type: "textarea",
    gridSpan: 2,
    shouldShowInTable: false,
  },
];

export default function EventsTable() {
  return (
    <TanStackCrudTable
      apiEndpoint={ApiRoutes.event}
      fields={eventFields}
      title="Pingua Mahotsav Event Schedule"
      searchableFields={["event", "location", "type", "description", "mukhyaAtithi"]}
      shouldAdd={true}
      shouldEdit={true}
      shouldDelete={true}
      shouldView={true}
    />
  );
}
