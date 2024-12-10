import Footer from "@/components/common/layout/Footer";
import Header from "@/components/common/layout/Header";
import AuthProvider from "./(providers)/_providers/AuthProvider";
import ModalProvider from "./(providers)/_providers/ModalProvider";
import QueryProvider from "./(providers)/_providers/QueryProvider";
import "./globals.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-main-2">
        <QueryProvider>
          <AuthProvider>
            <ModalProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ModalProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
