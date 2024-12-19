"use client";
import { DOG } from "@/constants/pet";
import { useGetPetProfile } from "@/hooks/profile/useGetPetProfile";
import { usePetStore } from "@/zustand/usePetStore";
import { PropsWithChildren } from "react";

function Page({ children }: Readonly<PropsWithChildren>) {
  const petId = usePetStore((state) => state.petId) as string;
  const { details } = useGetPetProfile(petId);

  return (
    <div
      className={`${
        details?.animal_type === DOG ? "bg-gradient-2" : "bg-gradient-3"
      } w-[390px] md:w-[600px] mx-auto p-3 pb-[80px] min-h-screen`}
    >
      {children}
    </div>
  );
}

export default Page;
