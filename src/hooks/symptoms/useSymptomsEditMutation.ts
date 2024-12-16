"use client";
import { editSymptoms } from "@/service/symptoms";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useSymptomsEditMutation() {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation({
    mutationFn: editSymptoms,
    onSuccess: () => {
      openModal({
        type: "success",
        title: "관찰 기록",
        content: "수정에 성공했습니다.",
        onConfirm: () => {
          router.replace("/dashboard/symptomsList");
        },
      });
    },
    onError: () => {
      openModal({
        type: "error",
        title: "오류",
        content: "수정에 실패했습니다",
        onConfirm: () => {
          router.replace("/dashboard/symptomsList");
        },
      });
    },
  });
}

export default useSymptomsEditMutation;
