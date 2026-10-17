"use client";
import GlobalLoading from "@/components/GlobalLoading";
import React, { useEffect, useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  return <div>{loading ? <GlobalLoading /> : children}</div>;
};

export default Layout;
