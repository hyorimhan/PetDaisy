"use client";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { GENDER_TYPES } from "@/constants/pet";
import { PET_NAME_VALIDATION } from "@/constants/petValidation";
import useUploadImages from "@/hooks/useUploadImages";
import { uploadPetImages } from "@/service/petProfile";
import { useForm } from "react-hook-form";
import SelectAnimalType from "./SelectAnimalType";
type PetRegistrationType = {
  name: string;
  gender: string;
};

function PetRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetRegistrationType>();

  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "pet-profiles",
      uploadFn: uploadPetImages,
    });

  const handleAnimalRegist = () => {
    console.log("submit");
  };

  return (
    <form
      className="flex flex-col gap-5 pb-[130px]"
      onSubmit={handleSubmit(handleAnimalRegist)}
    >
      <ImageUploadButton
        content="사진 선택"
        imagePaths={imagePaths}
        error={imageUploadError}
        handleImageUpload={handleImageUpload}
      />
      <SelectAnimalType />
      <Input
        label="이름"
        type="text"
        error={errors.name}
        {...register("name", PET_NAME_VALIDATION())}
      />
      <Select
        label="선택"
        options={GENDER_TYPES}
        name="gender"
        register={register}
      />
    </form>
  );
}

export default PetRegistrationForm;
