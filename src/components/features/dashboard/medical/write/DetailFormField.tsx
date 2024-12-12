import Input from "@/components/common/Input/Input";
import {
  MEDICAL_CONTENT_VALIDATION,
  MEDICAL_DATE_VALIDATION,
  MEDICAL_HOSPITAL_VALIDATION,
  MEDICAL_TITLE_VALIDATION,
} from "@/constants/medicalValidation";
import { MedicalFormValues } from "@/types/medical";
import { FieldErrors, useFormContext } from "react-hook-form";

interface DetailFormFieldProps {
  error: FieldErrors<MedicalFormValues>;
}
function DetailFormField({ error }: DetailFormFieldProps) {
  const { register } = useFormContext();

  return (
    <>
      <div className="flex flex-col gap-5">
        <Input
          label="날짜"
          type="date"
          error={error.visitDate}
          max={new Date().toISOString().split("T")[0]}
          {...register("visitDate", MEDICAL_DATE_VALIDATION())}
        />
        <Input
          label="병원명"
          type="text"
          error={error.hospitalName}
          {...register("hospitalName", MEDICAL_HOSPITAL_VALIDATION())}
        />
        <Input
          label="제목"
          type="text"
          error={error.title}
          {...register("title", MEDICAL_TITLE_VALIDATION())}
        />
        <Input
          label="내용"
          type="textarea"
          error={error.content}
          {...register("content", MEDICAL_CONTENT_VALIDATION())}
        />
        <Input
          label="다음 방문 일정"
          type="date"
          error={error.nextVisitDate}
          {...register("nextVisitDate")}
        />
      </div>
    </>
  );
}

export default DetailFormField;
