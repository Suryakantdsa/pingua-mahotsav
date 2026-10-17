"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormStore } from "@/store/useFormStore";
import {
  Calendar,
  Image as ImageIcon,
  MapPin,
  Shield,
  Menu,
  X,
  Droplet,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { setShowBloodDonationForm } = useFormStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["home", "events", "gallery", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#home", label: "Home", labelOdia: "ମୁଖ୍ୟ", icon: Sparkles },
    { href: "/#events", label: "Schedule", labelOdia: "କାର୍ଯ୍ୟସୂଚୀ", icon: Calendar },
    { href: "/#gallery", label: "Gallery", labelOdia: "ଗ୍ୟାଲେରୀ", icon: ImageIcon },
    { href: "/cultural-registration", label: "Cultural Form", labelOdia: "ସାଂସ୍କୃତିକ", icon: Sparkles },
    { href: "/blood-registration", label: "Blood Camp", labelOdia: "ରକ୍ତଦାନ", icon: Droplet },
    { href: "/#contact", label: "Contact", labelOdia: "ଯୋଗାଯୋଗ", icon: MapPin },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#030202]/95 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-2xl"
            : "bg-gradient-to-b from-[#030202]/90 via-[#030202]/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Festival Brand / Logo */}
            <Link
              href="/#home"
              className="group flex items-center gap-3 focus:outline-none rounded-xl"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#dc8513]/60 bg-black p-0.5 shadow-md">
                <Image
                  src="/logo.png"
                  alt="୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span className="font-odia text-sm sm:text-base font-bold text-[#fff7e9] tracking-wide group-hover:text-[#cca146] transition-colors leading-tight">
                  ୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ
                </span>
                <span className="font-cinzel text-[10px] sm:text-[11px] font-medium text-[#cca146] tracking-[0.18em] uppercase">
                  Pingua Mahotsav 2026
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Isha Minimalist Pill Style) */}
            <nav className="hidden lg:flex items-center gap-1 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const sectionId = item.href.startsWith("/#")
                  ? item.href.replace("/#", "")
                  : item.href.startsWith("#")
                  ? item.href.slice(1)
                  : "";
                const isActive = Boolean(sectionId && activeSection === sectionId);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-200 ${
                      isActive
                        ? "text-[#dc8513] font-bold bg-white/[0.08] border border-[#dc8513]/40 shadow-sm shadow-[#dc8513]/10"
                        : "text-[#dfd6c4]/80 hover:text-[#fff7e9] hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={13} className={isActive ? "text-[#dc8513]" : "text-[#dfd6c4]/60"} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Blood Donation CTA & Admin Link */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/blood-registration"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-[#dc2626] hover:bg-[#ef4444] transition-all cursor-pointer shadow-lg shadow-red-950/40 tracking-wider uppercase hover:scale-105 active:scale-95"
              >
                <Droplet size={13} className="fill-white" />
                <span>Donate Blood</span>
              </Link>

              <Link
                href="/admin"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/20 text-[#dfd6c4] hover:text-[#dc8513] hover:border-[#dc8513] transition-all"
                title="Admin Command Center"
              >
                <Shield size={14} />
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <Link
                href="/blood-registration"
                className="p-2 rounded-full bg-[#dc2626] text-white text-xs font-bold shadow-md shadow-red-950/40"
                aria-label="Donate Blood"
              >
                <Droplet size={14} className="fill-white" />
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full bg-black/60 border border-white/20 text-[#fff7e9] hover:border-[#dc8513]/40 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#030202]/98 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2 mt-3 animate-in fade-in slide-in-from-top duration-200">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const sectionId = item.href.startsWith("/#")
                ? item.href.replace("/#", "")
                : item.href.startsWith("#")
                ? item.href.slice(1)
                : "";
              const isActive = Boolean(sectionId && activeSection === sectionId);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm tracking-wider uppercase transition-colors ${
                    isActive
                      ? "text-[#dc8513] font-bold bg-[#dc8513]/10 border border-[#dc8513]/30"
                      : "text-[#dfd6c4] hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? "text-[#dc8513]" : "text-[#dfd6c4]/60"} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs font-odia text-[#cca146]">{item.labelOdia}</span>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                href="/blood-registration"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
              >
                <Droplet size={14} className="fill-white" />
                <span>Register for Blood Donation (A4 Pass)</span>
              </Link>

              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#dfd6c4] uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Shield size={14} />
                <span>Admin Command Center</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
