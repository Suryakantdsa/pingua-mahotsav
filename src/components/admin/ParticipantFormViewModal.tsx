"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Printer, FileText, Award, ShieldCheck } from "lucide-react";

const PROGRAM_TYPES = [
  { id: "dance", label: "Dance" },
  { id: "song", label: "Song" },
  { id: "music", label: "Music" },
  { id: "drama", label: "Drama / Acting" },
  { id: "folk_dance", label: "Folk Dance" },
  { id: "folk_song", label: "Folk Song" },
  { id: "instrumental", label: "Instrumental" },
  { id: "poetry", label: "Poetry" },
  { id: "comedy", label: "Comedy" },
  { id: "other", label: "Other" },
];

interface ParticipantFormViewModalProps {
  participant: any;
  onClose: () => void;
}

export default function ParticipantFormViewModal({
  participant,
  onClose,
}: ParticipantFormViewModalProps) {
  const [viewMode, setViewMode] = useState<"slip" | "form">("slip");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("admin-modal-open");
    return () => {
      document.body.classList.remove("admin-modal-open");
    };
  }, []);

  if (!participant || !mounted) return null;

  const handlePrint = () => {
    window.print();
  };

  const selectedPrograms: string[] = Array.isArray(participant.programType)
    ? participant.programType
    : typeof participant.programType === "string"
    ? participant.programType.split(",").map((s: string) => s.trim())
    : [];

  const regNo = participant.registrationNo || "PM-2026-CP-0101";
  const issueDate = participant.declarationDate || participant.createdAt
    ? new Date(participant.declarationDate || participant.createdAt).toLocaleDateString("en-GB")
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
            border: 2px solid #0c2f57 !important;
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
          <div className="admin-modal-controls bg-[#0c2f57] text-white px-4 py-3 flex items-center justify-between flex-wrap gap-2 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs bg-[#cca146] text-[#030202] px-2 py-0.5 rounded-md">
                {regNo}
              </span>
              <span className="font-bold text-sm hidden sm:inline">
                {participant.name}
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
                      ? "bg-[#cca146] text-[#030202] shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <Award size={13} />
                  <span>Artist Entry Pass (A4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("form")}
                  className={`px-3 py-1 rounded-full transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    viewMode === "form"
                      ? "bg-[#cca146] text-[#030202] shadow-sm"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#cca146] hover:bg-[#dfb55a] text-[#030202] font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
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
            {/* 1. ARTIST ENTRY PASS & REGISTRATION SLIP                    */}
            {/* ─────────────────────────────────────────────────────────── */}
            {viewMode === "slip" && (
              <div className="admin-a4-printable w-full max-w-4xl mx-auto bg-white border-2 sm:border-4 border-[#0c2f57] rounded-2xl p-4 sm:p-6 text-[#0c2f57] shadow-lg relative">
                <div className="border border-[#cca146] rounded-xl p-3 sm:p-5 relative bg-white h-full flex flex-col justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b-2 border-[#0c2f57] pb-2 sm:pb-3 mb-2 sm:mb-3">
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
                            ॥ ଶ୍ରୀ ଶ୍ରୀ ଗଜଲକ୍ଷ୍ମୀୟୈ ନମଃ ॥
                          </span>
                          <h1 className="font-odia text-sm sm:text-xl font-black text-[#0c2f57] leading-tight">
                            ୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬
                          </h1>
                          <span className="font-cinzel text-[10px] sm:text-xs font-bold text-slate-800 tracking-wider uppercase block">
                            14th Pingua Mahotsav 2026 • 25 Oct – 1 Nov
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block bg-[#0c2f57] text-white font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-md shadow-sm">
                          {regNo}
                        </span>
                        <span className="text-[9px] text-[#cca146] font-bold uppercase tracking-wider block mt-1">
                          CULTURAL ARTIST PASS
                        </span>
                      </div>
                    </div>

                    {/* Title Banner */}
                    <div className="bg-gradient-to-r from-[#0c2f57] via-[#123e70] to-[#0c2f57] text-white p-2.5 rounded-xl mb-3 flex items-center justify-between shadow-sm">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#cca146] font-bold block">
                          OFFICIAL PARTICIPATION RECEIPT & STAGE PASS
                        </span>
                        <span className="text-xs sm:text-base font-black tracking-wide uppercase block">
                          ସାଂସ୍କୃତିକ କାର୍ଯ୍ୟକ୍ରମ ପଞ୍ଜୀକରଣ ରସିଦ
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-wider opacity-80 block">Festival Dates</span>
                        <span className="text-xs font-bold text-[#cca146]">25 Oct – 1 Nov 2026</span>
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f8fafc] border border-slate-200 rounded-xl p-2 sm:p-2.5 text-[10px] sm:text-xs mb-3">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Reg Number</span>
                        <span className="font-mono font-black text-[#0c2f57] text-xs">{regNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Category</span>
                        <span className="font-bold text-slate-800 truncate block">
                          {selectedPrograms.join(", ") || "Cultural Performance"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Status</span>
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <ShieldCheck size={12} />
                          <span>Registered & Verified</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Registration Date</span>
                        <span className="font-semibold text-slate-800">{issueDate}</span>
                      </div>
                    </div>

                    {/* Participant Details Box */}
                    <div className="border border-[#0c2f57]/30 rounded-xl p-3 mb-3 bg-white text-xs">
                      <span className="font-bold uppercase tracking-wider text-[#0c2f57] text-[10px] sm:text-xs block border-b border-[#0c2f57]/20 pb-1 mb-2">
                        APPLICANT & PERFORMANCE DETAILS
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-slate-800">
                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Group / Artist Name :</span>
                          <span className="font-bold text-[#0c2f57] uppercase">{participant.name}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Leader / Coordinator :</span>
                          <span className="font-semibold uppercase">{participant.leaderName || "—"}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Contact Mobile :</span>
                          <span className="font-mono font-semibold">{participant.phone}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">WhatsApp No. :</span>
                          <span className="font-mono font-semibold">{participant.whatsappNumber || participant.phone}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">District :</span>
                          <span className="font-semibold uppercase">{participant.district || "Dhenkanal"}</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Performance Duration :</span>
                          <span className="font-semibold">{participant.duration || "15"} Minutes</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Participants Count :</span>
                          <span className="font-semibold">{participant.participantsCount || "1"} Artists</span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Programme Title :</span>
                          <span className="font-semibold">{participant.programTitle || "—"}</span>
                        </div>

                        <div className="sm:col-span-2 flex items-start">
                          <span className="font-bold text-slate-600 w-36 shrink-0">Address :</span>
                          <span className="font-medium text-slate-700">{participant.address || "Pingua, Dhenkanal"}</span>
                        </div>

                        {participant.specialRequirements && (
                          <div className="sm:col-span-2 flex items-start pt-1 border-t border-slate-100">
                            <span className="font-bold text-slate-600 w-36 shrink-0">Tech Requirements :</span>
                            <span className="text-slate-700 font-medium">{participant.specialRequirements}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stage Guidelines */}
                    <div className="border border-[#cca146] bg-[#fffbeb] rounded-xl p-2 sm:p-2.5 mb-2 text-[9px] sm:text-[10px] text-amber-950">
                      <span className="font-bold uppercase tracking-wider block text-[#0c2f57] mb-0.5">
                        ★ ARTIST & TROUPE GUIDELINES (ନିୟମାବଳୀ) :
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 list-disc list-inside">
                        <li>Report to Stage Control Room 45 minutes prior to scheduled slot.</li>
                        <li>Carry audio tracks on a USB pen drive in MP3 format.</li>
                        <li>Decisions of the Pingua Mahotsav Cultural Committee are final.</li>
                        <li>Produce this official pass upon entering festival premises.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div>
                    <div className="pt-2 border-t-2 border-[#0c2f57] flex items-end justify-between text-center text-[9px] sm:text-[10px]">
                      <div>
                        <div className="w-28 sm:w-36 border-b border-slate-700 mb-1" />
                        <span className="font-bold text-slate-800 uppercase block">
                          {participant.signatureName || participant.name}
                        </span>
                        <span className="text-slate-500 block">Applicant / Troupe Signature</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#0c2f57]/60 flex items-center justify-center p-1 text-[7px] text-[#0c2f57] uppercase font-bold text-center">
                          Official Committee Seal
                        </div>
                      </div>

                      <div>
                        <div className="w-28 sm:w-36 border-b border-slate-700 mb-1" />
                        <span className="font-bold text-[#0c2f57] uppercase block">Cultural Secretary</span>
                        <span className="text-slate-500 block">Pingua Mahotsav Committee</span>
                      </div>
                    </div>

                    <div className="text-center pt-1.5 mt-1 border-t border-slate-200 text-[8px] text-slate-500 flex items-center justify-between">
                      <span>Pingua, Dhenkanal, Odisha</span>
                      <span>★ Helpline: +91 82494 95166 • pinguamahotsav.org ★</span>
                      <span className="font-mono font-bold text-[#0c2f57]">{regNo}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* 2. PHYSICAL REGISTRATION FORM (PRINT REPLICA)               */}
            {/* ─────────────────────────────────────────────────────────── */}
            {viewMode === "form" && (
              <div className="admin-a4-printable w-full max-w-4xl mx-auto bg-white border-2 border-[#0c2f57] rounded-2xl shadow-lg overflow-hidden text-[#0c2f57] relative">
                {/* Top Banner */}
                <div className="h-6 sm:h-8 bg-[#0c2f57] relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c2f57] via-[#103d70] to-[#0c2f57]" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cca146]" />
                </div>

                <div className="p-4 sm:p-6 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-[#0c2f57]/20 pb-2.5">
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
                        <span className="text-[9px] font-bold text-[#0c2f57] uppercase tracking-wider block">
                          PINGUA MAHOTSAV • 14TH EDITION
                        </span>
                        <h2 className="text-lg font-black uppercase text-[#0c2f57]">PINGUA MAHOTSAV – 2026</h2>
                        <h3 className="text-xs font-bold uppercase text-slate-800">
                          CULTURAL PROGRAMME REGISTRATION FORM
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-bold text-xs bg-[#0c2f57] text-white px-2 py-0.5 rounded">
                        {regNo}
                      </span>
                    </div>
                  </div>

                  {/* Section 1 */}
                  <div className="border border-[#0c2f57] rounded-xl overflow-hidden text-xs">
                    <div className="bg-[#0c2f57] text-white px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider inline-block rounded-br-lg">
                      1. APPLICANT / GROUP DETAILS
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="flex items-center">
                        <span className="w-48 font-bold text-[#0c2f57] shrink-0">1. Group / Artist Name :</span>
                        <span className="font-bold text-slate-900 uppercase border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                          {participant.name}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="w-48 font-bold text-[#0c2f57] shrink-0">2. Leader / Coordinator :</span>
                        <span className="font-semibold text-slate-800 uppercase border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                          {participant.leaderName || "—"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <span className="w-36 font-bold text-[#0c2f57] shrink-0">3. Contact Number :</span>
                          <span className="font-mono font-semibold text-slate-800 border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.phone}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-36 font-bold text-[#0c2f57] shrink-0">4. WhatsApp Number :</span>
                          <span className="font-mono font-semibold text-slate-800 border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.whatsappNumber || participant.phone}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 flex items-center">
                          <span className="w-24 font-bold text-[#0c2f57] shrink-0">5. Address :</span>
                          <span className="text-slate-800 uppercase border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.address || "Pingua, Dhenkanal"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-20 font-bold text-[#0c2f57] shrink-0">6. District :</span>
                          <span className="font-semibold text-slate-800 uppercase border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.district || "Dhenkanal"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="border border-[#0c2f57] rounded-xl overflow-hidden text-xs">
                    <div className="bg-[#0c2f57] text-white px-2.5 py-0.5 font-bold text-[10px] uppercase tracking-wider inline-block rounded-br-lg">
                      2. PROGRAMME DETAILS
                    </div>
                    <div className="p-3 space-y-2">
                      <div>
                        <span className="font-bold text-[#0c2f57] block mb-1">7. Type of Programme (✓) :</span>
                        <div className="grid grid-cols-5 gap-1.5 font-semibold text-slate-800">
                          {PROGRAM_TYPES.map((pt) => {
                            const isChecked = selectedPrograms.includes(pt.label);
                            return (
                              <div key={pt.id} className="flex items-center gap-1">
                                <span className={`w-3 h-3 rounded-xs border border-[#0c2f57] flex items-center justify-center text-[9px] font-bold ${isChecked ? "bg-[#0c2f57] text-white" : ""}`}>
                                  {isChecked ? "✓" : ""}
                                </span>
                                <span>{pt.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center pt-1 border-t border-slate-100">
                        <span className="w-48 font-bold text-[#0c2f57] shrink-0">8. Title of Programme :</span>
                        <span className="text-slate-800 uppercase border-b border-dotted border-[#0c2f57]/60 flex-1 px-1 font-semibold">
                          {participant.programTitle || "—"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <span className="w-36 font-bold text-[#0c2f57] shrink-0">9. Total Participants :</span>
                          <span className="font-semibold text-slate-800 border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.participantsCount || "1"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-36 font-bold text-[#0c2f57] shrink-0">10. Duration (Mins) :</span>
                          <span className="font-semibold text-slate-800 border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.duration || "15"}
                          </span>
                        </div>
                      </div>

                      {participant.specialRequirements && (
                        <div className="flex items-start">
                          <span className="w-48 font-bold text-[#0c2f57] shrink-0">12. Special Requirements :</span>
                          <span className="text-slate-700 border-b border-dotted border-[#0c2f57]/60 flex-1 px-1">
                            {participant.specialRequirements}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Official Use Box */}
                  <div className="bg-[#f2f6fa] border border-[#0c2f57]/30 rounded-xl p-2.5 text-xs">
                    <div className="text-center font-bold uppercase tracking-widest text-[#0c2f57] mb-1.5 text-[10px]">
                      — FOR OFFICIAL USE (COMMITTEE) —
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-800">
                      <div>
                        <span className="font-bold text-[#0c2f57]">Registration No: </span>
                        <span className="font-mono font-bold">{regNo}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#0c2f57]">Remarks: </span>
                        <span className="font-semibold text-emerald-700">{participant.remarks || "Verified & Approved"}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#0c2f57]">Date: </span>
                        <span>{issueDate}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#0c2f57]">Received By: </span>
                        <span>{participant.receivedBy || "Pingua Mahotsav Cultural Committee"}</span>
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
