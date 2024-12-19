import { deletePetProfile } from "@/service/petProfile";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useGetPetList } from "../pet/useGetPetList";

export function usePetDelete() {
  const router = useRouter();
  const petId = usePetStore((state) => state.petId) as string;
  const savePet = usePetStore((state) => state.savePet);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const queryClient = useQueryClient();

  const { pets } = useGetPetList();

  const { mutate: deletePet } = useMutation({
    mutationFn: (petId: string) => deletePetProfile(petId),
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["petProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["petList"] }),
      ]);
    },
    onSuccess: () => {
      openModal({
        type: "success",
        title: "반려동물 삭제",
        content: "반려동물이 삭제되었습니다.",
        onConfirm: () => closeModal(),
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
        savePet(pets?.[0].id, pets?.[0].name);
        router.push("/dashboard");
      },
      onCancel: () => closeModal(),
    });
  };
  return { handleDeletePet };
}
