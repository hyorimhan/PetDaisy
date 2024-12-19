"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetVaccineList } from "@/hooks/vaccine/useGetVaccineList";
import { Vaccination } from "@/types/vaccine";
import { usePetStore } from "@/zustand/usePetStore";
import VaccineCard from "./VaccineCard";

function Vaccine() {
  const petId = usePetStore((state) => state.petId) as string;

  const { vaccinations, isPending, isError } = useGetVaccineList(petId);
  const lastVaccinations = vaccinations?.data.slice(0, 3) ?? [];

  return (
    <QueryStateHandler
      data={vaccinations}
      isError={isError}
      isPending={isPending}
    >
      <Card>
        <CardTitle title="예방 접종 기록" link="/dashboard/vaccineList" />
        {lastVaccinations.length === 0 ? (
          <Empty content="예방 접종 내역이 없습니다 " />
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {lastVaccinations.map((vaccination: Vaccination) => (
              <li key={vaccination.id}>
                <VaccineCard vaccination={vaccination} />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </QueryStateHandler>
  );
}

export default Vaccine;
