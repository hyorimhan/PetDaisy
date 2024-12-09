"use client";
import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import useUploadImages from "@/hooks/useUploadImages";
import { symptomsImageUpload } from "@/service/symptoms";
import React from "react";

function SymptomsWrite() {
  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "symptoms",
      uploadFn: symptomsImageUpload,
    });

  return (
    <div>
      <div className="opacity-90 text-main-5 text-base font-light ">
        진료 기록
      </div>
      <Input type="date" label="날짜" />
      <Input
        type="text"
        label="제목"
        placeholder="증상에 대해 간략히 적어주세요"
      />
      <Input
        type="text"
        label="내용"
        placeholder="증상에 대한 상세한 내용을 적어주세요"
        className="h-[147px] w-full align-top"
      />
      <ImageUploadButton
        content="사진 선택"
        imagePaths={imagePaths}
        error={imageUploadError}
        handleImageUpload={handleImageUpload}
      />

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
  );
}

export default SymptomsWrite;
