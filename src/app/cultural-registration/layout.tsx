import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cultural Programme Registration Form | 14th Pingua Mahotsav 2026",
  description:
    "Official Cultural Programme Registration Form for 14th Pingua Mahotsav 2026 (୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ). Register your dance, song, music, drama, folk arts, or instrumental performance.",
  keywords: [
    "Pingua Mahotsav Registration Form",
    "Cultural Programme Registration",
    "Pingua Mahotsav 2026 Form",
    "Odisha Dance Competition Registration",
    "Folk Dance Pingua Mahotsav",
    "Artist Registration Pingua",
  ],
  openGraph: {
    title: "Cultural Programme Registration Form | 14th Pingua Mahotsav 2026",
    description:
      "Register for cultural events at the 14th Pingua Mahotsav 2026. Official registration form for artists, troupes, and performers.",
    url: "https://pinguamahotsav.org/cultural-registration",
    siteName: "Pingua Mahotsav 2026",
    type: "website",
  },
};

export default function CulturalRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
