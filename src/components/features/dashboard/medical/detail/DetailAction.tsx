"use client";
import Button from "@/components/common/Button/Button";
import { deleteMedicalVisit } from "@/service/medical";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function DetailAction({ visitId }: { visitId: string }) {
  const petId = usePetStore((state) => state.petId) as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const openModal = useModalStore((state) => state.openModal);

  const { mutate: deleteVisit } = useMutation({
    mutationFn: (visitId: string) => deleteMedicalVisit(visitId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["medicalList", petId] }),
    onSettled: (data) => {
      openModal({
        type: "warning",
        title: "삭제 완료",
        content: data,
        onConfirm: () => {
          router.replace("/dashboard/medicalList");
        },
      });
    },
  });
  const handleDeleteVisit = (visitId: string) => {
    deleteVisit(visitId);
  };
  return (
    <div className="flex flex-col gap-[10px] my-[30px]">
      <Button
        types="lg"
        bgColor="bg-yellow-5"
        content="수정하기"
        textColor="text-white"
        href={`/dashboard/medicalWrite/${visitId}`}
      />
      <Button
        types="lg"
        bgColor="bg-gray-1"
        textColor="text-gray-3"
        content="삭제하기"
        onClick={() => handleDeleteVisit(visitId)}
      />
      <Button
        types="lg"
        bgColor="bg-gray-1"
        textColor="text-gray-3"
        content="목록으로 이동"
        href="/dashboard/medicalList"
      />
    </div>
  );
}

export default DetailAction;
