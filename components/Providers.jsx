// components/Providers.jsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ToastContainer } from "react-toastify";
import MyTypeAnimation from "@/app/components/MyTypeAnimation";
import { useEffect } from "react";
import Aos from "aos";

export default function Providers({ children }) {
    useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        {children}
        <MyTypeAnimation></MyTypeAnimation>
        <ToastContainer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
