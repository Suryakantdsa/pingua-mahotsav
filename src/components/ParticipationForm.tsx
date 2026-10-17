"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ExternalLink, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

const PROGRAM_TYPES = [
  "Dance",
  "Song",
  "Music",
  "Drama / Acting",
  "Folk Dance",
  "Folk Song",
  "Instrumental",
  "Poetry",
  "Comedy",
  "Other",
];

export default function ParticipationForm() {
  const { showParticipationForm, setShowParticipationForm, setSuccessData } = useFormStore();

  const [formData, setFormData] = useState({
    name: "",
    leaderName: "",
    phone: "",
    whatsappNumber: "",
    address: "",
    district: "Dhenkanal",
    selectedPrograms: [] as string[],
    programTitle: "",
    participantsCount: "1",
    duration: "15",
    description: "",
    specialRequirements: "",
    signatureName: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!showParticipationForm) return null;

  const handleClose = () => setShowParticipationForm(false);

  const handleProgramToggle = (label: string) => {
    setFormData((prev) => {
      const exists = prev.selectedPrograms.includes(label);
      const nextPrograms = exists
        ? prev.selectedPrograms.filter((p) => p !== label)
        : [...prev.selectedPrograms, label];
      return { ...prev, selectedPrograms: nextPrograms };
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage("Please enter Artist/Group Name and Contact Number.");
      return;
    }
    if (formData.selectedPrograms.length === 0) {
      setErrorMessage("Please select at least one Programme Type.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const payload = {
        name: formData.name.toUpperCase(),
        leaderName: formData.leaderName.toUpperCase(),
        phone: formData.phone,
        whatsappNumber: formData.whatsappNumber || formData.phone,
        address: formData.address,
        district: formData.district,
        programType: formData.selectedPrograms,
        programTitle: formData.programTitle,
        participantsCount: parseInt(formData.participantsCount) || 1,
        duration: formData.duration,
        description: formData.description,
        specialRequirements: formData.specialRequirements,
        signatureName: formData.signatureName || formData.name,
        declarationAgreed: true,
        declarationDate: new Date().toLocaleDateString("en-GB"),
      };

      const res = await fetch("/api/participation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessData({
          title: "ସାଂସ୍କୃତିକ ଆବେଦନ ଗୃହୀତ ହୋଇଛି!",
          message: `Thank you, ${formData.name}! Your Cultural Programme Registration (${result.registrationNo}) has been submitted.`,
          subMessage: "Our cultural committee will evaluate and contact you via " + formData.phone,
          badge: `Reg No: ${result.registrationNo}`,
        });
        handleClose();
      } else {
        setErrorMessage(result.error || "Submission failed. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-white border-2 border-[#0c2f57] shadow-2xl p-6 sm:p-8 text-[#0c2f57] relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center pb-4 border-b border-[#0c2f57]/20 mb-5">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#cca146] block mb-1">
            Official Registration • 14th Edition
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0c2f57] uppercase tracking-wide">
            PINGUA MAHOTSAV – 2026
          </h2>
          <h3 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider mt-0.5">
            CULTURAL PROGRAMME REGISTRATION FORM
          </h3>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="bg-[#0c2f57] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Fill in BLOCK LETTERS
            </span>
            <Link
              href="/cultural-registration"
              onClick={handleClose}
              className="text-[11px] text-[#0c2f57] hover:underline font-bold inline-flex items-center gap-1"
            >
              <span>Open Full Page Form</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Section 1 */}
          <div className="border border-[#0c2f57] rounded-xl p-3.5 space-y-3">
            <span className="font-bold text-xs uppercase tracking-wider text-[#0c2f57] block border-b border-[#0c2f57]/15 pb-1">
              1. APPLICANT / GROUP DETAILS
            </span>

            <div>
              <label className="font-bold block text-slate-700 mb-1">
                1. Name of the Group / Artist *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="ENTER GROUP OR ARTIST NAME"
                className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 uppercase font-semibold text-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold block text-slate-700 mb-1">
                  2. Leader / Coordinator Name
                </label>
                <input
                  type="text"
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleChange}
                  placeholder="COORDINATOR NAME"
                  className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 uppercase font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">
                  3. Contact Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-DIGIT MOBILE"
                  className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold block text-slate-700 mb-1">
                  4. WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="WHATSAPP NUMBER"
                  className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">
                  6. District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="DHENKANAL / ETC"
                  className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 uppercase font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block text-slate-700 mb-1">
                5. Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="VILLAGE / AT / PO / DISTRICT"
                className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 uppercase font-semibold text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="border border-[#0c2f57] rounded-xl p-3.5 space-y-3">
            <span className="font-bold text-xs uppercase tracking-wider text-[#0c2f57] block border-b border-[#0c2f57]/15 pb-1">
              2. PROGRAMME DETAILS
            </span>

            <div>
              <label className="font-bold block text-slate-700 mb-2">
                7. Type of Programme (✓) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-semibold">
                {PROGRAM_TYPES.map((pt) => (
                  <label key={pt} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.selectedPrograms.includes(pt)}
                      onChange={() => handleProgramToggle(pt)}
                      className="w-3.5 h-3.5 rounded text-[#0c2f57]"
                    />
                    <span>{pt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="font-bold block text-slate-700 mb-1">
                  8. Title of Programme
                </label>
                <input
                  type="text"
                  name="programTitle"
                  value={formData.programTitle}
                  onChange={handleChange}
                  placeholder="PROGRAMME TITLE"
                  className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 uppercase font-semibold text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">
                  10. Duration (Mins)
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="15"
                  className="w-full border-b-2 border-dotted border-[#0c2f57]/50 focus:border-[#0c2f57] px-2 py-1 font-semibold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold block text-slate-700 mb-1">
                11. Brief Description
              </label>
              <textarea
                name="description"
                rows={2}
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of performance..."
                className="w-full border border-slate-300 rounded-lg p-2 text-xs focus:outline-none focus:border-[#0c2f57]"
              />
            </div>
          </div>

          {/* Declaration */}
          <div className="border border-[#0c2f57] rounded-xl p-3 bg-slate-50">
            <span className="font-bold text-xs uppercase tracking-wider text-[#0c2f57] block mb-1">
              DECLARATION
            </span>
            <p className="text-[11px] text-slate-700 leading-relaxed font-serif">
              I hereby declare that the information provided above is true and correct to the best of my knowledge. I agree to abide by the rules and decisions of the Pingua Mahotsav Committee.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="font-bold text-xs text-[#0c2f57]">Signature :</span>
              <input
                type="text"
                name="signatureName"
                required
                value={formData.signatureName}
                onChange={handleChange}
                placeholder="FULL NAME AS SIGNATURE"
                className="flex-1 border-b-2 border-[#0c2f57] px-2 py-0.5 text-xs font-bold uppercase text-[#0c2f57] focus:outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#0c2f57] hover:bg-[#124278] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit Registration</span>
                </>
              )}
            </button>

            <Link
              href="/cultural-registration"
              onClick={handleClose}
              className="w-full py-2.5 rounded-full border border-[#0c2f57] text-[#0c2f57] font-bold text-xs uppercase tracking-wider text-center"
            >
              Open Full Printable Sheet
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
