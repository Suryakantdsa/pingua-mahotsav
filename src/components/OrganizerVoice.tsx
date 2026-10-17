"use client";

import React, { useState, useEffect } from "react";
import { Users, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import apiClient from "@/restApp/apiClient";
import { ApiRoutes } from "@/restApp/api-route";

interface OrgVoice {
  _id?: string;
  name: string;
  position: string;
  message: string;
  image?: string;
}

const DEFAULT_ORGANIZERS: OrgVoice[] = [
  {
    name: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ ସାହୁ (Shri Ranjan Sahoo)",
    position: "ମହୋତ୍ସବ ସଭାପତି (Festival President)",
    message:
      "ଆମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପିଢ଼ୀ ପିଢ଼ୀ ଧରି ଚାଲିଆସିଥିବା ସମୃଦ୍ଧ ସାଂସ୍କୃତିକ ଐତିହ୍ୟର ପ୍ରତିକ। ଏହି ମହୋତ୍ସବ ଆମର ସମସ୍ତଙ୍କୁ ଏକତ୍ର କରେ, ଆମ ପାରମ୍ପରିକତା ଓ ମୂଲ୍ୟବୋଧକୁ ଉଦ୍‌ଯାପନ କରିବାରେ।",
  },
  {
    name: "ଶ୍ରୀଯୁକ୍ତ ରଞ୍ଜନ କୁମାର ସାହୁ (Shri Ranjan Kumar Sahoo)",
    position: "ମହୋତ୍ସବ ସମ୍ପାଦକ (Festival Secretary)",
    message:
      "ପ୍ରତିବର୍ଷ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ସମୟରେ ଆମ ଗାଁର ସତ୍ୟିକର ମାୟାକୁ ଆମେ ଦେଖୁଥାଉ। ଏହା ଆମର ଏକତା ଓ ସୁନ୍ଦର ପାରମ୍ପରିକତାର ସୁରକ୍ଷାର ପ୍ରତିକ।",
  },
  {
    name: "ଶ୍ରୀଯୁକ୍ତ ଅମରେନ୍ଦ୍ର ପ୍ରସାଦ ମହାଳିକ (Shri Amarendra Prasad Mohalik)",
    position: "ଟ୍ରଷ୍ଟି ଓ ଉପଦେଷ୍ଟା କମିଟି ସଦସ୍ୟ (Trustee & Advisor)",
    message:
      "ମୋ ହୃଦୟ ସର୍ବଦା ଆମ ଗ୍ରାମର ଉନ୍ନତି ଓ ସଂସ୍କୃତି ସହିତ ଯୋଡିହୋଇ ରହିଛି। ପିଙ୍ଗୁଆର ଏକତା ଓ ପରମ୍ପରା ଆମ ସମସ୍ତଙ୍କ ପାଇଁ ଅମୂଲ୍ୟ ଗର୍ବ।",
  },
  {
    name: "ଶ୍ରୀଯୁକ୍ତ ନିରଞ୍ଜନ ସାହୁ (Shri Niranjan Sahoo)",
    position: "କୋଷାଧ୍ୟକ୍ଷ ଓ ଯୋଜନା ମୁଖ୍ୟ (Treasurer & Planning Head)",
    message:
      "Every year, we witness the magic of our village coming alive during Pingua Mahotsav. It is a testament to our unity and the preservation of our ancient sacred traditions.",
  },
  {
    name: "ଶ୍ରୀଯୁକ୍ତ ଦେବାଶିଷ ବାରିକ (Shri Debasish Barik)",
    position: "ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ ମୁଖ୍ୟ (Cultural Program Head)",
    message:
      "The cultural stage of Pingua Mahotsav is where our heritage meets creativity. From classical Odissi and folk dances to modern stars, every performance reflects the soul of Pingua.",
  },
];

export default function OrganizerVoice() {
  const [organizers, setOrganizers] = useState<OrgVoice[]>(DEFAULT_ORGANIZERS);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const res = await apiClient.service(ApiRoutes.orgMember).find({ query: { $limit: 100 } });
        if (res.data && res.data.length > 0) {
          const mapped = res.data.map((item: any) => ({
            name: item.name,
            position: item.designation || item.role || item.position || "Festival Committee Leader",
            message: item.message,
            image: item.image,
          }));
          setOrganizers(mapped);
        }
      } catch (err) {
        console.warn("Using default organizer voices:", err);
      }
    }
    fetchLeaders();
  }, []);

  const nextLeader = () => setActiveIndex((prev) => (prev + 1) % organizers.length);
  const prevLeader = () => setActiveIndex((prev) => (prev - 1 + organizers.length) % organizers.length);

  return (
    <section id="organizers" className="py-24 bg-[#0b0a0e] relative text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-temple-pattern opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Users size={14} className="text-amber-400" />
            <span>Voice of Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-odia text-white tracking-tight">
            କର୍ମକର୍ତ୍ତାଙ୍କ ବାର୍ତ୍ତା <span className="text-gold-gradient font-cinzel">Organizer Voice</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans">
            Hear from the devoted guardians and committee members whose dedication keeps our village tradition alive.
          </p>
        </div>

        {/* Featured Editorial Quote Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1c0f2a] via-[#140820] to-[#0d0615] border border-amber-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden mb-12">
          {/* Decorative Giant Quote Icon */}
          <Quote
            size={160}
            className="absolute -top-10 -right-10 text-amber-500/5 pointer-events-none rotate-12"
          />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Ornate Portrait Frame */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-2 border-amber-400/80 bg-[#25103a] p-1 shadow-2xl flex items-center justify-center text-amber-300 font-bold text-3xl font-cinzel">
                {organizers[activeIndex]?.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("") || "PM"}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                ✦
              </div>
            </div>

            {/* Quote & Author Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg sm:text-2xl text-amber-100 font-odia leading-relaxed sm:leading-loose italic">
                &ldquo;{organizers[activeIndex]?.message}&rdquo;
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-white font-odia">
                    {organizers[activeIndex]?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-400 font-semibold mt-0.5">
                    {organizers[activeIndex]?.position}
                  </p>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={prevLeader}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-amber-200 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Previous Leader"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs text-slate-400 font-cinzel px-2">
                    {activeIndex + 1} / {organizers.length}
                  </span>
                  <button
                    onClick={nextLeader}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-amber-200 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Next Leader"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {organizers.map((item, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#25103a] border-amber-400 text-white shadow-lg shadow-amber-950/40 scale-102"
                    : "bg-[#140b20]/60 hover:bg-[#1b0e2b] border-white/10 text-slate-400 hover:text-slate-200"
                }`}
              >
                <p className="font-bold text-xs sm:text-sm line-clamp-1 font-odia text-white">
                  {item.name}
                </p>
                <p className="text-[10px] text-amber-400/80 line-clamp-1 mt-0.5">
                  {item.position}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
