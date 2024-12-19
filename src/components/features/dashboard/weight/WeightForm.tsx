import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import {
  DATE_VALIDATION,
  WEIGHT_VALIDATION,
} from "@/constants/weightValidation";
import { useRegistWeight } from "@/hooks/weight/useRegistWeight";
import { usePetStore } from "@/zustand/usePetStore";
import React from "react";
import { useForm } from "react-hook-form";

type WeightFormType = {
  date: string;
  weight: number;
};

function WeightForm() {
  const { petId } = usePetStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeightFormType>();

  const weightMutation = useRegistWeight();

  const handleWeight = (data: WeightFormType) => {
    weightMutation.mutate({
      weight: data.weight,
      date: data.date,
      petId: petId ?? "",
    });
  };
  return (
    <form onSubmit={handleSubmit(handleWeight)}>
      <div className="space-y-5 ">
        <Input
          label="날짜"
          type="date"
          error={errors.date}
          {...register("date", DATE_VALIDATION())}
        />
        <Input
          label="몸무게"
          type="text"
          error={errors.weight}
          unit="kg"
          {...register("weight", WEIGHT_VALIDATION())}
        />
      </div>
      <div className="mt-[1.875rem] space-y-[.625rem]">
        <Button
          type="submit"
          bgColor="bg-main-4 "
          content="등록하기"
          textColor="text-white "
          types="lg"
        />
        <Button
          type="button"
          bgColor="bg-gray-1"
          content="취소하기"
          textColor="text-gray-3"
          types="lg"
          href={"/dashboard/weightList"}
        />
      </div>
    </form>
  );
}

export default WeightForm;
