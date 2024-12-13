import { getSymptomsDetail } from "@/service/symptoms";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";

export type symptomsDetailType = {
  pet_id: string;
  id: string;
  symptom_date: string;
  content: string;
  images?: string;
  title: string;
};
function useGetSymptomsDetail(post_id: string) {
  const { petId } = usePetStore();
  const {
    data: symptomsDetail,
    isPending,
    isError,
  } = useQuery<symptomsDetailType[]>({
    queryKey: ["symptomsDetail", petId, post_id],
    queryFn: () => getSymptomsDetail(petId ?? "", post_id),
    enabled: !!petId && !!post_id,
  });

  return { symptomsDetail, isPending, isError };
}

export default useGetSymptomsDetail;
