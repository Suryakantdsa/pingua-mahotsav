import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventSchedule from "@/components/EventSchedule";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import { Metadata } from "next";
import ThankYouPopup from "@/components/ThankYouPopup";

export const metadata: Metadata = {
  title: "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬ | 14th Pingua Mahotsav 2026",
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
  ],

  openGraph: {
    title: "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬ | 14th Pingua Mahotsav 2026",
    description:
      "Join 14th Pingua Mahotsav 2026 (25 Oct – 01 Nov 2026) in Dhenkanal, Odisha - A grand celebration of tradition, culture, devotion, music, and unity.",
    url: "https://pinguamahotsav.org",
    siteName: "Pingua Mahotsav 2026",
    locale: "or_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "14th Pingua Mahotsav 2026 | Odisha's Famous Village Festival",
    description:
      "Celebrate tradition, devotion, and cultural heritage at 14th Pingua Mahotsav 2026 in Odisha (25 Oct – 01 Nov 2026).",
  },
  alternates: {
    canonical: "https://pinguamahotsav.org",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Festival",
  name: "14th Pingua Mahotsav 2026 (୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬)",
  alternateName: "Pingua Mahotsav 2026",
  startDate: "2026-10-25T07:00:00+05:30",
  endDate: "2026-11-01T23:59:59+05:30",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Pingua Mahotsav Padia",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Pingua Mahotsav Ground, Pingua",
      addressLocality: "Pingua",
      addressRegion: "Dhenkanal, Odisha",
      postalCode: "759013",
      addressCountry: "IN",
    },
  },
  description:
    "14th Pingua Mahotsav 2026 - Odisha's grandest village cultural festival featuring Gajalaxmi Puja, Aseema Panda Live, Papu PomPom, Swara Odisha Ra finalists, Heart Beat Dance Group, Blood Donation Camp & Cultural Programs.",
  organizer: {
    "@type": "Organization",
    name: "Pingua Mahotsav Committee",
    url: "https://pinguamahotsav.org",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#030202] text-[#fff7e9] selection:bg-[#dc8513] selection:text-black font-sans antialiased overflow-x-hidden">
        <Navbar />
        <HeroSection />
        <EventSchedule />
        <GallerySection />
        <Footer />
        <Form />
        <ThankYouPopup />
      </div>
    </>
  );
}
