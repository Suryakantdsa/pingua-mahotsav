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

export const metadata = {
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

export default function Home() {
  return (
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
    </div>
  );
}
