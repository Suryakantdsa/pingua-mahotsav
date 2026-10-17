"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Printer, FileText, Droplet, Heart, ShieldCheck } from "lucide-react";

interface BloodDonorFormViewModalProps {
  donor: any;
  onClose: () => void;
}

export default function BloodDonorFormViewModal({
  donor,
  onClose,
}: BloodDonorFormViewModalProps) {
  const [viewMode, setViewMode] = useState<"slip" | "form">("slip");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("admin-modal-open");
    return () => {
      document.body.classList.remove("admin-modal-open");
    };
  }, []);

  if (!donor || !mounted) return null;

  const handlePrint = () => {
    window.print();
  };

  const regNo = donor.registrationNo || "PM-2026-BD-0101";
  const issueDate = donor.declarationDate || donor.createdAt
    ? new Date(donor.declarationDate || donor.createdAt).toLocaleDateString("en-GB")
    : "18/10/2026";

  const modalContent = (
    <div id="admin-print-portal-root">
      {/* Explicit Print CSS that completely isolates this modal and hides all admin tables & UI */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 6mm 8mm;
        }

        @media print {
          html, body {
            width: 210mm !important;
            height: 297mm !important;
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Hide EVERYTHING else in the body: sidebar, headers, admin tables, widgets */
          body.admin-modal-open > *:not(#admin-print-portal-root) {
            display: none !important;
            visibility: hidden !important;
          }

          #admin-print-portal-root {
            display: block !important;
            position: static !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .admin-modal-overlay {
            position: static !important;
            display: block !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            backdrop-filter: none !important;
            overflow: visible !important;
            width: 210mm !important;
            height: 297mm !important;
          }

          .admin-modal-card {
            position: static !important;
            display: block !important;
            width: 210mm !important;
            max-width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            max-height: none !important;
            overflow: visible !important;
            background: white !important;
          }

          .admin-modal-controls {
            display: none !important;
          }

          .admin-modal-scroll-area {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            overflow: visible !important;
          }

          .admin-a4-printable {
            width: 100% !important;
            max-width: 100% !important;
            height: 282mm !important;
            max-height: 282mm !important;
            border: 2px solid #991b1b !important;
            box-shadow: none !important;
            margin: 0 auto !important;
            padding: 3mm 4mm !important;
            page-break-after: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
          }
        }
      `}</style>

      {/* Screen Backdrop / Modal Wrapper */}
      <div
        role="dialog"
        aria-modal="true"
        className="admin-modal-overlay fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="admin-modal-card relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[96vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Control Bar (Hidden in Print) */}
          <div className="admin-modal-controls bg-[#991b1b] text-white px-4 py-3 flex items-center justify-between flex-wrap gap-2 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs bg-white text-[#991b1b] px-2 py-0.5 rounded-md">
                {regNo}
              </span>
              <span className="font-bold text-sm hidden sm:inline">
                {donor.name}
              </span>
              <span className="bg-red-800 text-white font-black text-xs px-2 py-0.5 rounded-md">
                {donor.bloodGroup}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* View Switcher */}
              <div className="bg-white/10 p-0.5 rounded-full flex items-center text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode("slip")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    viewMode === "slip"
                      ? "bg-white text-[#991b1b] shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <Droplet size={13} className="fill-current" />
                  <span>Donor Pass (A4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("form")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    viewMode === "form"
                      ? "bg-white text-[#991b1b] shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <FileText size={13} />
                  <span>Registration Form (A4)</span>
                </button>
              </div>

              {/* Print Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-red-50 text-[#991b1b] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Single A4</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Scrollable Container on Screen, Full Single A4 in Print */}
          <div className="admin-modal-scroll-area overflow-y-auto p-3 sm:p-6 bg-slate-100/60">
            {/* ─────────────────────────────────────────────────────────── */}
            {/* 1. DONOR PASS & REGISTRATION SLIP                           */}
            {/* ─────────────────────────────────────────────────────────── */}
            {viewMode === "slip" && (
              <div className="admin-a4-printable w-full max-w-4xl mx-auto bg-white border-2 sm:border-4 border-[#991b1b] rounded-2xl p-4 sm:p-6 text-[#0c2f57] shadow-lg relative">
                <div className="border border-[#cca146] rounded-xl p-3 sm:p-5 relative bg-white h-full flex flex-col justify-between">
                  <div>
                    {/* Top Dual Logo Header */}
                    <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-2 sm:pb-3 mb-2 sm:mb-3">
                      {/* Left: Pingua Mahotsav */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#0c2f57] p-0.5 bg-white shrink-0 shadow-sm">
                          <Image
                            src="/logo.png"
                            alt="Pingua Mahotsav Logo"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover rounded-full"
                            priority
                          />
                        </div>
                        <div>
                          <span className="font-odia text-[10px] sm:text-xs text-[#cca146] font-bold block">
                            ॥ ରକ୍ତଦାନ ମହାପୁଣ୍ୟ • ଜୀବନ ଦାନ ॥
                          </span>
                          <h1 className="font-odia text-sm sm:text-xl font-black text-[#0c2f57] leading-tight">
                            ୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬
                          </h1>
                          <span className="font-cinzel text-[10px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase block">
                            MEGA BLOOD & ORGAN DONATION CAMP
                          </span>
                        </div>
                      </div>

                      {/* Right: Indian Red Cross Society */}
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <span className="text-[10px] text-[#991b1b] font-bold uppercase tracking-wider block">
                            JOINT COLLABORATION
                          </span>
                          <span className="text-[9px] text-slate-700 font-bold block">
                            Indian Red Cross Society
                          </span>
                          <span className="text-[8px] text-slate-500 block">
                            Dhenkanal District Branch
                          </span>
                        </div>
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#991b1b] p-0.5 bg-white shrink-0 shadow-sm">
                          <Image
                            src="/redcross-logo.svg"
                            alt="Indian Red Cross Society Logo"
                            width={64}
                            height={64}
                            className="w-full h-full object-contain"
                            priority
                          />
                        </div>
                      </div>
                    </div>

                    {/* Title & Blood Group Badge Banner */}
                    <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] text-white p-2.5 rounded-xl mb-3 flex items-center justify-between shadow-sm">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#fde047] font-bold block">
                          OFFICIAL DONOR ENTRY PASS & CERTIFICATE SLIP
                        </span>
                        <span className="text-xs sm:text-base font-black tracking-wide uppercase block">
                          ସ୍ୱେଚ୍ଛାସେବୀ ରକ୍ତଦାତା ପଞ୍ଜୀକରଣ ରସିଦ
                        </span>
                        <span className="text-[9px] opacity-90 block">
                          Date: 26 October 2026 (09:00 AM – 03:00 PM) • Venue: Mahotsav Karyalaya, Pingua
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-wider text-slate-200 block">Blood Group</span>
                        <div className="bg-white text-[#991b1b] font-black text-base sm:text-xl px-3 py-0.5 rounded-lg border-2 border-[#cca146] shadow-md inline-flex items-center gap-1">
                          <Droplet size={15} className="fill-[#991b1b]" />
                          <span>{donor.bloodGroup}</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f8fafc] border border-slate-200 rounded-xl p-2 sm:p-2.5 text-[10px] sm:text-xs mb-3">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Reg Number</span>
                        <span className="font-mono font-black text-[#991b1b] text-xs">{regNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Category</span>
                        <span className="font-bold text-slate-800">Voluntary Life Saver</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Screening Status</span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <ShieldCheck size={12} />
                          <span>{donor.medicalStatus || "Pre-Registered"}</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Issue Date</span>
                        <span className="font-semibold text-slate-800">{issueDate}</span>
                      </div>
                    </div>

                    {/* Donor Credentials */}
                    <div className="border border-[#991b1b]/30 rounded-xl p-3 mb-3 bg-white text-xs">
                      <span className="font-bold uppercase tracking-wider text-[#991b1b] text-[10px] sm:text-xs block border-b border-[#991b1b]/20 pb-1 mb-2">
                        DONOR CREDENTIALS & HEALTH PROFILE
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-slate-800">
                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Donor Full Name :</span>
                          <span className="font-bold text-[#0c2f57] uppercase">{donor.name}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Father / Spouse :</span>
                          <span className="font-semibold uppercase">{donor.guardianName || "—"}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Age / Gender :</span>
                          <span className="font-semibold">{donor.age} Years • {donor.gender || "Male"}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Contact Mobile :</span>
                          <span className="font-mono font-semibold">{donor.phone}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">WhatsApp No. :</span>
                          <span className="font-mono font-semibold">{donor.whatsappNumber || donor.phone}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">District :</span>
                          <span className="font-semibold uppercase">{donor.district || "Dhenkanal"}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Previous Donations :</span>
                          <span className="font-semibold">{donor.previousDonations || "0"} times</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Approx Weight :</span>
                          <span className="font-semibold">{donor.weight ? `${donor.weight} kg` : "—"}</span>
                        </div>

                        <div className="sm:col-span-2 flex items-start">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Permanent Address :</span>
                          <span className="font-medium text-slate-700">{donor.address || "Pingua, Dhenkanal, Odisha"}</span>
                        </div>

                        {donor.pledgeOrganDonation && (
                          <div className="sm:col-span-2 pt-1 border-t border-red-100 flex items-center gap-2 text-emerald-800 font-bold">
                            <Heart size={14} className="text-red-600 fill-red-600" />
                            <span>Special Honour: Donor has pledged for Voluntary Organ Donation (ଅଙ୍ଗଦାନ ସଙ୍କଳ୍ପ).</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Medical Guidelines */}
                    <div className="border border-[#cca146] bg-[#fffbeb] rounded-xl p-2 sm:p-2.5 mb-2 text-[9px] sm:text-[10px] text-amber-950">
                      <span className="font-bold uppercase tracking-wider block text-[#991b1b] mb-0.5">
                        ★ PRE-DONATION INSTRUCTIONS FOR DONORS (ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା) :
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 list-disc list-inside">
                        <li>Have a light meal / breakfast 1–2 hours before donation.</li>
                        <li>Stay well-hydrated; drink plenty of water or fluids.</li>
                        <li>Avoid alcohol / smoking 24 hours prior to donation.</li>
                        <li>Carry any Govt Photo ID card (Aadhaar / Voter ID / DL).</li>
                      </ul>
                    </div>
                  </div>

                  {/* Signatures & Seal */}
                  <div>
                    <div className="pt-2 border-t-2 border-[#991b1b] flex items-end justify-between text-center text-[9px] sm:text-[10px]">
                      <div>
                        <div className="w-28 sm:w-36 border-b border-slate-700 mb-1" />
                        <span className="font-bold text-slate-800 uppercase block">{donor.signatureName || donor.name}</span>
                        <span className="text-slate-500 block">Donor Signature</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#991b1b]/60 flex items-center justify-center p-1 text-[7px] text-[#991b1b] uppercase font-bold text-center">
                          Official Blood Camp Seal
                        </div>
                      </div>

                      <div>
                        <div className="w-28 sm:w-36 border-b border-slate-700 mb-1" />
                        <span className="font-bold text-[#991b1b] uppercase block">Medical Officer (IRCS)</span>
                        <span className="text-slate-500 block">District Blood Centre In-Charge</span>
                      </div>
                    </div>

                    <div className="text-center pt-1.5 mt-1 border-t border-slate-200 text-[8px] text-slate-500 flex items-center justify-between">
                      <span>Pingua, Dhenkanal, Odisha</span>
                      <span>★ Camp Helpline: +91 82494 95166 • Indian Red Cross Society & Pingua Mahotsav ★</span>
                      <span className="font-mono font-bold text-[#991b1b]">{regNo}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* 2. REGISTRATION FORM REPLICA                                */}
            {/* ─────────────────────────────────────────────────────────── */}
            {viewMode === "form" && (
              <div className="admin-a4-printable w-full max-w-4xl mx-auto bg-white border-2 border-[#991b1b] rounded-2xl shadow-lg overflow-hidden text-[#0c2f57] relative">
                <div className="h-6 sm:h-8 bg-[#991b1b] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#7f1d1d]" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cca146]" />
                </div>

                <div className="p-4 sm:p-6 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-[#991b1b]/20 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 rounded-full border-2 border-[#0c2f57] p-0.5 bg-white shrink-0">
                        <Image
                          src="/logo.png"
                          alt="Pingua Mahotsav Logo"
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-full"
                          priority
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-[#b91c1c] uppercase tracking-wider block">
                          JOINT INITIATIVE • INDIAN RED CROSS SOCIETY
                        </span>
                        <h2 className="text-lg font-black uppercase text-[#991b1b]">PINGUA MAHOTSAV – 2026</h2>
                        <h3 className="text-xs font-bold uppercase text-slate-800">
                          VOLUNTARY BLOOD DONATION REGISTRATION FORM
                        </h3>
                      </div>
                    </div>

                    <div className="w-12 h-12 rounded-full border-2 border-[#991b1b] p-0.5 bg-white shrink-0">
                      <Image
                        src="/redcross-logo.svg"
                        alt="Red Cross"
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Section 1 */}
                  <div className="border border-[#991b1b] rounded-xl overflow-hidden text-xs">
                    <div className="bg-[#991b1b] text-white px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider inline-block rounded-br-lg">
                      1. DONOR PERSONAL DETAILS
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center">
                        <span className="w-48 font-bold text-[#0c2f57] shrink-0">1. Donor Full Name :</span>
                        <span className="font-bold text-slate-900 uppercase border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                          {donor.name}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="w-48 font-bold text-[#0c2f57] shrink-0">2. Father / Guardian / Spouse :</span>
                        <span className="font-semibold text-slate-800 uppercase border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                          {donor.guardianName || "—"}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center">
                          <span className="w-20 font-bold text-[#0c2f57] shrink-0">3. Gender :</span>
                          <span className="font-semibold text-slate-800 border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.gender || "Male"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-20 font-bold text-[#0c2f57] shrink-0">4. Age :</span>
                          <span className="font-semibold text-slate-800 border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.age} Yrs
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 font-bold text-[#0c2f57] shrink-0">5. Weight :</span>
                          <span className="font-semibold text-slate-800 border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.weight ? `${donor.weight} kg` : "—"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <span className="w-36 font-bold text-[#0c2f57] shrink-0">6. Mobile Number :</span>
                          <span className="font-mono font-semibold text-slate-800 border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.phone}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-36 font-bold text-[#0c2f57] shrink-0">7. WhatsApp Number :</span>
                          <span className="font-mono font-semibold text-slate-800 border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.whatsappNumber || donor.phone}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 flex items-center">
                          <span className="w-24 font-bold text-[#0c2f57] shrink-0">8. Address :</span>
                          <span className="text-slate-800 uppercase border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.address || "Pingua, Dhenkanal"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-20 font-bold text-[#0c2f57] shrink-0">District :</span>
                          <span className="font-semibold text-slate-800 uppercase border-b border-dotted border-[#991b1b]/60 flex-1 px-1">
                            {donor.district || "Dhenkanal"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="border border-[#991b1b] rounded-xl overflow-hidden text-xs">
                    <div className="bg-[#991b1b] text-white px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider inline-block rounded-br-lg">
                      2. BLOOD & DONATION DETAILS
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#0c2f57]">Blood Group:</span>
                        <span className="bg-[#991b1b] text-white font-black text-sm px-3 py-0.5 rounded-lg">
                          {donor.bloodGroup}
                        </span>
                        <span className="text-slate-600">Previous donations: <strong>{donor.previousDonations || "0"} times</strong></span>
                      </div>

                      {donor.pledgeOrganDonation && (
                        <div className="bg-red-50 p-2 rounded-lg border border-red-200 text-red-950 font-bold flex items-center gap-2">
                          <Heart size={14} className="fill-red-600 text-red-600" />
                          <span>Pledged for Voluntary Organ Donation (ଅଙ୍ଗଦାନ ସଙ୍କଳ୍ପ)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Medical Screening Box */}
                  <div className="bg-[#fef2f2] border border-[#991b1b]/30 rounded-xl p-2.5 text-xs">
                    <div className="text-center font-bold uppercase tracking-widest text-[#991b1b] mb-1.5 text-[10px]">
                      — FOR MEDICAL TEAM USE (INDIAN RED CROSS & BLOOD CENTRE) —
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-800">
                      <div>
                        <span className="font-bold text-[#991b1b]">Registration No: </span>
                        <span className="font-mono font-bold">{regNo}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#991b1b]">Eligibility: </span>
                        <span className="font-semibold text-emerald-700">[ ✓ ] Fit to Donate</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#991b1b]">Hemoglobin & BP: </span>
                        <span>{donor.hbLevel || "13.2 gm/dl"} | BP: {donor.bp || "120/80 mmHg"}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#991b1b]">Blood Bag Unit: </span>
                        <span className="font-mono">{donor.unitNumber || `IRCS-DHN-2026-${regNo.replace("PM-2026-BD-", "")}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
