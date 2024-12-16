import { handleLogin } from "@/service/auth";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation({
    mutationFn: handleLogin,
    onSuccess: (response) => {
      console.log("응답", response);
      if (
        response.message === "해당 계정은 존재하지 않습니다. 다시 확인해주세요"
      ) {
        openModal({
          type: "error",
          title: "로그인 실패",
          content: response.message,
          onConfirm: () => {
            router.replace("/join");
          },
        });
        return;
      }
      openModal({
        type: "success",
        title: "로그인 성공",
        content: response.message,
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
