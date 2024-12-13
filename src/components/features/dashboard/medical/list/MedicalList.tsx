"use client";
import Card from "@/components/common/Card/Card";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetMedicalVisitLists } from "@/hooks/useGetMedicaVisitlLists";
import { usePetStore } from "@/zustand/usePetStore";
import MedicalCard from "./MedicalCard";

function MedicalList() {
  const petId = usePetStore((state) => state.petId) as string;
  const { medicalLists, isPending, isError } = useGetMedicalVisitLists(petId);

  return (
    <QueryStateHandler
      data={medicalLists}
      isPending={isPending}
      isError={isError}
    >
      <Card>
        {medicalLists.length === 0 && (
          <Empty content="진료 기록 정보가 없습니다." />
        )}
        <ul className="flex flex-col gap-2">
          {medicalLists.map((list) => (
            <li key={list.id}>
              <MedicalCard list={list} />
            </li>
          ))}
        </ul>
      </Card>
    </QueryStateHandler>
  );
}

export default MedicalList;
