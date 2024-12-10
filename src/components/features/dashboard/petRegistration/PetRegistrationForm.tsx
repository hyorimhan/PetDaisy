"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { DEFAULT_PET_IMAGE, GENDER_TYPES, NEUTERED } from "@/constants/pet";
import {
  PET_BIRTH_VALIDATION,
  PET_GENDER_VALIDATION,
  PET_NAME_VALIDATION,
  PET_NEUTERED_VALIDATION,
  PET_WEIGHT_VALIDATION,
} from "@/constants/petRegistrationValidation";
import useUploadImages from "@/hooks/useUploadImages";
import { registPetProfile, uploadPetImages } from "@/service/petProfile";
import { PetProfile, PetRegistrationType } from "@/types/petProfile";
import { handleFixedNumber } from "@/utils/format/fixedNumber";
import { useAuthStore } from "@/zustand/useAuthStore";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import SelectAnimalType from "./SelectAnimalType";

function PetRegistrationForm() {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const user = useAuthStore((state) => state.user);

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
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "회원가입 성공",
        content: response.masseage,
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "회원가입 실패",
        content: error.message,
        onConfirm: () => {},
      });
    },
  });

  const handleAnimalRegist = (data: PetRegistrationType) => {
    const petData = {
      user_id: user?.id as string,
      name: data.name,
      gender: data.gender,
      birth_date: data.birth,
      weight: data.weight,
      neutered: data.neutered,
      images:
        uploadImageURLs.length !== 0 ? uploadImageURLs : [DEFAULT_PET_IMAGE],
      animal_type: data.animalType,
    };
    registPet(petData);
  };

  const handleError = (errors: FieldErrors) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) alert(error.message);
    });
  };

  return (
    <form
      className="flex flex-col gap-5 pb-[130px]"
      onSubmit={handleSubmit((data) => handleAnimalRegist(data), handleError)}
    >
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
    </form>
  );
}

export default PetRegistrationForm;
