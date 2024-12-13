"use client";

import Footer from "@/components/common/layout/Footer";
import Header from "@/components/common/layout/Header";
import AuthProvider from "./(providers)/_providers/AuthProvider";
import ModalProvider from "./(providers)/_providers/ModalProvider";
import QueryProvider from "./(providers)/_providers/QueryProvider";
import "./globals.css";

import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const dashboard = pathname === "/dashboard";
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <QueryProvider>
          <AuthProvider>
            <ModalProvider>
              <div className=" bg-main-2">
                <div className="fixed top-0 left-0 right-0 z-50">
                  <Header />
                </div>
                <main className="pt-[59px] pb-[60px] overflow-scroll scrollbar-hide min-h-screen">
                  {children}
                </main>
                <div className="fixed bottom-0 left-0 right-0 z-50">
                  <Footer />
                </div>
              </div>
            </ModalProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
