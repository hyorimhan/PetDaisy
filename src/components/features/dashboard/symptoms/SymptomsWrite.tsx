"use client";

import SymptomForm from "./SymptomForm";

export type FormDataType = {
  title: string;
  content: string;
  symptom_date: string;
  petId: string;
  images?: string;
  id?: string;
  postId?: string;
};

function SymptomsWrite({
  isEdit = false,
  defaultValue,
}: Readonly<{
  isEdit?: boolean;
  defaultValue?: FormDataType;
}>) {
  return (
    <div>
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light">
        관찰 기록
      </div>
      <SymptomForm isEdit={isEdit} defaultValue={defaultValue} />
    </div>
  );
}

export default SymptomsWrite;
