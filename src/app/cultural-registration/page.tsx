"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Printer,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

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

export default function CulturalRegistrationPage() {
  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [regNumberPreview, setRegNumberPreview] = useState("");
  const [printTarget, setPrintTarget] = useState<"form" | "slip">("form");

  useEffect(() => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setRegNumberPreview(`PM-2026-CP-${randomDigits}`);
  }, []);

  const [formData, setFormData] = useState({
    name: "", // 1. Name of the Group / Artist
    leaderName: "", // 2. Name of the Group Leader / Coordinator
    phone: "", // 3. Contact Number
    whatsappNumber: "", // 4. WhatsApp Number
    address: "", // 5. Address
    district: "Dhenkanal", // 6. District
    selectedPrograms: [] as string[], // 7. Type of Programme
    otherProgramText: "",
    programTitle: "", // 8. Title / Name of the Programme
    participantsCount: "1", // 9. No. of Participants
    duration: "15", // 10. Duration of Performance (Minutes)
    description: "", // 11. Brief Description
    specialRequirements: "", // 12. Special Requirements
    declarationAgreed: true,
    declarationDate: todayFormatted,
    signatureName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProgramToggle = (label: string) => {
    setFormData((prev) => {
      const exists = prev.selectedPrograms.includes(label);
      const nextPrograms = exists
        ? prev.selectedPrograms.filter((p) => p !== label)
        : [...prev.selectedPrograms, label];
      return { ...prev, selectedPrograms: nextPrograms };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setFormData({
        name: "",
        leaderName: "",
        phone: "",
        whatsappNumber: "",
        address: "",
        district: "Dhenkanal",
        selectedPrograms: [],
        otherProgramText: "",
        programTitle: "",
        participantsCount: "1",
        duration: "15",
        description: "",
        specialRequirements: "",
        declarationAgreed: true,
        declarationDate: todayFormatted,
        signatureName: "",
      });
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please enter the Name of the Group / Artist (Item 1).");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage("Please enter a valid Contact Number (Item 3).");
      return;
    }
    if (formData.selectedPrograms.length === 0) {
      setErrorMessage("Please select at least one Type of Programme (Item 7).");
      return;
    }
    if (!formData.signatureName.trim()) {
      setErrorMessage("Please enter the Signature / Full Name of Artist / Coordinator.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        registrationNo: regNumberPreview,
        name: formData.name.toUpperCase(),
        leaderName: formData.leaderName.toUpperCase(),
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber || formData.phone,
        address: formData.address,
        district: formData.district,
        programType: formData.selectedPrograms,
        otherProgramType: formData.otherProgramText,
        programTitle: formData.programTitle,
        participantsCount: parseInt(formData.participantsCount) || 1,
        duration: formData.duration,
        description: formData.description,
        specialRequirements: formData.specialRequirements,
        declarationAgreed: formData.declarationAgreed,
        declarationDate: formData.declarationDate,
        signatureName: formData.signatureName,
        remarks: "Registered Online / Verified",
        receivedBy: "Cultural Committee, Pingua Mahotsav 2026",
      };

      const res = await fetch("/api/participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmittedData({
          ...payload,
          registrationNo: result.registrationNo || regNumberPreview,
        });
      } else {
        setErrorMessage(result.error || result.details || "Submission failed. Please try again.");
      }
    } catch {
      setErrorMessage("Network connection error. Please verify your connection and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintSlip = () => {
    setPrintTarget("slip");
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handlePrintForm = () => {
    setPrintTarget("form");
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const copyRegNumber = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const slipData = submittedData || {
    registrationNo: regNumberPreview,
    name: formData.name || "PARTICIPANT / TROUPE NAME",
    leaderName: formData.leaderName || "COORDINATOR",
    phone: formData.phone || "CONTACT NUMBER",
    whatsappNumber: formData.whatsappNumber || formData.phone,
    address: formData.address || "Pingua, Dhenkanal",
    district: formData.district || "Dhenkanal",
    programType: formData.selectedPrograms.length > 0 ? formData.selectedPrograms : ["Cultural Performance"],
    programTitle: formData.programTitle || "Festival Cultural Performance",
    participantsCount: formData.participantsCount || "1",
    duration: formData.duration || "15",
    specialRequirements: formData.specialRequirements || "None specified",
    declarationDate: todayFormatted,
    signatureName: formData.signatureName || formData.name || "Authorized Artist",
    remarks: "Registered Online / Verified",
    receivedBy: "Pingua Mahotsav Cultural Committee",
  };

  return (
    <div className="min-h-screen bg-[#070508] py-4 sm:py-10 px-2 sm:px-6 text-slate-900 font-sans print:p-0 print:m-0 print:bg-white">
      {/* Explicit Print CSS: Guarantees Exact Single Page A4 output */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 6mm 8mm;
        }

        @media print {
          html, body {
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            overflow: hidden !important;
          }

          .print-hidden,
          header,
          footer,
          nav {
            display: none !important;
          }

          body.print-mode-slip #printable-registration-slip {
            display: block !important;
          }
          body.print-mode-slip #printable-official-form {
            display: none !important;
          }

          body.print-mode-form #printable-registration-slip {
            display: none !important;
          }
          body.print-mode-form #printable-official-form {
            display: block !important;
          }

          .single-a4-page {
            max-height: 282mm !important;
            height: auto !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            overflow: hidden !important;
            margin: 0 auto !important;
          }
        }
      `}</style>

      {/* Sync print mode class to document body */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof document !== 'undefined') {
              document.body.classList.remove('print-mode-form', 'print-mode-slip');
              document.body.classList.add('${printTarget === "slip" ? "print-mode-slip" : "print-mode-form"}');
            }
          `,
        }}
      />

      {/* Top Navigation & Action Controls (Hidden on Print) */}
      <div className="w-full max-w-4xl mx-auto mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 print:hidden print-hidden">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-[#fff7e9] text-xs font-medium tracking-wider uppercase backdrop-blur-md transition-all"
        >
          <ArrowLeft size={14} className="text-[#dc8513]" />
          <span>Back to Festival Home</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintSlip}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#dc8513] hover:bg-[#ffa735] text-[#030202] text-xs font-bold tracking-wider uppercase transition-all shadow-md"
          >
            <Printer size={14} />
            <span>Print Slip (A4)</span>
          </button>

          <button
            type="button"
            onClick={handlePrintForm}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fff7e9] text-xs font-semibold tracking-wider uppercase transition-all"
          >
            <Printer size={14} className="text-[#cca146]" />
            <span>Print Form</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#dfd6c4] text-xs transition-all"
            title="Reset Form"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. OFFICIAL REGISTRATION SLIP (DEDICATED SINGLE A4 SHEET PDF)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        id="printable-registration-slip"
        className={`${
          printTarget === "slip" ? "block" : "hidden"
        } print:block single-a4-page w-full max-w-4xl mx-auto bg-white border-2 sm:border-4 border-[#0c2f57] rounded-2xl sm:rounded-3xl p-3 sm:p-7 shadow-2xl relative text-[#0c2f57] print:border-4 print:border-[#0c2f57] print:rounded-2xl print:p-4 print:shadow-none`}
      >
        <div className="border border-[#cca146] rounded-xl sm:rounded-2xl p-3 sm:p-6 relative bg-white h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-[#0c2f57] pb-2 sm:pb-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#0c2f57] p-0.5 bg-white shrink-0">
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
                    14TH PINGUA MAHOTSAV 2026
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-block bg-[#0c2f57] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
                  OFFICIAL ARTIST PASS / ENTRY SLIP
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-600 mt-0.5 sm:mt-1 font-semibold">
                  Date: {slipData.declarationDate}
                </p>
              </div>
            </div>

            {/* Registration Banner */}
            <div className="bg-[#0c2f57] text-white rounded-xl p-2.5 sm:p-3 flex flex-wrap items-center justify-between gap-2 mb-3 shadow-sm border border-[#cca146]/50">
              <div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#cca146] font-bold block">
                  REGISTRATION NUMBER
                </span>
                <span className="font-mono text-lg sm:text-2xl font-black tracking-wider text-white">
                  {slipData.registrationNo}
                </span>
              </div>

              <div className="bg-emerald-600 text-white text-[9px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <ShieldCheck size={13} />
                <span>VERIFIED (ଗୃହୀତ)</span>
              </div>
            </div>

            {/* Table */}
            <div className="border border-[#0c2f57] rounded-xl overflow-hidden mb-3 text-[11px] sm:text-xs">
              <div className="bg-[#f0f4f9] px-2.5 py-1 font-bold text-[#0c2f57] uppercase tracking-wider border-b border-[#0c2f57]/20 flex items-center justify-between">
                <span>ARTIST & PERFORMANCE PROFILE (କଳାକାର ଓ କାର୍ଯ୍ୟକ୍ରମ ବିବରଣୀ)</span>
                <span className="text-[9px] text-slate-600 font-semibold font-sans hidden sm:inline">
                  Category: {Array.isArray(slipData.programType) ? slipData.programType.join(", ") : slipData.programType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#0c2f57]/20 bg-white">
                <div className="p-2 border-b sm:border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">1. Name of Group / Artist</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase">{slipData.name}</span>
                </div>

                <div className="p-2 border-b sm:border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">2. Leader / Coordinator</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase">{slipData.leaderName || "N/A"}</span>
                </div>

                <div className="p-2 border-b sm:border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">3. Primary Contact Phone</span>
                  <span className="font-bold text-slate-900 text-xs">{slipData.phone}</span>
                </div>

                <div className="p-2 border-b sm:border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">4. WhatsApp Contact</span>
                  <span className="font-bold text-slate-900 text-xs">{slipData.whatsappNumber || slipData.phone}</span>
                </div>

                <div className="p-2 border-b sm:border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">5. District & State</span>
                  <span className="font-bold text-slate-900 text-xs uppercase">{slipData.district}, Odisha</span>
                </div>

                <div className="p-2 border-b sm:border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">6. Troupe Address</span>
                  <span className="font-medium text-slate-800 text-xs">{slipData.address || "Dhenkanal District"}</span>
                </div>

                <div className="p-2 sm:col-span-2 border-b border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">7. Title of Programme</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{slipData.programTitle || "Festival Cultural Performance"}</span>
                </div>

                <div className="p-2 border-b sm:border-b-0 border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">8. Number of Participants</span>
                  <span className="font-bold text-slate-900 text-xs">{slipData.participantsCount} Artists on Stage</span>
                </div>

                <div className="p-2">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">9. Allotted Duration</span>
                  <span className="font-bold text-slate-900 text-xs">{slipData.duration} Minutes</span>
                </div>

                <div className="p-2 sm:col-span-2 bg-slate-50 border-t border-[#0c2f57]/20">
                  <span className="text-[9px] text-slate-500 uppercase font-semibold block">10. Technical & Sound Requirements</span>
                  <span className="text-slate-800 text-[11px] sm:text-xs">{slipData.specialRequirements || "Standard stage sound and monitor microphones."}</span>
                </div>
              </div>
            </div>

            {/* Notice Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-2 p-2 bg-[#f8fafc] border border-[#0c2f57]/30 rounded-xl mb-3 text-[10px] text-slate-800">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-[#dc8513] shrink-0" />
                <div>
                  <span className="font-bold text-[#0c2f57]">DATES:</span> 25 Oct – 01 Nov 2026
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#dc8513] shrink-0" />
                <div>
                  <span className="font-bold text-[#0c2f57]">VENUE:</span> Pingua Padia, Dhenkanal
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock size={13} className="text-[#dc8513] shrink-0" />
                <div>
                  <span className="font-bold text-[#0c2f57]">REPORTING:</span> 05:30 PM Green Room
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="border border-slate-300 rounded-xl p-2 bg-white text-[9px] sm:text-[10px] text-slate-700 mb-3">
              <span className="font-bold text-[#0c2f57] uppercase block tracking-wider text-[9px]">
                IMPORTANT INSTRUCTIONS FOR ARTISTS:
              </span>
              <ul className="list-disc pl-3.5 space-y-0.5">
                <li>Present this printed slip at the backstage artist checkpoint.</li>
                <li>Report at the green room at least 45 minutes prior to scheduled slot.</li>
                <li>Submit audio tracks in MP3 format on a USB pen drive to the sound technician.</li>
              </ul>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-2 border-t border-[#0c2f57]/20 flex items-end justify-between text-xs">
            <div className="text-center">
              <p className="font-bold uppercase text-[10px] sm:text-[11px] text-[#0c2f57] border-b border-slate-400 pb-0.5 px-2">
                {slipData.signatureName || slipData.name}
              </p>
              <span className="text-[8px] text-slate-500 font-semibold block mt-0.5">
                Candidate / Coordinator Signature
              </span>
            </div>

            <div className="text-center px-2">
              <div className="w-12 h-12 rounded-full border border-dashed border-[#0c2f57] p-0.5 flex flex-col items-center justify-center text-center text-[#0c2f57] mx-auto opacity-75">
                <span className="text-[6px] font-bold">SEAL</span>
                <span className="text-[7px] font-black text-[#cca146]">2026</span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-32 sm:w-36 border-b border-slate-400 pb-0.5 text-center font-bold text-[9px] sm:text-[10px] text-[#0c2f57]">
                Cultural Secretary / Convenor
              </div>
              <span className="text-[8px] text-slate-500 font-semibold block mt-0.5">
                Authorized Signatory
              </span>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="text-center pt-1.5 mt-1.5 border-t border-slate-200 text-[8px] sm:text-[9px] text-slate-500 flex items-center justify-between">
            <span>Pingua, Dhenkanal, Odisha</span>
            <span>★ Helpline: +91 82494 95166 • pinguamahotsav.org ★</span>
            <span className="font-mono">{slipData.registrationNo}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. PHYSICAL REGISTRATION FORM (RESPONSIVE ON SCREEN, 1 A4 ON PRINT) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        id="printable-official-form"
        className={`${
          printTarget === "form" ? "block" : "hidden"
        } print:block single-a4-page w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#0c2f57] relative print:shadow-none print:border-2 print:border-[#0c2f57] print:rounded-xl print:p-2`}
      >
        {/* Top Decorative Border */}
        <div className="relative w-full h-6 sm:h-9 bg-[#0c2f57] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2f57] via-[#103d70] to-[#0c2f57]" />
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-4 border-[#cca146] opacity-60" />
          <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-[#cca146] opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cca146]" />
        </div>

        {/* Form Body - Responsive on Mobile Screen, Compact on Print */}
        <div className="p-3.5 sm:p-8 text-[#0c2f57] print:p-2">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-4 border-b border-[#0c2f57]/20 pb-2.5 sm:pb-3 mb-3 sm:mb-4 text-center sm:text-left print:flex-row print:text-left">
            {/* Logo */}
            <div className="flex sm:flex-col items-center gap-2 sm:gap-0 shrink-0">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#0c2f57] p-0.5 bg-white shadow-sm shrink-0">
                <Image
                  src="/logo.png"
                  alt="Pingua Mahotsav Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
              </div>
              <span className="text-[8px] font-bold text-[#0c2f57] uppercase tracking-wider text-center block sm:mt-1">
                PINGUA MAHOTSAV
              </span>
            </div>

            {/* Titles */}
            <div className="flex-1 text-center">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0c2f57] tracking-wider uppercase font-sans print:text-xl leading-tight">
                PINGUA MAHOTSAV – 2026
              </h1>

              <h2 className="text-[11px] sm:text-sm md:text-base font-black text-[#111827] tracking-wide uppercase mt-0.5 print:text-xs">
                CULTURAL PROGRAMME REGISTRATION FORM
              </h2>

              <div className="mt-1">
                <span className="inline-block bg-[#0c2f57] text-white text-[8px] sm:text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                  Fill in the details in BLOCK LETTERS
                </span>
              </div>
            </div>

            {/* Right Badge */}
            <div className="hidden sm:flex flex-col items-end shrink-0 w-20 print:flex">
              <span className="text-[9px] text-[#0c2f57]/70 font-semibold tracking-wider">
                FORM: PM-2026
              </span>
              <span className="text-[8px] text-[#cca146] font-bold">
                14TH EDITION
              </span>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2 print:hidden print-hidden">
              <AlertCircle size={15} className="shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 print:space-y-2">
            {/* 1. APPLICANT / GROUP DETAILS */}
            <div className="border border-[#0c2f57] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0c2f57] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                1. APPLICANT / GROUP DETAILS
              </div>

              <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5 print:p-2 print:space-y-1.5 text-xs print:text-[10px]">
                {/* 1. Name of the Group / Artist */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                  <label htmlFor="name" className="sm:w-72 font-bold text-[#0c2f57] shrink-0">
                    1. Name of the Group / Artist <span className="text-red-500">*</span> :
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ENTER GROUP OR ARTIST NAME"
                    className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>

                {/* 2. Name of the Group Leader / Coordinator */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                  <label htmlFor="leaderName" className="sm:w-72 font-bold text-[#0c2f57] shrink-0">
                    2. Name of the Group Leader / Coordinator :
                  </label>
                  <input
                    id="leaderName"
                    name="leaderName"
                    type="text"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    placeholder="ENTER LEADER OR COORDINATOR NAME"
                    className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>

                {/* 3 & 4. Contact & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="phone" className="sm:w-44 font-bold text-[#0c2f57] shrink-0">
                      3. Contact Number <span className="text-red-500">*</span> :
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-DIGIT MOBILE"
                      className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="whatsappNumber" className="sm:w-44 font-bold text-[#0c2f57] shrink-0">
                      4. WhatsApp Number :
                    </label>
                    <input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="WHATSAPP NUMBER"
                      className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* 5. Address */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                  <label htmlFor="address" className="sm:w-72 font-bold text-[#0c2f57] shrink-0">
                    5. Address :
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="VILLAGE / AT / PO / CITY"
                    className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>

                {/* 6. District */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                  <label htmlFor="district" className="sm:w-72 font-bold text-[#0c2f57] shrink-0">
                    6. District :
                  </label>
                  <input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="DHENKANAL / CUTTACK / ANGUL / ETC"
                    className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* 2. PROGRAMME DETAILS */}
            <div className="border border-[#0c2f57] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0c2f57] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                2. PROGRAMME DETAILS
              </div>

              <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3 print:p-2 print:space-y-1.5 text-xs print:text-[10px]">
                {/* 7. Type of Programme */}
                <div>
                  <div className="font-bold text-[#0c2f57] mb-1.5">
                    7. Type of Programme (✓) <span className="text-red-500">*</span> :
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-1.5 gap-x-2 font-semibold text-slate-800">
                    {PROGRAM_TYPES.map((pt) => {
                      const isChecked = formData.selectedPrograms.includes(pt.label);
                      return (
                        <label key={pt.id} className="flex items-center gap-1.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleProgramToggle(pt.label)}
                            className="w-3.5 h-3.5 rounded border-[#0c2f57] text-[#0c2f57] focus:ring-[#0c2f57] cursor-pointer"
                          />
                          <span>{pt.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 8. Title / Name of the Programme */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5 pt-1 border-t border-[#0c2f57]/15">
                  <label htmlFor="programTitle" className="sm:w-72 font-bold text-[#0c2f57] shrink-0">
                    8. Title / Name of the Programme :
                  </label>
                  <input
                    id="programTitle"
                    name="programTitle"
                    type="text"
                    value={formData.programTitle}
                    onChange={handleInputChange}
                    placeholder="NAME OF SONG, DANCE, ACT OR THEME"
                    className="w-full sm:flex-1 border-b border-dotted border-[#0c2f57]/60 focus:border-[#0c2f57] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>

                {/* 9 & 10. Participants & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="participantsCount" className="font-bold text-[#0c2f57] shrink-0">
                      9. No. of Participants :
                    </label>
                    <input
                      id="participantsCount"
                      name="participantsCount"
                      type="number"
                      min="1"
                      value={formData.participantsCount}
                      onChange={handleInputChange}
                      className="w-20 border-b border-dotted border-[#0c2f57]/60 focus:outline-none px-1 py-0.5 font-semibold text-slate-800 bg-transparent text-center"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <label htmlFor="duration" className="font-bold text-[#0c2f57] shrink-0">
                      10. Duration of Performance :
                    </label>
                    <input
                      id="duration"
                      name="duration"
                      type="text"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-16 border-b border-dotted border-[#0c2f57]/60 focus:outline-none px-1 py-0.5 font-semibold text-slate-800 bg-transparent text-center"
                    />
                    <span className="font-bold text-[#0c2f57]">(Minutes)</span>
                  </div>
                </div>

                {/* 11. Brief Description */}
                <div>
                  <label htmlFor="description" className="block font-bold text-[#0c2f57] mb-1">
                    11. Brief Description of the Programme :
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={2}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the story, style, composer, troupe history, or message..."
                    className="w-full border border-[#0c2f57]/40 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#0c2f57] bg-white transition-colors print:p-1 print:text-[10px]"
                  />
                </div>
              </div>
            </div>

            {/* 3. TECHNICAL REQUIREMENTS */}
            <div className="border border-[#0c2f57] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0c2f57] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                3. TECHNICAL REQUIREMENTS
              </div>

              <div className="p-3 sm:p-4 print:p-2 text-xs print:text-[10px]">
                <label htmlFor="specialRequirements" className="block font-bold text-[#0c2f57] mb-1">
                  12. Special Requirements (if any) :
                </label>
                <textarea
                  id="specialRequirements"
                  name="specialRequirements"
                  rows={2}
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  placeholder="Stage mics, collar mics, instrument audio cables, lighting preferences, podium, etc."
                  className="w-full border border-[#0c2f57]/40 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:border-[#0c2f57] bg-white transition-colors print:p-1 print:text-[10px]"
                />
              </div>
            </div>

            {/* DECLARATION */}
            <div className="border border-[#0c2f57] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#0c2f57] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                DECLARATION
              </div>

              <div className="p-3 sm:p-4 space-y-2 print:p-2 text-xs print:text-[10px]">
                <p className="text-slate-800 leading-relaxed font-serif text-[11px] sm:text-xs">
                  I hereby declare that the information provided above is true and correct to the best of my knowledge. I agree to abide by the rules and decisions of the Pingua Mahotsav Committee.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-2.5 pt-2 border-t border-[#0c2f57]/15">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#0c2f57]">Date :</span>
                    <span className="border-b border-dotted border-[#0c2f57]/60 px-2 py-0.5 font-bold text-slate-800">
                      {formData.declarationDate}
                    </span>
                  </div>

                  <div className="flex flex-col items-start sm:items-end gap-0.5 w-full sm:w-auto">
                    <input
                      type="text"
                      name="signatureName"
                      required
                      value={formData.signatureName}
                      onChange={handleInputChange}
                      placeholder="TYPE FULL NAME AS SIGNATURE"
                      className="w-full sm:w-64 border-b border-[#0c2f57] px-1 py-0.5 uppercase font-bold text-[#0c2f57] bg-transparent text-left sm:text-center focus:outline-none"
                    />
                    <span className="text-[9px] font-semibold text-[#0c2f57]/80">
                      Signature of Artist / Group Leader / Coordinator
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FOR OFFICIAL USE (COMMITTEE) - Stacks on Mobile, 2-Col on Desktop */}
            <div className="bg-[#f2f6fa] border border-[#0c2f57]/30 rounded-xl p-3 print:p-2 text-xs print:text-[9px]">
              <div className="text-center font-bold uppercase tracking-widest text-[#0c2f57] mb-2">
                — FOR OFFICIAL USE (COMMITTEE) —
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0c2f57] shrink-0">Registration No. :</span>
                  <span className="font-mono font-bold text-blue-900 border-b border-dashed border-[#0c2f57]/40 flex-1 px-1">
                    {regNumberPreview}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0c2f57] shrink-0">Remarks :</span>
                  <span className="border-b border-dashed border-[#0c2f57]/40 flex-1 px-1 text-green-700 font-semibold truncate">
                    Online Submission • Verified
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0c2f57] shrink-0">Date of Registration :</span>
                  <span className="border-b border-dashed border-[#0c2f57]/40 flex-1 px-1 font-semibold">
                    {todayFormatted}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0c2f57] shrink-0">Received By :</span>
                  <span className="border-b border-dashed border-[#0c2f57]/40 flex-1 px-1 font-semibold truncate">
                    Pingua Mahotsav Cultural Committee
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2 mt-1">
                <div className="text-center">
                  <div className="w-32 sm:w-36 border-b border-[#0c2f57] mb-0.5" />
                  <span className="text-[9px] font-bold text-[#0c2f57] uppercase tracking-wider">
                    Authorized Signature
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Tagline */}
            <div className="text-center pt-1 print:pt-0">
              <p className="text-[10px] font-bold text-[#0c2f57] tracking-wide">
                ★ Thank you for registering. We wish you all the best! ★
              </p>
            </div>

            {/* Submit & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 pt-2 print:hidden print-hidden border-t border-[#0c2f57]/20">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#0c2f57] hover:bg-[#124278] text-white font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Registration Application</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrintForm}
                className="w-full sm:w-auto px-6 py-3 rounded-full border-2 border-[#0c2f57] text-[#0c2f57] hover:bg-[#0c2f57]/5 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Official Form (A4)</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. SUCCESS POPUP MODAL (ON SUBMIT)                                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {submittedData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 print:hidden print-hidden"
        >
          <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-[#0c2f57] p-5 sm:p-8 text-[#0c2f57] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mb-3">
                <CheckCircle2 size={32} />
              </div>

              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#cca146] block mb-0.5">
                14th Pingua Mahotsav 2026
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-[#0c2f57] uppercase tracking-wide">
                Registration Successful!
              </h3>

              <p className="font-odia text-xs sm:text-sm text-[#0c2f57] font-semibold mt-1">
                ଆପଣଙ୍କ ସାଂସ୍କୃତିକ ଆବେଦନ ସଫଳତାର ସହ ଗୃହୀତ ହୋଇଛି ।
              </p>

              {/* Registration Number Card */}
              <div className="w-full bg-[#f2f6fa] border-2 border-dashed border-[#0c2f57] rounded-2xl p-3.5 my-3.5 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#0c2f57]/70 block">
                    Official Registration No.
                  </span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#0c2f57]">
                    {submittedData.registrationNo}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => copyRegNumber(submittedData.registrationNo)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#0c2f57]/30 hover:bg-[#0c2f57] hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Details summary */}
              <div className="w-full text-left text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3.5">
                <div>
                  <span className="font-bold text-[#0c2f57]">Artist / Group:</span>{" "}
                  <span>{submittedData.name}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0c2f57]">Contact:</span>{" "}
                  <span>{submittedData.phone}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0c2f57]">Programme:</span>{" "}
                  <span>{submittedData.programType?.join(", ") || "Cultural Performance"}</span>
                </div>
                <div>
                  <span className="font-bold text-[#0c2f57]">Date:</span>{" "}
                  <span>{submittedData.declarationDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="w-full py-3 rounded-full bg-[#0c2f57] text-white hover:bg-[#124278] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Printer size={15} />
                  <span>Print Registration Slip (A4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmittedData(null)}
                  className="w-full py-2.5 rounded-full border border-[#0c2f57] text-[#0c2f57] hover:bg-[#0c2f57]/5 font-bold text-xs uppercase tracking-wider text-center cursor-pointer"
                >
                  Close / View Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
