"use client";
import Button from "@/components/common/Button/Button";
import QueryStateHandler from "@/components/common/Handler/QueryStateHandler";
import { useGetPetList } from "@/hooks/pet/useGetPetList";
import { usePetStore } from "@/zustand/usePetStore";
import PetListBox from "./PetListBox";

function PetList() {
  const petId = usePetStore((state) => state.petId);
  const savePet = usePetStore((state) => state.savePet);

  const { pets, isPending, isError } = useGetPetList();

  const handleSelectPet = (petId: string, petName: string) => {
    savePet(petId, petName);
  };

  return (
    <PetListBox>
      <QueryStateHandler data={pets} isPending={isPending} isError={isError}>
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
      </QueryStateHandler>
    </PetListBox>
  );
}

export default PetList;
