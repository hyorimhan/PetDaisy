"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { WEIGHT_DATE_VALIDATION, WEIGHT_VALIDATION } from "@/constants/weight";
import { registerWeight } from "@/service/weight";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

type weightFormType = {
  date: string;
  weight: number;
};

function WeightWrite() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<weightFormType>();

  const weightMutation = useMutation({
    mutationFn: registerWeight,
    onSuccess: (data) => {
      alert(data.message);
      reset();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleWeight = (data: weightFormType) => {
    weightMutation.mutate({
      weight: data.weight,
      date: data.date,
      pet_id: "pet_id",
    });
  };

  // const handleRegisterWeight = async ({ weight, date, pet_id }) => {
  //   const response = await registerWeight({ weight, date, pet_id });
  //   if (response) {
  //     alert(response.message);
  //   }
  // };
  return (
    <div>
      <span>몸무게 등록</span>
      <form onSubmit={handleSubmit(handleWeight)}>
        <Input
          label="날짜"
          type="date"
          error={errors.date}
          {...register("date", WEIGHT_DATE_VALIDATION())}
        />
        <Input
          label="몸무게"
          type="text"
          error={errors.weight}
          unit="kg"
          {...register("weight", WEIGHT_VALIDATION())}
        />
        <Button
          type="submit"
          bgColor="bg-main-4"
          content="등록하기"
          textColor="text-white"
          types="lg"
        />
        <Button
          type="button"
          bgColor="bg-main-4"
          content="취소하기"
          textColor="text-white"
          types="lg"
          href={"/dashboard/weightList"}
        />
      </form>
    </div>
  );
}

export default WeightWrite;
