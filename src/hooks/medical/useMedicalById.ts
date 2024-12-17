import { getMedicalVisitById } from "@/service/medical";
import { MedicalVisits } from "@/types/medical";
import { useQuery } from "@tanstack/react-query";

export function useMedicalById(petId: string) {
  const {
    data: medicalLists,
    isPending,
    isError,
  } = useQuery<MedicalVisits>({
    queryKey: ["medicalList", petId],
    queryFn: () => getMedicalVisitById(petId),
    enabled: !!petId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    medicalLists,
    isPending,
    isError,
  };
}
