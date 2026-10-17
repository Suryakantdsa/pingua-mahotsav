import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import PublicPageLoader from "@/components/PublicPageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pinguamahotsav.org"),
  title: "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬ | 14th Pingua Mahotsav 2026 - Dhenkanal, Odisha",
  description:
    "14th Pingua Mahotsav 2026 (୨୫ ଅକ୍ଟୋବର - ୦୧ ନଭେମ୍ବର ୨୦୨୬) - Odisha's grandest village festival featuring Gajalaxmi Puja, Aseema Panda Live, Papu PomPom, Swara Odisha Ra finalists, Heart Beat Dance Group, Blood Donation Camp & Cultural Programs at Pingua, Dhenkanal.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "Pingua Mahotsav 2026",
    "Pingua Mahotsav Live",
    "Pingua Festival 2026",
    "Pingua Dhenkanal Festival",
    "Laxmi Puja Pingua 2026",
    "Dhenkanal Laxmi Puja 2026",
    "Odisha Cultural Festival 2026",
    "Aseema Panda Live Pingua",
    "Papu PomPom Pingua Mahotsav",
    "Mo Pingua",
    "Gajlaxmi Puja Dhenkanal",
    "Pingua Blood Donation Camp",
    "Pingua Odisha Events",
    "Pingua Culture",
    "Pingua",
  ],

  openGraph: {
    title: "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬ | 14th Pingua Mahotsav 2026",
    description:
      "Join 14th Pingua Mahotsav 2026 (25 Oct – 01 Nov 2026) in Dhenkanal, Odisha - A grand celebration of tradition, culture, music, Gajalaxmi Puja, and unity.",
    url: "https://pinguamahotsav.org",
    siteName: "Pingua Mahotsav 2026",
    locale: "or_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "14th Pingua Mahotsav 2026 | Odisha's Famous Village Festival",
    description:
      "Celebrate tradition, devotion, live music, and cultural heritage at 14th Pingua Mahotsav 2026 in Dhenkanal, Odisha (25 Oct – 01 Nov 2026).",
  },
  alternates: {
    canonical: "https://pinguamahotsav.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="2gIaiG3zU7Tw8Uh_VoruqV_oPpnmNc8-ijte9XsG4BM"
        />
        <meta name="theme-color" content="#0c0812" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0c0812] text-white selection:bg-amber-500 selection:text-slate-950`}
      >
        <PublicPageLoader minDelay={2000} />
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#160a22",
              color: "#fdfbf7",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
            },
          }}
        />
      </body>
    </html>
  );
}
