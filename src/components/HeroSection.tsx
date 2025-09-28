"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Music, ArrowRight, Users, Calendar, MapPin } from "lucide-react";
import heroBackground from "@/assets/hero-bg.jpg";
import { Card } from "./ui/card";
import { useFormStore } from "@/store/useFormStore";

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // const [isUrgent, setIsUrgent] = useState(true);
  const [participants, setParticipants] = useState(54); // Starting count

  const { setShowParticipationForm } = useFormStore();

  function setShowParticipation() {
    setShowParticipationForm(true);
  }

  useEffect(() => {
    const targetDate = new Date("2025-10-06T00:00:00");

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    // Simulate participant count increase
    const participantTimer = setInterval(() => {
      setParticipants((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(participantTimer);
    };
  }, []);

  const isLastWeek = timeLeft.days <= 7;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-10 "
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
          <Badge variant="secondary" className="mb-4 bg-orange-500 text-white">
            🎉 13th Annual Celebration - Bigger Than Ever!
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
            ୧୩ତମ ବାର୍ଷିକ
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-300 animate-bounce">
            ପିଙ୍ଗୁଆ ମହୋତ୍ସବ
          </h2>
          <p className="text-xl md:text-2xl mb-4 text-orange-100">
            &quot;ପରମ୍ପରା ଓ ସଂସ୍କୃତିର ମହାମିଳନ - Where Heritage Comes Aliv&quot;
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

          <Button
            onClick={() => setShowParticipation()}
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 
             bg-gradient-to-r from-yellow-400 to-orange-500 
             hover:from-yellow-500 hover:to-orange-600 
             text-black font-bold rounded-full             shadow-2xl hover:shadow-lg 
             transition-all duration-200 transform hover:scale-110
             text-lg sm:text-xl
            `}
          >
            <Music className="h-5 w-5" />
            <span className="text-base sm:text-lg">
              {"ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗଦାନ କରନ୍ତୁ"}
            </span>
            <ArrowRight className="h-6 w-6" />
          </Button>

          <p className="text-sm text-orange-200 mt-4 animate-pulse">
            {"Join Our Cultural Programs - Share Your Talent!"}
          </p>
        </div>

        {/* Enhanced Countdown Timer */}
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-4  mb-6 border-2
            
          `}
        >
          <h3 className="text-2xl font-semibold mb-6 text-yellow-300">
            Festival Begins In
          </h3>
          <div className="mb-4">
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <Card
                  key={unit}
                  className={`bg-gradient-to-b from-white/20 to-white/10 backdrop-blur-sm border-2  p-4 transition-all duration-300 hover:scale-105`}
                >
                  <div className={`text-xl md:text-3xl font-bold`}>
                    {value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-300 capitalize w-full flex justify-center">
                    {unit}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Event Highlights */}
        <div className="grid grid-cols-3 gap-2 mb-6">
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
          {"🎯 ୬-୧୨ ଅକ୍ଟୋବର ୨୦୨୫ | ଲକ୍ଷ୍ମୀ ପୂଜା ବିଶେଷ | Don't Miss Out!"}
        </Badge>
      </div>

      <style jsx>{`
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
      `}</style>
    </section>
  );
};

export default HeroSection;
