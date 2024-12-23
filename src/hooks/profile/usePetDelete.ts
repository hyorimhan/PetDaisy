import { deletePetProfile } from "@/service/petProfile";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export function usePetDelete() {
  const router = useRouter();
  const petId = usePetStore((state) => state.petId) as string;
  const savePet = usePetStore((state) => state.savePet);
  const resetPet = usePetStore((state) => state.resetPet);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const queryClient = useQueryClient();

  const { mutate: deletePet } = useMutation({
    mutationFn: (petId: string) => deletePetProfile(petId),
    onSuccess: async () => {
      // 1. 현재 pet list 저장
      const currentPets = queryClient.getQueryData(["petList"]) as {
        data: Array<{ id: string; name: string }>;
      };

      // 2. 캐시 리셋 전에 다음 선택할 pet 찾기
      const nextPet = currentPets?.data.find((pet) => pet.id !== petId);

      // 3. 현재 petId 리셋
      resetPet();

      // 4. 쿼리 캐시 리셋
      await Promise.all([
        queryClient.resetQueries({ queryKey: ["petProfile"] }),
        queryClient.resetQueries({ queryKey: ["petList"] }),
      ]);

      // 5. 다음 pet이 있으면 선택
      if (nextPet) {
        savePet(nextPet.id, nextPet.name);
      }

      // 6. 성공 모달 표시
      openModal({
        type: "success",
        title: "반려동물 삭제",
        content: "반려동물이 삭제되었습니다.",
        onConfirm: () => {
          router.replace("/dashboard");
        },
      });
    },
    onError: (error) => {
      console.error("Delete pet error:", error);
      openModal({
        type: "error",
        title: "삭제 실패",
        content: "반려동물 삭제에 실패했습니다.",
      });
    },
  });
  const handleDeletePet = () => {
    openModal({
      type: "warning",
      title: "반려동물 삭제",
      content: "정말로 반려동물을 삭제하시겠습니까?",
      isTwoButton: true,
      onConfirm: () => {
        deletePet(petId);
      },
      onCancel: () => closeModal(),
    });
  };

  return { handleDeletePet };
}
