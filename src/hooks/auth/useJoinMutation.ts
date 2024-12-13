import { handleJoin } from "@/service/auth";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useJoinMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation({
    mutationFn: handleJoin,
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "회원가입 성공",
        content: response.message,
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "회원가입 실패",
        content: error.message,
        onConfirm: () => {},
      });
    },
  });
};
