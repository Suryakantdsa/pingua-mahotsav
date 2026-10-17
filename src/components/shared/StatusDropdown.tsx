// components/shared/StatusDropdown.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconChevronDown,
  IconCheck,
  IconClock,
  IconCircleCheck,
  IconCircleX,
  IconActivity,
  IconCircleOff,
} from "@tabler/icons-react";

interface StatusOption {
  value: string;
  label: string;
  badgeClass: string;
  dotClass: string;
  icon: any;
}

const statusConfig: Record<string, StatusOption> = {
  pending: {
    value: "pending",
    label: "Pending (Under Review)",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    dotClass: "bg-amber-500",
    icon: IconClock,
  },
  approved: {
    value: "approved",
    label: "Approved (Verified)",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
    dotClass: "bg-emerald-500",
    icon: IconCircleCheck,
  },
  active: {
    value: "active",
    label: "Active",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    dotClass: "bg-blue-500",
    icon: IconActivity,
  },
  rejected: {
    value: "rejected",
    label: "Rejected",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    dotClass: "bg-rose-500",
    icon: IconCircleX,
  },
  inactive: {
    value: "inactive",
    label: "Inactive",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200",
    dotClass: "bg-slate-400",
    icon: IconCircleOff,
  },
};

interface StatusDropdownProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => Promise<void> | void;
  disabled?: boolean;
  options?: string[];
}

export default function StatusDropdown({
  currentStatus,
  onStatusChange,
  disabled = false,
  options = ["pending", "approved", "active", "rejected", "inactive"],
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [alignClass, setAlignClass] = useState<"left-0" | "right-0">("right-0");
  const containerRef = useRef<HTMLDivElement>(null);

  const currentConfig = statusConfig[currentStatus.toLowerCase()] || {
    value: currentStatus,
    label: currentStatus,
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    dotClass: "bg-slate-500",
    icon: IconClock,
  };

  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      
      // If button is in the left half of the screen, align popover to left edge (left-0)
      // Otherwise align to right edge (right-0)
      if (rect.left < screenWidth / 2) {
        setAlignClass("left-0");
      } else {
        setAlignClass("right-0");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (val: string) => {
    if (val === currentStatus || isUpdating || disabled) return;
    try {
      setIsUpdating(true);
      await onStatusChange(val);
      setIsOpen(false);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        disabled={disabled || isUpdating}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shadow-sm cursor-pointer ${currentConfig.badgeClass} ${
          disabled || isUpdating ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${currentConfig.dotClass}`} />
        <span className="capitalize">{currentConfig.value}</span>
        <IconChevronDown
          size={14}
          className={`ml-0.5 text-slate-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute ${alignClass} mt-2 z-50 w-48 sm:w-56 max-w-[calc(100vw-2rem)] rounded-xl bg-white border border-slate-200 shadow-2xl p-1.5 animate-enter`}
        >
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
            Update Status
          </div>
          <div className="space-y-0.5">
            {options.map((optKey) => {
              const cfg = statusConfig[optKey] || {
                value: optKey,
                label: optKey,
                badgeClass: "",
                dotClass: "bg-slate-400",
                icon: IconClock,
              };
              const isSelected = currentStatus.toLowerCase() === optKey.toLowerCase();
              const ItemIcon = cfg.icon;

              return (
                <button
                  key={optKey}
                  type="button"
                  onClick={() => handleSelect(optKey)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-slate-100 text-slate-900 font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ItemIcon size={16} className={cfg.badgeClass.split(" ")[1]} />
                    <span>{cfg.label}</span>
                  </div>
                  {isSelected && <IconCheck size={14} className="text-slate-900" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
