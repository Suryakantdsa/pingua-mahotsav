"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Music, ArrowRight, Users, Calendar, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import { Card } from "./ui/card";
import { useFormStore } from "@/store/useFormStore";

const HeroSection = () => {
  const [_, setIsLive] = useState(false);
  const [participants, setParticipants] = useState(54);
  const { setShowParticipationForm } = useFormStore();

  function setShowParticipation() {
    setShowParticipationForm(true);
  }

  useEffect(() => {
    // Check if current date is October 6, 2025
    const today = new Date();
    const eventStart = new Date("2025-10-06T00:00:00");
    const eventEnd = new Date("2025-10-12T23:59:59");

    if (today >= eventStart && today <= eventEnd) {
      setIsLive(true);
    }

    // Simulate participant growth
    const participantTimer = setInterval(() => {
      setParticipants((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(participantTimer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(124, 45, 18, 0.2), rgba(127, 29, 29, 0.8)), url(${heroBackground.src})`,
        }}
      ></div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-40"></div>
          </div>
        ))}
      </div>

      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge
            variant="secondary"
            className="mb-4 bg-red-600 text-white animate-pulse"
          >
            🔴 LIVE NOW! 13th Annual Celebration in Progress
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-yellow-200 drop-shadow-lg">
            ୧୩ତମ ବାର୍ଷିକ
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300">
            ପିଙ୍ଗୁଆ ମହୋତ୍ସବ
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-orange-100">
            &quot;ପରମ୍ପରା ଓ ସଂସ୍କୃତିର ମହାମିଳନ - Where Heritage Comes Alive&quot;
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center items-center gap-2 mb-8 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-yellow-300" />
              <span className="text-sm">
                {participants}+ Participants Registered
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Calendar className="h-4 w-4 text-yellow-300" />
              <span className="text-sm">7 Days of Cultural Extravaganza</span>
            </div>
          </div>

          {/* <Button
            onClick={() => setShowParticipation()}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 
              bg-gradient-to-r from-yellow-400 to-orange-500 
              hover:from-yellow-500 hover:to-orange-600 
              text-black font-bold rounded-full shadow-2xl hover:shadow-lg 
              transition-all duration-200 transform hover:scale-110
              text-lg sm:text-xl`}
          >
            <Music className="h-5 w-5" />
            <span className="text-base sm:text-lg">
              ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗଦାନ କରନ୍ତୁ
            </span>
            <ArrowRight className="h-6 w-6" />
          </Button> */}

          {/* <p className="text-sm text-orange-200 mt-4 animate-pulse">
            Join Our Cultural Programs - Share Your Talent!
          </p> */}
        </div>

        {/* Live Status */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-2xl p-6 mb-6 shadow-2xl">
          <h3 className="text-2xl font-bold mb-2">
            🎉 The Festival Has Begun!
          </h3>
          <p className="text-lg opacity-90">Happening now through October 12</p>
        </div>

        {/* Event Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:scale-105 transition-transform">
            <MapPin className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-200">Prime Location</h4>
            <p className="text-sm">Mahotsav Grounds</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:scale-105 transition-transform">
            <Users className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-200">Community</h4>
            <p className="text-sm">5000+ Expected Attendees</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:scale-105 transition-transform">
            <Music className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-200">50+ Events</h4>
            <p className="text-sm">Music, Dance, Food & Culture</p>
          </Card>
        </div>

        <Badge
          variant="outline"
          className="text-base sm:text-lg px-4 py-2 border-yellow-300 text-yellow-300 mb-6 animate-pulse"
        >
          🎯 ୬-୧୨ ଅକ୍ଟୋବର ୨୦୨୫ | ଲକ୍ଷ୍ମୀ ପୂଜା ବିଶେଷ | Join Us Today!
        </Badge>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(12)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const size = Math.random() * 2 + 1;
          const delay = Math.random() * 3;
          const duration = Math.random() * 2 + 2;

          return (
            <div
              key={i}
              className="absolute animate-firework"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            >
              {/* Burst Effect */}
              <div
                className="w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                style={{
                  boxShadow: "0 0 8px 2px rgba(255, 214, 100, 0.7)",
                  animationDelay: "0s",
                }}
              ></div>
              <div
                className="absolute top-0 left-0 w-2 h-2 bg-orange-400 rounded-full opacity-80 animate-ping"
                style={{
                  animationDelay: "0.1s",
                  transform: "scale(0)",
                }}
              ></div>
              <div
                className="absolute top-0 left-0 w-3 h-3 bg-red-400 rounded-full opacity-60 animate-ping"
                style={{
                  animationDelay: "0.2s",
                  transform: "scale(0)",
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }

        @keyframes firework {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }
        .animate-firework {
          animation: firework ease-out infinite;
        }
      `}</style> */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }

        @keyframes firework {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          70% {
            transform: scale(1.5) rotate(90deg);
            opacity: 0.7;
          }
          100% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
        }

        .animate-firework {
          animation: firework ease-out infinite;
        }

        .animate-ping {
          animation: ping 1s infinite;
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
