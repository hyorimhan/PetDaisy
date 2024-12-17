"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { GENDER_TYPES, NEUTERED } from "@/constants/pet";
import {
  PET_BIRTH_VALIDATION,
  PET_GENDER_VALIDATION,
  PET_NAME_VALIDATION,
  PET_NEUTERED_VALIDATION,
  PET_WEIGHT_VALIDATION,
} from "@/constants/petRegistrationValidation";
import { PetRegistrationType } from "@/types/petProfile";
import { handleFixedWeight } from "@/utils/format/fixedWeight";
import { ChangeEvent } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SelectAnimalType from "./SelectAnimalType";

interface FormFieldsProps {
  register: UseFormRegister<PetRegistrationType>;
  errors: FieldErrors<PetRegistrationType>;
  setValue: UseFormSetValue<PetRegistrationType>;
  watch: UseFormWatch<PetRegistrationType>;
  imagePaths: string[];
  imageUploadError: string | null;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormField({
  register,
  errors,
  setValue,
  watch,
  imagePaths,
  imageUploadError,
  handleImageUpload,
}: FormFieldsProps) {
  const handleSetWeight = (e: ChangeEvent<HTMLInputElement>) => {
    const value = handleFixedWeight(e);
    setValue("weight", value);
  };
  return (
    <>
      <ImageUploadButton
        content="사진 선택"
        imagePaths={imagePaths}
        error={imageUploadError}
        handleImageUpload={handleImageUpload}
      />
      <SelectAnimalType setValue={setValue} />
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
        setValue={setValue}
      />
      <Input
        label="생일"
        type="date"
        error={errors.birth}
        max={new Date().toISOString().split("T")[0]}
        {...register("birth", PET_BIRTH_VALIDATION())}
      />
      <Input
        label="몸무게"
        type="number"
        unit="kg"
        error={errors.weight}
        {...register("weight", PET_WEIGHT_VALIDATION())}
        onChange={handleSetWeight}
        value={watch("weight") || ""}
      />
      <Select
        label="중성화 여부"
        options={NEUTERED}
        name="neutered"
        register={register}
        error={errors.neutered}
        registerOptions={PET_NEUTERED_VALIDATION()}
        setValue={setValue}
      />
      <Button
        content="등록하기"
        type="submit"
        bgColor="bg-main-5"
        textColor="text-white"
        types="lg"
      />
    </>
  );
}

export default FormField;
