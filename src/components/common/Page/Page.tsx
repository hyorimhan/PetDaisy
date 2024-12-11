"use client";
import { usePetStore } from "@/zustand/usePetStore";
import { PropsWithChildren } from "react";

function Page({ children }: Readonly<PropsWithChildren>) {
  const petId = usePetStore((state) => state.petId) as string;

  return (
    <div className="bg-gradient-1 w-[360px] md:w-[600px] mx-auto p-3">
      {children}
    </div>
  );
}

export default Page;
