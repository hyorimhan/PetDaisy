import { getWeightList } from "@/service/weight";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";

export type WeightTableType = {
  id: string;
  pet_id: string;
  weight: number;
  measured_at: string;
};

export type WeightDataType = {
  data: WeightTableType[];
  count?: number;
  page?: number;
  limit?: number;
};
export function useGetWeight(page?: number, limit?: number) {
  const { petId } = usePetStore();
  const {
    data: weightData,
    isPending,
    isError,
  } = useQuery<WeightDataType>({
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
