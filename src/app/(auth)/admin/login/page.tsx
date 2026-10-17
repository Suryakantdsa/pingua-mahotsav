"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconShield,
  IconSparkles,
  IconArrowRight,
} from "@tabler/icons-react";
import { toast } from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Authenticating credentials...");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Login failed", { id: loadingToast });
        return;
      }

      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Welcome to Pingua Mahotsav Admin Panel!", { id: loadingToast });
      router.push("/admin");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Connection error. Please try again.";
      toast.error(msg, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950 p-4 font-sans text-slate-100 overflow-hidden">
      {/* Glow background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-orange-600/15 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Glass Card */}
        <div className="rounded-3xl border border-amber-500/20 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl transition-all">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mb-3 flex justify-center">
              <div className="relative p-1 bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 rounded-full shadow-xl shadow-amber-500/20 ring-4 ring-amber-500/20">
                <Image
                  src="/logo.png"
                  alt="Pingua Mahotsav Logo"
                  width={72}
                  height={72}
                  className="rounded-full bg-white p-0.5 object-cover"
                  priority
                />
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/30 mb-2">
              <IconSparkles size={12} />
              Pingua Mahotsav
            </span>

            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Sign in to manage daily festival events, organizers voice, partners, and public registrations.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleStandardLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Admin Email Address
              </label>
              <div className="relative">
                <IconMail className="absolute left-3.5 top-3 h-5 w-5 text-amber-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@pinguamahotsav.com"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                Password
              </label>
              <div className="relative">
                <IconLock className="absolute left-3.5 top-3 h-5 w-5 text-amber-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-10 text-sm font-medium text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:opacity-95 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <IconShield className="h-4 w-4" />
                  <span>Access Admin Control Panel</span>
                  <IconArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Verified Admin Accounts quick fill */}
            <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-3 text-xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                <span>Default Authorized Accounts</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to prefill</span>
              </div>
              <div className="mt-2 space-y-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      email: "admin@pinguamahotsav.com",
                      password: "adminpassord@123",
                    })
                  }
                  className="w-full flex items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border border-slate-800 hover:border-amber-500/40"
                >
                  <div className="truncate">
                    <span className="font-bold text-amber-400">Super Admin: </span>
                    <span className="font-mono text-[11px]">admin@pinguamahotsav.com</span>
                  </div>
                  <span className="ml-2 shrink-0 rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">
                    Use
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center space-y-1.5">
          <p className="text-xs text-slate-400">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/suryakant-das-7b657814b"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-500/50 underline-offset-2 transition-colors"
            >
              Suryakant
            </a>{" "}
            • Maintained by{" "}
            <span className="font-semibold text-orange-400">
              Sanskari Group Pingua (Batch of 2012)
            </span>
          </p>
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Pingua Mahotsav Paribar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
