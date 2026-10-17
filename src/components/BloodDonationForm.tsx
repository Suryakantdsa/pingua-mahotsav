"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormStore } from "@/store/useFormStore";
import { Droplet, X, Loader2 } from "lucide-react";

export default function BloodDonationForm() {
  const { showBloodDonationForm, setShowBloodDonationForm, setSuccessData } = useFormStore();

  const handleClose = () => setShowBloodDonationForm(false);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodGroup: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.bloodGroup || !formData.phone) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/blood-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccessData({
          title: "ରକ୍ତଦାନ ପଞ୍ଜୀକରଣ ସଫଳ ହୋଇଛି!",
          message: `Thank you, ${formData.name}! Your blood donation registration for the 14th Pingua Mahotsav has been successfully recorded.`,
          subMessage: `Date: 26th October 2026 (9:00 AM) at Mahotsav Karyalaya, Pingua. We will reach out to ${formData.phone}.`,
          badge: `Blood Group: ${formData.bloodGroup} • Noble Life Saver`,
        });
        setFormData({ name: "", age: "", bloodGroup: "", phone: "" });
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

  if (!showBloodDonationForm) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-[#160a22] border-2 border-red-500/40 shadow-2xl p-6 sm:p-8 text-white relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
          aria-label="Close form"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
            <Droplet size={22} className="fill-red-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold font-odia text-white">
              ରକ୍ତଦାନ ପଞ୍ଜୀକରଣ <span className="text-sm font-sans font-normal text-red-400 block sm:inline">Blood Donation</span>
            </h3>
            <span className="text-[10px] text-amber-300 font-bold block uppercase tracking-wider">
              In Collaboration with Indian Red Cross Society (Dhenkanal)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mb-4">
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Camp: 26 Oct 2026 (9:00 AM) • Mahotsav Karyalaya
          </p>
          <a
            href="/blood-registration"
            onClick={handleClose}
            className="text-[11px] text-red-300 hover:text-white underline font-semibold shrink-0"
          >
            Open A4 Sheet ↗
          </a>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <Label htmlFor="name" className="text-slate-300 mb-1 block">
              Full Name (ସମ୍ପୂର୍ଣ୍ଣ ନାମ) *
            </Label>
            <Input
              id="name"
              placeholder="e.g. Ramesh Chandra Sahoo"
              value={formData.name}
              onChange={handleChange}
              className="bg-black/40 border-white/10 text-white rounded-xl focus:border-red-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="age" className="text-slate-300 mb-1 block">
                Age (ବୟସ) *
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g. 25"
                min="18"
                max="65"
                value={formData.age}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white rounded-xl focus:border-red-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="bloodGroup" className="text-slate-300 mb-1 block">
                Blood Group (ରକ୍ତ ବର୍ଗ) *
              </Label>
              <Select
                value={formData.bloodGroup}
                onValueChange={(val) => setFormData({ ...formData, bloodGroup: val })}
              >
                <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-xl">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-[#180a24] text-white border-white/10">
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((grp) => (
                    <SelectItem key={grp} value={grp} className="hover:bg-white/10">
                      {grp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-slate-300 mb-1 block">
              Phone Number (ମୋବାଇଲ ନମ୍ବର) *
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              className="bg-black/40 border-white/10 text-white rounded-xl focus:border-red-400"
              required
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white font-extrabold shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  <span>Submitting Registration...</span>
                </>
              ) : (
                <span>Confirm Blood Donation Registration</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
