import { deleteSymptoms } from "@/service/symptoms";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

function useDeleteSymptoms() {
  const { petId } = usePetStore();
  const { openModal } = useModalStore();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (postId: string) => deleteSymptoms(petId ?? "", postId),
    onSuccess: () =>
      openModal({
        type: "success",
        content: "관찰 기록 삭제",
        onConfirm: () => {
          router.replace("/dashboard/symptomsList");
        },
      }),
  });

  const handleDeleteSymptoms = (postId: string) => {
    openModal({
      type: "warning",
      content: "기록을 삭제하시겠습니까",
      isTwoButton: true,
      onConfirm: () => {
        mutation.mutate(postId);
      },
      onCancel: () => {},
    });
  };

  return {
    handleDeleteSymptoms,
  };
}

export default useDeleteSymptoms;
