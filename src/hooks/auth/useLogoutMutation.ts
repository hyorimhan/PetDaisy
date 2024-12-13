import { logout } from "@/service/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import useModalStore from "@/zustand/useModalStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const { saveUser } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      saveUser(null);
      openModal({
        type: "success",
        title: "로그아웃 성공",
        content: response.message,
        onConfirm: () => {
          router.replace("/");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "로그아웃 실패",
        content: error.message,
        onConfirm: () => {
          router.replace("/");
        },
      });
    },
  });
};
