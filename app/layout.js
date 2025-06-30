import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutWrapper from "./LayoutWrapper";
import AuthmainLayOut from "./MainLayout";
import { ToastContainer } from "react-toastify";

// Font
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Metadata
export const metadata = {
  title: "AI Medical Assistant",
  description: "Empowering healthcare with intelligent diagnostic support",
};

// Layout
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans`}>
        {/* ThemeProvider must wrap only client-rendered components */}
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <LayoutWrapper>
            <AuthmainLayOut>
              {children}
              <ToastContainer />
            </AuthmainLayOut>
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
