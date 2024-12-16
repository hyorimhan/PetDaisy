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

export type symptomsPaginateType = {
  data: symptomsDataType[];
  page: number;
  limit: number;
  count: number;
};

function useGetSymptoms(page?: number, limit?: number) {
  const { petId } = usePetStore();
  const {
    data: symptomsData,
    isPending,
    isError,
  } = useQuery<symptomsPaginateType>({
    queryKey: ["symptomsData", petId, page, limit],
    queryFn: () => getSymptomsList(petId ?? "", page, limit),
    enabled: !!petId,
  });
  return {
    symptomsData,
    isPending,
    isError,
  };
}

export default useGetSymptoms;
