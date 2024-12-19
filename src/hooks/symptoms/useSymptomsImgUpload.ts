import { symptomsUpload } from "@/service/symptoms";
import { usePetStore } from "@/zustand/usePetStore";

import { useForm } from "react-hook-form";
import useUploadImages from "../common/useUploadImages";
import useSymptomsEditMutation from "./useSymptomsEditMutation";
import { useSymptomsMutation } from "./useSymptomsMutation";
import { FormDataType } from "@/components/features/dashboard/symptoms/SymptomsWrite";

function useSymptomsImgUpload({
  defaultValue,
  isEdit,
}: {
  defaultValue?: FormDataType;
  isEdit: boolean;
}) {
  const { petId } = usePetStore();
  const form = useForm<FormDataType>({
    defaultValues: defaultValue,
  });
  const initialImg = defaultValue?.images
    ? JSON.parse(defaultValue.images)
    : [];
  const imageUpload = useUploadImages({
    type: "symptoms",
    uploadFn: symptomsUpload,
    initialPath: initialImg,
  });

  const symptomsMutation = useSymptomsMutation();
  const symptomsEditMutation = useSymptomsEditMutation();

  const handleSymptoms = (data: FormDataType) => {
    try {
      const symptomsData = {
        title: data.title,
        content: data.content,
        symptom_date: data.symptom_date,
        petId: petId ?? "",
        images:
          imageUpload.uploadImageURLs.length > 0
            ? JSON.stringify(imageUpload.uploadImageURLs.map((url) => `${url}`))
            : defaultValue?.images ?? "[]",
      };

      if (isEdit) {
        symptomsEditMutation.mutate({
          postId: defaultValue?.id,
          ...symptomsData,
        });
      } else {
        symptomsMutation.mutate(symptomsData);
      }
    } catch (error) {
      console.error("증상 등록 중 오류 발생:", error);
    }
  };
  return {
    handleSymptoms,
    form,
    imageUpload,
  };
}

export default useSymptomsImgUpload;
