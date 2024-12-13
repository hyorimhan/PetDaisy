"use client";
import Button from "@/components/common/Button/Button";
import PageTitle from "@/components/common/Page/PageTitle";
import { useGetMedicalDetail } from "@/hooks/useGetMedicalDetail";
import { useGetMedicalExpenses } from "@/hooks/useGetMedicalExpenses";
import { updateMedicalVisit } from "@/service/medical";
import { MedicalFormValues } from "@/types/medical";
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

  const { details } = useGetMedicalDetail(visitId);
  const { medicalExpenses } = useGetMedicalExpenses(visitId);

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
  const { setValue } = method;

  useEffect(() => {
    if (details) {
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["medicalList"] }),
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

export default EditForm;
