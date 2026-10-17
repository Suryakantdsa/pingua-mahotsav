"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  IconX,
  IconKey,
  IconShield,
  IconClock,
  IconCopy,
  IconCheck,
  IconRefresh,
  IconPhone,
  IconMail,
  IconUserCheck,
  IconAlertCircle,
  IconSparkles,
  IconLock,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

interface TeamMemberViewModalProps {
  member: Record<string, any> | null;
  isOpen: boolean;
  onClose: () => void;
  currentUserRole?: string;
}

export default function TeamMemberViewModal({
  member,
  isOpen,
  onClose,
  currentUserRole = "super_admin",
}: TeamMemberViewModalProps) {
  const [otp, setOtp] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer when modal closes or member changes
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setOtp(null);
      setRemainingSeconds(0);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  if (!isOpen || !member) return null;

  const isSuperOrAdmin = currentUserRole === "super_admin" || currentUserRole === "admin";

  const handleGenerateOtp = async () => {
    if (!member._id) return;
    setIsGenerating(true);
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      const res = await fetch(`/api/team-members/${member._id}/generate-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to generate OTP.");
        return;
      }

      setOtp(data.otp);
      setRemainingSeconds(data.expiresIn || 60);
      toast.success("60-Second OTP Generated! Share with member now.");

      // Start 1-second countdown
      let count = data.expiresIn || 60;
      timerRef.current = setInterval(() => {
        count -= 1;
        setRemainingSeconds(count);
        if (count <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          setRemainingSeconds(0);
        }
      }, 1000);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to generate OTP.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyOtp = () => {
    if (!otp) return;
    navigator.clipboard.writeText(otp);
    setCopied(true);
    toast.success("OTP copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const roleColors: Record<string, { bg: string; text: string; border: string }> = {
    super_admin: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30" },
    admin: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/30" },
    coordinator: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/30" },
    volunteer: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/30" },
    member: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/30" },
  };

  const currentRoleStyle = roleColors[member.role] || roleColors.member;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-enter">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
              <IconUserCheck size={18} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Team Member Profile
              </h3>
              <p className="text-xs text-slate-500">
                Festival Committee & Access Control
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Member Profile Summary Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-md bg-amber-100 flex items-center justify-center">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-black text-amber-700">
                  {member.name?.charAt(0) || "P"}
                </span>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-lg font-black text-slate-900">
                  {member.name}
                </h4>
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${currentRoleStyle.bg} ${currentRoleStyle.text} ${currentRoleStyle.border}`}
                >
                  {member.role?.replace("_", " ")}
                </span>
                <span
                  className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    member.isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {member.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-600">
                {member.designation || "Committee Member"}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <IconMail size={14} className="text-slate-400" />
                  {member.email}
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <IconPhone size={14} className="text-slate-400" />
                  {member.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Account & Password Status Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Password Status
              </span>
              <span className="mt-1 inline-flex items-center gap-1 font-bold text-slate-800">
                <IconLock size={14} className="text-amber-500" />
                {member.mustChangePassword ? (
                  <span className="text-amber-600 font-semibold">
                    Temp Password (Must Change)
                  </span>
                ) : (
                  <span className="text-emerald-600 font-semibold">
                    Permanent Password Active
                  </span>
                )}
              </span>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Access Permissions
              </span>
              <span className="mt-1 font-bold text-slate-800 block">
                {member.role === "super_admin" || member.role === "admin"
                  ? "Full Edit & Delete Control"
                  : "View & Export Only"}
              </span>
            </div>
          </div>

          {/* Super Admin Phone OTP Generator Section */}
          {isSuperOrAdmin ? (
            <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-gradient-to-br from-amber-50/60 to-orange-50/40 p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900">
                    <IconKey size={16} className="text-amber-600" />
                    <span>Super Admin Phone OTP Generator</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When this member calls to set or reset their password, click below to generate a secure 6-digit OTP with <strong>60-second validity</strong>. Read this code over phone to the member immediately.
                  </p>
                </div>
              </div>

              {/* OTP Display Box */}
              {otp ? (
                <div className="space-y-3 rounded-2xl bg-white p-4 border border-amber-200 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      Security Code (Valid 60s)
                    </span>
                    <div className="flex items-center gap-1 text-xs font-extrabold text-amber-700">
                      <IconClock size={14} className="animate-spin text-amber-600" />
                      <span>{remainingSeconds > 0 ? `${remainingSeconds}s remaining` : "Expired"}</span>
                    </div>
                  </div>

                  {/* 60s Progress Bar */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        remainingSeconds > 25
                          ? "bg-emerald-500"
                          : remainingSeconds > 10
                          ? "bg-amber-500"
                          : "bg-rose-500"
                      }`}
                      style={{ width: `${(remainingSeconds / 60) * 100}%` }}
                    />
                  </div>

                  {remainingSeconds > 0 ? (
                    <div className="flex items-center justify-between bg-slate-900 text-white rounded-xl p-3 px-5">
                      <div className="font-mono text-3xl font-black tracking-widest text-amber-400">
                        {otp.split("").join(" ")}
                      </div>
                      <button
                        onClick={handleCopyOtp}
                        className="flex items-center gap-1 text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-rose-600 font-bold text-xs bg-rose-50 rounded-xl border border-rose-200">
                      ⚠️ OTP Expired (60 seconds elapsed). Click below to generate a new OTP.
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[11px] text-slate-500">
                      Member must enter this OTP along with their new password before the timer expires.
                    </p>
                    <button
                      onClick={handleGenerateOtp}
                      disabled={isGenerating}
                      className="shrink-0 flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                    >
                      <IconRefresh size={14} />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateOtp}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-3 text-xs font-extrabold text-slate-950 shadow-md shadow-amber-500/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <IconSparkles size={16} />
                  <span>{isGenerating ? "Generating Secure OTP..." : "Generate 60-Second OTP for Member"}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500">
              Only Super Admin and Admin can generate 60-second phone verification OTPs.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
