import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import {
  TITLE_VALIDATION,
  CONTENT_VALIDATION,
} from "@/constants/symptomsValidation";
import { DATE_VALIDATION } from "@/constants/weightValidation";
import React from "react";
import useSymptomsImgUpload from "@/hooks/symptoms/useSymptomsImgUpload";
import { FormDataType } from "./SymptomsWrite";

function SymptomForm({
  isEdit,
  defaultValue,
}: Readonly<{
  isEdit: boolean;
  defaultValue?: FormDataType;
}>) {
  const { form, imageUpload, handleSymptoms } = useSymptomsImgUpload({
    isEdit,
    defaultValue,
  });

  return (
    <form onSubmit={form.handleSubmit(handleSymptoms)}>
      <div className="space-y-3">
        <Input
          label="날짜"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          {...form.register("symptom_date", DATE_VALIDATION())}
        />
        <Input
          label="제목"
          type="text"
          placeholder="증상에 대해 간략히 적어주세요"
          {...form.register("title", TITLE_VALIDATION())}
        />
        <Input
          label="내용"
          type="textarea"
          placeholder="증상에 대한 상세한 내용을 적어주세요"
          {...form.register("content", CONTENT_VALIDATION())}
        />

        <ImageUploadButton
          content="사진 선택"
          imagePaths={imageUpload.imagePaths}
          error={imageUpload.imageUploadError}
          handleImageUpload={imageUpload.handleImageUpload}
        />
      </div>
      <div className="mt-[1.875rem] space-y-[.625rem]">
        <Button
          content={
            imageUpload.imagePaths.length > 0 &&
            imageUpload.uploadImageURLs.length === 0
              ? "이미지 업로드중"
              : isEdit
              ? "수정하기"
              : "등록하기"
          }
          types="lg"
          textColor="text-white"
          bgColor="bg-main-5"
          type="submit"
          disabled={
            imageUpload.imagePaths.length > 0 &&
            imageUpload.uploadImageURLs.length === 0
          }
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
  );
}

export default SymptomForm;
