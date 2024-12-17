import { PetRegistrationType } from "@/types/petProfile";
import { useForm } from "react-hook-form";

export const usePetRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PetRegistrationType>();

  return {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
  };
};
