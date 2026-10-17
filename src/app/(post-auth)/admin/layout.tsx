// app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  IconDashboard,
  IconCalendarEvent,
  IconUsers,
  IconHeartHandshake,
  IconAward,
  IconHeart,
  IconUserCheck,
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconLogout,
  IconMenu2,
  IconSparkles,
  IconUserShield,
  IconKey,
} from "@tabler/icons-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ChangePasswordModal from "@/components/admin/ChangePasswordModal";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const [userName, setUserName] = useState<string>("Pingua Admin");
  const [userRole, setUserRole] = useState<string>("Super Admin");
  const [rawRole, setRawRole] = useState<string>("super_admin");
  const [userEmail, setUserEmail] = useState<string>("");
  const [mustChangePassword, setMustChangePassword] = useState<boolean>(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState<boolean>(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const adminObj = parsed.admin || parsed.user;
        if (adminObj?.fullName || adminObj?.name) {
          setUserName(adminObj.fullName || adminObj.name);
        }
        if (adminObj?.email) {
          setUserEmail(adminObj.email);
        }
        if (adminObj?.role) {
          const roleStr = String(adminObj.role);
          setRawRole(roleStr);
          const roleDisplay =
            roleStr === "super_admin"
              ? "Super Admin"
              : roleStr === "admin"
              ? "Admin"
              : roleStr.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());
          setUserRole(roleDisplay);

          // Super Admin is NEVER required to change password
          if (roleStr !== "super_admin" && adminObj?.mustChangePassword) {
            setMustChangePassword(true);
            setIsChangePasswordOpen(true);
          } else {
            setMustChangePassword(false);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading("Logging out");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      localStorage.removeItem("user");
      router.push("/admin/login");
      toast.success("Logged out successfully!", { id: loadingToast });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  type SubMenuItem = {
    name: string;
    href: string;
    icon: any;
    active: boolean;
  };

  type MenuItem = {
    name: string;
    href?: string;
    icon: any;
    active?: boolean;
    children?: SubMenuItem[];
  };

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: IconDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Festival Setup",
      icon: IconSparkles,
      children: [
        {
          name: "Hero Banners",
          href: "/admin/hero-banners",
          icon: IconSparkles,
          active: pathname.includes("/admin/hero-banners"),
        },
        {
          name: "Event Schedule",
          href: "/admin/event-schedule",
          icon: IconCalendarEvent,
          active: pathname.includes("/admin/event-schedule"),
        },
        {
          name: "Organizers & Voice",
          href: "/admin/org-member",
          icon: IconUsers,
          active: pathname.includes("/admin/org-member"),
        },
        {
          name: "Website Team Credits",
          href: "/admin/website-credits",
          icon: IconHeartHandshake,
          active: pathname.includes("/admin/website-credits"),
        },
      ],
    },
    {
      name: "Welfare & Registrations",
      icon: IconHeart,
      children: [
        {
          name: "Sponsors & Partners",
          href: "/admin/sponsors-partners",
          icon: IconAward,
          active: pathname.includes("/admin/sponsors-partners"),
        },
        {
          name: "Blood Donors Camp",
          href: "/admin/blood-donation",
          icon: IconHeart,
          active: pathname.includes("/admin/blood-donation"),
        },
        {
          name: "Event Participants",
          href: "/admin/participants",
          icon: IconUserCheck,
          active: pathname.includes("/admin/participants"),
        },
      ],
    },
    {
      name: "Team & Security",
      icon: IconUserShield,
      children: [
        {
          name: "Team Management",
          href: "/admin/team",
          icon: IconUserShield,
          active: pathname.includes("/admin/team"),
        },
      ],
    },
  ];

  // Team & Security is strictly for super_admin only
  const visibleMenuItems = menuItems.filter((item) => {
    if (item.name === "Team & Security") {
      return rawRole === "super_admin";
    }
    return true;
  });

  // Auto-expand category if child route is active
  useEffect(() => {
    const initialOpenState: Record<string, boolean> = {};
    visibleMenuItems.forEach((item) => {
      if (item.children?.some((child) => child.active)) {
        initialOpenState[item.name] = true;
      }
    });
    setOpenSubmenus((prev) => ({ ...initialOpenState, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, rawRole]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isSidebarOpen ? "lg:w-64" : "lg:w-20"}`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            {isSidebarOpen ? (
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-amber-500/60 bg-white p-0.5 shadow-md shadow-amber-500/10">
                  <Image
                    src="/logo.png"
                    alt="Pingua Mahotsav Logo"
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white tracking-wide">
                    Pingua Mahotsav
                  </h2>
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Admin Portal
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-amber-500/60 bg-white p-0.5 shadow-md shadow-amber-500/10">
                <Image
                  src="/logo.png"
                  alt="Pingua Mahotsav Logo"
                  width={36}
                  height={36}
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </div>
            )}

            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:block cursor-pointer transition-colors"
            >
              {isSidebarOpen ? (
                <IconChevronLeft size={18} />
              ) : (
                <IconChevronRight size={18} />
              )}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
            {visibleMenuItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isChildActive = item.children?.some((child) => child.active);
              const isOpen = openSubmenus[item.name];

              if (!hasChildren) {
                return (
                  <Link
                    key={item.name}
                    href={item.href || "/admin"}
                    className={`group flex items-center rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 ${
                      item.active
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/20"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <item.icon
                      size={18}
                      className={`flex-shrink-0 ${isSidebarOpen ? "mr-3 text-amber-400" : "mx-auto"}`}
                    />
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                );
              }

              return (
                <div key={item.name} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isSidebarOpen) {
                        setIsSidebarOpen(true);
                      }
                      toggleSubmenu(item.name);
                    }}
                    className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isChildActive
                        ? "bg-slate-800 text-amber-400"
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center">
                      <item.icon
                        size={18}
                        className={`flex-shrink-0 ${isSidebarOpen ? "mr-3 text-amber-400" : "mx-auto"}`}
                      />
                      {isSidebarOpen && <span>{item.name}</span>}
                    </div>
                    {isSidebarOpen && (
                      <IconChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-amber-400" : "text-slate-500"
                        }`}
                      />
                    )}
                  </button>

                  {/* Submenu Children */}
                  {isSidebarOpen && isOpen && (
                    <div className="mt-1 ml-4 space-y-1 border-l-2 border-slate-700/60 pl-3">
                      {item.children!.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`flex items-center rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                            child.active
                              ? "bg-amber-500 text-slate-950 font-extrabold shadow-sm"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                          onClick={() => setIsMobileSidebarOpen(false)}
                        >
                          <child.icon size={15} className="mr-2 flex-shrink-0" />
                          <span>{child.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-slate-800 p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all cursor-pointer"
            >
              <IconLogout
                size={18}
                className={isSidebarOpen ? "mr-3" : "mx-auto"}
              />
              {isSidebarOpen && <span>Sign Out</span>}
            </button>

            {isSidebarOpen && (
              <div className="mt-2.5 rounded-xl border border-slate-800/80 bg-slate-950/70 p-2 text-[10px] text-center text-slate-400 space-y-0.5">
                <div>
                  Developed by{" "}
                  <a
                    href="https://www.linkedin.com/in/suryakant-das-7b657814b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-500/50 underline-offset-2 transition-colors"
                  >
                    Suryakant
                  </a>
                </div>
                <div className="text-[9px] text-slate-500 leading-tight">
                  Maintained by{" "}
                  <span className="font-semibold text-orange-400">
                    Sanskari Group Pingua (Batch of 2012)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3.5 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            >
              <IconMenu2 size={20} />
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Pingua Mahotsav Control Panel
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Manage events, organizers, sponsors, and community data
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Change Password Button */}
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Change Password with Super Admin OTP"
            >
              <IconKey size={14} className="text-amber-500" />
              <span className="hidden md:inline">Change Password</span>
            </button>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900">{userName}</div>
              <span className="inline-block text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                {userRole}
              </span>
            </div>
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 font-bold text-white shadow-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div
                className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"
                title="Online"
              />
            </div>
          </div>
        </header>

        {/* Temporary Password Notice Banner */}
        {mustChangePassword && rawRole !== "super_admin" && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span>Temporary Password In Use: Please call Super Admin to request your 60-second phone verification OTP.</span>
            </div>
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs shadow-xs"
            >
              Change Password Now
            </button>
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 overflow-auto bg-slate-50/50 p-4 sm:p-6">
          {children}
        </main>
      </div>

      {/* Change Password with Super Admin OTP Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => {
          if (!mustChangePassword || rawRole === "super_admin") {
            setIsChangePasswordOpen(false);
          }
        }}
        userEmail={userEmail}
        isMandatory={mustChangePassword && rawRole !== "super_admin"}
        onSuccess={() => {
          setMustChangePassword(false);
          setIsChangePasswordOpen(false);
        }}
      />
    </div>
  );
}
