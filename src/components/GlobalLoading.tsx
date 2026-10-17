"use client";

import React from "react";
import Image from "next/image";
import { IconBrandLinkedin, IconSparkles } from "@tabler/icons-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-gradient-to-b from-[#160d05] via-[#090604] to-[#020202] text-white p-6 select-none overflow-hidden font-sans">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-500/15 via-orange-500/20 to-red-600/10 rounded-full blur-[130px] animate-pulse" />
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Festival Tag */}
      <div className="relative z-10 pt-4 flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-md backdrop-blur-md">
        <IconSparkles size={14} className="text-amber-400 animate-spin" />
        <span>୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬</span>
      </div>

      {/* Centerpiece: Grand Animated Mahotsav Emblem & Loader */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto">
        {/* Animated Sacred Concentric Halo around Logo */}
        <div className="relative flex items-center justify-center">
          {/* Outermost Pulsing Golden Glow */}
          <div className="absolute h-36 w-36 rounded-full bg-gradient-to-tr from-amber-500/25 via-orange-500/25 to-red-500/15 animate-ping opacity-25" />

          {/* Rotating Outer Dashed Gold Ring */}
          <div className="absolute h-32 w-32 rounded-full border-2 border-dashed border-amber-400/50 animate-[spin_10s_linear_infinite]" />

          {/* Counter-rotating Inner Accent Ring */}
          <div className="absolute h-28 w-28 rounded-full border border-orange-500/50 animate-[spin_5s_linear_infinite_reverse]" />

          {/* Official Emblem Container with Gold Rim */}
          <div className="relative h-24 w-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 shadow-[0_0_40px_rgba(245,158,11,0.4)] ring-4 ring-amber-500/20">
            <div className="relative h-full w-full rounded-full overflow-hidden bg-white p-0.5">
              <Image
                src="/logo.png"
                alt="Pingua Mahotsav Logo"
                fill
                sizes="96px"
                className="rounded-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Festival Title & Subtitle */}
        <div className="mt-7 space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-[0.2em] uppercase bg-gradient-to-r from-amber-100 via-amber-300 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
            Pingua Mahotsav
          </h1>
          <p className="text-xs text-amber-200/80 font-semibold tracking-widest uppercase">
            Cultural Heritage & Community Pride • Dhenkanal
          </p>
        </div>

        {/* Dynamic Loading Progress Bar */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="h-1.5 w-52 sm:w-64 bg-slate-800/80 border border-amber-500/20 rounded-full overflow-hidden relative">
            <div className="h-full w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-full animate-loader-progress" />
          </div>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wider">
            Loading Festival Workspace...
          </span>
        </div>
      </div>

      {/* Footer: Prominent Creative & Maintenance Credits */}
      <div className="relative z-10 pb-4 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 rounded-2xl border border-amber-500/25 bg-slate-950/80 px-5 py-2.5 backdrop-blur-md shadow-xl text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400 font-medium">Developed by</span>
            <a
              href="https://www.linkedin.com/in/suryakant-das-7b657814b"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-500/50 underline-offset-2 transition-colors group cursor-pointer"
            >
              <span>Suryakant</span>
              <IconBrandLinkedin size={15} className="text-[#0a66c2] group-hover:scale-110 transition-transform bg-white rounded-xs p-0.2" />
            </a>
          </div>

          <span className="hidden sm:inline text-slate-600 font-bold">•</span>

          <div className="text-slate-300">
            <span className="text-slate-400 font-medium">Maintained by</span>{" "}
            <span className="font-bold text-orange-400">
              Sanskari Group Pingua (Batch of 2012)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
