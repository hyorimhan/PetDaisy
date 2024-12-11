"use client";
import { loginUserInfo } from "@/service/auth";
import { getPetList } from "@/service/petList";
import { PetListType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const { saveUser } = useAuthStore();
  const { petId, savePet } = usePetStore();
  const pathname = usePathname();
  const router = useRouter();
  console.log("상위 pet_id", petId);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: loginUserInfo,
  });

  const { data: pets = [] } = useQuery<PetListType>({
    queryKey: ["petList", userInfo?.user?.id],
    queryFn: () => {
      if (!userInfo?.user) throw new Error();
      return getPetList(userInfo?.user.id);
    },
    enabled: !!userInfo?.user,
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

  useEffect(() => {
    if (pets.length > 0 && !petId) {
      savePet(pets[0].id, pets[0].name);
    }
  }, [pets, petId, savePet]);

  return <div>{children}</div>;
}

export default AuthProvider;
