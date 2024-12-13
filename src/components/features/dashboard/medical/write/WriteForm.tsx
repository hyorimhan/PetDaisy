"use client";
import Button from "@/components/common/Button/Button";
import PageTitle from "@/components/common/Page/PageTitle";
import { addMedicalVisit } from "@/service/medical";
import { MedicalFormValues } from "@/types/medical";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import DetailFormField from "./DetailFormField";
import ExpenseFormField from "./ExpenseFormField";

function WriteForm() {
  const route = useRouter();
  const queryClient = useQueryClient();
  const petId = usePetStore((state) => state.petId) as string;
  const method = useForm({
    defaultValues: {
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

  const { mutate: addMedical } = useMutation({
    mutationFn: (data: MedicalFormValues) => addMedicalVisit(data, petId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["medicalList", petId] }),
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

    addMedical(submissionData);
    route.push("/dashboard/medicalList");
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

export default WriteForm;
