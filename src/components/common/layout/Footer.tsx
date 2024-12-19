"use client";
import Logout from "@/components/features/auth/logout/Logout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/login" || pathname === "/join") {
    return null;
  }
  return (
    <div className="relative flex text-main-4 justify-end items-center bg-white w-[360px] md:w-[600px] mx-auto px-3 h-[60px] shadow-shadow">
      <Link
        href={"/dashboard"}
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <Image
          src={"/icon/home.svg"}
          alt="home"
          width={20}
          height={20}
          className="mx-auto w-5 h-5"
        />
        대시보드
      </Link>
      <Logout />
    </div>
  );
}

export default Footer;
