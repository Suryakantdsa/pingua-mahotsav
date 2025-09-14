import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pingua Mahotsav 2025 | Official Website",
  description:
    "Welcome to Pingua Mahotsav 2025! Explore event schedules, cultural programs, maps, organizers' voices, sponsors, and more.",
  keywords: [
    "Pingua Mahotsav",
    "Pingua Festival",
    "Cultural Events",
    "Odisha Festivals",
    "Pingua 2025",
  ],
  openGraph: {
    title: "Pingua Mahotsav 2025",
    description:
      "Celebrate culture, tradition, and unity at Pingua Mahotsav 2025.",
    url: "https://pinguamahotsav.com",
    siteName: "Pingua Mahotsav",
    images: [
      {
        url: "https://storage.googleapis.com/pingua-mahotsav/mahotsav.PNG",
        width: 1200,
        height: 630,
        alt: "Pingua Mahotsav 2025",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pingua Mahotsav 2025",
    description:
      "Celebrate culture, tradition, and unity at Pingua Mahotsav 2025.",
    images: ["https://storage.googleapis.com/pingua-mahotsav/mahotsav.PNG"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
