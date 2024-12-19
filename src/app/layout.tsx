import { Metadata } from "next";
import ModalProvider from "./(providers)/_providers/ModalProvider";
import QueryProvider from "./(providers)/_providers/QueryProvider";
import "./globals.css";

// import { usePathname } from "next/navigation";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const metadata: Metadata = {
  title: {
    default: "펫데이지",
    template: "펫데이지",
  },
  description:
    "반려동물의 건강과 일상을 더 쉽고 체계적으로 기록하는 스마트 헬스케어 다이어리",
  openGraph: {
    title: "펫데이지",
    description:
      "반려동물의 건강과 일상을 더 쉽고 체계적으로 기록하는 스마트 헬스케어 다이어리",
    siteName: "펫데이지",
    locale: "ko_KR",
    type: "website",
    url: "https://pet-daisy.vercel.app/",
    images: {
      url: "/img/meta-img.jpg",
    },
  },
  icons: {
    icon: "/img/favicon.ico",
    apple: [
      { url: "/img/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/img/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/img/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  appleWebApp: {
    title: "펫데이지",
    statusBarStyle: "default",
    capable: true,
  },
  applicationName: "펫데이지",
  other: {
    "mobile-web-app-capable": "yes",
  },
  manifest: "/manifest.json",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <QueryProvider>
          <ModalProvider>
            <div className="bg-main-2">
              <main>{children}</main>
            </div>
          </ModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
