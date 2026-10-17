"use client";

import React from "react";
import TanStackCrudTable, { CrudFormField } from "@/components/shared/TanStackCrudTable";
import { ApiRoutes } from "@/restApp/api-route";

const bannerFields: CrudFormField[] = [
  {
    key: "title",
    heading: "Banner Title (Odia / Main)",
    type: "text",
    required: true,
    gridSpan: 2,
    placeholder: "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬",
    shouldShowInTable: true,
  },
  {
    key: "subtitle",
    heading: "Subtitle / English",
    type: "text",
    required: true,
    gridSpan: 2,
    placeholder: "14th Pingua Mahotsav • 25 Oct – 01 Nov 2026",
    shouldShowInTable: true,
  },
  {
    key: "category",
    heading: "Category Tag",
    type: "text",
    placeholder: "e.g. Star Musical Night / Cultural Heritage",
    shouldShowInTable: true,
  },
  {
    key: "dateBadge",
    heading: "Date Badge",
    type: "text",
    placeholder: "e.g. 30 Oct 2026 • 7:00 PM",
    shouldShowInTable: true,
  },
  {
    key: "location",
    heading: "Venue Location",
    type: "text",
    placeholder: "Main Festival Stage, Pingua",
    shouldShowInTable: false,
  },
  {
    key: "featuredArtist",
    heading: "Featured Artists",
    type: "text",
    placeholder: "e.g. Aseema Panda & Papu Pom Pom",
    shouldShowInTable: false,
  },
  {
    key: "imageSrc",
    heading: "Banner Image URL or Upload",
    type: "text",
    required: true,
    gridSpan: 2,
    placeholder: "/banners/banner-main-mahotsav.jpg",
    shouldShowInTable: true,
  },
  {
    key: "ctaText",
    heading: "Primary CTA Label",
    type: "text",
    placeholder: "Explore Event Schedule",
    shouldShowInTable: false,
  },
  {
    key: "ctaUrl",
    heading: "Primary CTA Link / Hash",
    type: "text",
    placeholder: "#events",
    shouldShowInTable: false,
  },
  {
    key: "secondaryCtaText",
    heading: "Secondary CTA Label",
    type: "text",
    placeholder: "Watch Gallery",
    shouldShowInTable: false,
  },
  {
    key: "secondaryCtaUrl",
    heading: "Secondary CTA Link",
    type: "text",
    placeholder: "#gallery",
    shouldShowInTable: false,
  },
  {
    key: "order",
    heading: "Display Order",
    type: "number",
    placeholder: "1",
    shouldShowInTable: true,
  },
  {
    key: "isActive",
    heading: "Publish Status (Active)",
    type: "checkbox",
    shouldShowInTable: true,
  },
];

export default function HeroBannersTable() {
  return (
    <TanStackCrudTable
      apiEndpoint={ApiRoutes.heroBanner}
      fields={bannerFields}
      title="Festival Hero Banners"
      searchableFields={["title", "subtitle", "category", "featuredArtist"]}
      shouldAdd={true}
      shouldEdit={true}
      shouldDelete={true}
      shouldView={true}
      rowsPerPageDefault={10}
    />
  );
}
