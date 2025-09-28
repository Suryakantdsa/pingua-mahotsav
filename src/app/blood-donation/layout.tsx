import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood Donation Registration | Pingua Mahotsav 2025",
  description:
    "Register for blood donation camp at Pingua Mahotsav 2025. Be a hero and save lives. Organized by Pingua Mahotsav Paribar at Prathamika Swathya Kendra, Pingua.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Blood Donation Pingua",
    "Pingua Blood Donation Camp 2025",
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
    title: "Blood Donation Registration | Pingua Mahotsav 2025",
    description:
      "Join our blood donation camp at Pingua Mahotsav 2025. Your donation can save lives. Register now!",
    url: "https://pinguamahotsav.org/blood-donation",
    siteName: "Pingua Mahotsav",
    images: [
      {
        url: "https://storage.googleapis.com/pingua-mahotsav/blood_donation.PNG",
        width: 1200,
        height: 630,
        alt: "Pingua Mahotsav Blood Donation Camp 2025",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Donation Registration | Pingua Mahotsav 2025",
    description:
      "Register for blood donation camp at Pingua Mahotsav 2025. Be a hero and save lives.",
    images: [
      "https://storage.googleapis.com/pingua-mahotsav/blood_donation.PNG",
    ],
  },
};

export default function BloodDonationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
