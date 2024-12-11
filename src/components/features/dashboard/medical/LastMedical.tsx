"use client";
import Card from "@/components/common/Card/Card";
import { usePetStore } from "@/zustand/usePetStore";

function LastMedical() {
  const name = usePetStore((state) => state.petName);
  return (
    <Card>
      <div className="flex justify-center">
        <span className="text-main-5">{name}</span>는 24-11-16에 마지막 진료를
        봤어요.
      </div>
    </Card>
  );
}

export default LastMedical;
