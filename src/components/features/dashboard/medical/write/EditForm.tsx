"use client";
import Button from "@/components/common/Button/Button";
import PageTitle from "@/components/common/Page/PageTitle";
import { useGetMedicalDetail } from "@/hooks/medical/useGetMedicalDetail";
import { useGetMedicalExpenses } from "@/hooks/medical/useGetMedicalExpenses";
import { updateMedicalVisit } from "@/service/medical";
import { MedicalFormValues } from "@/types/medical";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DetailFormField from "./DetailFormField";
import ExpenseFormField from "./ExpenseFormField";

interface EditFormProps {
  visitId: string;
}

function EditForm({ visitId }: EditFormProps) {
  const route = useRouter();
  const queryClient = useQueryClient();
  const petId = usePetStore((state) => state.petId) as string;
  const openModal = useModalStore((state) => state.openModal);

  const { details } = useGetMedicalDetail(visitId);
  const { medicalExpenses } = useGetMedicalExpenses(visitId);

  const method = useForm({
    defaultValues: {
      id: "",
      title: "",
      visitDate: "",
      hospitalName: "",
      content: "",
      nextVisitDate: "",
      expenses: [
        {
          service: "",
          price: 0,
        },
        {
          service: "",
          price: 0,
        },
        {
          service: "",
          price: 0,
        },
      ],
    },
  });
  const { setValue } = method;

  useEffect(() => {
    if (details) {
      setValue("id", details.id);
      setValue("title", details.title);
      setValue("visitDate", details.visit_date);
      setValue("hospitalName", details.hospital_name);
      setValue("content", details.content);
      if (details.next_visit_date)
        setValue("nextVisitDate", details.next_visit_date);
    }
    if (medicalExpenses) {
      setValue("expenses", medicalExpenses);
    }
  }, [details, medicalExpenses]);

  const { mutate: updateMedical } = useMutation({
    mutationFn: (data: MedicalFormValues) => updateMedicalVisit(data, petId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["medicalList"] }),
    onSuccess: () => {
      openModal({
        type: "success",
        title: "진료 기록 수정",
        content: "진료 기록이 성공적으로 수정되었습니다.",
        onConfirm: () => route.push("/dashboard/medicalList"),
      });
    },
  });

  const onSubmit = () => {
    const data = method.getValues();

    const filteredExpenses = data.expenses.filter(
      (expense) => !(expense.service === "" && expense.price === 0)
    );

    const submissionData = {
      ...data,
      expenses: filteredExpenses,
    };

    updateMedical(submissionData);
  };
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(onSubmit)}>
        <PageTitle title="진료 기록" />
        <DetailFormField error={method.formState.errors} />
        <PageTitle title="병원비 내역" />
        <ExpenseFormField error={method.formState.errors} />
        <div className="my-[30px] flex flex-col gap-[10px]">
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
            href="/dashboard/medicalList"
            bgColor="bg-gray-1"
            textColor="text-gray-3"
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default EditForm;
