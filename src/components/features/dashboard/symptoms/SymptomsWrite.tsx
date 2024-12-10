"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import {
  CONTENT_VALIDATION,
  TITLE_VALIDATION,
} from "@/constants/symptomsValidation";
import { DATE_VALIDATION } from "@/constants/weightValidation";
import useUploadImages from "@/hooks/useUploadImages";
import { symptomsUpload } from "@/service/symptoms";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

function SymptomsWrite() {
  const { register, handleSubmit } = useForm();
  const { openModal } = useModalStore();
  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "symptoms",
      uploadFn: symptomsUpload,
    });

  const symptomsMutation = useMutation({
    mutationFn: symptomsUpload,
    onSuccess: () => {
      openModal({
        type: "success",
        title: "관찰 기록",
        content: "등록에 성공했습니다.",
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: () => {
      openModal({
        type: "error",
        title: "오류",
        content: "등록에 실패했습니다",
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
  });

  const handleSymptoms = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.content);
    formData.append("date", data.date);
    formData.append("pet_id", data.pet_id);
    uploadImageURLs.forEach((image) => formData.append("image", image));
    symptomsMutation.mutate(formData);
  };

  return (
    <div>
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light ">
        진료 기록
      </div>
      <form onSubmit={handleSubmit(handleSymptoms)}>
        <div className="space-y-3">
          <Input
            label="날짜"
            type="date"
            {...register("date", DATE_VALIDATION())}
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
