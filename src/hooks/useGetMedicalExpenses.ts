import { getMedicalExpensesByPetId } from "@/service/medical";
import { MedicalExpenses } from "@/types/medical";
import { useQuery } from "@tanstack/react-query";

export function useGetMedicalExpenses(visitId: string) {
  const {
    data: medicalExpenses = [],
    isPending,
    isError,
  } = useQuery<MedicalExpenses[]>({
    queryKey: ["medicalExpenses", visitId],
    queryFn: () => getMedicalExpensesByPetId(visitId),
    enabled: !!visitId,
    staleTime: 1000 * 60 * 5,
  });

  return {
    medicalExpenses,
    isPending,
    isError,
  };
}
