"use client";

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
          <ModalProvider>
            <div className=" bg-main-2">
              <main>{children}</main>
            </div>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
