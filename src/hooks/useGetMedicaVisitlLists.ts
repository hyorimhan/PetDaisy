import { getMedicalVisitLists } from "@/service/medical";
import { MedicalVisits } from "@/types/medical";
import { useQuery } from "@tanstack/react-query";

export function useGetMedicalVisitLists(petId: string) {
  const { data: medicalLists = [] } = useQuery<MedicalVisits[]>({
    queryKey: ["medicalList", petId],
    queryFn: () => getMedicalVisitLists(petId),
    enabled: !!petId,
  });

  return {
    medicalLists,
  };
}
