"use client";
import { DEFAULT_PET_IMAGE } from "@/constants/pet";
import { usePetRegistration } from "@/hooks/usePetRegistration";
import { usePetRegistrationForm } from "@/hooks/usePetRegistrationForm";
import useUploadImages from "@/hooks/useUploadImages";

import { uploadPetImages } from "@/service/petProfile";
import { PetRegistrationType } from "@/types/petProfile";
import { useAuthStore } from "@/zustand/useAuthStore";
import { FieldErrors } from "react-hook-form";
import FormField from "./FormField";
import { formError } from "@/utils/error/form";

function PetRegistrationForm() {
  const user = useAuthStore((state) => state.user);

  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "pet-profiles",
      uploadFn: uploadPetImages,
    });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    handleWeightChange,
  } = usePetRegistrationForm();

  const { mutate: registPet } = usePetRegistration(user?.id as string);

  const handleAnimalRegist = (data: PetRegistrationType) => {
    const petData = {
      user_id: user?.id as string,
      name: data.name,
      gender: data.gender,
      birth_date: data.birth,
      weight: data.weight,
      neutered: data.neutered,
      images:
        uploadImageURLs.length !== 0
          ? JSON.stringify(uploadImageURLs)
          : JSON.stringify([DEFAULT_PET_IMAGE]),
      animal_type: data.animalType,
    };
    registPet(petData);
  };

  formError(errors);

  return (
    <form
      className="flex flex-col gap-5 pb-[130px]"
      onSubmit={handleSubmit((data) => handleAnimalRegist(data), formError)}
    >
      <FormField
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        handleWeightChange={handleWeightChange}
        imagePaths={imagePaths}
        imageUploadError={imageUploadError}
        handleImageUpload={handleImageUpload}
      />
    </form>
  );
}

export default PetRegistrationForm;
