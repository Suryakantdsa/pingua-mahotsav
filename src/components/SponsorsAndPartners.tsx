"use client";

import React, { useState, useEffect } from "react";
import { Award, Users, HeartHandshake, PlusCircle } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";
import apiClient from "@/restApp/apiClient";
import { ApiRoutes } from "@/restApp/api-route";

interface SponsorItem {
  _id?: string;
  name: string;
  type: string;
  message?: string;
}

const DEFAULT_SPONSORS: SponsorItem[] = [
  {
    name: "Sanskari Group Pingua",
    type: "platinum",
    message: "Title Sponsor for Swara Odisha Ra Finalists & Heart Beat Dance Night (31 Oct 2026)",
  },
  {
    name: "Mo Pingua Media & Digital",
    type: "gold",
    message: "Official Digital Broadcasting, Media Coverage & Festival Promotion Partner",
  },
  {
    name: "Heart Beat Dance Group Dhenkanal",
    type: "silver",
    message: "Official Performance Troupe & Event Cultural Stage Partner",
  },
];

export default function SponsorsAndPartners() {
  const [sponsors, setSponsors] = useState<SponsorItem[]>(DEFAULT_SPONSORS);
  const { setShowSponsorForm } = useFormStore();

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const res = await apiClient.service(ApiRoutes.sponsor).find({ query: { $limit: 100 } });
        if (res.data && res.data.length > 0) {
          setSponsors(res.data);
        }
      } catch (err) {
        console.warn("Using default sponsor list:", err);
      }
    }
    fetchSponsors();
  }, []);

  const getTierBadge = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("plat")) {
      return {
        label: "Platinum Sponsor",
        color: "text-amber-300 bg-amber-500/20 border-amber-400/50",
        icon: Award,
      };
    }
    if (t.includes("gold")) {
      return {
        label: "Gold Partner",
        color: "text-yellow-400 bg-yellow-500/15 border-yellow-400/40",
        icon: Users,
      };
    }
    return {
      label: "Cultural Partner",
      color: "text-emerald-300 bg-emerald-500/15 border-emerald-400/40",
      icon: HeartHandshake,
    };
  };

  return (
    <section id="sponsors" className="py-24 bg-[#070608] relative text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Award size={14} className="text-amber-400" />
            <span>Patrons & Community Partners</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-odia text-white tracking-tight">
            ପୃଷ୍ଠପୋଷକ ଓ ସହଯୋଗୀ <span className="text-gold-gradient font-cinzel">Partners</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-sans">
            We extend our heartfelt gratitude to the benevolent organizations and patrons whose collaboration elevates 14th Pingua Mahotsav.
          </p>
        </div>

        {/* Sponsor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sponsors.map((item, idx) => {
            const tier = getTierBadge(item.type);
            const Icon = tier.icon;

            return (
              <div
                key={item._id || idx}
                className="group relative rounded-3xl bg-[#170e24] border border-amber-500/20 p-8 shadow-xl hover:border-amber-400/60 transition-all flex flex-col items-center text-center hover:-translate-y-1"
              >
                {/* Glowing Badge / Icon */}
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={30} />
                </div>

                {/* Tier Badge */}
                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 ${tier.color}`}>
                  {tier.label}
                </span>

                {/* Sponsor Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.name}
                </h3>

                {/* Contribution Note */}
                {item.message && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.message}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Become a Partner Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#200f30] via-[#160a22] to-[#200f30] border border-amber-500/30 text-center max-w-2xl mx-auto shadow-xl">
          <h4 className="text-lg font-bold text-amber-200">
            Join Hands to Support Rural Art, Culture & Youth
          </h4>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
            Become a patron of the 14th Pingua Mahotsav 2026 and contribute to our heritage.
          </p>
          <div className="mt-5">
            <button
              onClick={() => setShowSponsorForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 transition-all shadow-md cursor-pointer"
            >
              <PlusCircle size={16} />
              <span>Become a Festival Partner</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
