import { getSymptomsList } from "@/service/symptoms";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";

export type symptomsDataType = {
  pet_id: string;
  id: string;
  symptom_date: string;
  title: string;
  content: string;
  images?: string;
};
function useGetSymptoms() {
  const { petId } = usePetStore();
  const {
    data: symptomsData,
    isPending,
    isError,
  } = useQuery<symptomsDataType[]>({
    queryKey: ["symptomsData", petId],
    queryFn: () => getSymptomsList(petId ?? ""),
    enabled: !!petId,
  });
  return {
    symptomsData,
    isPending,
    isError,
  };
}

export default useGetSymptoms;
