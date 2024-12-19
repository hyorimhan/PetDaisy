"use client";
import { useAuthStore } from "@/zustand/useAuthStore";

function Header() {
  const { user } = useAuthStore();

  return (
    <div className="flex text-lg text-main-4 justify-center items-center bg-white w-[390px] md:w-[600px] mx-auto px-3 h-[3.6875rem] shadow-shadow">
      {`${
        user?.user_metadata.display_name ?? user?.email?.split("@")[0]
      }님의 반려동물 기록`}
    </div>
  );
}

export default Header;
