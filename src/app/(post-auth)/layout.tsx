// src\app\(post-auth)\layout.tsx
"use client";

import GlobalLoading from "@/components/GlobalLoading";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const token = Cookies.get("accessToken");
  //       console.log("token________", !token);
  //       // If not logged in, redirect to admin login
  //       if (!token) {
  //         router.replace("/admin/login");
  //       }
  //     } catch (error) {
  //       console.error("Auth check failed:", error);
  //       router.replace("/admin/login");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkAuth();
  // }, [router, pathname]);

  return <div>{loading ? <GlobalLoading /> : children}</div>;
};

export default Layout;
