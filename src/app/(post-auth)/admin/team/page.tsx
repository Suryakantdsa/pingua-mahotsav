"use client";

import React, { useState, useEffect } from "react";
import TeamTable from "@/components/table/TeamTable";
import Link from "next/link";
import { IconShieldLock, IconArrowLeft } from "@tabler/icons-react";

export default function AdminTeamPage() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const adminObj = parsed.admin || parsed.user;
        if (adminObj?.role) {
          setRole(String(adminObj.role));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  // Only super_admin can view and manage team members
  if (role !== "super_admin") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600 shadow-sm border border-rose-100">
          <IconShieldLock size={32} />
        </div>
        <h2 className="mt-4 text-xl font-black text-slate-900">
          Access Restricted
        </h2>
        <p className="mt-2 max-w-md text-xs text-slate-500 leading-relaxed">
          The <strong>Team & Security</strong> module is strictly reserved for the <strong>Super Administrator</strong>. Your account does not have authorization to view or manage festival committee members.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-all cursor-pointer"
        >
          <IconArrowLeft size={16} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return <TeamTable />;
}
