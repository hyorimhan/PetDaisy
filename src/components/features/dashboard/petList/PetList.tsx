"use client";
import Button from "@/components/common/Button/Button";
import Error from "@/components/common/Error/Error";
import Loading from "@/components/common/Loading/Loading";
import { getPetList } from "@/service/petList";
import { PetListType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";
import PetListBox from "./PetListBox";

function PetList() {
  const petId = usePetStore((state) => state.petId);
  const savePet = usePetStore((state) => state.savePet);

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

  const handleSelectPet = (petId: string, petName: string) => {
    savePet(petId, petName);
  };

  if (isPending)
    return (
      <PetListBox>
        <Loading />
      </PetListBox>
    );
  if (isError)
    return (
      <PetListBox>
        <Error />
      </PetListBox>
    );

  return (
    <PetListBox>
      <ul className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {pets.map((pet) => (
          <li key={pet.id} className="shrink-0">
            <Button
              content={pet.name}
              types="sm"
              type="button"
              outlineColor="border-main-2"
              textColor="text-main-3"
              onClick={() => handleSelectPet(pet.id, pet.name)}
              isActive={petId === pet.id}
            />
          </li>
        ))}
        <li className="shrink-0">
          <Button
            content="+등록"
            types="sm"
            type="button"
            bgColor="bg-gray-1"
            textColor="text-gray-3"
            href="/dashboard/pet-registration"
          />
        </li>
      </ul>
    </PetListBox>
  );
}

export default PetList;
