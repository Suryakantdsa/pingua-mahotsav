"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Sparkles, Droplet } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

export default function HeroSection() {
  const { setShowBloodDonationForm, setShowParticipationForm } = useFormStore();

  // Target Date for 14th Mahotsav Opening: Oct 25, 2026 07:00:00 AM IST
  const festivalStartDate = new Date("2026-10-25T07:00:00+05:30").getTime();
  const festivalEndDate = new Date("2026-11-01T23:59:59+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window === "undefined") {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isFinished: false };
    }
    const now = Date.now();
    const distance = festivalStartDate - now;
    if (distance < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isLive: now <= festivalEndDate,
        isFinished: now > festivalEndDate,
      };
    }
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isLive: false,
      isFinished: false,
    };
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = festivalStartDate - now;

      if (distance < 0) {
        if (now <= festivalEndDate) {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isLive: true,
            isFinished: false,
          });
        } else {
          setTimeLeft({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isLive: false,
            isFinished: true,
          });
        }
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isLive: false,
        isFinished: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [festivalStartDate, festivalEndDate]);

  // Clean background video URL - guaranteed muted autoplay, looped, NO controls, NO branding
  const videoSrc =
    "https://www.youtube-nocookie.com/embed/jYLxR6fRd2A?autoplay=1&mute=1&controls=0&loop=1&playlist=jYLxR6fRd2A&playsinline=1&rel=0&showinfo=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1";

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-between items-center text-[#fff7e9] px-4 sm:px-6 pt-32 pb-14 select-none bg-[#030202]"
    >
      {/* 1. Fullscreen Background Video & Backdrop Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* High-res Atmospheric Poster Layer */}
        <Image
          src="https://img.youtube.com/vi/jYLxR6fRd2A/maxresdefault.jpg"
          alt="14th Pingua Mahotsav Gajalaxmi Puja Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-100 scale-105"
        />

        {/* Video Iframe with Over-Crop Scaling (Crops out top & bottom YouTube controls completely) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none">
          <iframe
            className="w-[140vw] h-[78.75vw] min-h-[140vh] min-w-[248.88vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover scale-125 sm:scale-135 md:scale-150 pointer-events-none opacity-100"
            src={videoSrc}
            title="14th Pingua Mahotsav Cultural Procession"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
          />
        </div>

        {/* Inviolable Invisible Touch Barrier - Completely prevents ANY click/tap/hover on the iframe */}
        <div className="absolute inset-0 z-[2] pointer-events-auto bg-transparent select-none cursor-default" />

        {/* Cinematic Vignettes and Isha-Style Deep Obsidian Blends */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#030202]/90 via-[#030202]/40 to-[#030202] pointer-events-none" />
        <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,2,2,0.85)_100%)] pointer-events-none" />
      </div>

      {/* 2. Top Eyebrow Tagline (Isha Mahashivratri Saffron & Ivory Tag) */}
      <div className="relative z-10 pt-2 flex flex-col items-center gap-2">
        <span className="font-odia text-xs sm:text-sm tracking-[0.25em] text-[#cca146] font-medium uppercase drop-shadow">
          ॥ ଶ୍ରୀ ଶ୍ରୀ ଗଜଲକ୍ଷ୍ମୀୟୈ ନମଃ ॥
        </span>
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-1.5 rounded-full border border-[#dc8513]/40 bg-black/60 text-[#fff7e9] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#dc8513] animate-pulse" />
          <span>25 Oct – 01 Nov 2026 • Pingua, Dhenkanal</span>
        </div>
      </div>

      {/* 3. Center Stage (Majestic Typography & Isha-Style Action Buttons) */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center my-auto py-8">
        {/* Odia Headline with proper leading to prevent matra clipping */}
        <h1 className="font-odia text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#fff7e9] tracking-tight leading-[1.25] drop-shadow-2xl">
          ୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ
        </h1>

        {/* English Title in Regal Classical Type */}
        <p className="font-cinzel text-xl sm:text-3xl md:text-4xl text-[#dc8513] font-bold tracking-[0.18em] uppercase mt-3 drop-shadow">
          14th Pingua Mahotsav 2026
        </p>

        {/* Devotional Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#dfd6c4] font-serif font-light mt-5 leading-relaxed">
          A sacred 7-day cultural festival celebrating Maa Gajalaxmi Puja, divine devotion, classical music, dance, and cultural unity in Odisha.
        </p>
        <p className="font-odia text-xs sm:text-sm text-[#cca146] mt-2 font-medium tracking-wide">
          କଳା, ସଂସ୍କୃତି, ଐତିହ୍ୟ ଓ ପରମ୍ପରାର ଭବ୍ୟ ମହାମିଳନ
        </p>

        {/* Isha-Style Dual Action Pills */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
          {/* Primary: Solid Saffron Pill */}
          <Link
            href="/cultural-registration"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r from-[#dc8513] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#ffa735] text-[#030202] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#dc8513]/25 cursor-pointer text-center flex items-center justify-center gap-2 group"
          >
            <Sparkles size={16} className="text-[#030202] group-hover:rotate-12 transition-transform" />
            <span>Cultural Registration</span>
          </Link>

          {/* Secondary: Translucent Ivory Outline Pill */}
          <Link
            href="/blood-registration"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#fff7e9]/40 hover:border-[#fff7e9] text-[#fff7e9] hover:bg-white/[0.08] transition-all hover:scale-105 active:scale-95 backdrop-blur-md cursor-pointer text-center flex items-center justify-center gap-2 group"
          >
            <Droplet size={15} className="text-red-500 fill-red-500 group-hover:scale-110 transition-transform" />
            <span>Register for Blood Donation</span>
          </Link>
        </div>
      </div>

      {/* 4. Bottom Stage (Minimalist Typography Countdown & Scroll Prompt) */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-4">
        {timeLeft.isLive ? (
          <div className="text-[#dc8513] font-bold text-sm tracking-widest uppercase font-odia animate-pulse">
            ୧୪ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ଚାଲୁଅଛି • The Festival is Live Now!
          </div>
        ) : timeLeft.isFinished ? (
          <div className="text-[#cca146] font-medium text-xs tracking-wider uppercase">
            Festival Concluded • Thank you for celebrating with us
          </div>
        ) : (
          <div className="flex items-center justify-center gap-5 sm:gap-9 text-center text-[#fff7e9]">
            <div>
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fff7e9] block">
                {timeLeft.days}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#aea493] block mt-1">
                Days
              </span>
            </div>
            <span className="text-xl sm:text-2xl text-[#dc8513]/60 mb-3">:</span>
            <div>
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fff7e9] block">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#aea493] block mt-1">
                Hours
              </span>
            </div>
            <span className="text-xl sm:text-2xl text-[#dc8513]/60 mb-3">:</span>
            <div>
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#fff7e9] block">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#aea493] block mt-1">
                Mins
              </span>
            </div>
            <span className="text-xl sm:text-2xl text-[#dc8513]/60 mb-3">:</span>
            <div>
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#dc8513] block">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#aea493] block mt-1">
                Secs
              </span>
            </div>
          </div>
        )}

        {/* Scroll prompt */}
        <a
          href="#events"
          className="text-[11px] text-[#aea493] hover:text-[#fff7e9] transition-colors tracking-[0.2em] uppercase flex items-center gap-1.5 mt-1"
        >
          <span>Explore Schedule</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#dc8513] animate-bounce" />
        </a>
      </div>
    </section>
  );
}
