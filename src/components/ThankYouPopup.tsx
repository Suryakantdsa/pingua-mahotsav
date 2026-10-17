"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2, X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormStore } from "@/store/useFormStore";

export default function ThankYouPopup() {
  const { successData, setSuccessData } = useFormStore();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (successData && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [successData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && successData) {
        setSuccessData(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [successData, setSuccessData]);

  if (!successData) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-dialog-title"
        className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-md rounded-3xl bg-[#180a24] border-2 border-amber-400/50 p-6 sm:p-8 shadow-2xl text-center text-white overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Icon Button */}
          <button
            ref={closeButtonRef}
            onClick={() => setSuccessData(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer"
            aria-label="Close success dialog"
          >
            <X size={18} />
          </button>

          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-950/50 mb-5">
            <CheckCircle2 size={36} className="text-slate-950 stroke-[2.5]" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} className="text-amber-400" />
            <span>{successData.badge || "୧୪ ତମ ପିଙ୍ଗୁଆ ମହୋତ୍ସବ ୨୦୨୬"}</span>
          </div>

          {/* Title */}
          <h2
            id="success-dialog-title"
            className="text-xl sm:text-2xl font-bold font-odia text-white mt-1"
          >
            {successData.title}
          </h2>

          {/* Message */}
          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {successData.message}
          </p>

          {/* Sub Message / Next Steps */}
          {successData.subMessage && (
            <div className="mt-4 p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <span className="font-semibold block mb-0.5">Next Steps / ପରବର୍ତ୍ତୀ ସୂଚନା:</span>
              <p>{successData.subMessage}</p>
            </div>
          )}

          {/* Done / Continue CTA */}
          <div className="mt-6">
            <button
              onClick={() => setSuccessData(null)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg cursor-pointer"
            >
              <span>Done & Continue Exploring</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
