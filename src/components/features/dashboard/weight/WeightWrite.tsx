"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import {
  DATE_VALIDATION,
  WEIGHT_VALIDATION,
} from "@/constants/weightValidation";
import { registerWeight } from "@/service/weight";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

type weightFormType = {
  date: string;
  weight: number;
};

function WeightWrite() {
  const { petId } = usePetStore();
  const { openModal } = useModalStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<weightFormType>();

  const weightMutation = useMutation({
    mutationFn: registerWeight,
    onSuccess: (data) => {
      openModal({
        type: "success",
        title: "몸무게 등록",
        content: data.message,
        onConfirm: () => {
          router.replace("/dashboard/weightList");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "몸무게 등록",
        content: error.message,
        onConfirm: () => {
          router.replace("/dashboard/weightList");
        },
      });
    },
  });

  const handleWeight = (data: weightFormType) => {
    weightMutation.mutate({
      weight: data.weight,
      date: data.date,
      pet_id: petId ?? "",
    });
  };

  return (
    <div>
      <div className="opacity-90 py-[1.6875rem] text-main-5 text-base font-light ">
        몸무게 등록
      </div>
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
    </div>
  );
}

export default WeightWrite;
