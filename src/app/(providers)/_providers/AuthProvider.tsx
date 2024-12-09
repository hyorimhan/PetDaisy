"use client";
import { loginUserInfo } from "@/service/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const { saveUser } = useAuthStore();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: loginUserInfo,
  });

  useEffect(() => {
    if (userInfo) {
      saveUser(userInfo.user);
    }
  }, [saveUser, userInfo]);

  return <div>{children}</div>;
}

export default AuthProvider;
