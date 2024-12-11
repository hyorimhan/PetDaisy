"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import { useGetMedicalVisitLists } from "@/hooks/useGetMedicaVisitlLists";
import { usePetStore } from "@/zustand/usePetStore";
import MedicalCard from "./MedicalCard";

function Medical() {
  const petId = usePetStore((state) => state.petId) as string;
  const { medicalLists } = useGetMedicalVisitLists(petId);
  const latestMedicalList = medicalLists.slice(0, 3);

  return (
    <Card>
      <CardTitle title="진료 기록" link="/dashboard/medicalList" />
      <ul className="mt-2 flex flex-col gap-2">
        {latestMedicalList.map((list) => (
          <li key={list.id}>
            <MedicalCard list={list} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default Medical;
