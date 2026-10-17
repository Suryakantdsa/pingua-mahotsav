"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconCalendarEvent,
  IconUsers,
  IconHeartHandshake,
  IconAward,
  IconHeart,
  IconUserCheck,
  IconRefresh,
  IconChevronRight,
  IconSparkles,
  IconPlus,
} from "@tabler/icons-react";

interface DashboardMetrics {
  counts: {
    events: number;
    orgMembers: number;
    webCredits: number;
    sponsors: number;
    bloodDonors: number;
    participants: number;
  };
  recentEvents: any[];
  recentBloodDonors: any[];
  recentParticipants: any[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDashboardMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const result = await res.json();
      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error("Failed to load dashboard metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-amber-500/20">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 mb-3">
              <IconSparkles size={14} className="animate-spin text-amber-400" />
              Pingua Mahotsav Admin Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Festival Command Center
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
              Real-time management for festival events, organizer voices, partners, blood donor registrations, and public cultural participation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardMetrics}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 px-4 py-2.5 text-xs font-bold text-amber-300 border border-amber-500/30 hover:bg-slate-800 transition-all cursor-pointer shadow-md"
            >
              <IconRefresh size={16} className={loading ? "animate-spin" : ""} />
              <span>Refresh Metrics</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Event Schedule */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-amber-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Scheduled Events
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "..." : data?.counts?.events ?? 0}
                </span>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  Active Program
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <IconCalendarEvent size={22} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Daily stage performances</span>
            <Link
              href="/admin/event-schedule"
              className="inline-flex items-center font-bold text-amber-600 hover:text-amber-700 gap-0.5"
            >
              Manage Schedule <IconChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 2: Organizers Voice */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-orange-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Organizers Voice
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "..." : data?.counts?.orgMembers ?? 0}
                </span>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                  Key Leaders
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-orange-50 p-3 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all">
              <IconUsers size={22} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Messages & Leaders</span>
            <Link
              href="/admin/org-member"
              className="inline-flex items-center font-bold text-orange-600 hover:text-orange-700 gap-0.5"
            >
              Manage Organizers <IconChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 3: Sponsors & Partners */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-purple-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Sponsors & Partners
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "..." : data?.counts?.sponsors ?? 0}
                </span>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                  Patrons
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-purple-50 p-3 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
              <IconAward size={22} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Platinum, Gold, Silver</span>
            <Link
              href="/admin/sponsors-partners"
              className="inline-flex items-center font-bold text-purple-600 hover:text-purple-700 gap-0.5"
            >
              Manage Partners <IconChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 4: Blood Donors Camp */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-rose-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Blood Donor Camp
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "..." : data?.counts?.bloodDonors ?? 0}
                </span>
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Donors
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-rose-50 p-3 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <IconHeart size={22} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Noble Welfare Campaign</span>
            <Link
              href="/admin/blood-donation"
              className="inline-flex items-center font-bold text-rose-600 hover:text-rose-700 gap-0.5"
            >
              View Donors <IconChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 5: Event Participants */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-emerald-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Event Participants
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "..." : data?.counts?.participants ?? 0}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Performers
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <IconUserCheck size={22} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Dance, Music, Drama</span>
            <Link
              href="/admin/participants"
              className="inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 gap-0.5"
            >
              View Participants <IconChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Card 6: Website Team Credits */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all hover:shadow-md hover:border-blue-300">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Website Credits
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                  {loading ? "..." : data?.counts?.webCredits ?? 0}
                </span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  Dev Team
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <IconHeartHandshake size={22} />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Creators & Contributors</span>
            <Link
              href="/admin/website-credits"
              className="inline-flex items-center font-bold text-blue-600 hover:text-blue-700 gap-0.5"
            >
              Manage Credits <IconChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Quick Actions & Live Stream */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Events List */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <IconCalendarEvent size={18} className="text-amber-500" />
                Latest Festival Events
              </h2>
              <p className="text-xs text-slate-500">Upcoming daily stage programs</p>
            </div>
            <Link
              href="/admin/event-schedule"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-0.5"
            >
              View All <IconChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading events...</div>
            ) : !data?.recentEvents || data.recentEvents.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No events created yet. Click below to add an event.
              </div>
            ) : (
              data.recentEvents.map((ev: any) => (
                <div
                  key={ev._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3.5 hover:bg-slate-50 transition-all text-xs"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{ev.event}</h3>
                    <p className="text-slate-500 mt-0.5">
                      {ev.date} ({ev.day}) • {ev.time}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-50 text-amber-700 font-extrabold px-2.5 py-1 uppercase text-[10px]">
                    {ev.type}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/admin/event-schedule"
              className="w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl py-2.5 text-xs font-extrabold transition-all"
            >
              <IconPlus size={14} />
              <span>Add New Festival Event</span>
            </Link>
          </div>
        </div>

        {/* Recent Welfare Registrations */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <IconHeart size={18} className="text-rose-500" />
                Recent Blood Donor Registrations
              </h2>
              <p className="text-xs text-slate-500">Volunteers registering for blood donation</p>
            </div>
            <Link
              href="/admin/blood-donation"
              className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-0.5"
            >
              View All <IconChevronRight size={14} />
            </Link>
          </div>

          <div className="space-y-3 flex-1">
            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading registrations...</div>
            ) : !data?.recentBloodDonors || data.recentBloodDonors.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No donor registrations recorded yet.
              </div>
            ) : (
              data.recentBloodDonors.map((donor: any) => (
                <div
                  key={donor._id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 p-3.5 hover:bg-slate-50 transition-all text-xs"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">{donor.name}</h3>
                    <p className="text-slate-500 mt-0.5">Phone: {donor.phone}</p>
                  </div>
                  <span className="rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-extrabold px-3 py-1 text-xs">
                    🩸 {donor.bloodGroup}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/admin/blood-donation"
              className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-xs font-bold transition-all"
            >
              <span>Manage Blood Donors</span>
              <IconChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
