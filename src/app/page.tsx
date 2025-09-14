import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventSchedule from "@/components/EventSchedule";
import EventMap from "@/components/EventMap";
import OrganizerVoice from "@/components/OrganizerVoice";
import SponsorsAndPartners from "@/components/SponsorsAndPartners";
import DeveloperInfo from "@/components/DeveloperInfo";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <HeroSection />

      {/* Events & Schedule */}

      <EventSchedule />
      <GallerySection />

      {/* Event Map */}
      <EventMap />

      {/* Organizers' Voice */}
      <OrganizerVoice />

      {/* Sponsors & Partners */}
      <SponsorsAndPartners />

      {/* Developer Credits */}
      <DeveloperInfo />
      {/* Footer */}
      <Footer />
      <Form />
    </div>
  );
}
