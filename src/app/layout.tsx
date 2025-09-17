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
    "Welcome to Pingua Mahotsav 2025! Join Pingua Mahotsav 2025 to celebrate cultural heritage, music, dance, drama, and more.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
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
    title: "Pingua Mahotsav 2025",
    description:
      "Celebrate culture, tradition, and unity at Pingua Mahotsav 2025.",
    url: "https://pinguamahotsav.org",
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
