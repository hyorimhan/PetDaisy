"use client";
import { useAuthStore } from "@/zustand/useAuthStore";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/login" || pathname === "/join") {
    return null;
  }
  return (
    <div className="flex text-lg text-main-4 justify-center items-center bg-white w-[360px] md:w-[600px] mx-auto px-3 h-[3.6875rem]">
      {`${
        user?.user_metadata.display_name ?? user?.email?.split("@")[0]
      }님의 반려동물 기록`}
    </div>
  );
}

export default Header;
