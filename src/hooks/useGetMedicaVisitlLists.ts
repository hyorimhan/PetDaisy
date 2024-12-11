import { getMedicalVisitLists } from "@/service/medical";
import { MedicalVisits } from "@/types/medical";
import { useQuery } from "@tanstack/react-query";

export function useGetMedicalVisitLists(petId: string) {
  const {
    data: medicalLists = [],
    isPending,
    isError,
  } = useQuery<MedicalVisits[]>({
    queryKey: ["medicalList", petId],
    queryFn: () => getMedicalVisitLists(petId),
    enabled: !!petId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    medicalLists,
    isPending,
    isError,
  };
}
