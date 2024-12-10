"use client";
import Button from "@/components/common/Button/Button";
import Error from "@/components/common/Error/Error";
import Loading from "@/components/common/Loading/Loading";
import { getPetList } from "@/service/petList";
import { PetListType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PetListBox from "./PetListBox";

function PetList() {
  const petId = usePetStore((state) => state.petId);
  const savePet = usePetStore((state) => state.savePet);

  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  // const [isActive, setIsActive] = useState(true);
  // const [selectAnimal, setSelectAnimal] = useState(petId);

  const {
    data: pets = [],
    isPending,
    isError,
  } = useQuery<PetListType>({
    queryKey: ["petList", userId],
    queryFn: () => getPetList(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (pets.length > 0 && !petId) {
      savePet(pets[0].id, pets[0].name);
    }
  }, [pets, petId, savePet]);

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
      <ul className="flex items-center gap-1">
        {pets.map((pet) => (
          <li key={pet.id}>
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
        <li>
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
