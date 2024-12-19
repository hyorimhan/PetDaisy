import { logout } from "@/service/auth";
import { useAuthStore } from "@/zustand/useAuthStore";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const { saveUser } = useAuthStore();
  const { resetPet } = usePetStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "로그아웃 성공",
        content: response.message,
        onConfirm: () => {
          router.replace("/");
          saveUser(null);
          resetPet();
          queryClient.clear();
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
          resetPet();
        },
      });
    },
  });
};
