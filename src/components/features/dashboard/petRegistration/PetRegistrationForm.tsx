"use client";
import { DEFAULT_PET_IMAGE } from "@/constants/pet";
import useUploadImages from "@/hooks/common/useUploadImages";
import { usePetRegistration } from "@/hooks/profile/usePetRegistration";
import { usePetRegistrationForm } from "@/hooks/profile/usePetRegistrationForm";

import Button from "@/components/common/Button/Button";
import { uploadPetImages } from "@/service/petProfile";
import { PetRegistrationType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import FormField from "./FormField";

function PetRegistrationForm() {
  const user = useAuthStore((state) => state.user);

  const {
    uploadImageURLs,
    imagePaths,
    imageUploadError,
    handleImageUpload,
    handleDeleteImage,
  } = useUploadImages({
    type: "pet-profiles",
    uploadFn: uploadPetImages,
  });

  const { register, handleSubmit, setValue, watch, errors } =
    usePetRegistrationForm();

  const { mutate: registPet } = usePetRegistration();

  const handleAnimalRegist = (data: PetRegistrationType) => {
    const petData = {
      user_id: user?.id as string,
      name: data.name,
      gender: data.gender,
      birth_date: data.birth,
      weight: String(Number(data.weight).toFixed(2)),
      neutered: data.neutered,
      images:
        uploadImageURLs && uploadImageURLs.length > 0
          ? JSON.stringify(uploadImageURLs)
          : JSON.stringify([DEFAULT_PET_IMAGE]),
      animal_type: data.animalType,
    };
    registPet(petData);
  };

  return (
    <form
      className="flex flex-col gap-5 pb-[130px]"
      onSubmit={handleSubmit((data) => handleAnimalRegist(data))}
    >
      <FormField
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        imagePaths={imagePaths}
        imageUploadError={imageUploadError}
        handleImageUpload={handleImageUpload}
        handleDeleteImage={handleDeleteImage}
      />
      <Button
        content={
          imagePaths.some((path) => path.startsWith("blob:")) &&
          imagePaths.length > uploadImageURLs.length
            ? "이미지 업로드 중"
            : "등록하기"
        }
        type="submit"
        bgColor="bg-main-5"
        textColor="text-white"
        types="lg"
      />
    </form>
  );
}

export default PetRegistrationForm;
