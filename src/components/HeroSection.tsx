"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Music, Users, Calendar, MapPin, ImageIcon } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import { Card } from "./ui/card";

const HeroSection = () => {
  const [participants, setParticipants] = useState(1250);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(124, 45, 18, 0.3), rgba(127, 29, 29, 0.9)), url(${heroBackground.src})`,
        }}
      ></div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${18 + Math.random() * 10}s`,
            }}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Thank You Badge */}
        <Badge
          variant="secondary"
          className="mb-4 bg-gradient-to-r from-yellow-500 to-red-600 text-white text-base px-4 py-2 rounded-full shadow-lg animate-pulse"
        >
          ✨ Thank You for Making It a Grand Success!
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-3 text-yellow-200 drop-shadow-lg">
          ୧୩ତମ ବାର୍ଷିକ
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300">
          ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୫
        </h2>
        <p className="text-xl md:text-2xl mb-4 text-orange-100">
          &quot;ପରମ୍ପରା ଓ ସଂସ୍କୃତିର ମହାମିଳନ - Where Heritage Came Alive&quot;
        </p>

        {/* Celebration Summary */}
        <div className="bg-gradient-to-r from-yellow-600/90 to-orange-500/80 text-white rounded-2xl p-6 mb-6 shadow-2xl">
          <h3 className="text-2xl font-bold mb-2">
            🎊 The Celebration Concluded Beautifully!
          </h3>
          <p className="text-lg opacity-90">
            6th–12th October 2025 | Thank you to all participants, artists &
            visitors ❤️
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center items-center gap-2 mb-8 flex-wrap">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Users className="h-4 w-4 text-yellow-300" />
            <span className="text-sm">{participants}+ Participants</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Music className="h-4 w-4 text-yellow-300" />
            <span className="text-sm">50+ Performances</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
            <Calendar className="h-4 w-4 text-yellow-300" />
            <span className="text-sm">7 Glorious Days</span>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:scale-105 transition-transform">
            <MapPin className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-200">Venue</h4>
            <p className="text-sm">Mahotsav Grounds, Pingua</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:scale-105 transition-transform">
            <Users className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-200">Community</h4>
            <p className="text-sm">Thousands United in Joy</p>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4 hover:scale-105 transition-transform">
            <ImageIcon className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-200">Gallery</h4>
            <p className="text-sm italic">Coming Soon...</p>
          </Card>
        </div>

        {/* Closing Badge */}
        <Badge
          variant="outline"
          className="text-base sm:text-lg px-4 py-2 border-yellow-300 text-yellow-300 mt-4 animate-bounce"
        >
          🌟 See You Again in 2026 | Stay Tuned for Memories 📸
        </Badge>
      </div>

      {/* Gentle fireworks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(10)].map((_, i) => {
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = Math.random() * 3 + 2;

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
              <div
                className="w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                style={{
                  boxShadow: "0 0 8px 2px rgba(255, 214, 100, 0.6)",
                  animationDelay: "0s",
                }}
              ></div>
              <div
                className="absolute top-0 left-0 w-2 h-2 bg-orange-400 rounded-full opacity-80 animate-ping"
                style={{
                  animationDelay: "0.15s",
                  transform: "scale(0)",
                }}
              ></div>
            </div>
          );
        })}
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
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
            opacity: 1;
          }
          70% {
            transform: scale(1.3);
            opacity: 0.7;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        .animate-firework {
          animation: firework ease-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
