"use client";
import Card from "@/components/common/Card/Card";
import { useGetMedicalVisitLists } from "@/hooks/useGetMedicaVisitlLists";
import { usePetStore } from "@/zustand/usePetStore";
import MedicalCard from "./MedicalCard";

function MedicalList() {
  const petId = usePetStore((state) => state.petId) as string;
  const { medicalLists } = useGetMedicalVisitLists(petId);

  return (
    <Card>
      <ul className="flex flex-col gap-2">
        {medicalLists.map((list) => (
          <li key={list.id}>
            <MedicalCard list={list} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default MedicalList;
