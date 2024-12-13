"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useMedicalById } from "@/hooks/medical/useMedicalById";
import { usePetStore } from "@/zustand/usePetStore";
import MedicalCard from "./MedicalCard";

function Medical() {
  const petId = usePetStore((state) => state.petId) as string;
  const { medicalLists, isPending, isError } = useMedicalById(petId);

  return (
    <QueryStateHandler
      data={medicalLists}
      isError={isError}
      isPending={isPending}
    >
      <Card>
        <CardTitle title="진료 기록" link="/dashboard/medicalList" />
        {medicalLists && medicalLists.length === 0 && (
          <Empty content="진료 기록 정보가 없습니다." />
        )}
        <ul className="mt-2 flex flex-col gap-2">
          {medicalLists &&
            medicalLists.slice(0, 3).map((list) => (
              <li key={list.id}>
                <MedicalCard list={list} />
              </li>
            ))}
        </ul>
      </Card>
    </QueryStateHandler>
  );
}

export default Medical;
