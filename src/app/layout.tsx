"use client";

import Footer from "@/components/common/layout/Footer";
import Header from "@/components/common/layout/Header";
import AuthProvider from "./(providers)/_providers/AuthProvider";
import ModalProvider from "./(providers)/_providers/ModalProvider";
import QueryProvider from "./(providers)/_providers/QueryProvider";
import "./globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const dashboard = pathname === "/dashboard";
  return (
    <html lang="ko">
      <body
        className={`min-h-screen ${
          !dashboard ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <QueryProvider>
          <AuthProvider>
            <ModalProvider>
              <div className=" bg-main-2">
                <div className="fixed top-0 left-0 right-0 z-50">
                  <Header />
                </div>
                <main
                  className={`pt-[59px] pb-[60px] ${
                    !dashboard ? "overflow-hidden" : "overflow-auto"
                  }`}
                >
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
