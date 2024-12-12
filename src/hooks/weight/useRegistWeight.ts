import { registerWeight } from "@/service/weight";
import useModalStore from "@/zustand/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useRegistWeight = () => {
  const { openModal } = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: registerWeight,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["weightData"],
      });
      openModal({
        type: "success",
        title: "몸무게 등록",
        content: data.message,
        onConfirm: () => {
          router.replace("/dashboard/weightList");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "몸무게 등록",
        content: error.message,
        onConfirm: () => {
          router.replace("/dashboard/weightList");
        },
      });
    },
  });
};
