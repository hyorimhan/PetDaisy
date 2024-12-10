"use client";
import Button from "@/components/common/Button/Button";
import Error from "@/components/common/Error/Error";
import Loading from "@/components/common/Loading/Loading";
import { getPetList } from "@/service/petList";
import { PetListType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import { useQuery } from "@tanstack/react-query";

function PetList() {
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

  if (isPending) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="bg-main-1 w-[360px] md:w-[600px] mx-auto p-3">
      <ul className="flex items-center gap-1">
        {pets.map((pet) => (
          <li key={pet.id}>
            <Button
              content={pet.name}
              types="sm"
              type="button"
              outlineColor="border-main-3"
              textColor="text-main-4"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PetList;
