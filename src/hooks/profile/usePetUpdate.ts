import { updatePetProfile } from "@/service/petProfile";
import { PetUpdateType } from "@/types/petProfile";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePetUpdate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const petId = usePetStore((state) => state.petId) as string;

  return useMutation({
    mutationFn: (petData: PetUpdateType) => updatePetProfile(petData, petId),
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["petProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["petList"] }),
      ]);
    },
    onSuccess: () => {
      openModal({
        type: "success",
        title: "등록 성공",
        content: "반려동물 정보가 성공적으로 수정되었습니다.",
        onConfirm: () => router.replace("/dashboard"),
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "수정 실패",
        content: error.message,
        onConfirm: () => router.replace("/dashboard"),
      });
    },
  });
};
