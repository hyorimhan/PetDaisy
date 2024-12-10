import { PetRegistrationType } from "@/types/petProfile";
import { handleFixedNumber } from "@/utils/format/fixedNumber";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";

export const usePetRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PetRegistrationType>();

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatValue = handleFixedNumber(e);
    setValue(
      "weight",
      isNaN(formatValue) ? 0 : formatValue < 0 ? 0 : formatValue
    );
  };

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    handleWeightChange,
  };
};
