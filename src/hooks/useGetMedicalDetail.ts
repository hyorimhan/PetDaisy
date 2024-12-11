import { getMedicalDetails } from "@/service/medical";
import { MedicalVisits } from "@/types/medical";
import { useQuery } from "@tanstack/react-query";

export function useGetMedicalDetail(visitId: string) {
  const {
    data: details,
    isPending,
    isError,
  } = useQuery<MedicalVisits>({
    queryKey: ["medicalDetail", visitId],
    queryFn: () => getMedicalDetails(visitId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    details,
    isPending,
    isError,
  };
}
