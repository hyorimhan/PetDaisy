import { getVaccinationById } from "@/service/vaccine";
import { Vaccinations } from "@/types/vaccine";
import { useQuery } from "@tanstack/react-query";

export function useGetVaccineList(petId: string) {
  const {
    data: vaccinations = [],
    isPending,
    isError,
  } = useQuery<Vaccinations>({
    queryKey: ["vaccineList", petId],
    queryFn: () => getVaccinationById(petId),
    enabled: !!petId,
  });

  return {
    vaccinations,
    isPending,
    isError,
  };
}
