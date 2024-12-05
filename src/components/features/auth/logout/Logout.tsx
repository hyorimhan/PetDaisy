"use client";
import { logout } from "@/service/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import Image from "next/image";
import React from "react";

function Logout() {
  const { saveUser } = useAuthStore();
  const logoutFunc = async () => {
    const response = await logout();
    if (response.error) {
      alert(response.error);
    }
    saveUser(null);
    alert(response.message);
  };
  return (
    <button onClick={() => logoutFunc()}>
      {" "}
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
