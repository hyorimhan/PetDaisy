"use client";
import Button from "@/components/common/Button/Button";
import { DOG, PET_TYPES } from "@/constants/pet";
import { useState } from "react";

function SelectAnimalType() {
  const [isActive, setIsActive] = useState(false);
  const [selectAnimalType, setSelectAnimalType] = useState(DOG);

  const handleSelectAnimalType = (type: string) => {
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
