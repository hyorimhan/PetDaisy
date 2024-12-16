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
  const closeModal = useModalStore((state) => state.closeModal);

  const { mutate: deleteVisit } = useMutation({
    mutationFn: (visitId: string) => deleteMedicalVisit(visitId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["medicalList", petId] }),
  });
  const handleDeleteVisit = (visitId: string) => {
    openModal({
      type: "warning",
      title: "진료 기록 삭제",
      content: "해당 진료 기록을 삭제하시겠습니까?",
      isTwoButton: true,
      onCancel: () => closeModal(),
      onConfirm: () => {
        deleteVisit(visitId);
        closeModal();
        router.push("/dashboard/medicalList");
      },
    });
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
