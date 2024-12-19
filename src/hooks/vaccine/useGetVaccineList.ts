import { getVaccinationById } from "@/service/vaccine";
import { VaccineData } from "@/types/vaccine";
import { useQuery } from "@tanstack/react-query";

export function useGetVaccineList(
  petId: string,
  page?: number,
  limit?: number
) {
  const {
    data: vaccinations,
    isPending,
    isError,
  } = useQuery<VaccineData>({
    queryKey: ["vaccineList", petId, page, limit],
    queryFn: () => getVaccinationById(petId, page, limit),
    enabled: !!petId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    vaccinations,
    isPending,
    isError,
  };
}
