"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalLoading from "./GlobalLoading";

interface PublicPageLoaderProps {
  minDelay?: number;
}

export default function PublicPageLoader({ minDelay = 2000 }: PublicPageLoaderProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  // If on admin routes, admin has its own dedicated post-auth loader
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setFadingOut(false);

    let exitTimer: NodeJS.Timeout | undefined;
    const timer = setTimeout(() => {
      setFadingOut(true);
      exitTimer = setTimeout(() => {
        setLoading(false);
      }, 600); // 600ms smooth dissolve exit
    }, minDelay);

    return () => {
      clearTimeout(timer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [pathname, isAdmin, minDelay]);

  if (isAdmin || !loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] transition-opacity duration-600 ease-in-out ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
    >
      <GlobalLoading />
    </div>
  );
}
