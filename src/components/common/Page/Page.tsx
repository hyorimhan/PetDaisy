"use client";
import { DOG } from "@/constants/pet";
import { useGetPetProfile } from "@/hooks/useGetPetProfile";
import { usePetStore } from "@/zustand/usePetStore";
import { PropsWithChildren } from "react";

function Page({ children }: Readonly<PropsWithChildren>) {
  const petId = usePetStore((state) => state.petId) as string;
  const { details } = useGetPetProfile(petId);

  return (
    <div
      className={`${
        !petId
          ? "bg-gradient-1"
          : details?.animal_type === DOG
          ? "bg-gradient-2"
          : "bg-gradient-3"
      } w-[360px] md:w-[600px] mx-auto p-3 pb-[120px]`}
    >
      {children}
    </div>
  );
}

export default Page;
