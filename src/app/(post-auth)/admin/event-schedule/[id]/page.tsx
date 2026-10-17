import React from "react";
import EventsTable from "@/components/table/EventsTable";

export async function generateStaticParams() {
  return [];
}

export default function EventScheduleDetailPage() {
  return <EventsTable />;
}
