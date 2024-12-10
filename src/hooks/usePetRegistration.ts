import { registPetProfile } from "@/service/petProfile";
import { PetDetails } from "@/types/petProfile";
import useModalStore from "@/zustand/useModalStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePetRegistration = (userId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);

  return useMutation({
    mutationFn: (petData: PetDetails) => registPetProfile(petData),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["petList", userId] }),
    onSuccess: () => {
      openModal({
        type: "success",
        title: "반려동물 등록 성공",
        content: "반려동물이 성공적으로 등록 되었습니다.",
        onConfirm: () => router.replace("/dashboard"),
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "반려동물 등록 실패",
        content: error.message,
        onConfirm: () => router.replace("/dashboard"),
      });
    },
  });
};
