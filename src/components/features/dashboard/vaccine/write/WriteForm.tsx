"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { VACCINE_TYPE_LIST } from "@/constants/vaccine";
import { addVaccination } from "@/service/vaccine";
import { VaccineFormData } from "@/types/vaccine";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function WriteForm() {
  const route = useRouter();
  const petId = usePetStore((state) => state.petId) as string;
  const queryClient = useQueryClient();
  const openModal = useModalStore((state) => state.openModal);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VaccineFormData>();

  const { mutate: addVaccine } = useMutation({
    mutationFn: (data: VaccineFormData) => addVaccination(data, petId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["vaccineList"] }),
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "백신 기록 등록",
        content: response.message,
        onConfirm: () => route.push("/dashboard/vaccineList"),
      });
    },
  });

  const onSubmit = (data: VaccineFormData) => {
    addVaccine(data);
  };
  return (
    <form
      className="flex flex-col gap-[20px]"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <Input
        label="접종일"
        type="date"
        error={errors.vaccineDate}
        max={new Date().toISOString().split("T")[0]}
        {...register("vaccineDate", { required: "접종일을 입력해주세요" })}
      />
      <Input
        label="병원명"
        type="text"
        error={errors.hospitalName}
        {...register("hospitalName", {
          required: "병원 이름을 입력해주세요.",
          maxLength: 20,
        })}
      />
      <Select
        label="종류"
        options={VACCINE_TYPE_LIST}
        name="vaccineName"
        register={register}
        error={errors.vaccineName}
        registerOptions={{ required: "접종하신 백신을 선택해주세요" }}
        setValue={setValue}
      />
      <Input
        label="메모"
        type="text"
        error={errors.note}
        {...register("note", { maxLength: 50 })}
      />
      <Input
        label="접종비"
        type="number"
        error={errors.price}
        {...register("price", {
          required: "비용을 입력해주세요",
          max: 999999999,
          min: 0,
        })}
        unit="원"
      />
      <div className="space-y-[10px]">
        <Button
          content="등록하기"
          types="lg"
          type="submit"
          bgColor="bg-main-5"
          textColor="text-white"
        />
        <Button
          content="취소하기"
          types="lg"
          href="/dashboard/vaccineList"
          bgColor="bg-gray-1"
          textColor="text-gray-3"
        />
      </div>
    </form>
  );
}

export default WriteForm;
