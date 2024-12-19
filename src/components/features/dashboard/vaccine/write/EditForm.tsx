"use client";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";
import { VACCINE_TYPE_LIST } from "@/constants/vaccine";
import { useGetVaccineList } from "@/hooks/vaccine/useGetVaccineList";
import { updateVaccination } from "@/service/vaccine";
import { UpdataVaccineData, VaccineFormData } from "@/types/vaccine";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditFormProps {
  vaccineId: string;
}
function EditForm({ vaccineId }: EditFormProps) {
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

  const { vaccinations } = useGetVaccineList(petId);

  const vaccineDetail = vaccinations?.data.find(
    (vaccine) => vaccine.id === vaccineId
  );

  useEffect(() => {
    if (vaccineDetail) {
      setValue("vaccineDate", vaccineDetail.vaccination_date);
      setValue("hospitalName", vaccineDetail.hospital_name);
      setValue("note", vaccineDetail.note || "");
      setValue("price", vaccineDetail.price);
    }
  }, [vaccinations, setValue, vaccineDetail]);

  const { mutate: addVaccine } = useMutation({
    mutationFn: (data: UpdataVaccineData) => updateVaccination(data, petId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["vaccineList"] }),
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "기록 수정 완료",
        content: response.message,
        onConfirm: () => route.push("/dashboard/vaccineList"),
      });
    },
  });

  const onSubmit = (data: VaccineFormData) => {
    const vaccineData = {
      id: vaccineDetail?.id as string,
      ...data,
    };
    addVaccine(vaccineData);
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
        placeholder="병원 이름을 입력해주세요."
        {...register("hospitalName", { required: "병원 이름을 입력해주세요." })}
      />
      <Select
        label="종류"
        options={VACCINE_TYPE_LIST}
        name="vaccineName"
        register={register}
        error={errors.vaccineName}
        registerOptions={{ required: "접종하신 백신을 선택해주세요" }}
        setValue={setValue}
        defaultValue={vaccineDetail?.vaccine_name}
      />
      <Input
        label="메모"
        type="text"
        error={errors.note}
        {...register("note")}
        placeholder="간단한 참고 내용을 입력해주세요."
      />
      <Input
        label="접종비"
        type="number"
        error={errors.price}
        {...register("price", { required: "비용을 입력해주세요" })}
        unit="원"
      />
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
    </form>
  );
}

export default EditForm;
