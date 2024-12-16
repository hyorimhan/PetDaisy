"use client";
import Card from "@/components/common/Card/Card";
import CardTitle from "@/components/common/Card/CardTitle";
import Empty from "@/components/common/Empty/Empty";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { getVaccinationById } from "@/service/vaccine";
import { Vaccination, Vaccinations } from "@/types/vaccine";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";
import VaccineCard from "./VaccineCard";

function Vaccine() {
  const petId = usePetStore((state) => state.petId) as string;

  const {
    data = [],
    isPending,
    isError,
  } = useQuery<Vaccinations>({
    queryKey: ["vaccineList", petId],
    queryFn: () => getVaccinationById(petId),
    enabled: !!petId,
  });

  const vaccinations = data.slice(0, 3);

  return (
    <QueryStateHandler
      data={vaccinations}
      isError={isError}
      isPending={isPending}
    >
      <Card>
        <CardTitle title="예방 접종 기록" link="/dashboard/vaccineList" />
        {vaccinations.length === 0 ? (
          <Empty content="예방 접종 내역이 없습니다 " />
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {vaccinations.map((vaccination: Vaccination) => (
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
