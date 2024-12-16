"use client";

import Button from "@/components/common/Button/Button";
import ImageUploadButton from "@/components/common/Button/ImageUploadButton";
import Input from "@/components/common/Input/Input";
import {
  CONTENT_VALIDATION,
  TITLE_VALIDATION,
} from "@/constants/symptomsValidation";
import { DATE_VALIDATION } from "@/constants/weightValidation";
import useUploadImages from "@/hooks/common/useUploadImages";
import useSymptomsEditMutation from "@/hooks/symptoms/useSymptomsEditMutation";
import { useSymptomsMutation } from "@/hooks/symptoms/useSymptomsMutation";
import { symptomsUpload } from "@/service/symptoms";
import { usePetStore } from "@/zustand/usePetStore";
import { useForm } from "react-hook-form";

export type formDataType = {
  title: string;
  content: string;
  symptom_date: string;
  pet_id: string;
  images?: string;
  id?: string;
  post_id?: string;
};

function SymptomsWrite({
  isEdit = false,
  defaultValue,
}: Readonly<{
  isEdit?: boolean;
  defaultValue?: formDataType;
}>) {
  const { petId } = usePetStore();
  const { register, handleSubmit } = useForm<formDataType>({
    defaultValues: defaultValue,
  });
  const initialImg = defaultValue?.images
    ? JSON.parse(defaultValue.images)
    : [];
  const { uploadImageURLs, imagePaths, imageUploadError, handleImageUpload } =
    useUploadImages({
      type: "symptoms",
      uploadFn: symptomsUpload,
      initialPath: initialImg,
    });

  const symptomsMutation = useSymptomsMutation();
  const symptomsEditMutation = useSymptomsEditMutation();

  const handleSymptoms = (data: formDataType) => {
    try {
      const symptomsData = {
        title: data.title,
        content: data.content,
        symptom_date: data.symptom_date,
        pet_id: petId!,
        images:
          uploadImageURLs.length > 0
            ? JSON.stringify(uploadImageURLs.map((url) => `${url}`))
            : defaultValue?.images ?? "[]",
      };

      if (isEdit) {
        symptomsEditMutation.mutate({
          post_id: defaultValue?.id,
          ...symptomsData,
        });
      } else {
        symptomsMutation.mutate(symptomsData);
      }
    } catch (error) {
      console.error("증상 등록 중 오류 발생:", error);
    }
  };
  return (
    <div>
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light">
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
            content={
              imagePaths.length > 0 && uploadImageURLs.length === 0
                ? "이미지 업로드중"
                : isEdit
                ? "수정하기"
                : "등록하기"
            }
            types="lg"
            textColor="text-white"
            bgColor="bg-main-5"
            type="submit"
            disabled={imagePaths.length > 0 && uploadImageURLs.length === 0}
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
