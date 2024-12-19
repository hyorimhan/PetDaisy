"use client";
import Card from "@/components/common/Card/Card";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useMedicalById } from "@/hooks/medical/useMedicalById";
import { usePetStore } from "@/zustand/usePetStore";

function LastMedical() {
  const petId = usePetStore((state) => state.petId) as string;
  const name = usePetStore((state) => state.petName);
  const { medicalLists, isPending, isError } = useMedicalById(petId);

  return (
    <Card>
      <QueryStateHandler
        data={medicalLists}
        isError={isError}
        isPending={isPending}
      >
        <div className="flex justify-center text-[14px]">
          {medicalLists?.length > 0 ? (
            <div className="text-gray-4">
              <span className="text-main-5">{name}</span>
              {`은(는) `}
              <span className="font-bold text-main-5">
                {medicalLists[0]?.visit_date || ""}
              </span>
              에 마지막 진료를 봤어요.
            </div>
          ) : (
            <div className="text-gray-4">
              <span className="text-main-5">{name}</span>는 아직 진료 기록이
              없어요.
            </div>
          )}
        </div>
      </QueryStateHandler>
    </Card>
  );
}

export default LastMedical;
