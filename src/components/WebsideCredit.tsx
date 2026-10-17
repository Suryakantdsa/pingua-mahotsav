"use client";

import React from "react";
import { AnimatedTooltipPreview } from "./AnimatedTooltipPreview";
import { Code2, Heart } from "lucide-react";

export default function WebsiteCredit() {
  return (
    <section id="credits" className="py-16 bg-[#0b0a0e] border-t border-b border-white/10 relative text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Description */}
          <div className="md:col-span-5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2">
              <Code2 size={13} className="text-amber-400" />
              <span>Digital Craftsmanship</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-odia text-white">
              ୱେବସାଇଟ୍ ନିର୍ମାତା ଓ ଟିମ୍ <span className="text-gold-gradient font-cinzel">Web Team</span>
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Designed, built, and maintained voluntarily with love and village pride for the{" "}
              <strong className="text-amber-300 font-medium">14th Pingua Mahotsav 2026</strong>.
            </p>
          </div>

          {/* Right Avatar Tooltip Showcase */}
          <div className="md:col-span-7 flex flex-col items-center md:items-end justify-center">
            <div className="w-full overflow-x-auto py-3 flex justify-center md:justify-end">
              <AnimatedTooltipPreview />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span>Hover / Tap to view contributors</span>
              <Heart size={12} className="text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
