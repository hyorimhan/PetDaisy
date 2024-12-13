"use client";
import Button from "@/components/common/Button/Button";
import { MedicalFormValues } from "@/types/medical";
import { FieldErrors, useFieldArray, useFormContext } from "react-hook-form";
import ExpenseFormFieldItem from "./ExpenseFormFieldItem";

interface ExpenseFormFieldProps {
  error: FieldErrors<MedicalFormValues>;
}
function ExpenseFormField({ error }: ExpenseFormFieldProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "expenses",
  });

  const handleAddList = () => {
    append({ service: "", price: 0 });
  };

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col w-full gap-[30px]">
        {fields.map((field, index) => (
          <li key={field.id}>
            <ExpenseFormFieldItem index={index} remove={remove} error={error} />
          </li>
        ))}
      </ul>
      <Button
        content="병원비 내역 추가하기"
        types="addInfo"
        onClick={handleAddList}
        type="button"
      />
    </div>
  );
}

export default ExpenseFormField;
