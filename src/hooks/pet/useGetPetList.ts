import { getPetList } from "@/service/petList";
import { PetListType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export function useGetPetList() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: pets = [],
    isPending,
    isError,
  } = useQuery<PetListType>({
    queryKey: ["petList", userId],
    queryFn: () => getPetList(userId),
    enabled: !!userId,
  });
  return { pets, isPending, isError };
}
