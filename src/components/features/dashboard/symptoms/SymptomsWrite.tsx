"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import {
  CONTENT_VALIDATION,
  TITLE_VALIDATION,
} from "@/constants/symptomsValidation";
import { DATE_VALIDATION } from "@/constants/weightValidation";
import { useSymptomsMutation } from "@/hooks/symptoms/useSymptomsMutation";
import useUploadImages from "@/hooks/useUploadImages";
import { symptomsUpload } from "@/service/symptoms";
import { usePetStore } from "@/zustand/usePetStore";

import React from "react";
import { useForm } from "react-hook-form";

export type formDataType = {
  title: string;
  content: string;
  symptom_date: string;
  pet_id: string;
  images?: string;
};

function SymptomsWrite() {
  const { petId } = usePetStore();
  const { register, handleSubmit } = useForm<formDataType>();
  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "symptoms",
      uploadFn: symptomsUpload,
    });
  console.log("uploadImageURLs:", uploadImageURLs);
  console.log("imagePaths:", imagePaths);
  const symptomsMutation = useSymptomsMutation();

  const handleSymptoms = (data: formDataType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("symptom_date", data.symptom_date);
    formData.append("pet_id", petId!);
    formData.append(
      "images",
      uploadImageURLs.length !== 0 ? JSON.stringify(uploadImageURLs) : ""
    );
    symptomsMutation.mutate(formData);
  };

  return (
    <div>
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light ">
        관찰 기록
      </div>
      <form onSubmit={handleSubmit(handleSymptoms)}>
        <div className="space-y-3">
          <Input
            label="날짜"
            type="date"
            {...register("symptom_date", DATE_VALIDATION())}
          />
          <Input
            label="제목"
            type="text"
            placeholder="증상에 대해 간략히 적어주세요"
            {...register("title", TITLE_VALIDATION())}
          />
          <Input
            label="내용"
            type="text"
            placeholder="증상에 대한 상세한 내용을 적어주세요"
            {...register("content", CONTENT_VALIDATION())}
          />

          <ImageUploadButton
            content="사진 선택"
            imagePaths={imagePaths}
            error={imageUploadError}
            handleImageUpload={handleImageUpload}
          />
        </div>
        <div className="mt-[1.875rem] space-y-[.625rem]">
          <Button
            content="등록하기"
            types="lg"
            textColor="text-white"
            bgColor="bg-main-5"
            type="submit"
          />
          <Button
            content="취소하기"
            types="lg"
            textColor="text-gray-3"
            bgColor="bg-gray-1"
            type="button"
            href={"/dashboard/symptomsList"}
          />
        </div>
      </form>
    </div>
  );
}

export default SymptomsWrite;
