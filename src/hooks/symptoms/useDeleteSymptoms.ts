import { deleteSymptoms } from "@/service/symptoms";
import useModalStore from "@/zustand/useModalStore";
import { usePetStore } from "@/zustand/usePetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useDeleteSymptoms() {
  const { petId } = usePetStore();
  const { openModal } = useModalStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (postId: string) => deleteSymptoms(petId ?? "", postId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["symptomsData"] }),
    onSuccess: () =>
      openModal({
        type: "success",
        title: "관찰 기록 삭제",
        content: "관찰 기록을 삭제되었습니다.",
        onConfirm: () => {
          router.replace("/dashboard/symptomsList");
        },
      }),
  });

  const handleDeleteSymptoms = (postId: string) => {
    openModal({
      type: "warning",
      title: "기록 삭제",
      content: "기록을 삭제하시겠습니까?",
      isTwoButton: true,
      onConfirm: () => {
        mutation.mutate(postId);
      },
      onCancel: () => {},
    });
  };

  return {
    handleDeleteSymptoms,
  };
}

export default useDeleteSymptoms;
