"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Shield,
  Car,
  HeartPulse,
  Sparkles,
  PhoneCall,
  Flame,
  Bus,
} from "lucide-react";

export default function EventMap() {
  const [activeFacility, setActiveFacility] = useState<string>("stage");

  const facilities = [
    {
      id: "stage",
      title: "Main Cultural Stage (ମୁଖ୍ୟ ମଞ୍ଚ)",
      desc: "Prime venue for Star Melody Night, Tribal Folk dance, and the daily evening cultural programs.",
      icon: Sparkles,
      color: "bg-amber-500",
      top: "40%",
      left: "62%",
    },
    {
      id: "puja",
      title: "Gajalaxmi Puja Mandap (ଗଜଲକ୍ଷ୍ମୀ ମଣ୍ଡପ)",
      desc: "Sacred sanctum for Maa Gajalaxmi Puja, rituals, and traditional Bruddha Jyoti lamp offerings.",
      icon: Flame,
      color: "bg-orange-600",
      top: "22%",
      left: "45%",
    },
    {
      id: "karyalaya",
      title: "Mahotsav Karyalaya & Blood Donation Camp",
      desc: "Official festival administrative office and venue for 26 Oct morning Blood & Organ Donation Camp.",
      icon: HeartPulse,
      color: "bg-rose-600",
      top: "55%",
      left: "32%",
    },
    {
      id: "parking",
      title: "Dedicated Vehicle Parking Zone",
      desc: "Safe designated two-wheeler and four-wheeler parking ground with volunteer traffic assistance.",
      icon: Car,
      color: "bg-blue-600",
      top: "15%",
      left: "75%",
    },
    {
      id: "police",
      title: "Police & Emergency First Aid Camp",
      desc: "24x7 security personnel, district police aid post, ambulance, and first-aid medical support.",
      icon: Shield,
      color: "bg-emerald-600",
      top: "72%",
      left: "58%",
    },
  ];

  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Pingua+Dhenkanal+Odisha";

  return (
    <section id="map" className="py-24 bg-[#070608] relative text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <MapPin size={14} className="text-amber-400" />
            <span>Festival Ground & Route Navigation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-odia text-white tracking-tight">
            ଉତ୍ସବ ସ୍ଥଳୀ ଓ ମାନଚିତ୍ର <span className="text-gold-gradient font-cinzel">Venue Map</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans">
            Find your way to Pingua Mahotsav Padia in Dhenkanal district with verified transit details and facility locations.
          </p>
        </div>

        {/* Two-Column Layout: Visual Map & Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Ground Map Card */}
          <div className="lg:col-span-7 bg-[#160c22] rounded-3xl border border-amber-500/20 overflow-hidden shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-amber-400" />
                  <span>Interactive Festival Ground Map</span>
                </h3>
                <p className="text-xs text-slate-400">Click any marker or facility below to view details</p>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                Ground Layout
              </span>
            </div>

            {/* Simulated Vector Festival Ground */}
            <div className="relative w-full aspect-[16/10] bg-[#0c0812] rounded-2xl border border-white/10 overflow-hidden">
              <svg
                className="w-full h-full opacity-60"
                viewBox="0 0 800 500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="fieldGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#28113b" />
                    <stop offset="100%" stopColor="#0f0717" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#fieldGrad)" />

                {/* Grid Lines */}
                <path d="M 0,100 L 800,100 M 0,200 L 800,200 M 0,300 L 800,300 M 0,400 L 800,400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <path d="M 200,0 L 200,500 M 400,0 L 400,500 M 600,0 L 600,500" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* Main Festival Padia Perimeter */}
                <path
                  d="M 120,80 C 350,30 550,40 700,90 C 760,200 720,380 550,430 C 300,480 100,400 120,80 Z"
                  fill="rgba(245, 196, 82, 0.05)"
                  stroke="rgba(245, 196, 82, 0.35)"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                />

                {/* Road to Ground */}
                <path d="M 40,490 Q 200,450 300,320" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                <text x="140" y="470" fill="rgba(255,255,255,0.4)" fontSize="11" fontWeight="bold">VILLAGE MAIN ROAD</text>
              </svg>

              {/* Facility Markers */}
              {facilities.map((f) => {
                const Icon = f.icon;
                const isSelected = activeFacility === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFacility(f.id)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full transition-all duration-300 shadow-xl cursor-pointer ${
                      f.color
                    } ${
                      isSelected
                        ? "scale-125 ring-4 ring-white shadow-amber-500/50 z-20"
                        : "hover:scale-110 opacity-90 z-10"
                    }`}
                    style={{ top: f.top, left: f.left }}
                    title={f.title}
                  >
                    <Icon size={16} className="text-white" />
                  </button>
                );
              })}
            </div>

            {/* Selected Facility Detail Card */}
            {activeFacility && (
              <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-amber-500/30">
                {(() => {
                  const sel = facilities.find((f) => f.id === activeFacility);
                  if (!sel) return null;
                  const Icon = sel.icon;
                  return (
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-xl ${sel.color} text-white shrink-0`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-amber-200">{sel.title}</h4>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{sel.desc}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Right Column: Address, Travel Distances & Directions CTA */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address & Venue Card */}
            <div className="bg-[#160c22] rounded-3xl border border-amber-500/20 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                <MapPin size={16} />
                <span>Festival Ground Address</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Pingua Mahotsav Padia (ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Village & Post: Pingua, Gondia Block, Dhenkanal District, Odisha — 759016, India.
              </p>

              {/* Get Directions Button */}
              <div className="mt-6">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-950/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <Navigation size={18} />
                  <span>Get Live GPS Directions</span>
                </a>
              </div>
            </div>

            {/* Travel Guide & Distances */}
            <div className="bg-[#160c22] rounded-3xl border border-amber-500/20 p-6 shadow-xl space-y-3.5 text-xs sm:text-sm">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-2">
                <Bus size={15} />
                <span>Travel Distance Guide</span>
              </h4>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 text-xs block">From Dhenkanal Town</span>
                  <span className="font-black text-amber-200 text-base">~28 km</span>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 text-xs block">From Cuttack City</span>
                  <span className="font-black text-amber-200 text-base">~55 km</span>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 text-xs block">From Bhubaneswar Airport</span>
                  <span className="font-black text-amber-200 text-base">~82 km</span>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-400 text-xs block">From Bhuban NAC</span>
                  <span className="font-black text-amber-200 text-base">~14 km</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Festival Control Room Helpline:</span>
                <span className="font-bold text-amber-300 flex items-center gap-1">
                  <PhoneCall size={12} />
                  <span>+91 87630 54526</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
