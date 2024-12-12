"use client";
import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";
import Image from "next/image";

function Logout() {
  const logoutMutation = useLogoutMutation();
  return (
    <button onClick={() => logoutMutation.mutate()}>
      <Image
        src={"/icon/login.svg"}
        alt="home"
        width={20}
        height={20}
        className="mx-auto w-5 h-5 "
      />
      로그아웃
    </button>
  );
}

export default Logout;
