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
  title: "Pingua Mahotsav 2025 | Odisha's Famous Village Festival",
  description:
    "Experience Pingua Mahotsav 2025 - Odisha's biggest cultural festival with music, dance, drama, traditions, food, and devotion. Celebrate heritage at Pingua, Dhenkanal.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Pingua Mahotsav 2025",
    "Pingua Festival 2025",
    "Pingua Dhenkanal Festival",
    "Laxmi Puja Pingua 2025",
    "Dhenkanal Laxmi Puja 2025",
    "Odisha Cultural Festival",
    "Odisha Laxmi Puja",
    "Pingua Odisha Events",
    "Pingua Culture",
    "Pingua Temple Festival",
    "Pingua Mahotsav",
    "Pingua Festival",
    "Cultural Events",
    "Odisha Festivals",
    "Pingua 2025",
    "Pingua",
    "pingua dhenkanal",
    "dhenkanal",
    "goda",
    "gondia",
    "pingua laxmi puja",
    "pingua laxmi puja 2025",
    "laxmi puja 2025",
    "dhenkanal laxmi puja 2025",
  ],

  openGraph: {
    title: "Pingua Mahotsav 2025 | Odisha's Famous Village Festival",
    description:
      "Join Pingua Mahotsav 2025 in Dhenkanal, Odisha - A grand celebration of tradition, culture, devotion, and unity.",
    url: "https://pinguamahotsav.org",
    siteName: "Pingua Mahotsav",
    images: [
      {
        url: "https://storage.googleapis.com/pingua-mahotsav/mahotsav.PNG",
        width: 1200,
        height: 630,
        alt: "Pingua Mahotsav 2025 Celebration",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pingua Mahotsav 2025 | Odisha's Famous Village Festival",
    description:
      "Celebrate tradition, devotion, and cultural heritage at Pingua Mahotsav 2025 in Odisha.",
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
      <head>
        <meta
          name="google-site-verification"
          content="2gIaiG3zU7Tw8Uh_VoruqV_oPpnmNc8-ijte9XsG4BM"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
