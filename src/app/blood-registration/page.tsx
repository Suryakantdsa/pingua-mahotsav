"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Heart,
  Droplet,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

interface DonorFormData {
  name: string;
  guardianName: string;
  gender: string;
  age: string | number;
  dob: string;
  bloodGroup: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  district: string;
  occupation: string;
  previousDonations: string;
  lastDonationDate: string;
  weight: string;
  pledgeOrganDonation: boolean;
  declarationAgreed: boolean;
  declarationDate: string;
  signatureName: string;
}

export default function BloodRegistrationPage() {
  const todayFormatted = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [formData, setFormData] = useState<DonorFormData>({
    name: "",
    guardianName: "",
    gender: "Male",
    age: "24",
    dob: "",
    bloodGroup: "O+",
    phone: "",
    whatsappNumber: "",
    address: "",
    district: "Dhenkanal",
    occupation: "",
    previousDonations: "0",
    lastDonationDate: "",
    weight: "62",
    pledgeOrganDonation: false,
    declarationAgreed: true,
    declarationDate: todayFormatted,
    signatureName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<(DonorFormData & { registrationNo: string }) | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [printTarget, setPrintTarget] = useState<"form" | "slip">("form");
  const [copied, setCopied] = useState(false);

  const regNumberPreview = submittedData?.registrationNo || "PM-2026-BD-0101";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleReset = () => {
    if (window.confirm("Reset all form fields?")) {
      setFormData({
        name: "",
        guardianName: "",
        gender: "Male",
        age: "24",
        dob: "",
        bloodGroup: "O+",
        phone: "",
        whatsappNumber: "",
        address: "",
        district: "Dhenkanal",
        occupation: "",
        previousDonations: "0",
        lastDonationDate: "",
        weight: "62",
        pledgeOrganDonation: false,
        declarationAgreed: true,
        declarationDate: todayFormatted,
        signatureName: "",
      });
      setSubmittedData(null);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Please enter Donor Name and Contact Number.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!formData.bloodGroup) {
      setErrorMessage("Please select your Blood Group.");
      return;
    }

    const donorAge = parseInt(String(formData.age)) || 0;
    if (donorAge < 18 || donorAge > 65) {
      setErrorMessage("Donors must be between 18 and 65 years old as per Blood Bank guidelines.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name.toUpperCase().trim(),
        guardianName: formData.guardianName.toUpperCase().trim(),
        gender: formData.gender,
        age: donorAge,
        dob: formData.dob,
        bloodGroup: formData.bloodGroup,
        phone: formData.phone.trim(),
        whatsappNumber: formData.whatsappNumber.trim() || formData.phone.trim(),
        address: formData.address.trim(),
        district: formData.district.trim() || "Dhenkanal",
        occupation: formData.occupation.trim(),
        previousDonations: formData.previousDonations,
        lastDonationDate: formData.lastDonationDate,
        weight: formData.weight,
        pledgeOrganDonation: formData.pledgeOrganDonation,
        declarationAgreed: true,
        declarationDate: formData.declarationDate || todayFormatted,
        signatureName: formData.signatureName.toUpperCase().trim() || formData.name.toUpperCase().trim(),
      };

      const res = await fetch("/api/blood-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        const assignedRegNo = result.registrationNo || result.donor?.registrationNo || "PM-2026-BD-0101";
        const completeData = {
          ...formData,
          ...payload,
          registrationNo: assignedRegNo,
        };
        setSubmittedData(completeData);
        setPrintTarget("slip");
        setShowSuccessModal(true);
      } else {
        setErrorMessage(result.error || "Submission failed. Please check inputs and retry.");
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
    name: formData.name || "DONOR FULL NAME",
    guardianName: formData.guardianName || "FATHER / SPOUSE NAME",
    gender: formData.gender || "Male",
    age: formData.age || "25",
    dob: formData.dob || "—",
    bloodGroup: formData.bloodGroup || "O+",
    phone: formData.phone || "CONTACT NUMBER",
    whatsappNumber: formData.whatsappNumber || formData.phone || "WHATSAPP",
    address: formData.address || "Pingua, Dhenkanal",
    district: formData.district || "Dhenkanal",
    occupation: formData.occupation || "Self",
    previousDonations: formData.previousDonations || "0",
    lastDonationDate: formData.lastDonationDate || "—",
    weight: formData.weight || "60 kg",
    pledgeOrganDonation: formData.pledgeOrganDonation,
    declarationAgreed: true,
    declarationDate: todayFormatted,
    signatureName: formData.signatureName || formData.name || "Voluntary Donor",
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

          .single-a4-page {
            width: 100% !important;
            max-width: 100% !important;
            height: 282mm !important;
            max-height: 282mm !important;
            box-shadow: none !important;
            margin: 0 auto !important;
            padding: 4mm 6mm !important;
            page-break-after: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
          }

          input, textarea, select {
            border-color: #000 !important;
            color: #000 !important;
            background: transparent !important;
          }
        }
      `}</style>

      {/* Top Floating Action Bar (Hidden in Print) */}
      <div className="max-w-4xl mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 px-2 print:hidden print-hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#dfd6c4] hover:text-[#dc8513] transition-colors"
        >
          <ArrowLeft size={14} className="text-[#dc8513]" />
          <span>Back to Festival Home</span>
        </Link>

        <div className="flex items-center gap-2">
          {submittedData ? (
            <>
              {printTarget === "form" ? (
                <button
                  type="button"
                  onClick={() => setPrintTarget("slip")}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#dc2626] hover:bg-[#ef4444] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-red-950/40 cursor-pointer"
                >
                  <ShieldCheck size={14} />
                  <span>View Entry Pass (A4)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPrintTarget("form")}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fff7e9] text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                >
                  <span>Edit Registration Form</span>
                </button>
              )}

              <button
                type="button"
                onClick={handlePrintSlip}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#dc2626] hover:bg-[#ef4444] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-red-950/40 cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Donor Pass (A4)</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handlePrintForm}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#fff7e9] text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              <Printer size={14} className="text-[#cca146]" />
              <span>Print Blank Form</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 text-[#dfd6c4] text-xs transition-all cursor-pointer"
            title="Reset Form"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. OFFICIAL DONOR SLIP / ENTRY PASS (SINGLE A4 SHEET PDF)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        id="printable-donor-slip"
        className={`${
          printTarget === "slip" ? "block" : "hidden"
        } print:block single-a4-page w-full max-w-4xl mx-auto bg-white border-2 sm:border-4 border-[#991b1b] rounded-2xl sm:rounded-3xl p-3 sm:p-7 shadow-2xl relative text-[#0c2f57] print:border-4 print:border-[#991b1b] print:rounded-2xl print:p-4 print:shadow-none`}
      >
        <div className="border border-[#cca146] rounded-xl sm:rounded-2xl p-3 sm:p-6 relative bg-white h-full flex flex-col justify-between">
          <div>
            {/* Top Header with Dual Logos: Pingua Mahotsav (Left) & Red Cross (Right) */}
            <div className="flex items-center justify-between border-b-2 border-[#991b1b] pb-2 sm:pb-3 mb-2 sm:mb-3">
              {/* Left Logo: Pingua Mahotsav */}
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

              {/* Right Logo: Indian Red Cross Society */}
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

            {/* Slip Title & Blood Group Badge Banner */}
            <div className="bg-gradient-to-r from-[#7f1d1d] via-[#991b1b] to-[#7f1d1d] text-white p-2.5 sm:p-3 rounded-xl mb-3 flex items-center justify-between shadow-sm">
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

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[8px] uppercase tracking-wider text-slate-200 block">Blood Group</span>
                  <div className="bg-white text-[#991b1b] font-black text-base sm:text-xl px-3 py-0.5 rounded-lg border-2 border-[#cca146] shadow-md inline-flex items-center gap-1">
                    <Droplet size={15} className="fill-[#991b1b]" />
                    <span>{slipData.bloodGroup}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f8fafc] border border-slate-200 rounded-xl p-2 sm:p-3 text-[10px] sm:text-xs mb-3">
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">Registration No</span>
                <span className="font-mono font-black text-[#991b1b] text-xs sm:text-sm">
                  {slipData.registrationNo}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">Donor Category</span>
                <span className="font-bold text-slate-800">Voluntary Life Saver</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">Screening Status</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>Pre-Registered</span>
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[9px] uppercase font-bold">Issue Date</span>
                <span className="font-semibold text-slate-800">{slipData.declarationDate}</span>
              </div>
            </div>

            {/* Donor Detailed Information Grid */}
            <div className="border border-[#991b1b]/30 rounded-xl p-2.5 sm:p-3.5 mb-3 bg-white text-xs">
              <span className="font-bold uppercase tracking-wider text-[#991b1b] text-[10px] sm:text-xs block border-b border-[#991b1b]/20 pb-1 mb-2">
                DONOR CREDENTIALS & HEALTH PROFILE
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 text-slate-800">
                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Donor Full Name :</span>
                  <span className="font-bold text-[#0c2f57] uppercase">{slipData.name}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Father / Spouse :</span>
                  <span className="font-semibold uppercase">{slipData.guardianName || "—"}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Age / Gender :</span>
                  <span className="font-semibold">{slipData.age} Years • {slipData.gender}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Contact Mobile :</span>
                  <span className="font-mono font-semibold">{slipData.phone}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">WhatsApp No. :</span>
                  <span className="font-mono font-semibold">{slipData.whatsappNumber || slipData.phone}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">District :</span>
                  <span className="font-semibold uppercase">{slipData.district}</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Previous Donations :</span>
                  <span className="font-semibold">{slipData.previousDonations} times</span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Approx Weight :</span>
                  <span className="font-semibold">{slipData.weight ? `${slipData.weight} kg` : "—"}</span>
                </div>

                <div className="sm:col-span-2 flex items-start">
                  <span className="font-bold text-slate-600 w-36 shrink-0">Permanent Address :</span>
                  <span className="font-medium text-slate-700">{slipData.address || "Pingua, Dhenkanal, Odisha"}</span>
                </div>

                {slipData.pledgeOrganDonation && (
                  <div className="sm:col-span-2 pt-1 border-t border-red-100 flex items-center gap-2 text-emerald-800 font-bold">
                    <Heart size={14} className="text-red-600 fill-red-600" />
                    <span>Special Honour: Donor has pledged for Voluntary Organ Donation (ଅଙ୍ଗଦାନ ସଙ୍କଳ୍ପ).</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pre-Donation Medical Guidelines Box */}
            <div className="border border-[#cca146] bg-[#fffbeb] rounded-xl p-2 sm:p-2.5 mb-3 text-[9px] sm:text-[10px] text-amber-950">
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

          {/* Signatures & Seal Section */}
          <div>
            <div className="pt-2 border-t-2 border-[#991b1b] flex items-end justify-between text-center text-[9px] sm:text-[10px]">
              <div>
                <div className="w-28 sm:w-36 border-b border-slate-700 mb-1" />
                <span className="font-bold text-slate-800 uppercase block">{slipData.signatureName}</span>
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

            {/* Footer Bar */}
            <div className="text-center pt-1.5 mt-1.5 border-t border-slate-200 text-[8px] sm:text-[9px] text-slate-500 flex items-center justify-between">
              <span>Pingua, Dhenkanal, Odisha</span>
              <span>★ Camp Helpline: +91 82494 95166 • Indian Red Cross Society & Pingua Mahotsav ★</span>
              <span className="font-mono font-bold text-[#991b1b]">{slipData.registrationNo}</span>
            </div>
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
        } print:block single-a4-page w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#991b1b] relative print:shadow-none print:border-2 print:border-[#991b1b] print:rounded-xl print:p-2`}
      >
        {/* Top Decorative Border (Crimson & Gold) */}
        <div className="relative w-full h-6 sm:h-9 bg-[#991b1b] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7f1d1d] via-[#b91c1c] to-[#7f1d1d]" />
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full border-4 border-[#cca146] opacity-60" />
          <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-4 border-[#cca146] opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#cca146]" />
        </div>

        {/* Form Body - Responsive on Mobile Screen, Single-Page Compact on Print */}
        <div className="p-3.5 sm:p-8 text-[#0c2f57] print:p-2">
          {/* Header with Dual Logos */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2.5 sm:gap-4 border-b border-[#991b1b]/20 pb-2.5 sm:pb-3 mb-3 sm:mb-4 text-center sm:text-left print:flex-row print:text-left">
            {/* Left Logo: Pingua Mahotsav */}
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

            {/* Center Titles */}
            <div className="flex-1 text-center">
              <span className="font-odia text-[10px] sm:text-xs text-[#b91c1c] font-bold block">
                ॥ ରକ୍ତଦାନ ମହାପୁଣ୍ୟ • ଜୀବନ ଦାନ ॥
              </span>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-[#991b1b] tracking-wider uppercase font-sans print:text-xl leading-tight">
                PINGUA MAHOTSAV – 2026
              </h1>

              <h2 className="text-[11px] sm:text-sm md:text-base font-black text-[#111827] tracking-wide uppercase mt-0.5 print:text-xs">
                VOLUNTARY BLOOD DONATION REGISTRATION FORM
              </h2>

              <div className="mt-1 flex items-center justify-center gap-2 flex-wrap">
                <span className="inline-block bg-[#991b1b] text-white text-[8px] sm:text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                  In Collaboration with INDIAN RED CROSS SOCIETY
                </span>
                <span className="hidden sm:inline-block bg-[#cca146] text-[#030202] text-[8px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Camp: 26 Oct 2026
                </span>
              </div>
            </div>

            {/* Right Logo: Indian Red Cross Society */}
            <div className="flex sm:flex-col items-center gap-2 sm:gap-0 shrink-0">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#991b1b] p-0.5 bg-white shadow-sm shrink-0">
                <Image
                  src="/redcross-logo.svg"
                  alt="Indian Red Cross Society Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <span className="text-[8px] font-bold text-[#991b1b] uppercase tracking-wider text-center block sm:mt-1">
                RED CROSS (DHENKANAL)
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
            {/* 1. DONOR PERSONAL DETAILS */}
            <div className="border border-[#991b1b] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#991b1b] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                1. DONOR PERSONAL DETAILS
              </div>

              <div className="p-3 sm:p-4 space-y-2 sm:space-y-2.5 print:p-2 print:space-y-1.5 text-xs print:text-[10px]">
                {/* 1. Name of the Donor */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                  <label htmlFor="name" className="sm:w-64 font-bold text-[#0c2f57] shrink-0">
                    1. Name of the Donor <span className="text-red-500">*</span> :
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="ENTER FULL NAME IN BLOCK LETTERS"
                    className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>

                {/* 2. Father's / Guardian's / Spouse Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                  <label htmlFor="guardianName" className="sm:w-64 font-bold text-[#0c2f57] shrink-0">
                    2. Father / Guardian / Spouse Name :
                  </label>
                  <input
                    id="guardianName"
                    name="guardianName"
                    type="text"
                    value={formData.guardianName}
                    onChange={handleInputChange}
                    placeholder="ENTER GUARDIAN OR SPOUSE NAME"
                    className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                  />
                </div>

                {/* 3. Gender, Age, Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="gender" className="sm:w-20 font-bold text-[#0c2f57] shrink-0">
                      3. Gender <span className="text-red-500">*</span> :
                    </label>
                    <Select
                      value={formData.gender}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, gender: val }))}
                    >
                      <SelectTrigger
                        id="gender"
                        className="w-full sm:flex-1 h-7 border-0 border-b border-dotted border-[#991b1b]/60 focus:ring-0 focus:border-[#991b1b] rounded-none px-1 py-0 font-semibold text-slate-800 bg-transparent shadow-none text-xs"
                      >
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#991b1b]/30 shadow-xl z-50">
                        <SelectItem value="Male" className="cursor-pointer text-xs">
                          Male (ପୁରୁଷ)
                        </SelectItem>
                        <SelectItem value="Female" className="cursor-pointer text-xs">
                          Female (ମହିଳା)
                        </SelectItem>
                        <SelectItem value="Other" className="cursor-pointer text-xs">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="age" className="sm:w-24 font-bold text-[#0c2f57] shrink-0">
                      4. Age (Yrs) <span className="text-red-500">*</span> :
                    </label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="65"
                      required
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="18-65"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="weight" className="sm:w-28 font-bold text-[#0c2f57] shrink-0">
                      5. Weight (Kg) :
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="text"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 55 kg"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent"
                    />
                  </div>
                </div>

                {/* 6 & 7. Contact Number & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="phone" className="sm:w-44 font-bold text-[#0c2f57] shrink-0">
                      6. Mobile Number <span className="text-red-500">*</span> :
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-DIGIT MOBILE"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="whatsappNumber" className="sm:w-44 font-bold text-[#0c2f57] shrink-0">
                      7. WhatsApp Number :
                    </label>
                    <input
                      id="whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="WHATSAPP NUMBER"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* 8. Address & District */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                    <label htmlFor="address" className="sm:w-32 font-bold text-[#0c2f57] shrink-0">
                      8. Address :
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="VILLAGE / AT / PO / CITY"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <label htmlFor="district" className="sm:w-24 font-bold text-[#0c2f57] shrink-0">
                      District :
                    </label>
                    <input
                      id="district"
                      name="district"
                      type="text"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="DHENKANAL"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 uppercase font-semibold text-slate-800 bg-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. BLOOD GROUP & MEDICAL HISTORY */}
            <div className="border border-[#991b1b] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#991b1b] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                2. BLOOD & DONATION DETAILS
              </div>

              <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3 print:p-2 print:space-y-1.5 text-xs print:text-[10px]">
                {/* 9. Blood Group Selection */}
                <div>
                  <div className="font-bold text-[#0c2f57] mb-1.5">
                    9. Select Blood Group (✓) <span className="text-red-500">*</span> :
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 font-bold text-slate-800">
                    {BLOOD_GROUPS.map((bg) => {
                      const isSelected = formData.bloodGroup === bg;
                      return (
                        <label
                          key={bg}
                          className={`flex items-center justify-center gap-1 p-1.5 rounded-lg border cursor-pointer select-none transition-all ${
                            isSelected
                              ? "bg-[#991b1b] text-white border-[#991b1b] shadow-sm font-black"
                              : "border-slate-300 hover:border-[#991b1b]/60 text-slate-800 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="bloodGroup"
                            value={bg}
                            checked={isSelected}
                            onChange={() => setFormData((prev) => ({ ...prev, bloodGroup: bg }))}
                            className="sr-only"
                          />
                          <Droplet size={11} className={isSelected ? "fill-white text-white" : "text-red-500"} />
                          <span>{bg}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 10. Previous Donation Count & Last Donation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-[#991b1b]/15">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                    <label htmlFor="previousDonations" className="sm:w-56 font-bold text-[#0c2f57] shrink-0">
                      10. Previous Blood Donations :
                    </label>
                    <Select
                      value={formData.previousDonations}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, previousDonations: val }))}
                    >
                      <SelectTrigger
                        id="previousDonations"
                        className="w-full sm:flex-1 h-7 border-0 border-b border-dotted border-[#991b1b]/60 focus:ring-0 focus:border-[#991b1b] rounded-none px-1.5 py-0 font-semibold text-slate-800 bg-transparent shadow-none text-xs"
                      >
                        <SelectValue placeholder="Select Previous Donations" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#991b1b]/30 shadow-xl z-50">
                        <SelectItem value="0" className="cursor-pointer text-xs">
                          First Time Donor (ପ୍ରଥମ ଥର)
                        </SelectItem>
                        <SelectItem value="1-3" className="cursor-pointer text-xs">
                          1 to 3 times
                        </SelectItem>
                        <SelectItem value="4-10" className="cursor-pointer text-xs">
                          4 to 10 times
                        </SelectItem>
                        <SelectItem value="10+" className="cursor-pointer text-xs">
                          More than 10 times
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5">
                    <label htmlFor="lastDonationDate" className="sm:w-48 font-bold text-[#0c2f57] shrink-0">
                      Last Donation (Approx) :
                    </label>
                    <input
                      id="lastDonationDate"
                      name="lastDonationDate"
                      type="text"
                      value={formData.lastDonationDate}
                      onChange={handleInputChange}
                      placeholder="e.g. 6 months ago / Never"
                      className="w-full sm:flex-1 border-b border-dotted border-[#991b1b]/60 focus:border-[#991b1b] focus:outline-none px-1.5 py-0.5 font-semibold text-slate-800 bg-transparent"
                    />
                  </div>
                </div>

                {/* Optional Organ Donation Pledge Checkbox */}
                <div className="bg-[#fff1f2] border border-red-200 rounded-lg p-2 flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="pledgeOrganDonation"
                    name="pledgeOrganDonation"
                    checked={formData.pledgeOrganDonation}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-0.5 rounded border-[#991b1b] text-[#991b1b] focus:ring-[#991b1b] cursor-pointer"
                  />
                  <label htmlFor="pledgeOrganDonation" className="text-slate-800 cursor-pointer font-medium leading-tight">
                    <span className="font-bold text-[#991b1b]">Optional Organ Donation Pledge (ଅଙ୍ଗଦାନ ସଙ୍କଳ୍ପ):</span>{" "}
                    I also wish to pledge for voluntary organ and tissue donation to support medical care.
                  </label>
                </div>
              </div>
            </div>

            {/* 3. DONOR DECLARATION & CONSENT */}
            <div className="border border-[#991b1b] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-[#991b1b] text-white px-3 py-1 font-bold text-xs uppercase tracking-wider inline-block rounded-br-lg print:text-[10px] print:py-0.5">
                3. DONOR DECLARATION & CONSENT
              </div>

              <div className="p-3 sm:p-4 space-y-2 print:p-2 text-xs print:text-[10px]">
                <p className="text-slate-800 leading-relaxed font-serif text-[11px] sm:text-xs">
                  I voluntarily offer to donate blood for the noble cause of saving lives at the 14th Pingua Mahotsav in association with the Indian Red Cross Society. I declare that I am in good health, weigh above 45kg, and have no known transmissible illness.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-2.5 pt-2 border-t border-[#991b1b]/15">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#991b1b]">Date :</span>
                    <span className="border-b border-dotted border-[#991b1b]/60 px-2 py-0.5 font-bold text-slate-800">
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
                      className="w-full sm:w-64 border-b border-[#991b1b] px-1 py-0.5 uppercase font-bold text-[#991b1b] bg-transparent text-left sm:text-center focus:outline-none"
                    />
                    <span className="text-[9px] font-semibold text-slate-600">
                      Signature / Consent of Voluntary Blood Donor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. FOR MEDICAL TEAM / OFFICIAL USE */}
            <div className="bg-[#fef2f2] border border-[#991b1b]/30 rounded-xl p-3 print:p-2 text-xs print:text-[9px]">
              <div className="text-center font-bold uppercase tracking-widest text-[#991b1b] mb-2">
                — FOR MEDICAL TEAM USE (INDIAN RED CROSS & BLOOD CENTRE) —
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-slate-800">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#991b1b] shrink-0">Registration No. :</span>
                  <span className="font-mono font-bold text-red-950 border-b border-dashed border-[#991b1b]/40 flex-1 px-1">
                    {regNumberPreview}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#991b1b] shrink-0">Donor Eligibility :</span>
                  <span className="border-b border-dashed border-[#991b1b]/40 flex-1 px-1 text-emerald-700 font-semibold truncate">
                    [ ✓ ] Fit to Donate / [ &nbsp; ] Deferred
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#991b1b] shrink-0">Hemoglobin (Hb) :</span>
                  <span className="border-b border-dashed border-[#991b1b]/40 flex-1 px-1 font-semibold">
                    _______ gm/dl &nbsp; | &nbsp; BP: _______ mmHg
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#991b1b] shrink-0">Blood Bag Unit No :</span>
                  <span className="border-b border-dashed border-[#991b1b]/40 flex-1 px-1 font-semibold truncate">
                    IRCS-DHN-2026-________
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2 mt-1">
                <div className="text-center">
                  <div className="w-36 sm:w-40 border-b border-[#991b1b] mb-0.5" />
                  <span className="text-[9px] font-bold text-[#991b1b] uppercase tracking-wider">
                    Medical Officer Seal & Sign
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Tagline */}
            <div className="text-center pt-1 print:pt-0">
              <p className="text-[10px] font-bold text-[#991b1b] tracking-wide">
                ★ 1 Unit of Donated Blood Can Save Up to 3 Lives • Be a Proud Life Saver ★
              </p>
            </div>

            {/* Web Screen Actions (Hidden on Print) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#991b1b]/20 print:hidden print-hidden">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Heart size={15} className="text-[#991b1b] fill-[#991b1b]" />
                <span>Camp: 26th October 2026, 9:00 AM at Mahotsav Karyalaya</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#991b1b] hover:bg-[#b91c1c] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-lg shadow-red-950/20 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Recording Registration...</span>
                    </>
                  ) : (
                    <>
                      <Droplet size={15} className="fill-white" />
                      <span>Submit Blood Donation Registration</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SUCCESS CONFIRMATION MODAL                                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {showSuccessModal && submittedData && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 print:hidden print-hidden"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#991b1b] text-center relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-red-100 border-2 border-[#991b1b] flex items-center justify-center mx-auto mb-3 text-[#991b1b]">
              <Droplet size={32} className="fill-[#991b1b]" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-widest text-[#991b1b] block mb-1">
              Indian Red Cross Society & Pingua Mahotsav
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-[#991b1b] font-odia">
              ରକ୍ତଦାନ ପଞ୍ଜୀକରଣ ସଫଳ ହୋଇଛି!
            </h3>
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider mt-0.5">
              Registration Recorded Successfully
            </h4>

            {/* Registration Number Highlight Card */}
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
              <div className="text-left">
                <span className="text-[9px] uppercase font-bold text-red-900 block">Official Donor Reg No</span>
                <span className="font-mono text-base sm:text-lg font-black text-[#991b1b]">
                  {submittedData.registrationNo}
                </span>
              </div>
              <button
                type="button"
                onClick={() => copyRegNumber(submittedData.registrationNo)}
                className="px-3 py-1.5 rounded-full bg-white border border-red-300 hover:bg-red-100 text-xs font-semibold text-slate-700 flex items-center gap-1 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 text-xs text-slate-600 space-y-1">
              <p>
                Thank you, <strong className="text-slate-900">{submittedData.name}</strong>! Your noble pledge to donate{" "}
                <strong className="text-[#991b1b]">{submittedData.bloodGroup}</strong> blood has been confirmed.
              </p>
              <p className="text-[11px] text-slate-500">
                Camp Date: <strong>26th October 2026 (9:00 AM)</strong> at Mahotsav Karyalaya, Pingua.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  handlePrintSlip();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#991b1b] hover:bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Printer size={15} />
                <span>Print Donor Slip (Single A4)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Close & View Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
