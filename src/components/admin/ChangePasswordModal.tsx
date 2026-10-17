"use client";

import React, { useState } from "react";
import {
  IconX,
  IconLock,
  IconKey,
  IconPhoneCall,
  IconCheck,
  IconAlertCircle,
  IconEye,
  IconEyeOff,
  IconShieldLock,
} from "@tabler/icons-react";
import toast from "react-hot-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  onSuccess?: () => void;
  isMandatory?: boolean;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  userEmail = "",
  onSuccess,
  isMandatory = false,
}: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    email: userEmail,
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync email if prop changes
  React.useEffect(() => {
    if (userEmail) {
      setFormData((prev) => ({ ...prev, email: userEmail }));
    }
  }, [userEmail]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    if (!formData.otp.trim()) {
      toast.error("Please enter the 60-second OTP received from Super Admin.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Verifying 60s OTP & updating password...");

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp.trim(),
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update password.", { id: loadingToast });
        return;
      }

      toast.success(data.message || "Password updated successfully!", { id: loadingToast });

      // Update localStorage to clear mustChangePassword flag
      try {
        const stored = localStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.admin) parsed.admin.mustChangePassword = false;
          if (parsed.user) parsed.user.mustChangePassword = false;
          localStorage.setItem("user", JSON.stringify(parsed));
        }
      } catch (err) {
        console.error(err);
      }

      setFormData({
        email: userEmail,
        newPassword: "",
        confirmPassword: "",
        otp: "",
      });

      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      toast.error("Network error. Please try again.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-enter">
      {/* Backdrop: non-clickable if mandatory */}
      <div
        className="fixed inset-0"
        onClick={isMandatory ? undefined : onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 font-bold">
              <IconShieldLock size={20} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Change Password
              </h3>
              <p className="text-xs text-slate-500">
                Authorized Phone OTP Verification
              </p>
            </div>
          </div>
          {!isMandatory && (
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <IconX size={18} />
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Instructions Box */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <IconPhoneCall size={16} className="text-amber-700 shrink-0" />
              <span>Step-by-step Password Setup</span>
            </div>
            {isMandatory ? (
              <p className="text-amber-800 text-[11px] font-semibold leading-relaxed">
                ⚠️ <strong>First Login Security:</strong> You logged in with a temporary password. You must change your password now to continue using the portal.
              </p>
            ) : null}
            <p className="text-slate-600 text-[11px] leading-relaxed">
              1. Type your desired <strong>New Password</strong> and confirm it below.<br />
              2. Call Super Admin on phone to request your <strong>60-Second OTP</strong>.<br />
              3. Enter the OTP and click submit.
            </p>
          </div>

          {/* 1. Account Email */}
          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700">Account Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              readOnly={!!userEmail}
              className={`w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${
                userEmail ? "bg-slate-100 cursor-not-allowed text-slate-600" : "bg-white"
              }`}
              placeholder="member@pinguamahotsav.com"
            />
          </div>

          {/* 2. New Password */}
          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700">New Permanent Password</label>
            <div className="relative">
              <IconLock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                required
                minLength={6}
                placeholder="At least 6 characters..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-9 py-2 text-xs font-semibold text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <IconEyeOff size={15} /> : <IconEye size={15} />}
              </button>
            </div>
          </div>

          {/* 3. Confirm New Password */}
          <div className="space-y-1 text-xs">
            <label className="block font-bold text-slate-700">Verify / Confirm Password</label>
            <div className="relative">
              <IconLock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                placeholder="Re-type your new password..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>

          {/* 4. 60-Second OTP Field (Entered AFTER filling password) */}
          <div className="space-y-1 text-xs pt-1">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-700">
                60-Second Security OTP
              </label>
              <span className="text-[10px] text-amber-600 font-bold">
                From Super Admin Phone Call
              </span>
            </div>
            <div className="relative">
              <IconKey className="absolute left-3 top-2.5 h-4 w-4 text-amber-500" />
              <input
                type="text"
                maxLength={6}
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value.replace(/\D/g, "") })
                }
                required
                placeholder="Enter 6-digit OTP from call"
                className="w-full rounded-xl border border-amber-300 bg-amber-50/20 pl-9 pr-3 py-2 text-sm font-mono font-bold tracking-widest text-slate-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            {!isMandatory && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:opacity-95 text-slate-950 rounded-xl text-xs font-extrabold shadow-md shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Verifying & Updating..." : "Verify OTP & Save Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
