"use client";
import Card from "@/components/common/Card/Card";
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
