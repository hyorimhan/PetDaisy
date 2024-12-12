import { handleLogin } from "@/service/auth";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      openModal({
        type: "success",
        title: "로그인 성공",
        content: "로그인에 성공했습니다.",
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "로그인 실패",
        content: "로그인에 실패했습니다.",
        onConfirm: () => {
          alert(error.message);
        },
      });
    },
  });
};
