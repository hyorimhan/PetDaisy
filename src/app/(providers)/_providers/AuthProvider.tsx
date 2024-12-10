"use client";
import { loginUserInfo } from "@/service/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const { saveUser } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: loginUserInfo,
  });

  useEffect(() => {
    if (userInfo) {
      saveUser(userInfo.user);
    }
    const publicPages = ["/", "/login", "/join"];
    if (publicPages.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [saveUser, userInfo]);

  return <div>{children}</div>;
}

export default AuthProvider;
