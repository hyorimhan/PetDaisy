import { deleteWeight } from "@/service/weight";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useDeleteMutation() {
  const { petId } = usePetStore();
  const { openModal } = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (weightId: string) => deleteWeight(weightId, petId ?? ""),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["weightData"],
      });
      openModal({
        type: "success",
        title: "몸무게 삭제",
        content: data.message,
        onConfirm: () => {
          router.replace("/dashboard/weightList");
        },
      });
    },
    onError: (error) => {
      openModal({
        type: "error",
        title: "몸무게 삭제",
        content: error.message,
        onConfirm: () => {
          router.replace("/dashboard/weightList");
        },
      });
    },
  });

  const handleDeleteWeight = (weightId: string) => {
    openModal({
      type: "warning",
      title: "삭제하시겠습니까?",
      content: "해당 데이터를 삭제합니다",
      isTwoButton: true,
      onConfirm: () => {
        mutation.mutate(weightId);
      },
      onCancel: () => {
        router.replace("/dashboard/weightList");
      },
    });
  };
  return { handleDeleteWeight };
}

export default useDeleteMutation;
