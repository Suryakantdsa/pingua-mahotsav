// app/page.tsx

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventSchedule from "@/components/EventSchedule";
import EventMap from "@/components/EventMap";
import OrganizerVoice from "@/components/OrganizerVoice";
import SponsorsAndPartners from "@/components/SponsorsAndPartners";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import GallerySection from "@/components/GallerySection";
import WebsideCredit from "@/components/WebsideCredit";
import Head from "next/head";
import { Metadata } from "next";
import ThankYouPopup from "@/components/ThankYouPopup";

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Pingua Mahotsav 2025 - Celebrate Culture & Tradition</title>
        <meta
          name="description"
          content="Join Pingua Mahotsav 2025 to celebrate cultural heritage, music, dance, drama, and more."
        />
        <meta
          name="keywords"
          content="Pingua Mahotsav, cultural festival, dance, music, drama, Odisha festival"
        />
        <meta
          name="google-site-verification"
          content="2gIaiG3zU7Tw8Uh_VoruqV_oPpnmNc8-ijte9XsG4BM"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Pingua Mahotsav 2025" />
        <meta
          property="og:description"
          content="Join Pingua Mahotsav 2025 to celebrate cultural heritage"
        />
        <meta property="og:url" content="https://pinguamahotsav.org/" />
        <meta property="og:type" content="website" />

        <link rel="canonical" href="https://pinguamahotsav.org/" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <HeroSection />
        <EventSchedule />
        <GallerySection />
        <EventMap />
        <OrganizerVoice />
        <SponsorsAndPartners />
        {/* <DeveloperInfo /> */}
        <WebsideCredit />
        <Footer />
        <Form />
        <ThankYouPopup />
      </div>
    </>
  );
}
