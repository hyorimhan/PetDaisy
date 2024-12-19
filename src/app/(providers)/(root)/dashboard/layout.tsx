import Footer from "@/components/common/layout/Footer";
import Header from "@/components/common/layout/Header";
import { PropsWithChildren } from "react";
import AuthProvider from "../../_providers/AuthProvider";

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <Header />
      <div className="overflow-scroll scrollbar-hide min-h-screen">
        {children}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default DashboardLayout;
