"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { GENDER_TYPES, IS_NEUTERED } from "@/constants/pet";
import {
  PET_BIRTH_VALIDATION,
  PET_GENDER_VALIDATION,
  PET_NAME_VALIDATION,
  PET_NEUTERED_VALIDATION,
  PET_WEIGHT_VALIDATION,
} from "@/constants/petRegistrationValidation";
import useUploadImages from "@/hooks/useUploadImages";
import { registPetProfile, uploadPetImages } from "@/service/petProfile";
import { PetProfile } from "@/types/petProfile";
import { handleFixedNumber } from "@/utils/format/fixedNumber";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import SelectAnimalType from "./SelectAnimalType";

type PetRegistrationType = {
  name: string;
  gender: string;
  birth: string;
  weight: number;
  isNeutered: boolean;
};

function PetRegistrationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PetRegistrationType>();

  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "pet-profiles",
      uploadFn: uploadPetImages,
    });

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatValue = handleFixedNumber(e);
    setValue("weight", isNaN(formatValue) ? 0 : formatValue); //
  };

  const { mutate: registPet } = useMutation({
    mutationFn: (petData: PetProfile) => registPetProfile(petData),
  });

  const handleAnimalRegist = () => {
    const petData = {
      name: watch("name"),
      gender: watch("gender"),
      birth_date: watch("birth"),
      weight: watch("weight"),
      neutered: watch("isNeutered"),
      images: JSON.stringify(uploadImageURLs),
    };

    registPet(petData);
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
        label="성별"
        options={GENDER_TYPES}
        name="gender"
        register={register}
        error={errors.gender}
        registerOptions={PET_GENDER_VALIDATION()}
      />
      <Input
        label="생일"
        type="date"
        error={errors.birth}
        {...register("birth", PET_BIRTH_VALIDATION())}
      />
      <Input
        label="몸무게"
        type="number"
        unit="kg"
        error={errors.weight}
        {...register("weight", PET_WEIGHT_VALIDATION())}
        onChange={handleWeightChange}
        value={watch("weight") || ""}
      />
      <Select
        label="중성화 여부"
        options={IS_NEUTERED}
        name="isNeutered"
        register={register}
        error={errors.isNeutered}
        registerOptions={PET_NEUTERED_VALIDATION()}
      />
      <Button
        content="등록하기"
        type="submit"
        bgColor="bg-main-5"
        textColor="text-white"
        types="lg"
      />
    </form>
  );
}

export default PetRegistrationForm;
