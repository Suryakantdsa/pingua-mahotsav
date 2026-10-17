import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mega Blood Donation Registration | 14th Pingua Mahotsav 2026 & Red Cross",
  description:
    "Official Voluntary Blood & Organ Donation Registration Form for 14th Pingua Mahotsav 2026 in collaboration with Indian Red Cross Society (Dhenkanal Branch). Donate blood, save lives.",
  keywords: [
    "Pingua Mahotsav Blood Donation",
    "Red Cross Blood Donation Dhenkanal",
    "Voluntary Blood Donor Registration Odisha",
    "Pingua Blood Camp 2026",
    "Indian Red Cross Society Pingua",
    "Organ Donation Pledge Pingua",
  ],
  openGraph: {
    title: "Mega Blood Donation Registration | 14th Pingua Mahotsav 2026 & Red Cross",
    description:
      "Join the noble life-saving mission on 26 October 2026 at Pingua Mahotsav Karyalaya in collaboration with Indian Red Cross Society.",
    url: "https://pinguamahotsav.org/blood-registration",
    siteName: "Pingua Mahotsav 2026",
    type: "website",
  },
};

export default function BloodRegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
