import { getMedicalVisitLists } from "@/service/medical";
import { useQuery } from "@tanstack/react-query";
import { MedicalVisitData } from "./../types/medical";

export function useGetMedicalVisitLists(
  petId: string,
  page?: number,
  limit?: number
) {
  const {
    data: medicalLists,
    isPending,
    isError,
  } = useQuery<MedicalVisitData>({
    queryKey: ["medicalList", petId, page, limit],
    queryFn: () => getMedicalVisitLists(petId, page, limit),
    enabled: !!petId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    medicalLists,
    isPending,
    isError,
  };
}
