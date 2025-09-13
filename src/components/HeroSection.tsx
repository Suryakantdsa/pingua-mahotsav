"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Music } from "lucide-react";
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

  const { showParticipationForm, setShowParticipationForm } = useFormStore();

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

    return () => clearInterval(timer);
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

      <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
            ୧୩ତମ ବାର୍ଷିକ
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-300">
            ପିଙ୍ଗୁଆ ମହୋତ୍ସବ
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            &quot;ପରମ୍ପରା ଓ ସଂସ୍କୃତିର ମହାମିଳନ - Where Heritage Comes Alive&quot;
          </p>

          <Button
            onClick={() => setShowParticipation()}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold  py-5  text-base sm:text-xl rounded-full transition-all transform hover:scale-105 shadow-2xl animate-pulse cursor-pointer"
          >
            <Music className="mr-2 h-5 w-5" />
            ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମରେ ଯୋଗଦାନ କରନ୍ତୁ
          </Button>
          <p className="text-sm text-orange-200 mt-4">
            Join Our Cultural Programs - Share Your Talent!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-300">
            Festival Begins In
          </h3>
          <div className="mb-8">
            {/* <h3 className="text-2xl font-semibold mb-6 text-festival-gold">
              Festival Begins In:
            </h3> */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto  ">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <Card
                  key={unit}
                  className="bg-white/10 backdrop-blur-sm border-white/20 p-4"
                >
                  <div className="text-xl md:text-3xl font-bold text-white">
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
        <Badge
          variant="outline"
          className="text-base sm:text-lg px-6 py-2 border-yellow-300 text-yellow-300 mb-8 "
        >
          6th - 12th October 2025 | लक्ष्मी पूजा विशेष
        </Badge>
      </div>
    </section>
  );
};

export default HeroSection;
