// app/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function AuthmainLayOut({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
