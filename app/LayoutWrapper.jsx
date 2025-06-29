// app/LayoutWrapper.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = ["/login", "/signup"].includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
