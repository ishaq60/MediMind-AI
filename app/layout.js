import "./globals.css";
import { Montserrat } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import AuthmainLayOut from "./MainLayout";
import Providers from "@/components/Providers";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "AI Medical Assistant",
  description: "Empowering healthcare with intelligent diagnostic support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans`}>
        <Providers>
          <LayoutWrapper>
            <AuthmainLayOut>
              {children}
            </AuthmainLayOut>
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
