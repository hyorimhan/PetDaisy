import { weightDataType } from "@/components/features/dashboard/weight/WeightList";
import { getWeightList } from "@/service/weight";
import { useQuery } from "@tanstack/react-query";

export function useGetWeight(petId: string, page?: number, limit?: number) {
  const {
    data: weightData,
    isPending,
    isError,
  } = useQuery<weightDataType>({
    queryKey: ["weightData", petId, page, limit],
    queryFn: () => {
      if (!petId) throw new Error();
      return getWeightList(petId, page, limit);
    },
    enabled: !!petId,
  });

  return {
    weightData,
    isPending,
    isError,
  };
}

export default useGetWeight;
