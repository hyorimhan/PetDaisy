import { registPetProfile } from "@/service/petProfile";
import { PetDetails } from "@/types/petProfile";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePetRegistration = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const openModal = useModalStore((state) => state.openModal);
  const savePet = usePetStore((state) => state.savePet);

  return useMutation({
    mutationFn: (petData: PetDetails) => registPetProfile(petData),
    onSettled: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["petProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["petList"] }),
      ]);
    },
    onSuccess: (response) => {
      openModal({
        type: "success",
        title: "등록 성공",
        content: "반려동물이 성공적으로 등록 되었습니다.",
        onConfirm: () => router.replace("/dashboard"),
      });
      savePet(response.data.id, response.data.name);
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "등록 실패",
        content: error.message,
        onConfirm: () => router.replace("/dashboard"),
      });
    },
  });
};
