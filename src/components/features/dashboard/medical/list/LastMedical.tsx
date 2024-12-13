"use client";
import Card from "@/components/common/Card/Card";
import { useGetMedicalVisitLists } from "@/hooks/useGetMedicaVisitlLists";
import { usePetStore } from "@/zustand/usePetStore";

function LastMedical() {
  const petId = usePetStore((state) => state.petId) as string;
  const name = usePetStore((state) => state.petName);
  const { medicalLists } = useGetMedicalVisitLists(petId);
  const lastMedicalVisitDate = medicalLists[0]?.visit_date || "";
  return (
    <Card>
      <div className="flex justify-center">
        {lastMedicalVisitDate ? (
          <div className="text-gray-4">
            <span className="text-main-5">{name}</span>
            {`은(는) `}
            <span className="font-bold text-main-5">
              {lastMedicalVisitDate}
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
    </Card>
  );
}

export default LastMedical;
