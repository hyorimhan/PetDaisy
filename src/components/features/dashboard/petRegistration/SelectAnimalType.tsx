"use client";
import Button from "@/components/common/Button/Button";
import { DOG, PET_TYPES } from "@/constants/pet";
import { PetRegistrationType } from "@/types/petProfile";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface SelectAnimalTypeProps {
  setValue: UseFormSetValue<PetRegistrationType>;
}
function SelectAnimalType({ setValue }: SelectAnimalTypeProps) {
  const [isActive, setIsActive] = useState(true);
  const [selectAnimalType, setSelectAnimalType] = useState(DOG);

  useEffect(() => {
    setValue("animalType", selectAnimalType);
  }, [selectAnimalType, setValue]);

  const handleSelectAnimalType = (type: string) => {
    setValue("animalType", type);
    setSelectAnimalType(type);
    setIsActive(true);
  };
  return (
    <div className="w-full flex items-center gap-2">
      {PET_TYPES.map((type) => (
        <Button
          key={type.key}
          type="button"
          content={type.label}
          textColor="text-main-3"
          outlineColor="border-main-3"
          isActive={selectAnimalType === type.value ? isActive : !isActive}
          onClick={() => handleSelectAnimalType(type.value)}
        />
      ))}
    </div>
  );
}

export default SelectAnimalType;
