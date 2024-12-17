import { getSymptomsDetail } from "@/service/symptoms";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";

export type SymptomsDetailType = {
  petId: string;
  id: string;
  symptom_date: string;
  content: string;
  images?: string;
  title: string;
};
function useGetSymptomsDetail(postId: string) {
  const { petId } = usePetStore();
  const {
    data: symptomsDetail,
    isPending,
    isError,
  } = useQuery<SymptomsDetailType[]>({
    queryKey: ["symptomsDetail", petId, postId],
    queryFn: () => getSymptomsDetail(petId ?? "", postId),
    enabled: !!petId && !!postId,
  });

  return { symptomsDetail, isPending, isError };
}

export default useGetSymptomsDetail;
