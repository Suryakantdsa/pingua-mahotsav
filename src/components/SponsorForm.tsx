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
import { Textarea } from "@/components/ui/textarea";
import { Award, X, Loader2 } from "lucide-react";
import { useFormStore } from "@/store/useFormStore";

export default function SponsorForm() {
  const { showSponsorForm, setShowSponsorForm, setSuccessData } = useFormStore();

  const handleClose = () => setShowSponsorForm(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!showSponsorForm) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.phone) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/sponsor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccessData({
          title: "ସହଯୋଗ ଆବେଦନ ପାଇଁ ଧନ୍ୟବାଦ!",
          message: `Thank you, ${formData.name}! Your sponsorship interest as a ${formData.type} partner has been sent to the festival executive board.`,
          subMessage: "Our sponsorship coordinators will contact you at " + formData.phone + " shortly.",
          badge: `${formData.type.toUpperCase()} Partner • 14th Mahotsav 2026`,
        });
        setFormData({ name: "", type: "", phone: "", email: "", message: "" });
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
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-3xl bg-[#160a22] border-2 border-amber-500/40 shadow-2xl p-6 sm:p-8 text-white relative max-h-[90vh] overflow-y-auto"
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
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Award size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold font-odia text-white">
              ପୃଷ୍ଠପୋଷକ ଆବେଦନ
            </h3>
            <span className="text-xs text-amber-300 font-sans">Sponsorship & Partnership</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans mb-5">
          Support the 14th Pingua Mahotsav 2026 as a proud patron, title sponsor, or media partner.
        </p>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <Label htmlFor="name" className="text-slate-300 mb-1 block">
              Organization / Individual Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g. Sanskari Group / Enterprise"
              value={formData.name}
              onChange={handleChange}
              className="bg-black/40 border-white/10 text-white rounded-xl focus:border-amber-400"
              required
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-slate-300 mb-1 block">
              Sponsorship Tier *
            </Label>
            <Select
              value={formData.type}
              onValueChange={(val) => setFormData({ ...formData, type: val })}
            >
              <SelectTrigger className="bg-black/40 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Select Tier" />
              </SelectTrigger>
              <SelectContent className="bg-[#180a24] text-white border-white/10">
                <SelectItem value="platinum" className="hover:bg-white/10">
                  Platinum Sponsor (ପ୍ଲାଟିନମ୍ ପୃଷ୍ଠପୋଷକ)
                </SelectItem>
                <SelectItem value="gold" className="hover:bg-white/10">
                  Gold Partner (ଗୋଲ୍ଡ ସହଯୋଗୀ)
                </SelectItem>
                <SelectItem value="silver" className="hover:bg-white/10">
                  Silver Cultural Partner (ସିଲଭର ପୃଷ୍ଠପୋଷକ)
                </SelectItem>
                <SelectItem value="community" className="hover:bg-white/10">
                  Community Patron (ଗ୍ରାମ୍ୟ ହିତୈଷୀ)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="phone" className="text-slate-300 mb-1 block">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white rounded-xl focus:border-amber-400"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300 mb-1 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="info@brand.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-black/40 border-white/10 text-white rounded-xl focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-slate-300 mb-1 block">
              Message or Specific Proposal
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us how you would like to collaborate or sponsor..."
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="bg-black/40 border-white/10 text-white rounded-xl focus:border-amber-400 resize-none"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  <span>Submitting Proposal...</span>
                </>
              ) : (
                <span>Submit Sponsorship Proposal</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
