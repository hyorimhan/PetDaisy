"use client";
import Button from "@/components/common/Button/Button";
import { usePetDelete } from "@/hooks/profile/usePetDelete";

function DeletePet() {
  const { handleDeletePet } = usePetDelete();
  return (
    <Button
      content="반려동물 삭제하기"
      outlineColor="border-red-3"
      textColor="text-red-3"
      types="md"
      onClick={handleDeletePet}
    />
  );
}

export default DeletePet;
