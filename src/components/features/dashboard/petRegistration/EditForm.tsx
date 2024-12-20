"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { DEFAULT_PET_IMAGE, GENDER_TYPES, NEUTERED } from "@/constants/pet";
import {
  PET_BIRTH_VALIDATION,
  PET_GENDER_VALIDATION,
  PET_NEUTERED_VALIDATION,
  PET_WEIGHT_VALIDATION,
} from "@/constants/petRegistrationValidation";
import useUploadImages from "@/hooks/common/useUploadImages";
import { useGetPetProfile } from "@/hooks/profile/useGetPetProfile";
import { usePetRegistrationForm } from "@/hooks/profile/usePetRegistrationForm";
import { usePetUpdate } from "@/hooks/profile/usePetUpdate";
import { uploadPetImages } from "@/service/petProfile";
import { PetUpdateType } from "@/types/petProfile";
import { handleFixedWeight } from "@/utils/format/fixedWeight";
import { ChangeEvent, useEffect } from "react";
import SelectAnimalType from "./SelectAnimalType";

interface EditFormProps {
  petId: string;
}
function EditForm({ petId }: EditFormProps) {
  const { details } = useGetPetProfile(petId);

  const { register, handleSubmit, setValue, watch, errors } =
    usePetRegistrationForm();

  useEffect(() => {
    if (details) {
      setValue("animalType", details.animal_type);
      setValue("name", details.pet_list.name);
      setValue("birth", details.birth_date);
      setValue("gender", details.gender);
      setValue("weight", details.weight);
      setValue("neutered", details.neutered);
    }
  }, [details, setValue]);

  const initialImg = details && JSON.parse(details.images);

  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "pet-profiles",
      uploadFn: uploadPetImages,
      initialPath: initialImg,
    });

  const handleSetWeight = (e: ChangeEvent<HTMLInputElement>) => {
    const value = handleFixedWeight(e);
    setValue("weight", value);
  };

  const { mutate: updatePet } = usePetUpdate();

  const handleAnimalUpdate = (data: PetUpdateType) => {
    const petData = {
      gender: data.gender,
      birth: data.birth,
      weight: String(Number(data.weight).toFixed(2)),
      neutered: data.neutered,
      images:
        uploadImageURLs.length !== 0
          ? JSON.stringify(uploadImageURLs)
          : JSON.stringify([DEFAULT_PET_IMAGE]),
      animalType: data.animalType,
    };
    updatePet(petData);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => handleAnimalUpdate(data))}
      className="flex flex-col gap-5 pb-[130px]"
    >
      <ImageUploadButton
        content="사진 선택"
        imagePaths={imagePaths}
        error={imageUploadError}
        handleImageUpload={handleImageUpload}
      />
      <SelectAnimalType
        setValue={setValue}
        defaultValue={details?.animal_type}
      />
      <Select
        label="성별"
        options={GENDER_TYPES}
        name="gender"
        register={register}
        error={errors.gender}
        registerOptions={PET_GENDER_VALIDATION()}
        setValue={setValue}
        defaultValue={details?.gender}
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
        defaultValue={details?.neutered}
      />
      <Button
        content="수정하기"
        type="submit"
        bgColor="bg-main-5"
        textColor="text-white"
        types="lg"
      />
    </form>
  );
}

export default EditForm;
