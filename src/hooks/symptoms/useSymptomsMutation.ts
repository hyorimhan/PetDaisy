import { symptomsRegist } from "@/service/symptoms";
import useModalStore from "@/zustand/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSymptomsMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: symptomsRegist,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["symptomsData"] }),
    onSuccess: () => {
      openModal({
        type: "success",
        title: "관찰 기록",
        content: "등록에 성공했습니다.",
        onConfirm: () => {
          router.replace("/dashboard/symptomsList");
        },
      });
    },
    onError: () => {
      openModal({
        type: "error",
        title: "오류",
        content: "등록에 실패했습니다",
        onConfirm: () => {
          router.replace("/dashboard/symptomsList");
        },
      });
    },
  });
};
