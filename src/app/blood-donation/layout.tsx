import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Donation Registration | 14th Pingua Mahotsav 2026",
  description:
    "Register for blood donation camp at 14th Pingua Mahotsav 2026. Be a hero and save lives. Organized by Pingua Mahotsav Paribar at Pingua Mahotsav Conference Hall.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Blood Donation Pingua",
    "Pingua Blood Donation Camp 2026",
    "Blood Donation Dhenkanal",
    "Pingua Mahotsav Blood Donation",
    "Register Blood Donation Pingua",
    "Blood Donation Camp Odisha",
    "Pingua Blood Bank",
    "Voluntary Blood Donation Pingua",
    "Save Lives Pingua",
    "Blood Donation Registration",
  ],
  openGraph: {
    title: "Blood Donation Registration | 14th Pingua Mahotsav 2026",
    description:
      "Join our blood donation camp at 14th Pingua Mahotsav 2026 (26 Oct 2026). Your donation can save lives. Register now!",
    url: "https://pinguamahostav.live/blood-donation",
    siteName: "Pingua Mahotsav",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Donation Registration | 14th Pingua Mahotsav 2026",
    description:
      "Register for blood donation camp at 14th Pingua Mahotsav 2026. Be a hero and save lives.",
  },
};

export default function BloodDonationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
