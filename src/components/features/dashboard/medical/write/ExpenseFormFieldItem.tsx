import Input from "@/components/common/Input/Input";
import {
  MEDICAL_EXPENSES_PRICE_VALIDATION,
  MEDICAL_EXPENSES_SERVICE_VALIDATION,
} from "@/constants/medicalValidation";
import { MedicalFormValues } from "@/types/medical";
import { FieldErrors, useFormContext } from "react-hook-form";
interface ExpenseFormFieldItemProps {
  index: number;
  remove: (index: number) => void;
  error: FieldErrors<MedicalFormValues>;
}
function ExpenseFormFieldItem({
  index,
  remove,
  error,
}: ExpenseFormFieldItemProps) {
  const { register } = useFormContext();
  const { setValue } = useFormContext();

  const handleRemoveItem = (index: number) => {
    if (index > 0) {
      remove(index);
    }
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setValue(`expenses.${index}.price`, value);
  };
  return (
    <div className="relative">
      <div className="w-full flex items-start gap-3">
        <Input
          type="text"
          label="진료 항목"
          {...register(
            `expenses.${index}.service`,
            MEDICAL_EXPENSES_SERVICE_VALIDATION()
          )}
          error={error.expenses?.[index]?.service}
        />
        <Input
          type="number"
          label="진료비"
          {...register(
            `expenses.${index}.price`,
            MEDICAL_EXPENSES_PRICE_VALIDATION()
          )}
          unit="원"
          error={error.expenses?.[index]?.price}
          onChange={(e) => handlePriceChange(e)}
        />
      </div>
      {index > 0 && (
        <button
          type="button"
          onClick={() => handleRemoveItem(index)}
          className="absolute -bottom-6 right-0 text-gray-3 text-[12px]"
        >
          삭제
        </button>
      )}
    </div>
  );
}

export default ExpenseFormFieldItem;
