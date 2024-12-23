import { getPetProfile } from "@/service/petProfile";
import { PetProfileType } from "@/types/petProfile";
import { useQuery } from "@tanstack/react-query";

export function useGetPetProfile(petId: string) {
  const {
    data: details,
    isPending,
    isError,
  } = useQuery<PetProfileType>({
    queryKey: ["petProfile", petId],
    queryFn: () => getPetProfile(petId),
    enabled: !!petId,
    retry: 0,
  });

  return { details, isPending, isError };
}
