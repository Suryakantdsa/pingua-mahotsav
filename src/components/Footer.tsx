"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Droplet,
  ArrowUp,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

export default function Footer() {
  const { setShowBloodDonationForm } = useFormStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#050406] border-t border-white/[0.08] text-[#fff7e9] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#dc8513]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.08]">
          {/* Col 1: Festival Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#dc8513]/80 bg-black p-0.5 shadow-lg shrink-0">
                <Image
                  src="/logo.png"
                  alt="୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-odia text-xl font-extrabold text-[#fff7e9] block leading-tight">
                  ୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬
                </span>
                <span className="font-cinzel text-xs text-[#dc8513] tracking-widest uppercase font-semibold">
                  14th Pingua Mahotsav
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#dfd6c4] leading-relaxed font-serif max-w-md font-light">
              A sacred celebration of Odisha&apos;s timeless folk culture, classical arts, Gajalaxmi Puja devotion, and community unity in Pingua, Dhenkanal.
            </p>

            <p className="text-xs font-odia text-[#cca146] italic">
              &ldquo;କଳା, ସଂସ୍କୃତି, ଐତିହ୍ୟ ଓ ପରମ୍ପରାର କଥା କହେ....&rdquo;
            </p>

            <div className="pt-2 text-xs text-[#aea493]">
              <span className="text-[#dc8513] font-semibold font-odia">ସୌଜନ୍ୟ:</span>{" "}
              <span>କମ୍ୟୁନିଟି ମ୍ୟାନେଜମେଣ୍ଟ ଗ୍ରୁପ୍, ପିଙ୍ଗୁଆ, ଢେଙ୍କାନାଳ</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#dfd6c4] hover:text-[#dc8513] hover:bg-[#dc8513]/10 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#dfd6c4] hover:text-[#dc8513] hover:bg-[#dc8513]/10 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#dfd6c4] hover:text-[#dc8513] hover:bg-[#dc8513]/10 transition-all"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#dc8513] font-cinzel">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#dfd6c4]">
              <li>
                <a href="#home" className="hover:text-[#fff7e9] transition-colors">
                  Home (ମୁଖ୍ୟ ପୃଷ୍ଠା)
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[#fff7e9] transition-colors">
                  Daily Schedule (କାର୍ଯ୍ୟସୂଚୀ)
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#fff7e9] transition-colors">
                  Festival Gallery (ଫଟୋ ଓ ଭିଡିଓ)
                </a>
              </li>
              <li>
                <Link href="/cultural-registration" className="text-[#dc8513] hover:text-[#ffa735] transition-colors font-semibold">
                  Cultural Registration Form (ସାଂସ୍କୃତିକ ଫର୍ମ)
                </Link>
              </li>
              <li>
                <Link href="/blood-registration" className="text-[#ef4444] hover:text-[#f87171] transition-colors font-semibold flex items-center gap-1.5">
                  <Droplet size={13} className="fill-[#ef4444]" />
                  <span>Blood Donation Registration (ରକ୍ତଦାନ ଫର୍ମ)</span>
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#fff7e9] transition-colors">
                  Contact & Helpline (ଯୋଗାଯୋଗ)
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#dc8513] transition-colors flex items-center gap-1.5">
                  <Shield size={13} className="text-[#dc8513]" />
                  <span>Admin Command Center (ପରିଚାଳନା)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Venue & Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#dc8513] font-cinzel">
              Festival Headquarters
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-[#dfd6c4]">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#dc8513] shrink-0 mt-0.5" />
                <div>
                  <p className="font-odia text-white font-medium">ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ପଡ଼ିଆ, ପିଙ୍ଗୁଆ</p>
                  <p className="text-[11px] text-[#aea493]">
                    Dhenkanal, Odisha, India – 759013
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#dc8513] shrink-0" />
                <a
                  href="tel:+918249495166"
                  className="hover:text-[#fff7e9] transition-colors"
                >
                  +91 82494 95166 / +91 97771 23456
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#dc8513] shrink-0" />
                <a
                  href="mailto:contact@pinguamahotsav.org"
                  className="hover:text-[#fff7e9] transition-colors"
                >
                  contact@pinguamahotsav.org
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar size={15} className="text-[#dc8513] shrink-0" />
                <span>25 Oct – 01 Nov 2026 (7 Divine Days)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#dc8513]/40 text-xs text-[#dfd6c4] hover:text-white transition-all cursor-pointer"
              >
                <ArrowUp size={14} className="text-[#dc8513]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Institutional Notice */}
        <div className="pt-8 border-t border-white/[0.06] mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#aea493]">
          <p>
            © 2026 14th Pingua Mahotsav Committee (୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ). All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <span>
              Developed by{" "}
              <a
                href="https://www.linkedin.com/in/suryakant-das-7b657814b"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#cca146] hover:text-[#ffa735] underline decoration-[#cca146]/50 underline-offset-2 transition-colors"
              >
                Suryakant
              </a>
            </span>
            <span className="text-white/20">•</span>
            <span>
              Maintained by{" "}
              <span className="font-semibold text-[#dc8513]">
                Sanskari Group Pingua (Batch of 2012)
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
